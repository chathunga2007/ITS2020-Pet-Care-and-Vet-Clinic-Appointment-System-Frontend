export type AlertIcon = "success" | "error" | "warning" | "info";

export interface AlertOptions {
  title: string;
  text?: string;
  icon?: AlertIcon;
  confirmButtonText?: string;
  timer?: number;
}

export interface ConfirmOptions {
  title: string;
  text?: string;
  icon?: AlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const Swal = {
  fire: ({
    title,
    text = "",
    icon = "info",
    confirmButtonText = "OK",
    timer,
  }: AlertOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const existing = document.getElementById("petvitals-swal-container");
      if (existing) existing.remove();

      const container = document.createElement("div");
      container.id = "petvitals-swal-container";
      container.className =
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none";

      let iconMarkup = "";
      if (icon === "success") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400 shadow-sm">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        `;
      } else if (icon === "error") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mx-auto mb-4 text-rose-600 dark:text-rose-400 shadow-sm">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        `;
      } else if (icon === "warning") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400 shadow-sm">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        `;
      } else {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-teal-500/40 bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-400 shadow-sm">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="w-full max-w-sm rounded-3xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/60 p-7 text-center shadow-2xl shadow-teal-950/15 dark:shadow-black/70 animate-in zoom-in-95 duration-200">
          ${iconMarkup}
          <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">${title}</h3>
          ${text ? `<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">${text}</p>` : `<div class="mb-5"></div>`}
          <button id="petvitals-swal-confirm-btn" class="w-full py-3 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white shadow-lg shadow-teal-700/25 transition-all cursor-pointer">
            ${confirmButtonText}
          </button>
        </div>
      `;

      document.body.appendChild(container);

      const closeAlert = () => {
        container.classList.add("opacity-0", "transition-opacity", "duration-200");
        setTimeout(() => {
          container.remove();
          resolve(true);
        }, 200);
      };

      const confirmBtn = document.getElementById("petvitals-swal-confirm-btn");
      if (confirmBtn) {
        confirmBtn.addEventListener("click", closeAlert);
      }

      container.addEventListener("click", (e) => {
        if (e.target === container) {
          closeAlert();
        }
      });

      if (timer && timer > 0) {
        setTimeout(closeAlert, timer);
      }
    });
  },

  confirm: ({
    title,
    text = "",
    icon = "warning",
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
  }: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const existing = document.getElementById("petvitals-swal-container");
      if (existing) existing.remove();

      const container = document.createElement("div");
      container.id = "petvitals-swal-container";
      container.className =
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none";

      let iconMarkup = `
        <div class="w-16 h-16 rounded-full border-4 border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400 shadow-sm">
          <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      `;

      if (icon === "error") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mx-auto mb-4 text-rose-600 dark:text-rose-400 shadow-sm">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        `;
      } else if (icon === "success") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400 shadow-sm">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="w-full max-w-sm rounded-3xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/60 p-7 text-center shadow-2xl shadow-teal-950/15 dark:shadow-black/70 animate-in zoom-in-95 duration-200">
          ${iconMarkup}
          <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">${title}</h3>
          ${text ? `<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">${text}</p>` : `<div class="mb-5"></div>`}
          <div class="flex items-center gap-3">
            <button id="petvitals-swal-cancel-btn" class="flex-1 py-3 px-4 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer">
              ${cancelButtonText}
            </button>
            <button id="petvitals-swal-confirm-btn" class="flex-1 py-3 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white shadow-lg shadow-teal-700/25 transition-all cursor-pointer">
              ${confirmButtonText}
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(container);

      const closeConfirm = (result: boolean) => {
        container.classList.add("opacity-0", "transition-opacity", "duration-200");
        setTimeout(() => {
          container.remove();
          resolve(result);
        }, 200);
      };

      const confirmBtn = document.getElementById("petvitals-swal-confirm-btn");
      const cancelBtn = document.getElementById("petvitals-swal-cancel-btn");

      if (confirmBtn) {
        confirmBtn.addEventListener("click", () => closeConfirm(true));
      }
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => closeConfirm(false));
      }

      container.addEventListener("click", (e) => {
        if (e.target === container) {
          closeConfirm(false);
        }
      });
    });
  },
};

export default Swal;