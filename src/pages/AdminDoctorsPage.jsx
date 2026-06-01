import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import {
  HiUserAdd,
  HiArrowLeft,
  HiPhotograph,
  HiAcademicCap,
  HiCheckCircle,
  HiExclamationCircle,
  HiUser,
  HiMail,
} from "react-icons/hi";

const AdminDoctorsPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !specialty) {
      toast.error("Name, Email and Specialty are required");
      setLoading(false);
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.trim())
        .single();

      if (userError || !userData) {
        throw new Error("User not found. Ask them to sign up first.");
      }

      const userId = userData.id;

      const { error: roleError } = await supabase
        .from("users")
        .update({ role: "doctor" })
        .eq("id", userId);

      if (roleError) throw roleError;

      const { data: existingDoctor } = await supabase
        .from("doctors")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (existingDoctor) {
        throw new Error("This user is already a doctor.");
      }

      const { error: doctorError } = await supabase.from("doctors").insert({
        user_id: userId,
        name: name.trim(),
        specialty: specialty.trim(),
        bio: bio.trim(),
        image: image.trim() || "https://via.placeholder.com/150",
      });

      if (doctorError) throw doctorError;

      toast.success("Doctor created successfully!");

      setName("");
      setEmail("");
      setSpecialty("");
      setBio("");
      setImage("");

      setTimeout(() => {
        navigate("/admin/manage-doctors");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate("/admin/manage-doctors")}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <HiArrowLeft className="mr-1" />
              Back
            </button>

            <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
              <HiUserAdd className="text-blue-600" />
              Add Doctor
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-5"
          >
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiAcademicCap className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="User Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiPhotograph className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="Profile Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                />
              </div>
            </div>

            <div>
              <textarea
                rows="3"
                placeholder="Biography"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
              />
            </div>

            <button
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Create Doctor"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminDoctorsPage;
