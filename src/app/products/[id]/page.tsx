'use client';

import { useState } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';
import DeliverySelector from '@/components/DeliverySelector';
import { useParams } from 'next/navigation';

// Mock product details data
interface ProductDetails {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  condition: string;
  category: string;
  description: string;
  specs: Record<string, string>;
  seller: {
    name: string;
    rating: number;
    responses: number;
    phone: string;
  };
  images: string[];
}

const productsData: Record<number, ProductDetails> = {
  1: {
    id: 1,
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 3500000,
    rating: 4.8,
    reviews: 156,
    condition: 'New',
    category: 'smartphone',
    description: 'Latest iPhone 14 Pro with stunning display and camera. Comes with original box and accessories.',
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP Main Camera',
      battery: 'Up to 20 hours',
      storage: '256GB',
    },
    seller: {
      name: 'TechWorld Uganda',
      rating: 4.9,
      responses: 98,
      phone: '256701234567',
    },
    images: ['📱', '📦', '✨'],
  },
  2: {
    id: 2,
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    price: 2800000,
    rating: 4.7,
    reviews: 142,
    condition: 'New',
    category: 'smartphone',
    description: 'Samsung Galaxy S23 with vibrant AMOLED display, excellent performance, and all day battery life.',
    specs: {
      display: '6.1" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main Camera',
      battery: 'Up to 22 hours',
      storage: '256GB',
    },
    seller: {
      name: 'Samsung Center Kampala',
      rating: 4.8,
      responses: 95,
      phone: '256702345678',
    },
    images: ['📱', '📦', '✨'],
  },
};

export default function ProductDetail() {
  const params = useParams();
  const productId = Number(params.id);
  const product = productsData[productId] || productsData[1];

  const [selectedDelivery, setSelectedDelivery] = useState('safeboda');

  const handleOrderMessage = () => {
    return `Hi, I'm interested in buying the ${product.name}. Delivery: ${selectedDelivery}. Looking forward to your response.`;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center">
            <div className="text-9xl">{product.images[0]}</div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Brand and Condition */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-600 font-semibold">{product.brand}</span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                {product.condition}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-yellow-400 text-xl">⭐ {product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Price</p>
              <p className="text-4xl font-bold text-orange-600">UGX {product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Seller Information</h3>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Seller:</strong> {product.seller.name}</p>
                <p className="text-gray-700"><strong>Rating:</strong> ⭐ {product.seller.rating}</p>
                <p className="text-gray-700"><strong>Response Rate:</strong> {product.seller.responses}%</p>
              </div>
            </div>

            {/* Order Button */}
            <WhatsAppButton
              phoneNumber={product.seller.phone}
              message={handleOrderMessage()}
              variant="button"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specs).map(([key, value]: [string, string]) => (
              <div key={key} className="border-b pb-4">
                <p className="text-gray-600 font-semibold capitalize mb-1">{key}</p>
                <p className="text-gray-800 text-lg">{value as string}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <DeliverySelector onSelect={setSelectedDelivery} />
          <div className="mt-6">
            <WhatsAppButton
              phoneNumber={product.seller.phone}
              message={handleOrderMessage()}
              variant="button"
            />
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
          <p className="text-gray-600">Check out other products from {product.seller.name}</p>
        </div>
      </div>
    </main>
  );
}
