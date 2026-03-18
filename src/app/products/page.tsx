'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const allProducts = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 3500000,
    image: '📱',
    condition: 'New',
    category: 'smartphone',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    price: 2800000,
    image: '📱',
    condition: 'New',
    category: 'smartphone',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'iPhone 13',
    brand: 'Apple',
    price: 2200000,
    image: '📱',
    condition: 'Used',
    category: 'smartphone',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Samsung Galaxy A13',
    brand: 'Samsung',
    price: 950000,
    image: '📱',
    condition: 'New',
    category: 'smartphone',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'iPhone 12 Mini',
    brand: 'Apple',
    price: 1900000,
    image: '📱',
    condition: 'Used',
    category: 'smartphone',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Poco X4',
    brand: 'Xiaomi',
    price: 1750000,
    image: '📱',
    condition: 'New',
    category: 'smartphone',
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Google Pixel 7',
    brand: 'Google',
    price: 2500000,
    image: '📱',
    condition: 'New',
    category: 'smartphone',
    rating: 4.6,
  },
  {
    id: 8,
    name: 'OnePlus 11',
    brand: 'OnePlus',
    price: 2100000,
    image: '📱',
    condition: 'New',
    category: 'smartphone',
    rating: 4.5,
  },
];

export default function ProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  const filteredProducts = allProducts.filter((product) => {
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    const conditionMatch = selectedCondition === 'all' || product.condition === selectedCondition;
    return brandMatch && conditionMatch;
  });

  const brands = ['all', ...new Set(allProducts.map((p) => p.brand))];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Phones</h1>
          <p className="text-gray-600">Browse {filteredProducts.length} available phones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 border-l-4 border-orange-500">
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-orange-600">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="rounded"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{brand === 'all' ? 'All Brands' : brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-orange-600">Condition</h3>
                <div className="space-y-2">
                  {['all', 'New', 'Used'].map((condition) => (
                    <label key={condition} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={selectedCondition === condition}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="rounded"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {condition === 'all' ? 'All Conditions' : condition}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-1 text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
