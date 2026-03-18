'use client';

import { useState } from 'react';
import DeliverySelector from '@/components/DeliverySelector';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';

export default function CheckoutPage() {
  const [selectedDelivery, setSelectedDelivery] = useState('safeboda');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const cartItems = [
    { name: 'iPhone 14 Pro', price: 3500000, quantity: 1, seller: 'TechWorld Uganda' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = selectedDelivery === 'pickup' ? 0 : selectedDelivery === 'safeboda' ? 5000 : 8000;
  const total = subtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const orderSummary = `
📱 ORDER SUMMARY
================
Phone: ${cartItems[0].name}
Price: UGX ${cartItems[0].price.toLocaleString()}
Quantity: ${cartItems[0].quantity}
Subtotal: UGX ${subtotal.toLocaleString()}
Delivery: ${selectedDelivery.toUpperCase()} - UGX ${deliveryFee.toLocaleString()}
Total: UGX ${total.toLocaleString()}

CUSTOMER DETAILS:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}, ${customerInfo.city}
  `.trim();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleChange}
                    placeholder="+256 701 234 567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleChange}
                    placeholder="Kampala"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, Makerere"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Delivery Selection */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <DeliverySelector onSelect={setSelectedDelivery} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="mb-6 space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between pb-4 border-b">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-xs text-gray-500">Seller: {item.seller}</p>
                    </div>
                    <p className="font-bold text-gray-800">UGX {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t pt-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>UGX {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery ({selectedDelivery.toUpperCase()})</span>
                  <span>UGX {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-purple-600 border-t pt-3">
                  <span>Total</span>
                  <span>UGX {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  💡 <strong>Note:</strong> Payment is arranged directly with the seller via WhatsApp
                </p>
              </div>

              {/* Order Button */}
              <WhatsAppButton
                phoneNumber="256701234567"
                message={orderSummary}
                variant="button"
              />

              <Link
                href="/products"
                className="block w-full text-center mt-4 text-orange-600 hover:text-orange-700 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
