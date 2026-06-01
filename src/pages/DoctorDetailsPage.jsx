import { useParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { 
  HiMapPin, 
  HiCalendar, 
  HiClock, 
  HiStar, 
  HiArrowLeft,
  HiUser,
  HiCheckCircle,
  HiExclamationCircle
} from 'react-icons/hi2'

const DoctorDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('09:00')
  const [isBooking, setIsBooking] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchDoctor()
  }, [id])

  const fetchDoctor = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setDoctor(data)
    } catch (error) {
      console.error('Error fetching doctor:', error)
      setMessage({ type: 'error', text: 'Failed to load doctor details.' })
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in to book an appointment.' })
      return
    }

    if (!bookingDate) {
      setMessage({ type: 'error', text: 'Please select a date for your appointment.' })
      return
    }

    setIsBooking(true)

    try {
      const appointmentDateTime = new Date(`${bookingDate}T${bookingTime}`)

      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          doctor_id: id,
          appointment_date: appointmentDateTime.toISOString(),
          status: 'scheduled'
        })

      if (error) throw error

      setMessage({ 
        type: 'success', 
        text: 'Appointment booked successfully! Redirecting to your appointments...' 
      })
      setTimeout(() => {
        navigate('/my-appointments')
      }, 2000)

    } catch (error) {
      console.error('Error booking appointment:', error)
      setMessage({ type: 'error', text: 'Failed to book appointment. Please try again.' })
    } finally {
      setIsBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Doctor Not Found</h2>
          <button onClick={() => navigate('/doctors')} className="mt-4 text-blue-600 hover:underline">
            Back to Doctors List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate('/doctors')}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <HiArrowLeft className="w-5 h-5 mr-1" />
          Back to Doctors
        </button>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          
          <div className="bg-blue-600 p-8 text-white flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 w-full">
              <img
                src={doctor.image || `https://ui-avatars.com/api/?name=${doctor.name}&background=fff&color=0D8ABC&size=256`}
                alt={doctor.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-6"
              />
              
              <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-blue-100 text-lg font-medium mb-6">{doctor.specialty}</p>
              
              <div className="flex items-center justify-center gap-1 mb-8 text-yellow-300">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="text-white ml-2">(4.9)</span>
              </div>

              <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <HiMapPin className="w-5 h-5 text-blue-200 flex-shrink-0" />
                  <span className="text-sm">Medical Center, New York</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiClock className="w-5 h-5 text-blue-200 flex-shrink-0" />
                  <span className="text-sm">Mon - Fri, 9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 p-8 lg:p-12">
            {message.text && (
              <div className={`mb-6 flex items-center p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <HiCheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                ) : (
                  <HiExclamationCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Doctor</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {doctor.bio || 'No bio available for this doctor.'}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HiCalendar className="w-6 h-6 text-blue-600" />
                Book Appointment
              </h2>

              <form onSubmit={handleBookAppointment} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {!user && (
                  <p className="text-sm text-orange-600 mb-4 flex items-center gap-1">
                    <HiUser className="w-4 h-4" />
                    You need to be logged in to complete this booking.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailsPage