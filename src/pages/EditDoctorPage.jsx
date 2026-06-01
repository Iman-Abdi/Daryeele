import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import supabase from "../lib/supabase";

const EditDoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    const { data } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();

    setDoctor(data);
    setLoading(false);
  };

  const updateDoctor = async () => {
    const { error } = await supabase
      .from("doctors")
      .update({
        name: doctor.name,
        specialty: doctor.specialty,
        bio: doctor.bio,
        image: doctor.image,
      })
      .eq("id", id);

    if (error) {
      alert("Update failed");
    } else {
      alert("Updated successfully");
      navigate("/admin/manage-doctors");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Edit Doctor</h1>

      <input
        value={doctor.name}
        onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
        className="w-full mb-3 p-2 border"
      />

      <input
        value={doctor.specialty}
        onChange={(e) => setDoctor({ ...doctor, specialty: e.target.value })}
        className="w-full mb-3 p-2 border"
      />

      <textarea
        value={doctor.bio}
        onChange={(e) => setDoctor({ ...doctor, bio: e.target.value })}
        className="w-full mb-3 p-2 border"
      />

      <input
        value={doctor.image}
        onChange={(e) => setDoctor({ ...doctor, image: e.target.value })}
        className="w-full mb-3 p-2 border"
      />

      <button
        onClick={updateDoctor}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default EditDoctorPage;
