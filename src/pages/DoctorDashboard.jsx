import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import {
  HiCalendar,
  HiUserGroup,
  HiClock,
  HiSearch,
  HiExclamationCircle,
} from "react-icons/hi";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorName, setDoctorName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data: doctor, error: doctorError } = await supabase
        .from("doctors")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!doctor) {
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (userData?.role !== "doctor") {
          setErrorMessage(
            "You do not have permission to access this dashboard.",
          );
        } else {
          setErrorMessage("Doctor profile not found. Please contact support.");
        }
        setLoading(false);
        return;
      }

      if (doctorError) {
        console.error("Database Error:", doctorError);
        setErrorMessage(`Database error: ${doctorError.message}`);
        setLoading(false);
        return;
      }

      setDoctorName(doctor.name || "Doctor");

      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          *,
          users ( email )
        `,
        )
        .eq("doctor_id", doctor.id)
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );

    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please refresh.");
    }
  };

  const filteredAppointments = appointments.filter(
    (app) =>
      app.users?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.status?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(
    (app) => new Date(app.appointment_date) >= new Date(),
  ).length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-600 hover:underline"
          >
            Please Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        <div className="max-w-7xl mx-auto p-4 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              {errorMessage ? "Profile Error" : `Welcome back, ${doctorName}.`}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md shadow-sm flex items-start">
              <HiExclamationCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Access Error
                </h3>
                <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          {!loading && !errorMessage && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <HiCalendar className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Appointments
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalAppointments}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <HiClock className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Upcoming
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {upcomingAppointments}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <HiUserGroup className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Patients
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(appointments.map((a) => a.user_id)).size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Appointments
                  </h2>
                  <div className="relative max-w-xs w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search patient email..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {filteredAppointments.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No appointments found.
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAppointments.map((app) => (
                          <tr
                            key={app.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(app.appointment_date).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {app.users?.email || "Unknown Email"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  app.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : app.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {app.status || "Scheduled"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <select
                                value={app.status}
                                onChange={(e) =>
                                  updateStatus(app.id, e.target.value)
                                }
                                className="block w-full pl-3 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              >
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
