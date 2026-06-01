import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, profile } = useAuth()

  if (!user) return <Navigate to="/signin" />

  if (!allowedRoles.includes(profile?.role)) {
    return <Navigate to="/" />
  }

  return children
}

export default RoleRoute