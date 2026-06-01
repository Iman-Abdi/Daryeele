import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { signOut } from '../lib/auth'
import { 
  HiMenu, 
  HiX, 
  HiUser, 
  HiLogout, 
  HiHome, 
  HiUsers, 
  HiCalendar, 
  HiChartBar, 
  HiShieldCheck, 
  HiChevronDown, 
  HiPlusCircle 
} from 'react-icons/hi'

const Header = () => {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await signOut()
      navigate("/signin")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const isActive = (path) => location.pathname === path

  const publicLinks = [
    { name: 'Home', path: '/', icon: HiHome },
    { name: 'Doctors', path: '/doctors', icon: HiUsers },
  ]

  const authLinks = [
    { name: 'My Appointments', path: '/my-appointments', icon: HiCalendar },
  ]

  const roleLinks = []

  if (profile?.role === 'doctor') {
    roleLinks.push({ name: 'Dashboard', path: '/doctor-dashboard', icon: HiChartBar, role: 'doctor' })
  } else if (profile?.role === 'admin') {
    roleLinks.push(
      { name: 'Manage Doctors', path: '/admin/manage-doctors', icon: HiUsers, role: 'admin' },
      { name: 'Add Doctor', path: '/admin/doctors', icon: HiPlusCircle, role: 'admin' }
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Daryeele</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            
            {publicLinks.map((link) => {
              if (link.name === 'Doctors' && ['admin', 'doctor'].includes(profile?.role)) {
                return null
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive(link.path) 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              )
            })}

            {user && (
              <>
                {authLinks.map((link) => {
                  if (link.name === 'My Appointments' && profile?.role !== 'user') {
                    return null
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                        isActive(link.path) 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  )
                })}

                {roleLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive(link.path) 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center gap-2 max-w-xs bg-gray-100 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:bg-gray-200 p-1 pr-3"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full object-cover border border-gray-300"
                      src={`https://ui-avatars.com/api/?name=${profile?.username || user.email}&background=0D8ABC&color=fff`}
                      alt="User Avatar"
                    />
                    <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                      {profile?.username || 'Account'}
                    </span>
                    <HiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {isProfileDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform transition-all duration-200 ease-out scale-100 opacity-100">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/profile"
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <HiUser className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                        Your Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsProfileDropdownOpen(false)
                        }}
                        className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        role="menuitem"
                      >
                        <HiLogout className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-500" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {publicLinks.map((link) => {
              if (link.name === 'Doctors' && ['admin', 'doctor'].includes(profile?.role)) {
                return null
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path) 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <link.icon className="w-5 h-5 text-gray-400" />
                  {link.name}
                </Link>
              )
            })}

            {user && (
              <>
                {authLinks.map((link) => {
                  if (link.name === 'My Appointments' && profile?.role !== 'user') {
                    return null
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                        isActive(link.path) 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <link.icon className="w-5 h-5 text-gray-400" />
                      {link.name}
                    </Link>
                  )
                })}

                {roleLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(link.path) 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <link.icon className="w-5 h-5 text-gray-400" />
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <HiUser className="w-5 h-5 text-gray-400" />
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <HiLogout className="w-5 h-5 text-red-400" />
                  Sign out
                </button>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/signin"
                  className="block px-3 py-2 mt-4 text-center text-blue-500 rounded-md text-base font-medium border-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header