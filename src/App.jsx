import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RoleRoute from "./components/RoleRoute";

import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDoctorsPage from "./pages/AdminDoctorsPage";
import ManageDoctorsPage from "./pages/ManageDoctorsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import EditDoctorPage from './pages/EditDoctorPage'

function App() {
  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailsPage />} />

        <Route path="/my-appointments" element={<MyAppointmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/doctor-dashboard"
          element={
            <RoleRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/admin/doctors/edit/:id"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <EditDoctorPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDoctorsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/manage-doctors"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ManageDoctorsPage />
            </RoleRoute>
          }
        />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
