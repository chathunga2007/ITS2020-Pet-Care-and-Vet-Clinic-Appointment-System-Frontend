import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../service/service.service";
import type { IService, CreateServicePayload } from "../../types/service.types";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  Clock,
  Layers,
  X,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "../../utils/sweetalert";

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

  // Form fields
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState<number | string>("");
  const [formDuration, setFormDuration] = useState<number | string>(30);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await getAllServices();
      setServices(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load clinical services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormName("");
    setFormDescription("");
    setFormPrice("");
    setFormDuration(30);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc: IService) => {
    setEditingService(svc);
    setFormName(svc.name);
    setFormDescription(svc.description || "");
    setFormPrice(svc.price);
    setFormDuration(svc.durationMinutes || 30);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Please enter a service name!");
      return;
    }
    if (formPrice === "" || Number(formPrice) < 0) {
      toast.error("Please enter a valid price!");
      return;
    }

    const payload: CreateServicePayload = {
      name: formName.trim(),
      description: formDescription.trim(),
      price: Number(formPrice),
      durationMinutes: Number(formDuration) || 30,
    };

    try {
      setSubmitting(true);
      if (editingService) {
        await updateService(editingService._id, payload);
        toast.success("Service updated successfully!");
      } else {
        await createService(payload);
        toast.success("New service registered successfully!");
      }
      handleCloseModal();
      fetchServices();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (svc: IService) => {
    const confirmed = await Swal.confirm({
      title: "Delete Service?",
      text: `Are you sure you want to remove "${svc.name}" from available clinic services?`,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (confirmed) {
      try {
        await deleteService(svc._id);
        toast.success("Service removed successfully!");
        fetchServices();
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete service");
      }
    }
  };

  const filteredServices = services.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q))
    );
  });

  return (
    <DashboardLayout
      pageTitle="Clinical Services Directory"
      pageSubtitle="Register, configure, and maintain medical treatments and consultation services for appointment booking"
    >
      <div className="space-y-6">
        {/* TOP BAR / ACTION HEADER */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-[#072124] p-4 sm:p-5 rounded-3xl border border-teal-100 dark:border-teal-800/60 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services by name or procedure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-teal-700/40 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs font-bold border border-teal-200/60 dark:border-teal-700/40">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>{services.length} Total Services</span>
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>
        </div>

        {/* SERVICES CARDS GRID */}
        {loading ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-2" />
            <span className="text-xs font-semibold">Loading clinic services...</span>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="min-h-[280px] bg-white dark:bg-[#072124] rounded-3xl border border-teal-100 dark:border-teal-800/60 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/40 text-teal-600 flex items-center justify-center mb-3">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              No Clinical Services Found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
              {searchQuery
                ? `No service matches "${searchQuery}". Try a different keyword.`
                : "Get started by adding your first veterinary service, checkup package, or treatment procedure."}
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Service</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredServices.map((svc) => (
              <div
                key={svc._id}
                className="bg-white dark:bg-[#072124] rounded-3xl border border-teal-100 dark:border-teal-700/50 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-700/50 flex items-center justify-center font-bold text-sm">
                        🩺
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-800 dark:text-white tracking-tight">
                          {svc.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            LKR {svc.price.toLocaleString()}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {svc.durationMinutes || 30} mins
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(svc)}
                        title="Edit Service"
                        className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(svc)}
                        title="Delete Service"
                        className="p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {svc.description || "Comprehensive clinical veterinary care procedure."}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-teal-800/40 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Available for Booking
                  </span>
                  <span>Standard Slot</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL (CREATE / EDIT SERVICE) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#072124] w-full max-w-lg rounded-3xl border border-teal-100 dark:border-teal-700/70 shadow-2xl overflow-hidden">
              {/* MODAL HEADER */}
              <div className="px-5 py-4 bg-gradient-to-r from-teal-800 to-emerald-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <h3 className="text-sm font-bold tracking-tight">
                    {editingService ? "Update Clinical Service" : "Add New Clinical Service"}
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* MODAL FORM BODY */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-teal-200 mb-1.5">
                    Service / Treatment Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Comprehensive Physical Wellness Exam"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-teal-700/50 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-teal-200 mb-1.5">
                      Fee (LKR) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="50"
                      placeholder="e.g. 2500"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-teal-700/50 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-teal-200 mb-1.5">
                      Duration (Minutes)
                    </label>
                    <select
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-teal-700/50 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
                    >
                      <option value="15" className="text-slate-800 dark:bg-[#072124]">15 Minutes (Quick Visit)</option>
                      <option value="30" className="text-slate-800 dark:bg-[#072124]">30 Minutes (Standard)</option>
                      <option value="45" className="text-slate-800 dark:bg-[#072124]">45 Minutes (Extended)</option>
                      <option value="60" className="text-slate-800 dark:bg-[#072124]">60 Minutes (Comprehensive/Surgery)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-teal-200 mb-1.5">
                    Description &amp; Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the procedure, preparation required, or what's included..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-teal-700/50 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 font-medium resize-none"
                  />
                </div>

                {/* MODAL ACTIONS */}
                <div className="pt-3 border-t border-slate-100 dark:border-teal-800/40 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold shadow-md shadow-teal-700/20 disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{editingService ? "Save Changes" : "Create Service"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminServices;