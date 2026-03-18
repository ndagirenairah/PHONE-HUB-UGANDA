# Database Schema for Phone Hub Uganda

## Overview

This document defines the PostgreSQL database schema for Phone Hub Uganda marketplace. The database stores product information, seller profiles, orders, and image metadata with permanent image URLs from Cloudinary.

## Core Tables

### 1. sellers

Stores seller/vendor information.

```sql
CREATE TABLE sellers (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  location VARCHAR(255),
  business_type VARCHAR(50), -- 'Individual', 'Shop', 'Retail', 'Distributor'
  description TEXT,
  logo_url VARCHAR(500),
  rating DECIMAL(3,2) DEFAULT 5.0,
  total_sales BIGINT DEFAULT 0,
  verification_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 2. users

Stores user account information.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  user_type VARCHAR(50), -- 'buyer', 'seller', 'admin'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. products

Main product table storing phone listings.

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  seller_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100), -- 'Apple', 'Samsung', 'Xiaomi', etc.
  price BIGINT NOT NULL, -- Price in UGX
  condition VARCHAR(50), -- 'new', 'used', 'refurbished'
  description TEXT,
  specifications TEXT, -- JSON or text format
  stock_quantity INT DEFAULT 1,
  view_count INT DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
  INDEX idx_seller_id (seller_id),
  INDEX idx_brand (brand),
  INDEX idx_condition (condition),
  INDEX idx_price (price)
);
```

### 4. product_images

Stores product images with permanent Cloudinary URLs.

```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL, -- Permanent Cloudinary URL
  cloudinary_public_id VARCHAR(255) UNIQUE NOT NULL,
  display_order INT DEFAULT 0,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id)
);
```

### 5. orders

Stores customer orders.

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  buyer_id INT NOT NULL,
  seller_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  total_price BIGINT NOT NULL, -- Total in UGX
  delivery_method VARCHAR(50), -- 'SafeBoda', 'Faras', 'Pickup'
  delivery_cost BIGINT NOT NULL,
  order_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  delivery_address TEXT,
  buyer_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (buyer_id) REFERENCES users(id),
  FOREIGN KEY (seller_id) REFERENCES sellers(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_buyer_id (buyer_id),
  INDEX idx_seller_id (seller_id),
  INDEX idx_order_status (order_status)
);
```

### 6. reviews

Customer reviews and ratings for products.

```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  buyer_id INT NOT NULL,
  order_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (buyer_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  UNIQUE (order_id), -- One review per order
  INDEX idx_product_id (product_id)
);
```

## Relationships Diagram

```
users
├── sellers (1:1 relationship via user_id)
│   ├── products (1:many)
│   │   ├── product_images (1:many) - PERMANENT IMAGE URLS
│   │   └── reviews (1:many)
│   └── orders (1:many)
├── orders (1:many) - As buyer
└── reviews (1:many)
```

## Image Storage Strategy

### Permanent Image URLs

All product images are stored permanently on **Cloudinary CDN** with the following characteristics:

1. **Backup Location**: `https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}`
2. **Never Deleted**: Once uploaded, images cannot be deleted by Cloudinary unless explicitly requested through API
3. **Redundant Storage**: Cloudinary maintains geographic redundancy
4. **Global CDN**: Images served from nearest data center to user
5. **Automatic Optimization**: Images automatically optimized for web delivery

### Database Storage

The `product_images` table stores:

```sql
image_url: 'https://res.cloudinary.com/phone-hub/image/upload/v1234567890/phone-hub-uganda/products/xyz789.jpg'
cloudinary_public_id: 'phone-hub-uganda/products/xyz789'
```

This ensures we have:
- ✅ Permanent, accessible URLs
- ✅ Ability to retrieve/update metadata
- ✅ Reference to Cloudinary public ID for management
- ✅ Display order for multiple images per product

## Indexing Strategy

```sql
-- Performance indexes
CREATE INDEX idx_seller_id ON products(seller_id);
CREATE INDEX idx_brand ON products(brand);
CREATE INDEX idx_condition ON products(condition);
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_product_id ON product_images(product_id);
CREATE INDEX idx_buyer_id ON orders(buyer_id);
CREATE INDEX idx_seller_id ON orders(seller_id);
CREATE INDEX idx_order_status ON orders(order_status);
CREATE INDEX idx_product_id ON reviews(product_id);

-- Composite indexes for common queries
CREATE INDEX idx_seller_active ON products(seller_id, is_active);
CREATE INDEX idx_brand_condition ON products(brand, condition);
```

## Constraints

```sql
-- Ensure data integrity
ALTER TABLE sellers ADD CONSTRAINT chk_business_type 
  CHECK (business_type IN ('Individual', 'Shop', 'Retail', 'Distributor'));

ALTER TABLE products ADD CONSTRAINT chk_condition 
  CHECK (condition IN ('new', 'used', 'refurbished'));

ALTER TABLE products ADD CONSTRAINT chk_price 
  CHECK (price > 0);

ALTER TABLE orders ADD CONSTRAINT chk_delivery_method 
  CHECK (delivery_method IN ('SafeBoda', 'Faras', 'Pickup'));

ALTER TABLE orders ADD CONSTRAINT chk_delivery_cost 
  CHECK (delivery_cost >= 0);

ALTER TABLE reviews ADD CONSTRAINT chk_rating 
  CHECK (rating >= 1 AND rating <= 5);
```

## Sample Queries

### Get all products with images

```sql
SELECT 
  p.id,
  p.name,
  p.price,
  p.brand,
  s.business_name,
  ARRAY_AGG(pi.image_url) as image_urls
FROM products p
JOIN sellers s ON p.seller_id = s.id
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_active = true
GROUP BY p.id, s.business_name
ORDER BY p.created_at DESC;
```

### Get seller's products with image count

```sql
SELECT 
  p.id,
  p.name,
  p.price,
  p.condition,
  COUNT(pi.id) as image_count,
  p.created_at
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.seller_id = $1
GROUP BY p.id
ORDER BY p.created_at DESC;
```

### Get seller's recent orders

```sql
SELECT 
  o.id,
  o.order_status,
  p.name as product_name,
  u.full_name as buyer_name,
  o.total_price,
  o.created_at
FROM orders o
JOIN products p ON o.product_id = p.id
JOIN users u ON o.buyer_id = u.id
WHERE o.seller_id = $1
ORDER BY o.created_at DESC
LIMIT 10;
```

### Get product with all images

```sql
SELECT 
  p.*,
  json_agg(
    json_build_object(
      'id', pi.id,
      'url', pi.image_url,
      'order', pi.display_order
    ) ORDER BY pi.display_order
  ) as images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.id = $1
GROUP BY p.id;
```

## Migration Steps

### Phase 1: User & Seller Management
1. Create `users` table
2. Create `sellers` table
3. Add seller authentication

### Phase 2: Products & Images
1. Create `products` table
2. Create `product_images` table
3. Setup Cloudinary integration (DONE ✓)
4. Create upload API route (DONE ✓)

### Phase 3: Orders & Transactions
1. Create `orders` table
2. Setup order management endpoint
3. Integrate payment processing

### Phase 4: Reviews & Ratings
1. Create `reviews` table
2. Setup review management
3. Calculate seller ratings

## Prisma Schema (Alternative ORM)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  password  String?
  fullName  String?
  phone     String?
  userType  String  @default("buyer")
  isActive  Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  seller    Seller?
  orders    Order[]
  reviews   Review[]
}

model Seller {
  id                  Int     @id @default(autoincrement())
  userId              Int     @unique
  businessName        String
  email               String  @unique
  phone               String
  location            String?
  businessType        String
  description         String?
  logoUrl             String?
  rating              Float   @default(5.0)
  totalSales          BigInt  @default(0)
  verificationStatus  String  @default("pending")
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  user      User @relation(fields: [userId], references: [id])
  products  Product[]
  orders    Order[]
}

model Product {
  id           Int     @id @default(autoincrement())
  sellerId     Int
  name         String
  brand        String?
  price        BigInt
  condition    String
  description  String?
  specifications String?
  stockQuantity Int @default(1)
  viewCount    Int @default(0)
  rating       Float @default(0)
  reviewCount  Int @default(0)
  isActive     Boolean @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  seller       Seller @relation(fields: [sellerId], references: [id])
  images       ProductImage[]
  orders       Order[]
  reviews      Review[]

  @@index([sellerId])
  @@index([brand])
  @@index([condition])
}

model ProductImage {
  id                    Int     @id @default(autoincrement())
  productId             Int
  imageUrl              String  // Permanent Cloudinary URL
  cloudinaryPublicId    String  @unique
  displayOrder          Int     @default(0)
  uploadedAt            DateTime @default(now())

  product               Product @relation(fields: [productId], references: [id])

  @@index([productId])
}

model Order {
  id              Int     @id @default(autoincrement())
  buyerId         Int
  sellerId        Int
  productId       Int
  quantity        Int     @default(1)
  totalPrice      BigInt
  deliveryMethod  String
  deliveryCost    BigInt
  orderStatus     String  @default("pending")
  paymentStatus   String  @default("pending")
  deliveryAddress String?
  buyerNotes      String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  buyer           User @relation(fields: [buyerId], references: [id])
  seller          Seller @relation(fields: [sellerId], references: [id])
  product         Product @relation(fields: [productId], references: [id])
  reviews         Review[]
}

model Review {
  id              Int     @id @default(autoincrement())
  productId       Int
  buyerId         Int
  orderId         Int     @unique
  rating          Int
  title           String?
  comment         String?
  helpfulCount    Int     @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  product         Product @relation(fields: [productId], references: [id])
  buyer           User @relation(fields: [buyerId], references: [id])
  order           Order @relation(fields: [orderId], references: [id])
}
```

## Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Schema Design | ✅ Complete | All tables defined |
| User/Seller Tables | 🔄 Todo | Need database setup |
| Product/Image Tables | 🔄 Todo | Image URLs permanent via Cloudinary ✓ |
| Order Management | 🔄 Todo | Order tracking system |
| Reviews/Ratings | 🔄 Todo | Customer feedback system |
| API Routes | 🔄 Partial | Image upload done ✓, CRUD pending |
| Prisma ORM | 🔄 Todo | Optional alternative to raw SQL |

## Next Steps

1. Set up PostgreSQL database
2. Create tables using provided SQL
3. Install Prisma: `npm install @prisma/client prisma`
4. Initialize Prisma: `npx prisma init`
5. Configure `DATABASE_URL` in `.env.local`
6. Create Prisma schema
7. Run migrations: `npx prisma migrate dev`
8. Generate Prisma client: `npx prisma generate`
9. Create API routes for CRUD operations
10. Connect database to frontend

## Security Considerations

1. **Image URLs**: All stored as secure HTTPS URLs
2. **API Keys**: Never exposed in frontend code
3. **User Authentication**: Implement JWT or session-based auth
4. **Data Privacy**: Hash passwords, encrypt sensitive data
5. **Rate Limiting**: Limit upload requests per user
6. **Validation**: Validate all inputs on server side

## Performance Optimization

1. **Indexing**: Key columns indexed for fast queries
2. **Image CDN**: Cloudinary handles global distribution
3. **Caching**: Implement Redis for frequently accessed data
4. **Pagination**: Limit results per query
5. **Connection Pooling**: Use pooled database connections

## Backup Strategy

1. **Database Backups**: Regular PostgreSQL backups
2. **Image Backups**: Cloudinary maintains redundancy
3. **Disaster Recovery**: Automated failover setup
4. **Testing**: Regular restore testing
