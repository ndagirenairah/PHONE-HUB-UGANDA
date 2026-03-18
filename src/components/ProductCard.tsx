import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
  category: string;
  rating: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden cursor-pointer">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.condition}
          </div>
          <div className="text-6xl">{product.category === 'smartphone' ? '📱' : '🎧'}</div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-gray-600 text-sm font-medium">{product.brand}</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{product.name}</h3>
          
          {/* Price */}
          <div className="text-2xl font-bold text-orange-600 mb-2">
            UGX {product.price.toLocaleString()}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <span className="text-yellow-400">⭐ {product.rating}</span>
          </div>

          {/* Button */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
