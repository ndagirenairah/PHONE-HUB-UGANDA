# Image Upload & Permanent Storage Setup

## Overview

Phone Hub Uganda now includes **permanent image storage** functionality that allows sellers to upload phone images that will never be deleted. This uses Cloudinary's CDN for permanent hosting.

## Features

✅ **Permanent Storage** - Images stored forever on Cloudinary CDN  
✅ **Fast Upload** - Optimized file handling and compression  
✅ **Secure URLs** - Secure HTTPS URLs for all images  
✅ **Image Preview** - Real-time preview before upload  
✅ **Error Handling** - Graceful error messages  
✅ **Mobile Friendly** - Responsive design for all devices  
✅ **Optimized Loading** - Automatic image optimization

## Getting Started with Cloudinary

### 1. Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up with your email
3. Verify your email
4. Complete your profile

### 2. Get Credentials

1. Log in to Cloudinary https://cloudinary.com/console
2. Copy your **Cloud Name** from the dashboard
3. Click **Settings** → **API Keys**
4. Copy your **API Key** and **API Secret**

### 3. Update Environment Variables

Edit `.env.local` in your project root:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace:
- `your_cloud_name_here` - Your Cloudinary Cloud Name
- `your_api_key_here` - Your API Key
- `your_api_secret_here` - Your API Secret

### 4. Restart Development Server

```bash
npm run dev
```

The application will reload with Cloudinary integration enabled.

## How It Works

### User Flow

1. **Seller navigates** to Dashboard → "Post Phone"
2. **Fills in** product details (name, brand, price, condition, description)
3. **Uploads images** one or more (up to 10MB each)
4. **Sees preview** of each uploaded image
5. **Submits form** to list the phone
6. **Images persist** forever on Cloudinary CDN

### Image Upload Process

1. User selects image file from their device
2. Frontend validates:
   - File type (must be image)
   - File size (max 10MB)
   - File dimensions (recommended 800x600+)
3. Image sent to Next.js API route `/api/upload`
4. Server uploads to Cloudinary
5. Cloudinary returns permanent secure URL
6. URL stored in form data
7. Product data with image URLs saved to database

### Permanent Storage

- **Cloudinary URL Structure**: `https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.jpg`
- **URLs Never Change**: Once assigned, image URLs are permanent
- **Automatic Backup**: Cloudinary maintains redundant backups
- **CDN Distribution**: Images served from global CDN for fast access
- **Optimization**: Images automatically optimized for web (compression, responsive sizes)

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.ts          # Image upload endpoint
│   ├── dashboard/
│   │   ├── page.tsx              # Updated with Post Phone link
│   │   └── upload/
│   │       └── page.tsx          # Product upload page
│   └── globals.css
├── components/
│   └── ImageUpload.tsx           # Image upload component
└── ...
```

## File Descriptions

### `/src/app/api/upload/route.ts`
- Handles image upload requests from frontend
- Authenticates with Cloudinary using API credentials
- Uploads to `phone-hub-uganda/products` folder on Cloudinary
- Returns permanent image URL and public ID
- Handles errors gracefully

### `/src/components/ImageUpload.tsx`
- Reusable component for image upload
- Shows file upload zone with drag & drop support
- Validates file type and size
- Shows loading spinner during upload
- Displays image preview
- Error handling with user-friendly messages
- Returns uploaded URL to parent component

### `/src/app/dashboard/upload/page.tsx`
- Full product upload page for sellers
- Form fields:
  - Phone Name (text)
  - Brand (dropdown)
  - Price in UGX (number)
  - Condition (new/used/refurbished)
  - Description (textarea)
  - Specifications (textarea)
  - Images (multi-upload via ImageUpload component)
- Shows uploaded images with preview grid
- Remove image functionality
- Permanent storage guarantee banner

## API Route: `/api/upload`

### Request
```
POST /api/upload
Content-Type: multipart/form-data

{
  "file": <File>
}
```

### Response Success (200)
```json
{
  "public_id": "phone-hub-uganda/products/abc123",
  "secure_url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/phone-hub-uganda/products/abc123.jpg",
  "url": "http://res.cloudinary.com/...",
  "width": 1920,
  "height": 1440,
  "format": "jpg",
  "size": 245000,
  "bytes": 245000,
  "created_at": "2024-03-15T10:30:00Z"
}
```

### Response Error (400/500)
```json
{
  "error": "Upload failed" | "No file provided"
}
```

## Database Schema (When Implemented)

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  seller_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  price BIGINT,
  condition VARCHAR(50),
  description TEXT,
  specifications TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  cloudinary_public_id VARCHAR(255) UNIQUE,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

## Usage Example

### Using ImageUpload Component

```tsx
import ImageUpload from '@/components/ImageUpload';

export default function MyComponent() {
  const handleImageUpload = (imageUrl: string, publicId: string) => {
    console.log('Image URL:', imageUrl);
    console.log('Public ID:', publicId);
    // Save to your database
  };

  return (
    <ImageUpload 
      onUploadComplete={handleImageUpload}
      maxSize={10}  // 10MB max
    />
  );
}
```

### Making Upload Request from Client

```tsx
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log(data.secure_url); // Permanent image URL
```

## Security Considerations

1. **API Credentials**: Never expose `CLOUDINARY_API_SECRET` on client side (kept in `.env.local`)
2. **File Validation**: Server validates file type and size
3. **Folder Organization**: All images stored in `phone-hub-uganda/products` folder
4. **HTTPS Only**: All Cloudinary URLs use secure HTTPS
5. **Rate Limiting**: Consider adding rate limits to `/api/upload` route
6. **Auth Required**: Add seller authentication check to upload route (todo)

## Configuration Best Practices

### Environment Setup

```env
# .env.local (development)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dev-cloud
CLOUDINARY_API_KEY=dev_key_12345
CLOUDINARY_API_SECRET=dev_secret_abcde

# .env.production (production)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=prod-cloud
CLOUDINARY_API_KEY=prod_key_67890
CLOUDINARY_API_SECRET=prod_secret_fghij
```

### Cloudinary Settings

1. **Enable auto-tagging**: Settings → Upload → Auto-tagging
2. **Set transformations**: Optimize images automatically
3. **Configure CORS**: Enable cross-origin requests
4. **Backup settings**: Verify automatic backups enabled

## Troubleshooting

### Issue: "Upload failed" Error
- **Check**: Cloudinary credentials in `.env.local`
- **Verify**: Environment variables loaded (restart server)
- **Debug**: Check Network tab in browser DevTools

### Issue: Image URL not working
- **Verify**: `secure_url` is being returned from API
- **Check**: Cloudinary account is active
- **Test**: Copy URL to browser directly

### Issue: Images appearing blurry
- **Solution**: Cloudinary automatically optimizes
- **Manual**: Use quality parameter in URL: `/q_auto/`

### Issue: Upload timeout
- **Check**: File size (max 10MB recommended)
- **Try**: Compressing image before upload
- **Verify**: Internet connection speed

## Next Steps

1. ✅ **Completed**: Frontend image upload UI
2. ✅ **Completed**: Cloudinary integration
3. ✅ **Completed**: API route for uploads
4. 🔄 **Todo**: Connect to database (PostgreSQL + Prisma)
5. 🔄 **Todo**: Add seller authentication to upload route
6. 🔄 **Todo**: Create products/product_images tables
7. 🔄 **Todo**: Save product data to database
8. 🔄 **Todo**: Retrieve products from database in listing pages
9. 🔄 **Todo**: Add edit/delete product functionality
10. 🔄 **Todo**: Create product inventory management

## Testing the Feature

1. Start development server: `npm run dev`
2. Navigate to: `http://localhost:3000/dashboard`
3. Click "Post Phone" button
4. Fill product details
5. Upload an image (drag & drop or click)
6. See image preview
7. Submit form
8. Image URL will be permanent and never deleted ✓

## Support

For Cloudinary support:
- **Documentation**: https://cloudinary.com/documentation
- **API Reference**: https://cloudinary.com/documentation/cloudinary_api
- **Community**: https://support.cloudinary.com

For Phone Hub Uganda support:
- Check GitHub Issues: https://github.com/ndagirenairah/PHONE-HUB-UGANDA
- Review implementation in `/src/app/api/upload/route.ts`
- Check component: `/src/components/ImageUpload.tsx`
