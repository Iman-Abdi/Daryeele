import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../lib/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)

        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    const currentUser = data?.session?.user

    setUser(currentUser)

    if (currentUser) {
      await fetchProfile(currentUser.id)
    }

    setLoading(false)
  }

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      setProfile(data)
    } catch (err) {
      console.error('Profile error:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)