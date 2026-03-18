# Phone Hub Uganda - Database Schema & System Architecture

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  user_type ENUM('buyer', 'seller', 'admin') DEFAULT 'buyer',
  avatar_url VARCHAR(500),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Sellers Table
```sql
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_type ENUM('individual', 'shop', 'retail', 'distributor') NOT NULL,
  location VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  business_registration VARCHAR(255),
  whatsapp_number VARCHAR(20) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  total_sales INT DEFAULT 0,
  response_rate INT DEFAULT 100,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category ENUM('smartphone', 'accessories', 'tablets', 'other') NOT NULL,
  condition ENUM('new', 'used', 'refurbished') NOT NULL,
  price BIGINT NOT NULL,
  description TEXT,
  specification JSONB,
  images JSONB,
  stock INT DEFAULT 1,
  views INT DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  is_featured BOOLEAN DEFAULT false,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id),
  seller_id UUID NOT NULL REFERENCES sellers(id),
  buyer_id UUID NOT NULL REFERENCES users(id),
  quantity INT NOT NULL DEFAULT 1,
  total_price BIGINT NOT NULL,
  status ENUM('pending', 'confirmed', 'delivered', 'cancelled') DEFAULT 'pending',
  delivery_method ENUM('safeboda', 'faras', 'pickup') NOT NULL,
  delivery_fee BIGINT NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Messages Table (WhatsApp Integration)
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id),
  receiver_id UUID NOT NULL REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  order_id UUID REFERENCES orders(id),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  message_type ENUM('inquiry', 'order_update', 'general') DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Routes Structure

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Products Routes
- `GET /api/products` - Get all products with filters
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create new product (seller)
- `PUT /api/products/[id]` - Update product (seller)
- `DELETE /api/products/[id]` - Delete product (seller)
- `GET /api/products/search` - Search products

### Orders Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status (seller)
- `GET /api/seller/orders` - Get seller's orders

### Sellers Routes
- `POST /api/sellers` - Register as seller
- `GET /api/sellers/[id]` - Get seller profile
- `PUT /api/sellers/[id]` - Update seller profile
- `GET /api/sellers/[id]/products` - Get seller's products
- `GET /api/sellers/[id]/stats` - Get seller statistics

### Reviews Routes
- `POST /api/reviews` - Create review
- `GET /api/reviews/product/[id]` - Get product reviews
- `PUT /api/reviews/[id]` - Update review

### WhatsApp Routes
- `POST /api/whatsapp/send-message` - Send WhatsApp message
- `GET /api/whatsapp/order-template` - Get order message template

---

## Delivery Integration

### SafeBoda Integration
```
Cost: UGX 5,000 per delivery
- Contact: SafeBoda API (when available)
- Status tracking via API/webhook
- Real-time location updates
```

### Faras Integration
```
Cost: UGX 8,000 per delivery
- Contact: Faras API (when available)
- Pickup and delivery coordination
- Real-time tracking
```

### Pickup Option
```
Cost: Free (seller location pickup)
- Buyer arranges time with seller
- Via WhatsApp messages
```

---

## Frontend Component Structure

```
src/
 ├── components/
 │   ├── Navbar.tsx
 │   ├── ProductCard.tsx
 │   ├── WhatsAppButton.tsx
 │   ├── DeliverySelector.tsx
 │   ├── Footer.tsx
 │   └── SearchBar.tsx
 ├── app/
 │   ├── page.tsx (home)
 │   ├── products/
 │   │   ├── page.tsx (listing)
 │   │   └── [id]/page.tsx (detail)
 │   ├── seller/
 │   │   └── page.tsx (registration)
 │   ├── dashboard/
 │   │   └── page.tsx (seller dashboard)
 │   ├── checkout/
 │   │   └── page.tsx
 │   ├── auth/
 │   │   ├── login/page.tsx
 │   │   └── register/page.tsx
 │   └── layout.tsx
 ├── lib/
 │   ├── database.ts
 │   └── utils.ts
 └── styles/
     └── globals.css
```

---

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/phone_hub_uganda

# Authentication
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# WhatsApp Integration
WHATSAPP_API_KEY=your_api_key
WHATSAPP_PHONE_NUMBER=256701234567

# Delivery Services (Future)
SAFEBODA_API_KEY=your_api_key
FARAS_API_KEY=your_api_key

# Image Upload
NEXT_PUBLIC_IMAGE_BUCKET=cloudinary_or_s3_bucket
```

---

## Key Features Implemented

✅ Home page with featured products
✅ Product listing with filters
✅ Product detail pages
✅ Seller registration
✅ Seller dashboard
✅ Checkout with delivery selection
✅ WhatsApp integration
✅ Responsive Tailwind CSS design
✅ Mobile-first approach
✅ Authentication pages (login/register)

## Features to Implement Next

⚠️ Backend API routes
⚠️ Database connection (PostgreSQL)
⚠️ Authentication system (NextAuth.js)
⚠️ Real delivery API integration
⚠️ Payment gateway integration
⚠️ Image upload system
⚠️ Search and filter optimization
⚠️ Reviews and ratings system
⚠️ Admin dashboard
