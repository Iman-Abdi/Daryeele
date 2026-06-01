import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../lib/supabase";
import { HiPlus, HiPencilAlt, HiTrash, HiUserCircle } from "react-icons/hi";

const TableSkeleton = () => (
  <>
    {[1, 2, 3].map((n) => (
      <tr key={n} className="animate-pulse">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="ml-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <div className="flex justify-end gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
          </div>
        </td>
      </tr>
    ))}
  </>
);

const ManageDoctorsPage = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInitiate = async (id, userId) => {
    try {
      const { error: deleteError } = await supabase
        .from("doctors")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      if (userId) {
        const { error: updateError } = await supabase
          .from("users")
          .update({ role: "user" })
          .eq("id", userId);

        if (updateError) throw updateError;
      }

      setDoctors(doctors.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Manage Doctors
            </h1>
            <p className="text-gray-500 mt-1">View, edit, or remove doctors.</p>
          </div>

          <button
            onClick={() => navigate("/admin/doctors")}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
          >
            <HiPlus className="w-5 h-5 mr-2" />
            Add Doctor
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Doctor Info
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Specialty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Bio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <TableSkeleton />
                ) : doctors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <HiUserCircle className="w-12 h-12 mb-2 opacity-50" />
                        <p className="text-sm">No doctors found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  doctors.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {doc.image ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                                src={doc.image}
                                alt=""
                              />
                            ) : (
                              <HiUserCircle className="h-12 w-12 text-gray-300" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {doc.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {doc.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="text-sm text-gray-500 max-w-xs truncate cursor-help"
                          title={doc.bio || "No bio available"}
                        >
                          {doc.bio || (
                            <span className="italic text-gray-400">
                              No bio provided.
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              navigate(`/admin/doctors/edit/${doc.id}`)
                            }
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="Edit"
                          >
                            <HiPencilAlt className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteInitiate(doc.id, doc.user_id)
                            }
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                            title="Delete"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctorsPage;
