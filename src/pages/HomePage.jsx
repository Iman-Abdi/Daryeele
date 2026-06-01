import { Link } from 'react-router'
import { 
  HiArrowRight, 
  HiCalendarDays, 
  HiShieldCheck, 
  HiUserGroup, 
  HiStar, 
  HiCheckBadge 
} from 'react-icons/hi2'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                <HiCheckBadge className="w-4 h-4" />
                <span>Trusted by 10,000+ Patients</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Your Health, <br />
                <span className="text-blue-600">Our Top Priority.</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Book appointments with certified doctors instantly. 
                Daryeele makes healthcare accessible and secure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                >
                  View Doctors
                  <HiArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors bg-white"
                >
                  Create Account
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Expert Doctors</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Support</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <HiStar className="fill-current w-5 h-5" />
                  <span className="text-gray-900 font-bold">4.9</span>
                  <span className="text-gray-400 text-sm">(2k+ reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              
              <img
                src="https://images.pexels.com/photos/5998456/pexels-photo-5998456.jpeg?_gl=1*1o9yhps*_ga*Nzc2MDk1Mjg3LjE3NzcwNDgyMDU.*_ga_8JE65Q40S6*czE3Nzk5NjcyMjEkbzMkZzEkdDE3Nzk5NjcyODIkajU5JGwwJGgw" 
                alt="Doctor with patient" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px]"
              />
              
              <div className="absolute bottom-10 left-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <HiCalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Availability</p>
                  <p className="font-bold text-gray-900">Today, 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Daryeele?</h2>
            <p className="mt-4 text-lg text-gray-600">We provide the best healthcare experience for you and your family.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <HiUserGroup className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Doctors</h3>
              <p className="text-gray-600">
                Access a wide network of verified and experienced specialists across various fields.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <HiCalendarDays className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Book appointments online in seconds. No more waiting in long queues at the clinic.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <HiShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your medical records and personal data are protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to prioritize your health?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Join thousands of happy patients who have found their perfect doctor through Daryeele.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Get Started For Free
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage