import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllPets } from "../../service/pet.service";
import type { IPet, IPetOwner } from "../../types/pet.types";
import {
  Dog,
  Search,
  Loader2,
  User,
  Mail,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";

export const AdminPets: React.FC = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getAllPets();
      setPets(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load clinic pet registry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    const ownerObj = typeof pet.owner === "object" ? (pet.owner as IPetOwner) : null;
    return (
      pet.name?.toLowerCase().includes(q) ||
      pet.breed?.toLowerCase().includes(q) ||
      pet.type?.toLowerCase().includes(q) ||
      pet.medicalHistory?.toLowerCase().includes(q) ||
      ownerObj?.name?.toLowerCase().includes(q) ||
      ownerObj?.email?.toLowerCase().includes(q) ||
      ownerObj?.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout
      pageTitle="Clinic Pet Registry & Records"
      pageSubtitle="Comprehensive clinical database of all registered pets and their pet parents"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-[#072124]/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100 dark:border-teal-700/40 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
              <Dog className="w-3.5 h-3.5" />
              <span>Patient Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Hospital Pet Registry ({pets.length})
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified clinical profiles registered by clinic members
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pet, breed, owner, phone..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              Loading hospital patient records...
            </p>
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-teal-200 dark:border-teal-700/50 bg-white dark:bg-[#072124] p-12 text-center shadow-sm">
            <Dog className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
              No Pets Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No pets matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => {
              const ownerObj =
                typeof pet.owner === "object" ? (pet.owner as IPetOwner) : null;

              return (
                <div
                  key={pet._id}
                  className="rounded-3xl bg-white dark:bg-[#072124] border border-teal-100/90 dark:border-teal-700/40 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-teal-50 dark:bg-white/5">
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

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                        {pet.gender === "MALE" ? "♂ Male" : "♀ Female"} • {pet.type}
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
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 rounded-xl p-2.5 border border-slate-100 dark:border-white/5 leading-relaxed">
                          <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">
                            Medical Notes:
                          </span>
                          {pet.medicalHistory}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-teal-50 dark:border-white/10">
                    <p className="text-[11px] font-black uppercase text-teal-700 dark:text-teal-400 mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>Pet Parent (Owner)</span>
                    </p>
                    {ownerObj ? (
                      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        <p className="font-bold text-slate-800 dark:text-white">
                          {ownerObj.name}
                        </p>
                        <p className="flex items-center gap-1.5 truncate text-[11px] text-slate-500">
                          <Mail className="w-3.5 h-3.5 text-teal-600" />
                          <span>{ownerObj.email}</span>
                        </p>
                        {ownerObj.phone && (
                          <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Phone className="w-3.5 h-3.5 text-teal-600" />
                            <span>{ownerObj.phone}</span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">
                        Linked to user account
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminPets;