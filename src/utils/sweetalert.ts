/**
 * PetVitals Custom SweetAlert2 Dialog System
 * Provides animated, modern modal alerts without external npm dependency issues.
 */

export type AlertIcon = "success" | "error" | "warning" | "info";

export interface AlertOptions {
  title: string;
  text?: string;
  icon?: AlertIcon;
  confirmButtonText?: string;
  timer?: number;
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
      // Remove any existing sweet alert containers
      const existing = document.getElementById("petvitals-swal-container");
      if (existing) existing.remove();

      // Create container overlay
      const container = document.createElement("div");
      container.id = "petvitals-swal-container";
      container.className =
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200";

      // Select icon markup & color
      let iconMarkup = "";
      if (icon === "success") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        `;
      } else if (icon === "error") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-red-500/30 bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-400">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        `;
      } else if (icon === "warning") {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-amber-500/30 bg-amber-500/10 flex items-center justify-center mx-auto mb-4 text-amber-400">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        `;
      } else {
        iconMarkup = `
          <div class="w-16 h-16 rounded-full border-4 border-sky-500/30 bg-sky-500/10 flex items-center justify-center mx-auto mb-4 text-sky-400">
            <svg class="w-8 h-8 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
      }

      // Dialog box HTML
      container.innerHTML = `
        <div class="w-full max-w-sm rounded-3xl bg-[#0f1422] border border-white/15 p-7 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          ${iconMarkup}
          <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
          ${text ? `<p class="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">${text}</p>` : `<div class="mb-5"></div>`}
          <button id="petvitals-swal-confirm-btn" class="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 text-slate-950 hover:from-sky-300 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all cursor-pointer">
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

      // Backdrop click
      container.addEventListener("click", (e) => {
        if (e.target === container) {
          closeAlert();
        }
      });

      // Optional timer
      if (timer && timer > 0) {
        setTimeout(closeAlert, timer);
      }
    });
  },
};

export default Swal;

