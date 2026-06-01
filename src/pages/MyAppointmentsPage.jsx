import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../lib/supabase";
import { HiCalendar, HiUserCircle, HiTrash } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

const MyAppointmentsPage = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        toast.error("Please login to view appointments");
        navigate("/signin");
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          id,
          appointment_date,
          status,
          doctors (
            name,
            specialty,
            image
          )
        `,
        )
        .eq("user_id", userId)
        .order("appointment_date", { ascending: false });

      if (error) throw error;

      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) throw error;

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a)),
      );

      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            My Appointments
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-gray-500">No appointments found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {appt.doctors?.image ? (
                      <img
                        src={appt.doctors.image}
                        className="w-14 h-14 rounded-full object-cover border border-gray-100"
                        alt="Doctor"
                      />
                    ) : (
                      <HiUserCircle className="w-14 h-14 text-gray-300" />
                    )}

                    <div>
                      <h2 className="font-semibold text-gray-800 text-lg">
                        {appt.doctors?.name || "Unknown Doctor"}
                      </h2>
                      <p className="text-sm text-blue-600 font-medium">
                        {appt.doctors?.specialty || "General"}
                      </p>

                      <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded-full font-semibold uppercase tracking-wide ${getStatusStyle(appt.status)}`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-gray-600 text-sm flex items-center gap-2">
                      <HiCalendar className="text-blue-500" />
                      <span className="font-medium">
                        {new Date(appt.appointment_date).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {appt.status !== "cancelled" &&
                      appt.status !== "completed" && (
                        <button
                          onClick={() => cancelAppointment(appt.id)}
                          className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-100"
                        >
                          <HiTrash className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAppointmentsPage;
