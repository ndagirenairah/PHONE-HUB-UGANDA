'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SellerPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    location: '',
    businessType: 'individual',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome to Phone Hub Uganda! We'll contact you soon. Submitted data:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Become a Seller</h1>
          <p className="text-xl text-gray-600">Start earning by selling phones and accessories on Phone Hub Uganda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Sell with Us?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-4xl">📈</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Reach More Customers</h3>
                  <p className="text-gray-600">Access thousands of active buyers looking for quality phones</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Earn More</h3>
                  <p className="text-gray-600">Competitive commission rates and quick payouts</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">🛡️</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Secure & Safe</h3>
                  <p className="text-gray-600">Protected transactions with verified buyer information</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Easy to Use</h3>
                  <p className="text-gray-600">Simple dashboard to manage inventory and orders</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">📞</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">WhatsApp Integration</h3>
                  <p className="text-gray-600">Direct contact with buyers via WhatsApp messaging</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl">🚀</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Marketing Support</h3>
                  <p className="text-gray-600">Featured listings and promotional opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Register Your Business</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., TechWorld Uganda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+256 701 234 567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Business Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Makerere, Kampala"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                >
                  <option value="individual">Individual Seller</option>
                  <option value="shop">Phone Shop</option>
                  <option value="retail">Retail Store</option>
                  <option value="distributor">Distributor</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                <p>✓ We&apos;ll verify your business and contact you within 24 hours</p>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
              >
                Register as Seller
              </button>

              <p className="text-center text-sm text-gray-600">
                Already registered?{' '}
                <Link href="/auth/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="font-bold text-lg mb-2">Register</h3>
              <p className="text-gray-600">Sign up and verify your business</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="font-bold text-lg mb-2">Add Products</h3>
              <p className="text-gray-600">Upload phones with images & prices</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="font-bold text-lg mb-2">Receive Orders</h3>
              <p className="text-gray-600">Get orders via WhatsApp & dashboard</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">4️⃣</div>
              <h3 className="font-bold text-lg mb-2">Earn Money</h3>
              <p className="text-gray-600">Get paid quickly & reliably</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
