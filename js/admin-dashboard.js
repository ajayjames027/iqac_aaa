// IQAC AAA 2026-2027 - Central Admin Dashboard & Meeting Control Hub

class AdminDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.departments = [];
    this.overview = {};
    this.statusFilter = 'all';
  }

  async loadData() {
    try {
      const resp = await fetch('api/departments.php');
      if (resp.ok) {
        const result = await resp.json();
        if (result.success) {
          this.departments = result.departments || [];
          this.overview = result.overview || {};
          this.render();
          return;
        }
      }
    } catch (e) {
      console.warn('API departments fetch failed, using local simulation:', e);
    }

    // Local simulation fallback
    this.departments = [
      {
        id: 1,
        code: 'cs',
        name: 'PG & Research Department of Computer Science',
        school: 'School of Computing Sciences',
        hod_name: 'Dr. S. Albert Rabara',
        status: 'submitted',
        audit_date: '2026-11-15',
        is_locked: false,
        last_updated: '2026-10-29 18:30:00',
        metrics: { publications: 44, grants_lakhs: 28.00, patents: 2, vac_cc: 4, mooc_pct: '92.4%' },
        evaluation: { grade: 'A++', score: 97.5 }
      },
      {
        id: 2,
        code: 'commerce',
        name: 'PG & Research Department of Commerce',
        school: 'School of Management Studies',
        hod_name: 'Dr. F. R. Alexander Pravin Durai',
        status: 'in_progress',
        audit_date: '2026-11-16',
        is_locked: false,
        last_updated: '2026-10-29 17:15:00',
        metrics: { publications: 31, grants_lakhs: 14.50, patents: 0, vac_cc: 4, mooc_pct: '86.2%' },
        evaluation: { grade: 'A+', score: 88.0 }
      },
      {
        id: 3,
        code: 'physics',
        name: 'PG & Research Department of Physics',
        school: 'School of Physical Sciences',
        hod_name: 'Dr. N. Lawrence',
        status: 'in_progress',
        audit_date: '2026-11-17',
        is_locked: false,
        last_updated: '2026-10-28 14:20:00',
        metrics: { publications: 38, grants_lakhs: 35.00, patents: 1, vac_cc: 2, mooc_pct: '79.5%' },
        evaluation: { grade: null, score: null }
      },
      {
        id: 4,
        code: 'chemistry',
        name: 'PG & Research Department of Chemistry',
        school: 'School of Chemical Sciences',
        hod_name: 'Dr. A. Rose Venis',
        status: 'draft',
        audit_date: '2026-11-18',
        is_locked: false,
        last_updated: '2026-10-27 11:00:00',
        metrics: { publications: 26, grants_lakhs: 18.20, patents: 1, vac_cc: 3, mooc_pct: '74.0%' },
        evaluation: { grade: null, score: null }
      },
      {
        id: 5,
        code: 'maths',
        name: 'PG & Research Department of Mathematics',
        school: 'School of Computing Sciences',
        hod_name: 'Dr. Y. Dominic',
        status: 'in_progress',
        audit_date: '2026-11-19',
        is_locked: false,
        last_updated: '2026-10-29 09:40:00',
        metrics: { publications: 29, grants_lakhs: 8.50, patents: 0, vac_cc: 2, mooc_pct: '88.0%' },
        evaluation: { grade: null, score: null }
      },
      {
        id: 6,
        code: 'english',
        name: 'PG & Research Department of English',
        school: 'School of Languages and Culture',
        hod_name: 'Dr. V. L. Jayapaul',
        status: 'draft',
        audit_date: '2026-11-20',
        is_locked: false,
        last_updated: '2026-10-26 16:00:00',
        metrics: { publications: 14, grants_lakhs: 4.20, patents: 0, vac_cc: 3, mooc_pct: '81.5%' },
        evaluation: { grade: null, score: null }
      },
      {
        id: 7,
        code: 'bba',
        name: 'Department of Business Administration (BBA)',
        school: 'School of Management Studies',
        hod_name: 'Dr. P. Bastin Jerome',
        status: 'draft',
        audit_date: '2026-11-21',
        is_locked: false,
        last_updated: '2026-10-25 15:30:00',
        metrics: { publications: 18, grants_lakhs: 6.00, patents: 0, vac_cc: 2, mooc_pct: '84.0%' },
        evaluation: { grade: null, score: null }
      },
      {
        id: 8,
        code: 'botany',
        name: 'PG & Research Department of Botany',
        school: 'School of Biological Sciences',
        hod_name: 'Dr. S. Sahaya Sathish',
        status: 'draft',
        audit_date: '2026-11-22',
        is_locked: false,
        last_updated: '2026-10-24 10:10:00',
        metrics: { publications: 22, grants_lakhs: 16.80, patents: 0, vac_cc: 2, mooc_pct: '76.0%' },
        evaluation: { grade: null, score: null }
      }
    ];

    this.overview = {
      total_departments: 8,
      submitted_count: 1,
      in_progress_count: 3,
      draft_count: 4,
      total_publications: 222,
      total_grants_lakhs: 126.70,
      total_patents: 4,
      total_vac_cc: 22
    };

    this.render();
  }

  setStatusFilter(status) {
    this.statusFilter = status;
    this.render();
  }

  render() {
    if (!this.container) return;

    const filteredDepts = this.departments.filter(d => {
      if (this.statusFilter === 'all') return true;
      return d.status === this.statusFilter;
    });

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- Admin Central Header -->
        <div class="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 uppercase tracking-wide">
                IQAC Central Admin Console
              </span>
              <span class="text-xs text-blue-200">St. Joseph's College (Autonomous)</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-black tracking-tight">
              Annual Academic Audit (AAA) 2026-2027 Dashboard
            </h1>
            <p class="text-xs text-blue-200 mt-1">
              Consolidated departmental monitoring, review submission tracking, and 1-click meeting presentation controls.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="adminDashboard.openAgendaConfigModal()" class="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5 whitespace-nowrap">
              <i data-lucide="sliders" class="w-4 h-4"></i>
              <span>Meeting Agenda & Questions</span>
              <span id="admin-agenda-pill" class="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white">
                ${window.dataStore ? window.dataStore.getAgendaStats().activeAttributes + '/' + window.dataStore.getAgendaStats().totalAttributes + ' Attrs' : 'All Active'}
              </span>
            </button>
            <button type="button" onclick="adminDashboard.showAddDeptModal()" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5 whitespace-nowrap">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Add Department</span>
            </button>
            <button type="button" onclick="adminDashboard.loadData()" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs transition flex items-center gap-1.5 whitespace-nowrap border border-slate-700">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <!-- 4 Consolidated College Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-blue-600">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Departments Progress</span>
            <div class="text-2xl font-black text-slate-800 mt-1">
              ${this.overview.submitted_count || 1} <span class="text-xs font-semibold text-slate-400">/ ${this.departments.length} Submitted</span>
            </div>
            <p class="text-[10px] text-slate-500 mt-1">${this.overview.in_progress_count || 3} in progress | ${(this.departments.length - (this.overview.submitted_count||1) - (this.overview.in_progress_count||3))} draft</p>
          </div>

          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-emerald-600">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">College-wide Grants</span>
            <div class="text-2xl font-black text-slate-800 mt-1">
              ₹ ${this.overview.total_grants_lakhs || '126.70'} <span class="text-xs font-semibold text-slate-400">Lakhs</span>
            </div>
            <p class="text-[10px] text-emerald-600 font-semibold mt-1">External + Management + Seed</p>
          </div>

          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-purple-600">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Research Papers</span>
            <div class="text-2xl font-black text-slate-800 mt-1">
              ${this.overview.total_publications || 222}
            </div>
            <p class="text-[10px] text-purple-600 font-semibold mt-1">Scopus & Web of Science Indexed</p>
          </div>

          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-amber-500">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total IPR & Patents</span>
            <div class="text-2xl font-black text-slate-800 mt-1">
              ${this.overview.total_patents || 4}
            </div>
            <p class="text-[10px] text-amber-600 font-semibold mt-1">Indian Patents Granted & Published</p>
          </div>
        </div>

        <!-- Meeting Agenda Status Banner -->
        ${(() => {
          const stats = window.dataStore ? window.dataStore.getAgendaStats() : { isFiltered: false, activeAttributes: 11, totalAttributes: 11, activeQuestions: 38, totalQuestions: 38 };
          if (!stats.isFiltered) {
            return `
              <div class="bg-purple-50 border border-purple-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-950">
                <div class="flex items-center gap-2.5">
                  <span class="p-2 bg-purple-600 text-white rounded-lg shadow-sm">
                    <i data-lucide="layers" class="w-4 h-4"></i>
                  </span>
                  <div>
                    <strong class="font-bold text-sm text-purple-900">Full Academic Audit Active (All 10 Attributes • ${stats.totalQuestions} Questions)</strong>
                    <p class="text-[11px] text-purple-700 mt-0.5">All questions across 10 Attributes are currently displayed in departmental dashboards and 60-minute presentations.</p>
                  </div>
                </div>
                <button type="button" onclick="adminDashboard.openAgendaConfigModal()" class="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition text-xs shadow-sm whitespace-nowrap self-start sm:self-center">
                  Configure Agenda
                </button>
              </div>
            `;
          }
          return `
            <div class="bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-sm">
              <div class="flex items-center gap-2.5">
                <span class="p-2 bg-amber-500 text-white rounded-lg shadow-sm">
                  <i data-lucide="sliders" class="w-4 h-4"></i>
                </span>
                <div>
                  <strong class="font-bold text-sm text-amber-900">Custom Agenda Active: ${stats.activeAttributes} of ${stats.totalAttributes} Attributes (${stats.activeQuestions} of ${stats.totalQuestions} Questions)</strong>
                  <p class="text-[11px] text-amber-800 mt-0.5">Preset: <span class="uppercase font-bold text-amber-900">${stats.preset}</span>. Only selected questions will appear in the executive dashboard and presentation mode.</p>
                </div>
              </div>
              <div class="flex items-center gap-2 self-start sm:self-center">
                <button type="button" onclick="adminDashboard.selectAgendaPreset('all')" class="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold rounded-lg transition text-xs whitespace-nowrap">
                  Reset to All
                </button>
                <button type="button" onclick="adminDashboard.openAgendaConfigModal()" class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition text-xs shadow-sm whitespace-nowrap">
                  Edit Selection
                </button>
              </div>
            </div>
          `;
        })()}

        <!-- Filter Pills & Status Tabs -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
            <span class="text-slate-400 font-bold uppercase text-[10px] mr-2">Filter Status:</span>
            <button type="button" onclick="adminDashboard.setStatusFilter('all')" class="px-3 py-1 rounded-lg transition ${this.statusFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              All (${this.departments.length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('submitted')" class="px-3 py-1 rounded-lg transition ${this.statusFilter === 'submitted' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              Submitted (${this.departments.filter(d=>d.status==='submitted').length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('in_progress')" class="px-3 py-1 rounded-lg transition ${this.statusFilter === 'in_progress' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              In Progress (${this.departments.filter(d=>d.status==='in_progress').length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('draft')" class="px-3 py-1 rounded-lg transition ${this.statusFilter === 'draft' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              Draft (${this.departments.filter(d=>d.status==='draft').length})
            </button>
          </div>

          <div class="text-xs text-slate-500">
            Showing <strong>${filteredDepts.length}</strong> departments
          </div>
        </div>

        <!-- Department Cards Grid for AAA Meetings -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b pb-2">
            <div>
              <h2 class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="presentation" class="w-4 h-4 text-purple-600"></i>
                Departmental Audit Presentations (60-Min Presentation Plan)
              </h2>
              <p class="text-[11px] text-slate-500">Click <strong>"Launch Meeting (60m)"</strong> to open the full presentation deck on the projector for that department.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4">
            ${filteredDepts.map(dept => this.renderDeptCard(dept)).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  renderDeptCard(dept) {
    const statusBadges = {
      submitted: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Submitted to IQAC</span>',
      in_progress: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">⏳ In Progress</span>',
      draft: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300">📝 Draft</span>',
      audited: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">🎓 Audited</span>'
    };

    return `
      <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-blue-400 transition space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-slate-900">${dept.name}</h3>
              ${statusBadges[dept.status] || statusBadges.draft}
              ${dept.is_locked ? '<span class="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">Locked</span>' : ''}
              ${dept.evaluation?.grade ? `<span class="px-2 py-0.5 bg-purple-100 text-purple-900 font-black text-xs rounded border border-purple-200">Grade: ${dept.evaluation.grade}</span>` : ''}
            </div>
            <p class="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>School:</strong> ${dept.school}</span>
              <span><strong>HOD:</strong> ${dept.hod_name}</span>
              <span><strong>Scheduled Audit:</strong> ${dept.audit_date || 'TBD'}</span>
            </p>
          </div>

          <!-- Quick Metrics Badges -->
          <div class="flex items-center gap-2 text-center text-xs">
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-200 min-w-[70px]">
              <span class="text-[10px] text-slate-400 block font-semibold">Pubs</span>
              <span class="font-black text-blue-700">${dept.metrics?.publications || 0}</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-200 min-w-[70px]">
              <span class="text-[10px] text-slate-400 block font-semibold">Grants</span>
              <span class="font-black text-emerald-700">₹ ${dept.metrics?.grants_lakhs || '0'}L</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-200 min-w-[70px]">
              <span class="text-[10px] text-slate-400 block font-semibold">MOOC %</span>
              <span class="font-black text-purple-700">${dept.metrics?.mooc_pct || 'N/A'}</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-200 min-w-[70px]">
              <span class="text-[10px] text-slate-400 block font-semibold">Patents</span>
              <span class="font-black text-amber-700">${dept.metrics?.patents || 0}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons for the Meeting -->
        <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <!-- 1-Click Launch Meeting Presentation -->
            <button type="button" onclick="adminDashboard.launchMeetingPresentation('${dept.name}', ${dept.id})" class="px-3.5 py-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5">
              <i data-lucide="play-circle" class="w-4 h-4"></i>
              <span>Launch Meeting (60m Presentation)</span>
            </button>

            <!-- View 15m Dashboard -->
            <button type="button" onclick="adminDashboard.viewDepartmentDashboard('${dept.name}', ${dept.id})" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs rounded-lg transition flex items-center gap-1">
              <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i>
              <span>15m Dashboard</span>
            </button>

            <!-- Review / Edit Form -->
            <button type="button" onclick="adminDashboard.reviewDepartmentForm('${dept.name}', ${dept.id})" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition flex items-center gap-1">
              <i data-lucide="edit" class="w-3.5 h-3.5"></i>
              <span>Review Form</span>
            </button>

            <!-- Score in Panel Rubric -->
            <button type="button" onclick="adminDashboard.auditDepartment('${dept.name}', ${dept.id})" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-lg transition flex items-center gap-1">
              <i data-lucide="clipboard-check" class="w-3.5 h-3.5"></i>
              <span>Score & Grade</span>
            </button>
          </div>

          <div class="flex items-center gap-1">
            <button type="button" onclick="adminDashboard.toggleLock(${dept.id}, ${!dept.is_locked})" class="px-2 py-1 text-slate-500 hover:text-slate-800 text-[11px] rounded transition flex items-center gap-1">
              <i data-lucide="${dept.is_locked ? 'unlock' : 'lock'}" class="w-3.5 h-3.5"></i>
              <span>${dept.is_locked ? 'Unlock' : 'Lock'}</span>
            </button>
            <span class="text-slate-300">|</span>
            <span class="text-[11px] text-slate-400">User: <code class="text-blue-600 font-bold">${dept.code}</code></span>
          </div>
        </div>
      </div>
    `;
  }

  async launchMeetingPresentation(deptName, deptId) {
    await window.dataStore.switchDepartment(deptName);
    window.app.switchView('presentation');
    if (window.presentationMode) {
      window.presentationMode.goToSlide(0);
      window.presentationMode.setPhase(1);
    }
  }

  async viewDepartmentDashboard(deptName, deptId) {
    await window.dataStore.switchDepartment(deptName);
    window.app.switchView('dashboard');
  }

  async reviewDepartmentForm(deptName, deptId) {
    await window.dataStore.switchDepartment(deptName);
    window.app.switchView('form');
  }

  async auditDepartment(deptName, deptId) {
    await window.dataStore.switchDepartment(deptName);
    window.app.switchView('panel');
  }

  async toggleLock(deptId, lockStatus) {
    try {
      await fetch('api/status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ department_id: deptId, is_locked: lockStatus ? 1 : 0 })
      });
    } catch (e) {}

    const dept = this.departments.find(d => d.id === deptId);
    if (dept) dept.is_locked = lockStatus;
    this.render();
  }

  showAddDeptModal() {
    const modal = document.createElement('div');
    modal.id = 'add-dept-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        <div class="bg-gradient-to-r from-blue-900 to-indigo-900 p-5 text-white flex justify-between items-center">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4 text-amber-400"></i>
            Add New Academic Department
          </h3>
          <button type="button" onclick="document.getElementById('add-dept-modal').remove()" class="text-slate-300 hover:text-white">&times;</button>
        </div>

        <form onsubmit="adminDashboard.handleAddDeptSubmit(event)" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Department Name *</label>
            <input type="text" id="new-dept-name" required placeholder="e.g. PG & Research Department of History" class="w-full p-2 border border-slate-300 rounded-lg" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Unique Code / Username *</label>
              <input type="text" id="new-dept-code" required placeholder="e.g. history" class="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">School</label>
              <input type="text" id="new-dept-school" placeholder="e.g. School of Humanities" class="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">HOD Name</label>
              <input type="text" id="new-dept-hod" placeholder="e.g. Dr. HOD Name" class="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Scheduled Audit Date</label>
              <input type="date" id="new-dept-date" class="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
          </div>

          <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-[11px]">
            <strong>Automatic Account Setup:</strong> A login username matching the code (e.g. <code>history</code>) and default password <code>history123</code> will be created for the HOD.
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="document.getElementById('add-dept-modal').remove()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow">Create Department & Account</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
  }

  async handleAddDeptSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('new-dept-name').value.trim();
    const code = document.getElementById('new-dept-code').value.trim().toLowerCase();
    const school = document.getElementById('new-dept-school').value.trim();
    const hod = document.getElementById('new-dept-hod').value.trim();
    const date = document.getElementById('new-dept-date').value;

    try {
      const resp = await fetch('api/departments.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code, school, hod_name: hod, audit_date: date })
      });
      if (resp.ok) {
        const res = await resp.json();
        alert(res.message || 'Department created successfully!');
      }
    } catch (e) {
      alert(`Department added locally! User account: '${code}' with password '${code}123'.`);
    }

    // Add to departments list
    this.departments.push({
      id: this.departments.length + 1,
      code,
      name,
      school,
      hod_name: hod,
      status: 'draft',
      audit_date: date,
      is_locked: false,
      metrics: { publications: 0, grants_lakhs: 0, patents: 0, vac_cc: 0, mooc_pct: 'N/A' },
      evaluation: { grade: null, score: null }
    });

    const m = document.getElementById('add-dept-modal');
    if (m) m.remove();
    this.render();
  }

  // --- Meeting Agenda & Question Configurator Modal ---
  openAgendaConfigModal() {
    let existing = document.getElementById('agenda-config-modal');
    if (existing) existing.remove();

    const config = window.dataStore.getMeetingAgendaConfig();
    const allMetadata = window.dataStore.getAllAttributesMetadata();

    const modal = document.createElement('div');
    modal.id = 'agenda-config-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full my-8 overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 p-5 text-white flex justify-between items-center flex-shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 uppercase tracking-wide">
                IQAC Central Admin Meeting Controller
              </span>
            </div>
            <h3 class="text-lg font-black mt-1 flex items-center gap-2">
              <i data-lucide="sliders" class="w-5 h-5 text-purple-400"></i>
              Audit Meeting Agenda & Question Configurator
            </h3>
            <p class="text-xs text-purple-200 mt-0.5">
              Select which attributes and questions to display on the departmental dashboard and 60-min meeting presentation.
            </p>
          </div>
          <button type="button" onclick="adminDashboard.closeAgendaConfigModal()" class="text-slate-300 hover:text-white p-2 text-xl font-bold">&times;</button>
        </div>

        <!-- Presets Bar -->
        <div class="bg-slate-50 border-b border-slate-200 p-4 flex-shrink-0 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Quick Meeting Presets:</span>
            <div class="flex gap-2">
              <button type="button" onclick="adminDashboard.selectAllQuestions(true)" class="text-[11px] text-blue-600 font-bold hover:underline">Select All</button>
              <span class="text-slate-300">|</span>
              <button type="button" onclick="adminDashboard.selectAllQuestions(false)" class="text-[11px] text-rose-600 font-bold hover:underline">Clear All</button>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 text-xs">
            <button type="button" onclick="adminDashboard.selectAgendaPreset('all')" class="px-3 py-1.5 rounded-lg border font-semibold transition ${config.preset === 'all' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">
              🌟 All 10 Attributes (Complete Audit)
            </button>
            <button type="button" onclick="adminDashboard.selectAgendaPreset('executive_15m')" class="px-3 py-1.5 rounded-lg border font-semibold transition ${config.preset === 'executive_15m' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">
              ⏱️ Executive 15-Min Meeting
            </button>
            <button type="button" onclick="adminDashboard.selectAgendaPreset('research_ipr')" class="px-3 py-1.5 rounded-lg border font-semibold transition ${config.preset === 'research_ipr' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">
              🔬 Research & IPR Focus
            </button>
            <button type="button" onclick="adminDashboard.selectAgendaPreset('curriculum_teaching')" class="px-3 py-1.5 rounded-lg border font-semibold transition ${config.preset === 'curriculum_teaching' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">
              📚 Curriculum & Teaching
            </button>
            <button type="button" onclick="adminDashboard.selectAgendaPreset('student_progression')" class="px-3 py-1.5 rounded-lg border font-semibold transition ${config.preset === 'student_progression' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">
              🎓 Student Outcomes & CSR
            </button>
          </div>
        </div>

        <!-- Body: Accordion of Attributes & Questions -->
        <div id="agenda-attributes-list" class="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          ${allMetadata.map(attr => {
            const isAttrChecked = config.enabledAttributes ? config.enabledAttributes[attr.id] !== false : true;
            return `
              <div class="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <!-- Attribute Master Header -->
                <div class="bg-slate-100/80 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" id="attr-chk-${attr.id}" ${isAttrChecked ? 'checked' : ''} onchange="adminDashboard.toggleAttributeAgenda('${attr.id}', this.checked)" class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer" />
                    <div>
                      <label for="attr-chk-${attr.id}" class="font-bold text-slate-900 cursor-pointer text-xs sm:text-sm flex items-center gap-2">
                        <span>${attr.name}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase">${attr.code}</span>
                      </label>
                      <span class="text-[11px] text-slate-500">${attr.questions.length} Questions • ${attr.category}</span>
                    </div>
                  </div>
                  <span class="text-[11px] font-semibold text-slate-400">
                    <span id="attr-count-${attr.id}">${attr.questions.filter(q => (config.enabledQuestions ? config.enabledQuestions[q.id] !== false : true) && isAttrChecked).length}</span> / ${attr.questions.length} Active
                  </span>
                </div>

                <!-- Sub-questions Grid -->
                <div class="p-3 bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${attr.questions.map(q => {
                    const isQChecked = isAttrChecked && (config.enabledQuestions ? config.enabledQuestions[q.id] !== false : true);
                    return `
                      <label class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-purple-50/50 transition cursor-pointer border border-transparent hover:border-purple-200">
                        <input type="checkbox" id="q-chk-${q.id}" data-attr="${attr.id}" ${isQChecked ? 'checked' : ''} onchange="adminDashboard.toggleQuestionAgenda('${attr.id}', '${q.id}', this.checked)" class="q-checkbox mt-0.5 w-3.5 h-3.5 rounded text-purple-600 focus:ring-purple-500 cursor-pointer" />
                        <div>
                          <span class="font-bold text-slate-800 text-[11px] block">
                            <span class="text-purple-700 font-mono text-[10px] mr-1">[${q.code}]</span>${q.label}
                          </span>
                        </div>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Footer -->
        <div class="bg-slate-50 border-t border-slate-200 p-4 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="text-slate-600" id="agenda-stats-text">
            ${(() => {
              const stats = window.dataStore.getAgendaStats();
              return `<strong>${stats.activeAttributes} of ${stats.totalAttributes} Attributes</strong> (${stats.activeQuestions} of ${stats.totalQuestions} Questions) enabled for presentation meeting.`;
            })()}
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="adminDashboard.resetAgendaConfig()" class="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition">
              Reset All
            </button>
            <button type="button" onclick="adminDashboard.saveAndApplyAgendaConfig()" class="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md transition flex items-center gap-1.5">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Apply to Meeting & Dashboards</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
  }

  closeAgendaConfigModal() {
    const modal = document.getElementById('agenda-config-modal');
    if (modal) modal.remove();
  }

  toggleAttributeAgenda(attrId, isChecked) {
    const checkboxes = document.querySelectorAll(`input[data-attr="${attrId}"]`);
    checkboxes.forEach(cb => { cb.checked = isChecked; });
    this.updateAgendaStatsDisplay();
  }

  toggleQuestionAgenda(attrId, qId, isChecked) {
    if (isChecked) {
      const attrChk = document.getElementById(`attr-chk-${attrId}`);
      if (attrChk) attrChk.checked = true;
    }
    this.updateAgendaStatsDisplay();
  }

  selectAllQuestions(enableAll) {
    const attrCheckboxes = document.querySelectorAll('input[id^="attr-chk-"]');
    attrCheckboxes.forEach(cb => { cb.checked = enableAll; });
    const qCheckboxes = document.querySelectorAll('.q-checkbox');
    qCheckboxes.forEach(cb => { cb.checked = enableAll; });
    this.updateAgendaStatsDisplay();
  }

  selectAgendaPreset(presetKey) {
    window.dataStore.applyAgendaPreset(presetKey);
    this.closeAgendaConfigModal();
    this.render();
    if (window.app && window.app.currentView === 'dashboard') {
      window.app.renderCurrentView();
    }
  }

  updateAgendaStatsDisplay() {
    const allMetadata = window.dataStore.getAllAttributesMetadata();
    let activeAttrs = 0;
    let activeQuestions = 0;
    let totalQuestions = 0;

    allMetadata.forEach(attr => {
      const attrChk = document.getElementById(`attr-chk-${attr.id}`);
      const isAttrOn = attrChk ? attrChk.checked : false;
      if (isAttrOn) activeAttrs++;

      let countInAttr = 0;
      attr.questions.forEach(q => {
        totalQuestions++;
        const qChk = document.getElementById(`q-chk-${q.id}`);
        if (isAttrOn && qChk && qChk.checked) {
          activeQuestions++;
          countInAttr++;
        }
      });
      const cntEl = document.getElementById(`attr-count-${attr.id}`);
      if (cntEl) cntEl.textContent = countInAttr;
    });

    const statsEl = document.getElementById('agenda-stats-text');
    if (statsEl) {
      statsEl.innerHTML = `<strong>${activeAttrs} of ${allMetadata.length} Attributes</strong> (${activeQuestions} of ${totalQuestions} Questions) enabled for presentation meeting.`;
    }
  }

  saveAndApplyAgendaConfig() {
    const allMetadata = window.dataStore.getAllAttributesMetadata();
    const config = {
      preset: 'custom',
      enabledAttributes: {},
      enabledQuestions: {}
    };

    allMetadata.forEach(attr => {
      const attrChk = document.getElementById(`attr-chk-${attr.id}`);
      const isAttrOn = attrChk ? attrChk.checked : false;
      config.enabledAttributes[attr.id] = isAttrOn;

      attr.questions.forEach(q => {
        const qChk = document.getElementById(`q-chk-${q.id}`);
        config.enabledQuestions[q.id] = isAttrOn && (qChk ? qChk.checked : false);
      });
    });

    window.dataStore.saveMeetingAgendaConfig(config);
    this.closeAgendaConfigModal();
    this.render();

    alert(`Meeting Agenda Updated!\nOnly the ${window.dataStore.getAgendaStats().activeAttributes} selected attributes and their questions will now be displayed during the meeting presentation and executive dashboard.`);
    
    if (window.app) {
      window.app.renderCurrentView();
    }
  }

  resetAgendaConfig() {
    window.dataStore.applyAgendaPreset('all');
    this.closeAgendaConfigModal();
    this.render();
    if (window.app) {
      window.app.renderCurrentView();
    }
  }
}

window.adminDashboard = new AdminDashboard('admin-container');
