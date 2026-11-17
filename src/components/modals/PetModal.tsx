import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { IPet } from "../../types/pet.types";
import { X, Upload, Sparkles, Dog, Loader2 } from "lucide-react";

interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: IPet | null;
}

export const PetModal: React.FC<PetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Dog");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setType(initialData.type || "Dog");
      setBreed(initialData.breed || "");
      setAge(initialData.age ?? "");
      setGender(initialData.gender || "MALE");
      setMedicalHistory(initialData.medicalHistory || "");
      setPreviewURL(initialData.imageURL || "");
      setImageFile(null);
    } else {
      setName("");
      setType("Dog");
      setBreed("");
      setAge("");
      setGender("MALE");
      setMedicalHistory("");
      setPreviewURL("");
      setImageFile(null);
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim() || age === "") {
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("type", type);
    formData.append("breed", breed.trim());
    formData.append("age", String(age));
    formData.append("gender", gender);
    formData.append("medicalHistory", medicalHistory.trim());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Hamster", "Other"];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/50 p-6 sm:p-8 shadow-2xl relative my-auto z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Dog className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
              {initialData ? "Edit Pet Profile" : "Register a New Pet"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {initialData
                ? "Update your pet's health and identification details"
                : "Add your furry family member to book appointments seamlessly"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Pet Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-teal-50 dark:bg-white/5 border border-dashed border-teal-300 dark:border-teal-700 overflow-hidden flex items-center justify-center shrink-0">
                {previewURL ? (
                  <img
                    src={previewURL}
                    alt="Pet Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Dog className="w-8 h-8 text-teal-400/60" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="pet-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="pet-image"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700/60 hover:bg-teal-100 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{previewURL ? "Change Photo" : "Upload Picture"}</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  JPG, PNG or WEBP (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pet Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bella, Bruno"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Species / Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#072124] border border-slate-200 dark:border-teal-700/60 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                {speciesOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#072124] dark:text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Breed *
              </label>
              <input
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Golden Retriever, Persian"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Age (Years) *
              </label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 2.5"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Gender *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("MALE")}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${gender === "MALE"
                  ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20"
                  : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-teal-400"
                  }`}
              >
                ♂ Male
              </button>
              <button
                type="button"
                onClick={() => setGender("FEMALE")}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${gender === "FEMALE"
                  ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20"
                  : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-teal-400"
                  }`}
              >
                ♀ Female
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Medical History / Special Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder="e.g. Allergic to chicken, fully vaccinated for rabies, recent leg injury..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 shadow-lg shadow-teal-800/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{initialData ? "Save Changes" : "Register Pet"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default PetModal;