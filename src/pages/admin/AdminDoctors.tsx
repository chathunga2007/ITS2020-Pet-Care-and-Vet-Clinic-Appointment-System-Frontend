import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DoctorModal from "../../components/modals/DoctorModal";
import DoctorScheduleModal from "../../components/modals/DoctorScheduleModal";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../service/doctor.service";
import type { IDoctor } from "../../types/doctor.types";
import {
  Stethoscope,
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  Phone,
  Mail,
  Clock,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "../../utils/sweetalert";

export const AdminDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleDoctor, setScheduleDoctor] = useState<IDoctor | null>(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load clinic doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc: IDoctor) => {
    setEditingDoctor(doc);
    setIsModalOpen(true);
  };

  const handleOpenSchedule = (doc: IDoctor) => {
    setScheduleDoctor(doc);
    setIsScheduleModalOpen(true);
  };

  const handleSaveDoctor = async (formData: FormData) => {
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor._id, formData);
        toast.success("Doctor details updated successfully! 🩺");
      } else {
        await createDoctor(formData);
        toast.success("New specialist added to clinic roster! 🩺");
      }
      await fetchDoctors();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save doctor");
      throw err;
    }
  };

  const handleDeleteDoctor = async (docId: string, docName: string) => {
    const confirmed = await Swal.confirm({
      title: "Deactivate Doctor?",
      text: `Are you sure you want to deactivate ${docName}? They will no longer appear on the public booking roster.`,
      confirmButtonText: "Yes, Deactivate",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    try {
      await deleteDoctor(docId);
      toast.success(`${docName} has been deactivated.`);
      await fetchDoctors();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to deactivate doctor");
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      doc.name?.toLowerCase().includes(q) ||
      doc.specialization?.toLowerCase().includes(q) ||
      doc.email?.toLowerCase().includes(q) ||
      doc.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout
      pageTitle="Veterinary Specialists & Doctors"
      pageSubtitle="Manage clinical physician credentials, contact information, and availability rosters"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-[#072124]/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 dark:border-teal-700/40 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Medical Staff Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Hospital Doctors &amp; Surgeons ({doctors.length})
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active clinicians published for patient appointments
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-teal-500 shadow-sm"
              />
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              Loading medical doctor profiles...
            </p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-teal-200 dark:border-teal-700/50 bg-white dark:bg-[#072124] p-12 text-center shadow-sm">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
              No Doctors Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              No veterinary doctors matching the search query.
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register First Doctor</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-4 bg-teal-50 dark:bg-white/5">
                    {doc.imageURL ? (
                      <img
                        src={doc.imageURL}
                        alt={doc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-400/40">
                        <Stethoscope className="w-16 h-16" />
                      </div>
                    )}

                    <div className="absolute top-3 right-3">
                      {doc.status === "ACTIVE" ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold">
                          ● Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[11px] font-bold">
                          ○ Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-bold text-teal-700 dark:text-teal-300">
                      {doc.specialization}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-2">
                      <p className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{doc.email}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{doc.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{doc.workingHours}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-teal-50 dark:border-white/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(doc)}
                      className="flex-1 py-2 px-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 font-bold text-xs border border-teal-200 dark:border-teal-700/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doc._id, doc.name)}
                      title="Deactivate Doctor"
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-700 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenSchedule(doc)}
                    className="w-full py-2 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Manage Schedule 🗓️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveDoctor}
        initialData={editingDoctor}
      />

      <DoctorScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        doctor={scheduleDoctor}
      />
    </DashboardLayout>
  );
};

export default AdminDoctors;