import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import PetModal from "../../components/modals/PetModal";
import {
  getMyPets,
  createPet,
  updatePet,
  deletePet,
} from "../../service/pet.service";
import type { IPet } from "../../types/pet.types";
import {
  Dog,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "../../utils/sweetalert";

export const UserPets: React.FC = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<IPet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<IPet | null>(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getMyPets();
      setPets(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load pets list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleOpenAdd = () => {
    setEditingPet(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pet: IPet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleSavePet = async (formData: FormData) => {
    try {
      if (editingPet) {
        await updatePet(editingPet._id, formData);
        toast.success("Pet profile updated successfully! 🐾");
      } else {
        await createPet(formData);
        toast.success("Pet registered successfully! 🐾");
      }
      await fetchPets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save pet");
      throw err;
    }
  };

  const handleDeletePet = async (petId: string, petName: string) => {
    const confirmed = await Swal.confirm({
      title: "Remove Pet?",
      text: `Are you sure you want to remove ${petName} from your registered profiles?`,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Keep",
    });

    if (!confirmed) return;

    try {
      await deletePet(petId);
      toast.success(`${petName} removed successfully.`);
      await fetchPets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete pet");
    }
  };

  return (
    <DashboardLayout
      pageTitle="My Registered Pets"
      pageSubtitle="Manage clinical profiles, medical history notes, and records of your pets"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-[#072124]/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 dark:border-teal-700/40 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
              <Dog className="w-3.5 h-3.5" />
              <span>Pet Registry Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              My Pets ({pets.length})
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Profiles with up-to-date details allow vets to provide rapid, tailored clinical care
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Pet</span>
          </button>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              Loading your pets profiles...
            </p>
          </div>
        ) : pets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-teal-200 dark:border-teal-700/50 bg-white/50 dark:bg-white/5 p-12 sm:p-20 text-center">
            <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 flex items-center justify-center mx-auto mb-4">
              <Dog className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              No Pets Registered Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Register your dogs, cats, or other pets to schedule vet consultations, track vaccinations, and manage appointments seamlessly.
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-700/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register Your First Pet</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-4 bg-teal-50 dark:bg-white/5">
                    {pet.imageURL ? (
                      <img
                        src={pet.imageURL}
                        alt={pet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-400/40">
                        <Dog className="w-16 h-16" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      <span>{pet.gender === "MALE" ? "♂ Male" : "♀ Female"}</span>
                      <span>•</span>
                      <span>{pet.type}</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-teal-600/90 backdrop-blur-md text-white text-[11px] font-bold">
                      {pet.age} {pet.age === 1 ? "Year" : "Years"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                      {pet.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                      Breed: {pet.breed}
                    </p>

                    {pet.medicalHistory && (
                      <div className="text-[12px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 rounded-2xl p-3 border border-slate-100 dark:border-white/5 leading-relaxed">
                        <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">
                          Medical History &amp; Allergies:
                        </span>
                        {pet.medicalHistory}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-teal-50 dark:border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/user/book?petId=${pet._id}`)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs border border-teal-200 dark:border-teal-700/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Visit</span>
                  </button>
                  <button
                    onClick={() => handleOpenEdit(pet)}
                    title="Edit Profile"
                    className="p-2.5 rounded-xl text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-white bg-slate-50 dark:bg-white/5 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePet(pet._id, pet.name)}
                    title="Delete Profile"
                    className="p-2.5 rounded-xl text-rose-500 hover:text-rose-700 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSavePet}
        initialData={editingPet}
      />
    </DashboardLayout>
  );
};

export default UserPets;