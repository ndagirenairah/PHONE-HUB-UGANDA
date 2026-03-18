import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">📱 Phone Hub Uganda</h3>
            <p className="text-sm mb-4">
              Uganda&apos;s leading marketplace for buying and selling mobile phones and accessories.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/256701234567" className="text-green-400 hover:text-green-300">WhatsApp</a>
              <a href="#" className="text-blue-400 hover:text-blue-300">Facebook</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-white">All Phones</Link></li>
              <li><Link href="/seller" className="hover:text-white">Sell with Us</Link></li>
              <li><Link href="/auth/login" className="hover:text-white">Sign In</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Smartphones</a></li>
              <li><a href="#" className="hover:text-white">Accessories</a></li>
              <li><a href="#" className="hover:text-white">Used Phones</a></li>
              <li><a href="#" className="hover:text-white">New Phones</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +256 701 234 567</li>
              <li>📧 info@phonehubuganda.com</li>
              <li>📍 Makerere, Kampala</li>
              <li>Uganda</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2026 Phone Hub Uganda. All rights reserved.</p>
            <div className="flex space-x-6 text-sm mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
