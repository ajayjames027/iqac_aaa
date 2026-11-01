// IQAC AAA 2026-2027 - Application Controller & Coordinator

class App {
  constructor() {
    this.currentView = 'dashboard'; // default to dashboard
  }

  async init() {
    // Initialize components
    window.formBuilder = new FormBuilder('form-container');
    window.dashboardRenderer = new DashboardRenderer('dashboard-container');
    window.adminDashboard = new AdminDashboard('admin-container');
    window.attributeFilterHub = new AttributeFilterHub('filter-container');

    // Subscribe to store updates
    window.dataStore.subscribe((data) => {
      this.onDataUpdated(data);
    });

    // Initialize Auth
    if (window.authManager) {
      window.authManager.init();
      window.authManager.subscribe((user) => {
        this.onAuthChanged(user);
      });
    }

    // Load initial data
    await window.dataStore.init();

    // Setup Department Dropdown
    this.refreshDeptDropdown();

    // Default view: if admin, open Admin Dashboard; else open Department Attributes Hub
    if (window.authManager && window.authManager.isAdmin()) {
      this.switchView('admin');
    } else {
      this.switchView('form');
    }
  }

  onAuthChanged(user) {
    this.refreshDeptDropdown();
    if (user && user.role === 'admin') {
      this.switchView('admin');
    } else if (user && user.role === 'department') {
      if (user.department_name) {
        window.dataStore.switchDepartment(user.department_name);
      }
      this.switchView('form');
    }
  }

  refreshDeptDropdown() {
    const select = document.getElementById('dept-switcher-select');
    if (!select) return;

    const list = window.dataStore.getDepartmentList();
    const active = window.dataStore.activeDepartment;

    select.innerHTML = list.map(d => `
      <option value="${d}" ${d === active ? 'selected' : ''}>${d}</option>
    `).join('') + `<option value="__NEW__">+ Add New Department...</option>`;
  }

  async onDeptChanged(deptName) {
    if (deptName === '__NEW__') {
      const newName = await window.showPromptDialog('Enter New Department Name (e.g. PG & Research Department of Physics):', '', 'Add New Department', { placeholder: 'e.g. PG & Research Department of Physics', confirmText: 'Add Department' });
      if (newName && newName.trim()) {
        window.dataStore.switchDepartment(newName.trim());
        this.refreshDeptDropdown();
        this.switchView('form');
      } else {
        this.refreshDeptDropdown();
      }
      return;
    }
    window.dataStore.switchDepartment(deptName);
  }

  onDataUpdated(data) {
    if (!data) return;

    // Update active department indicators
    const label = document.getElementById('active-dept-label');
    if (label && data.departmentInfo) {
      label.textContent = data.departmentInfo.departmentName || 'Department';
    }
    const topDept = document.getElementById('top-dept-name');
    if (topDept) {
      topDept.textContent = window.dataStore?.activeDepartment || 'Department';
    }
    const sidebarDl = document.getElementById('sidebar-deadline-text');
    if (sidebarDl && window.dataStore) {
      sidebarDl.textContent = window.dataStore.formatDeadlineForDisplay();
    }

    // Update active view
    switch (this.currentView) {
      case 'admin':
        if (window.adminDashboard) window.adminDashboard.loadData();
        break;
      case 'form':
        if (window.formBuilder) window.formBuilder.render(data);
        break;
      case 'dashboard':
        if (window.dashboardRenderer) window.dashboardRenderer.render(data);
        break;
      case 'filter':
        if (window.attributeFilterHub) window.attributeFilterHub.render();
        break;
    }
  }

  switchView(viewName) {
    this.currentView = viewName;

    // Hide all view containers
    const views = ['admin', 'form', 'dashboard', 'filter'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }

      // Update Nav Buttons for Palette Theme Sidebar
      const btn = document.getElementById(`nav-btn-${v}`);
      if (btn) {
        if (v === viewName) {
          btn.classList.remove('text-slate-700', 'hover:text-[#26648E]', 'hover:bg-white', 'bg-white/80', 'border-slate-200');
          btn.classList.add('bg-[#26648E]', 'text-white', 'font-bold', 'shadow-md', 'shadow-[#26648E]/25', 'border-[#26648E]');
        } else {
          btn.classList.remove('bg-[#26648E]', 'text-white', 'font-bold', 'shadow-md', 'shadow-[#26648E]/25', 'border-[#26648E]', 'bg-blue-600');
          btn.classList.add('text-slate-700', 'hover:text-[#26648E]', 'hover:bg-white', 'bg-white/80', 'border', 'border-slate-200', 'shadow-2xs', 'font-semibold');
        }
      }
    });

    // Render active view
    this.onDataUpdated(window.dataStore.data);
  }

  showAdminTab() {
    this.switchView('admin');
  }

  showFormTab() {
    this.switchView('form');
  }

  showDashboardTab() {
    this.switchView('dashboard');
  }

  showAttributeWiseView(attrKey = 'all') {
    this.switchView('dashboard');
    if (window.dashboardRenderer) {
      window.dashboardRenderer.setAttributeFilter(attrKey);
    }
  }

  showPresentationTab(slideIndex = null) {
    this.switchView('presentation');
    if (slideIndex !== null && window.presentationMode) {
      window.presentationMode.goToSlide(slideIndex);
    }
  }

  showPanelTab() {
    this.switchView('panel');
  }

  showManageTab() {
    this.switchView('manage');
  }

  renderManageTab(data) {
    const container = document.getElementById('manage-container');
    if (!container) return;

    const list = window.dataStore.getDepartmentList();

    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="border-b border-slate-200 pb-3 mb-4">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i data-lucide="database" class="w-5 h-5 text-blue-600"></i>
              IQAC Data Management & Submission Hub
            </h2>
            <p class="text-xs text-slate-500 mt-1">
              Uniformity and time-saving: Export standardized JSON files, load sample data, or import department submissions.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 1. Sample Data Loader -->
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i>
                  1. Load Sample Demonstrations
                </h3>
                <p class="text-xs text-slate-500 mt-1">
                  Load pre-populated, realistic AAA audit data to test and preview all dashboard and presentation views instantly.
                </p>
              </div>
              <div class="space-y-2 pt-2">
                <button type="button" onclick="app.loadSampleData('cs')" class="w-full text-xs py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                  <i data-lucide="code" class="w-4 h-4"></i>
                  <span>Load Computer Science Sample</span>
                </button>
                <button type="button" onclick="app.loadSampleData('commerce')" class="w-full text-xs py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                  <i data-lucide="briefcase" class="w-4 h-4"></i>
                  <span>Load Commerce Sample</span>
                </button>
                <button type="button" onclick="app.loadBlankTemplate()" class="w-full text-xs py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <i data-lucide="file-plus" class="w-4 h-4"></i>
                  <span>New Blank Template</span>
                </button>
              </div>
            </div>

            <!-- 2. Export / Backup -->
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4 text-emerald-600"></i>
                  2. Export Department Data
                </h3>
                <p class="text-xs text-slate-500 mt-1">
                  Download the current department's audit data as a standardized JSON file to submit to IQAC or save offline.
                </p>
              </div>
              <div class="space-y-2 pt-2">
                <button type="button" onclick="window.dataStore.exportJSON()" class="w-full text-xs py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                  <i data-lucide="download-cloud" class="w-4 h-4"></i>
                  <span>Download Department JSON</span>
                </button>
                <button type="button" onclick="window.print()" class="w-full text-xs py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                  <i data-lucide="printer" class="w-4 h-4"></i>
                  <span>Print Dossier / Save PDF</span>
                </button>
              </div>
            </div>

            <!-- 3. Import Department Submission -->
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <i data-lucide="upload" class="w-4 h-4 text-purple-600"></i>
                  3. Import Department Submission
                </h3>
                <p class="text-xs text-slate-500 mt-1">
                  Upload a previously exported JSON file from any department coordinator or HOD to review.
                </p>
              </div>
              <div class="pt-2">
                <input type="file" id="import-file-input" accept=".json" onchange="app.handleFileImport(event)" class="hidden" />
                <button type="button" onclick="document.getElementById('import-file-input').click()" class="w-full text-xs py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                  <i data-lucide="folder-open" class="w-4 h-4"></i>
                  <span>Select JSON File to Import</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Saved Departments in Local Storage -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-3">
          <h3 class="text-sm font-bold text-slate-800">Departments Configured on this Device</h3>
          <div class="divide-y divide-slate-100 text-xs">
            ${list.map(d => `
              <div class="py-2.5 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i data-lucide="building" class="w-4 h-4 text-slate-400"></i>
                  <span class="font-medium text-slate-800">${d}</span>
                  ${d === window.dataStore.activeDepartment ? '<span class="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold">Active</span>' : ''}
                </div>
                <div class="flex items-center gap-2">
                  <button type="button" onclick="app.onDeptChanged('${d}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium transition">
                    Switch To
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  async loadSampleData(sampleType) {
    const success = await window.dataStore.loadSample(sampleType);
    if (success) {
      this.refreshDeptDropdown();
      alert(`Loaded sample data for ${sampleType.toUpperCase()} department.`);
      this.switchView('dashboard');
    }
  }

  async loadBlankTemplate() {
    await window.dataStore.loadBlankTemplate();
    this.refreshDeptDropdown();
    this.switchView('form');
  }

  handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const res = window.dataStore.importJSON(content);
      if (res.success) {
        this.refreshDeptDropdown();
        alert('Department data imported successfully!');
        this.switchView('dashboard');
      } else {
        alert('Import Error: ' + res.error);
      }
    };
    reader.readAsText(file);
  }
  toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const toggleText = document.getElementById('sidebar-toggle-text');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    if (!sidebar) return;

    const isHidden = sidebar.classList.contains('hidden');
    if (isHidden) {
      sidebar.classList.remove('hidden');
      if (toggleText) toggleText.textContent = 'Hide Menu';
      if (toggleIcon) toggleIcon.setAttribute('data-lucide', 'panel-left-close');
    } else {
      sidebar.classList.add('hidden');
      if (toggleText) toggleText.textContent = 'Show Menu';
      if (toggleIcon) toggleIcon.setAttribute('data-lucide', 'panel-left-open');
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }
}

// Global App Instance
window.app = new App();
window.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
