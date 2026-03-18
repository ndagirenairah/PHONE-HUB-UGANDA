import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

// Mock products data
const featuredProducts = [
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
];

const latestDeals = [
  {
    id: 7,
    name: 'AirPods Pro',
    brand: 'Apple',
    price: 650000,
    image: '🎧',
    condition: 'New',
    category: 'accessories',
    rating: 4.9,
  },
  {
    id: 8,
    name: 'Samsung Earbuds',
    brand: 'Samsung',
    price: 450000,
    image: '🎧',
    condition: 'New',
    category: 'accessories',
    rating: 4.5,
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📱 Welcome to Phone Hub Uganda
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Find the best mobile phones and accessories in Uganda. Buy new, sell old, or expand your inventory.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-8 rounded-lg transition text-center"
                >
                  Browse All Phones
                </Link>
                <Link
                  href="/seller"
                  className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-8 rounded-lg transition text-center"
                >
                  Start Selling
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="text-9xl">📱</div>
              <p className="text-xl mt-4 opacity-80">1000+ Phones Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Phone Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Safe and verified seller information</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="font-bold text-lg mb-2">WhatsApp Ordering</h3>
              <p className="text-gray-600">Direct contact with sellers instantly</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚲</div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">SafeBoda & Faras integration</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices from top sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Phones</h2>
            <Link href="/products" className="text-orange-600 hover:text-orange-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Deals */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Deals on Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join hundreds of sellers making money on Phone Hub Uganda
          </p>
          <Link
            href="/seller"
            className="inline-block bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-8 rounded-lg transition"
          >
            Become a Seller Today
          </Link>
        </div>
      </section>
    </main>
  );
}
