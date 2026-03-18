'use client';

import Link from 'next/link';

const dashboardStats = [
  { label: 'Total Products', value: '24', icon: '📱' },
  { label: 'Active Orders', value: '8', icon: '📦' },
  { label: 'Total Sales', value: 'UGX 45,600,000', icon: '💰' },
  { label: 'Customer Rating', value: '4.8⭐', icon: '⭐' },
];

const recentOrders = [
  { id: 1, product: 'iPhone 14 Pro', buyer: 'John Doe', date: '2024-03-15', status: 'Pending' },
  { id: 2, product: 'Samsung Galaxy S23', buyer: 'Jane Smith', date: '2024-03-14', status: 'Completed' },
  { id: 3, product: 'AirPods Pro', buyer: 'Mike Johnson', date: '2024-03-13', status: 'Completed' },
  { id: 4, product: 'iPhone 13', buyer: 'Sarah Williams', date: '2024-03-12', status: 'Pending' },
];

const products = [
  { id: 1, name: 'iPhone 14 Pro', price: 'UGX 3,500,000', stock: 5, views: 234 },
  { id: 2, name: 'Samsung Galaxy S23', price: 'UGX 2,800,000', stock: 3, views: 189 },
  { id: 3, name: 'Poco X4', price: 'UGX 1,750,000', stock: 8, views: 156 },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Manage your products and orders</p>
          </div>
          <Link
            href="/dashboard/upload"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            + Post Phone
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Buyer</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{order.product}</td>
                      <td className="px-4 py-3 text-gray-800">{order.buyer}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{order.date}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/add-product"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition"
              >
                Add New Product
              </Link>
              <Link
                href="/dashboard/products"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-center transition"
              >
                View All Products
              </Link>
              <Link
                href="/dashboard/orders"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-center transition"
              >
                View Orders
              </Link>
              <Link
                href="/dashboard/settings"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-center transition"
              >
                Account Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                <p className="text-purple-600 font-semibold mb-2">{product.price}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Stock: {product.stock}</span>
                  <span>Views: {product.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
