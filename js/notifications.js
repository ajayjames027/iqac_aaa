/**
 * Modern Dynamic Toast & Modal Popup Alert System
 * Aligned with the Institutional Academic Color Palette:
 * Primary Blue (#26648E), Cerulean (#4F8FC0), Aqua (#53D2DC), Peach (#FFE3B3)
 */
class NotificationSystem {
  constructor() {
    this.container = null;
    this.modalContainer = null;
    this.init();
  }

  init() {
    if (document.getElementById('toast-notification-container')) return;

    // Fixed Toast Notification Container (Top-right)
    this.container = document.createElement('div');
    this.container.id = 'toast-notification-container';
    this.container.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3';
    document.body.appendChild(this.container);

    // Modal Alert Container (Centered popup)
    this.modalContainer = document.createElement('div');
    this.modalContainer.id = 'dynamic-alert-modal-container';
    this.modalContainer.className = 'fixed inset-0 z-[10000] hidden items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 transition-all duration-200';
    document.body.appendChild(this.modalContainer);

    // Modern wrapper around browser alert
    const self = this;
    window._nativeAlert = window.alert;
    window.alert = function(msg) {
      if (typeof msg === 'string' && (msg.includes('\n') || msg.length > 80)) {
        self.showModal(msg);
      } else {
        self.showToast(msg, 'info');
      }
    };
  }

  /**
   * Display a modern sliding toast notification
   * @param {string} message - Message text to display
   * @param {'success'|'error'|'warning'|'info'} type - Toast type
   * @param {number} duration - Auto-dismiss timeout in ms (default: 3500)
   * @param {string} title - Optional title heading
   */
  showToast(message, type = 'success', duration = 3500, title = '') {
    if (!this.container) this.init();

    // Map config by type
    const config = {
      success: {
        title: title || 'Success',
        iconName: 'check-circle-2',
        barColor: 'bg-[#26648E]',
        borderColor: 'border-[#4F8FC0]/35',
        iconBg: 'bg-[#53D2DC]/20',
        iconColor: 'text-[#26648E]',
        titleColor: 'text-[#26648E]'
      },
      error: {
        title: title || 'Notice',
        iconName: 'alert-circle',
        barColor: 'bg-rose-600',
        borderColor: 'border-rose-200',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
        titleColor: 'text-rose-900'
      },
      warning: {
        title: title || 'Warning',
        iconName: 'alert-triangle',
        barColor: 'bg-amber-500',
        borderColor: 'border-[#fedba0]',
        iconBg: 'bg-[#FFE3B3]',
        iconColor: 'text-[#26648E]',
        titleColor: 'text-[#26648E]'
      },
      info: {
        title: title || 'Information',
        iconName: 'info',
        barColor: 'bg-[#4F8FC0]',
        borderColor: 'border-[#4F8FC0]/30',
        iconBg: 'bg-[#4F8FC0]/15',
        iconColor: 'text-[#26648E]',
        titleColor: 'text-[#26648E]'
      }
    }[type] || {
      title: title || 'Notification',
      iconName: 'bell',
      barColor: 'bg-[#26648E]',
      borderColor: 'border-slate-200',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
      titleColor: 'text-slate-900'
    };

    const toast = document.createElement('div');
    toast.className = `toast-item pointer-events-auto transform transition-all duration-300 ease-out translate-x-full opacity-0 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border ${config.borderColor} flex items-start gap-3 relative overflow-hidden group`;
    
    toast.innerHTML = `
      <div class="absolute left-0 top-0 bottom-0 w-1.5 ${config.barColor}"></div>
      <div class="w-9 h-9 rounded-xl ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0 shadow-2xs">
        <i data-lucide="${config.iconName}" class="w-5 h-5"></i>
      </div>
      <div class="flex-1 min-w-0 pr-5">
        <h4 class="text-xs font-black tracking-tight ${config.titleColor}">${config.title}</h4>
        <p class="text-xs text-slate-700 font-medium leading-relaxed mt-0.5 break-words">${message}</p>
      </div>
      <button type="button" class="toast-close-btn absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition" title="Dismiss">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
      <div class="absolute bottom-0 left-0 h-0.5 ${config.barColor}" style="animation: toastProgress ${duration}ms linear forwards; width: 100%;"></div>
    `;

    this.container.appendChild(toast);

    if (window.lucide) {
      lucide.createIcons({ root: toast });
    }

    // Trigger sliding entry animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    });

    const dismiss = () => {
      toast.classList.remove('translate-x-0', 'opacity-100');
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    };

    toast.querySelector('.toast-close-btn').addEventListener('click', dismiss);

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  }

  /**
   * Display a modern centered pop-up modal alert
   * @param {string} message - Message text
   * @param {string} title - Modal heading
   * @param {'info'|'success'|'warning'|'error'} type - Modal style
   * @param {Function} onConfirm - Optional confirmation callback
   */
  showModal(message, title = 'Audit Notification', type = 'info', onConfirm = null) {
    if (!this.modalContainer) this.init();

    const icons = {
      success: { icon: 'check-circle-2', bg: 'bg-[#53D2DC]/20', border: 'border-[#53D2DC]/40', color: 'text-[#26648E]' },
      error: { icon: 'alert-circle', bg: 'bg-rose-50', border: 'border-rose-200', color: 'text-rose-600' },
      warning: { icon: 'alert-triangle', bg: 'bg-[#FFE3B3]', border: 'border-[#fedba0]', color: 'text-[#26648E]' },
      info: { icon: 'info', bg: 'bg-[#4F8FC0]/15', border: 'border-[#4F8FC0]/30', color: 'text-[#26648E]' }
    }[type] || { icon: 'bell', bg: 'bg-blue-50', border: 'border-blue-200', color: 'text-[#26648E]' };

    this.modalContainer.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl border border-[#4F8FC0]/30 max-w-md w-full overflow-hidden animate-fadeIn p-6 space-y-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl ${icons.bg} ${icons.color} border ${icons.border} flex items-center justify-center shrink-0 shadow-sm">
            <i data-lucide="${icons.icon}" class="w-6 h-6"></i>
          </div>
          <div>
            <h3 class="text-base font-black text-[#26648E] tracking-tight leading-snug">${title || 'Notice'}</h3>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#4F8FC0]">IQAC Portal Alert</span>
          </div>
        </div>

        <div class="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 whitespace-pre-line max-h-60 overflow-y-auto">
          ${message}
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          ${onConfirm ? `
            <button type="button" id="modal-btn-cancel" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition">
              Cancel
            </button>
          ` : ''}
          <button type="button" id="modal-btn-confirm" class="px-5 py-2 bg-[#26648E] hover:bg-[#1b4b6d] text-white font-bold rounded-xl text-xs shadow-md shadow-[#26648E]/25 ring-2 ring-[#53D2DC]/50 transition">
            ${onConfirm ? 'Confirm' : 'Got It'}
          </button>
        </div>
      </div>
    `;

    this.modalContainer.classList.remove('hidden');
    this.modalContainer.classList.add('flex');

    if (window.lucide) {
      lucide.createIcons({ root: this.modalContainer });
    }

    const close = () => {
      this.modalContainer.classList.add('hidden');
      this.modalContainer.classList.remove('flex');
    };

    const confirmBtn = document.getElementById('modal-btn-confirm');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        close();
        if (typeof onConfirm === 'function') onConfirm();
      };
    }

    const cancelBtn = document.getElementById('modal-btn-cancel');
    if (cancelBtn) {
      cancelBtn.onclick = close;
    }
  }
}

// Global singleton instances
window.notificationSystem = new NotificationSystem();
window.showToast = function(msg, type = 'success', duration = 3500, title = '') {
  window.notificationSystem.showToast(msg, type, duration, title);
};
window.showModalAlert = function(msg, title = 'Notice', type = 'info', onConfirm = null) {
  window.notificationSystem.showModal(msg, title, type, onConfirm);
};
