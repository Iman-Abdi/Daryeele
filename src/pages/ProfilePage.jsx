import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { HiUserCircle, HiMail, HiAcademicCap } from "react-icons/hi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [docName, setDocName] = useState("");
  const [docImage, setDocImage] = useState("");
  const [docBio, setDocBio] = useState("");

  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData.user;
      setUser(currentUser);

      if (!currentUser) return;

      const { data: userProfile } = await supabase
        .from("users")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      setProfile(userProfile);

      if (userProfile) {
        setUsername(userProfile.username || "");
        setUserImage(userProfile.image || "");
      }

      if (userProfile.role === "doctor") {
        const { data: doctorData } = await supabase
          .from("doctors")
          .select("*")
          .eq("user_id", currentUser.id)
          .single();

        setDoctor(doctorData);

        setDocName(doctorData?.name || "");
        setDocImage(doctorData?.image || "");
        setDocBio(doctorData?.bio || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          username,
          image: userImage,
        })
        .eq("id", user.id);

      if (error) throw error;

      alert("Profile updated!");
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const updateDoctorProfile = async () => {
    try {
      const { error: docError } = await supabase
        .from("doctors")
        .update({
          name: docName,
          bio: docBio,
          image: docImage,
        })
        .eq("user_id", user.id);

      if (docError) throw docError;

      const { error: userError } = await supabase
        .from("users")
        .update({
          username: docName,
          image: docImage,
        })
        .eq("id", user.id);

      if (userError) throw userError;

      alert("Profile updated!");
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            className="w-16 h-16 rounded-full text-gray-300"
            src={profile.image}
            alt="no image"
          />
          <div>
            <p className="font-semibold text-lg">{profile?.username}</p>
            <p className="text-gray-600 flex items-center gap-1">
              <HiMail /> {user?.email}
            </p>
            <p className="font-small text-sm">{profile?.role.toUpperCase()}</p>
          </div>
        </div>

        {(profile?.role === "user" || profile?.role === "admin") && (
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-xl font-semibold">Edit Profile</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Profile Image URL"
                value={userImage}
                onChange={(e) => setUserImage(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              onClick={updateUserProfile}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        )}

        {profile?.role === "doctor" && (
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <HiAcademicCap /> Doctor Profile
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Image URL"
                value={docImage}
                onChange={(e) => setDocImage(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                placeholder="Bio"
                value={docBio}
                onChange={(e) => setDocBio(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
              />
            </div>

            <button
              onClick={updateDoctorProfile}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Doctor Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
