import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { Link } from "react-router";
import { HiUserCircle, HiStar, HiArrowRight } from "react-icons/hi";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    setFilteredDoctors(doctors);
  }, [doctors]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("doctors").select("*");

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Find a Specialist
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Book appointments with top-rated doctors in your area.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 px-2">
              <p className="text-gray-600 font-medium">
                {filteredDoctors.length} Doctor
                {filteredDoctors.length !== 1 && "s"} Found
              </p>
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <HiUserCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  No doctors found
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full"
                  >
                    <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
                      <div className="absolute inset-0 flex items-center justify-center"></div>
                    </div>
                    <div className="px-6 pb-6 relative flex-grow flex flex-col">
                      <div className="relative -mt-16 mb-4 flex justify-center">
                        <img
                          src={
                            doc.image ||
                            `https://ui-avatars.com/api/?name=${doc.name}&background=0D8ABC&color=fff&size=128`
                          }
                          alt={doc.name}
                          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {doc.name}
                        </h2>
                        <p className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                          {doc.specialty}
                        </p>

                        <div className="flex items-center justify-center gap-1 mt-3 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <HiStar key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm text-center line-clamp-2 mb-6 flex-grow">
                        {doc.bio ||
                          "Experienced professional dedicated to providing top-tier healthcare services."}
                      </p>
                      <Link
                        to={`/doctor/${doc.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors group-hover:bg-blue-600"
                      >
                        View Profile
                        <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
