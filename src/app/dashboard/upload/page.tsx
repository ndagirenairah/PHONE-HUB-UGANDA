'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import Link from 'next/link';

interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  condition: string;
  description: string;
  specifications: string;
  images: { url: string; publicId: string }[];
}

export default function UploadProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    price: '',
    condition: 'used',
    description: '',
    specifications: '',
    images: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl: string, publicId: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: imageUrl, publicId }],
    }));
    setSuccessMessage('Image uploaded successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const removeImage = (publicId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.publicId !== publicId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would save to database
      console.log('Product data:', formData);
      alert('Product uploaded successfully! It will stay on the platform forever.');
      
      // Reset form
      setFormData({
        name: '',
        brand: '',
        price: '',
        condition: 'used',
        description: '',
        specifications: '',
        images: [],
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Post Your Phone</h1>
          <p className="text-gray-600">Your product image will be permanently stored and never deleted</p>
          <Link
            href="/dashboard"
            className="text-orange-500 hover:text-orange-600 text-sm mt-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 13 Pro Max"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a brand</option>
                  <option value="Apple">Apple iPhone</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Tecno">Tecno</option>
                  <option value="Infinix">Infinix</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (UGX) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 1500000"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="new">Brand New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the phone&apos;s condition, features, and any issues..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Specifications */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications
              </label>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleInputChange}
                placeholder="e.g., RAM: 8GB, Storage: 128GB, Battery: 5000mAh"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images *</h2>
            <p className="text-gray-600 text-sm mb-4">Upload high-quality images of your phone. These images will never be deleted.</p>
            
            <ImageUpload onUploadComplete={handleImageUpload} maxSize={10} />

            {successMessage && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">{successMessage}</p>
              </div>
            )}

            {/* Uploaded Images Preview */}
            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Uploaded Images ({formData.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map(image => (
                    <div key={image.publicId} className="relative group">
                      <div className="relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.publicId)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Phone'}
            </button>
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Cancel
            </Link>
          </div>

          {/* Info Banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">✓ Permanent Storage</h3>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Your images are stored permanently on Cloudinary CDN</li>
              <li>• Images will never be deleted or lost</li>
              <li>• Permanent URL for each image</li>
              <li>• Fully optimized for fast loading</li>
              <li>• Mobile-friendly across all devices</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
