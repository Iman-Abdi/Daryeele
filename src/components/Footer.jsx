import { Link } from 'react-router'
import { 
  HiMail, 
  HiLocationMarker, 
  HiPhone, 
  HiChevronRight,
} from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="text-2xl font-bold tracking-tight">Daryeele</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting patients with the best healthcare professionals. 
              Book appointments, manage records, and prioritize your health with ease.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-slate-400 hover:text-blue-400 transition-colors text-sm group">
                  <HiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <HiLocationMarker className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Barxadda weyn,<br />Garowe, Puntland, Somalia</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <HiMail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  info@daryeele.com
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <HiPhone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  +252906299125
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Daryeele Healthcare. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer