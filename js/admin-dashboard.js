// IQAC AAA 2026-2027 - Central Admin Dashboard & Meeting Control Hub

class AdminDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.departments = [];
    this.overview = {};
    this.statusFilter = 'all';
    this.activeTab = 'sub_control'; // 'sub_control', 'overview', 'attribute_matrix', 'faculty_tracker'
    this.selectedAttributeForMatrix = 'att9'; // Default to Research
    this.facultySearchQuery = '';
    this.facultyDeptFilter = 'all';
    this.comparisonCharts = {};
  }

  async loadData() {
    try {
      const resp = await fetch('api/departments.php');
      if (resp.ok) {
        const result = await resp.json();
        if (result.success) {
          this.departments = result.departments || [];
          this.overview = result.overview || {};
          this.syncLocalLockStates();
          this.render();
          return;
        }
      }
    } catch (e) {
      console.warn('API departments fetch failed, using local simulation:', e);
    }

    // Local simulation with full 8 departments
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
        last_updated: '2026-10-30 11:30:00',
        metrics: { publications: 44, grants_lakhs: 28.00, patents: 2, vac_cc: 4, mooc_pct: '92.5%', scholars: 24, placement_pct: '85.2%', equipments_count: 4, equipments_lakhs: 32.50, library_books: 1850, library_footfall: 99, csr_events: 3, csr_funds_lakhs: 3.50 },
        evaluation: { grade: 'A++', score: 94.5 }
      },
      {
        id: 2,
        code: 'commerce',
        name: 'PG & Research Department of Commerce',
        school: 'School of Management Studies',
        hod_name: 'Dr. F. R. Alexander Pravin Durai',
        status: 'submitted',
        audit_date: '2026-11-16',
        is_locked: false,
        last_updated: '2026-10-30 10:15:00',
        metrics: { publications: 31, grants_lakhs: 14.50, patents: 0, vac_cc: 4, mooc_pct: '86.2%', scholars: 18, placement_pct: '88.5%', equipments_count: 2, equipments_lakhs: 8.20, library_books: 2400, library_footfall: 140, csr_events: 4, csr_funds_lakhs: 4.80 },
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
        last_updated: '2026-10-29 14:20:00',
        metrics: { publications: 38, grants_lakhs: 35.00, patents: 1, vac_cc: 2, mooc_pct: '79.5%', scholars: 22, placement_pct: '72.0%', equipments_count: 5, equipments_lakhs: 48.00, library_books: 1600, library_footfall: 75, csr_events: 2, csr_funds_lakhs: 2.10 },
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
        last_updated: '2026-10-28 11:00:00',
        metrics: { publications: 26, grants_lakhs: 18.20, patents: 1, vac_cc: 3, mooc_pct: '74.0%', scholars: 16, placement_pct: '70.5%', equipments_count: 3, equipments_lakhs: 22.50, library_books: 1350, library_footfall: 68, csr_events: 1, csr_funds_lakhs: 1.50 },
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
        metrics: { publications: 29, grants_lakhs: 8.50, patents: 0, vac_cc: 2, mooc_pct: '88.0%', scholars: 14, placement_pct: '78.0%', equipments_count: 2, equipments_lakhs: 6.40, library_books: 1900, library_footfall: 85, csr_events: 2, csr_funds_lakhs: 1.20 },
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
        last_updated: '2026-10-27 16:00:00',
        metrics: { publications: 14, grants_lakhs: 4.20, patents: 0, vac_cc: 3, mooc_pct: '81.5%', scholars: 12, placement_pct: '68.0%', equipments_count: 1, equipments_lakhs: 4.50, library_books: 3200, library_footfall: 165, csr_events: 3, csr_funds_lakhs: 2.00 },
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
        last_updated: '2026-10-26 15:30:00',
        metrics: { publications: 18, grants_lakhs: 6.00, patents: 0, vac_cc: 2, mooc_pct: '84.0%', scholars: 6, placement_pct: '82.5%', equipments_count: 1, equipments_lakhs: 5.00, library_books: 1400, library_footfall: 95, csr_events: 3, csr_funds_lakhs: 3.20 },
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
        last_updated: '2026-10-25 10:10:00',
        metrics: { publications: 22, grants_lakhs: 16.80, patents: 0, vac_cc: 2, mooc_pct: '76.0%', scholars: 15, placement_pct: '65.0%', equipments_count: 3, equipments_lakhs: 18.00, library_books: 1550, library_footfall: 70, csr_events: 2, csr_funds_lakhs: 2.50 },
        evaluation: { grade: null, score: null }
      }
    ];

    this.syncLocalLockStates();

    this.overview = {
      total_departments: this.departments.length,
      submitted_count: this.departments.filter(d => d.status === 'submitted' || d.status === 'approved').length,
      in_progress_count: this.departments.filter(d => d.status === 'in_progress').length,
      draft_count: this.departments.filter(d => d.status === 'draft').length,
      total_scholars: this.departments.reduce((s, d) => s + (d.metrics.scholars || 0), 0),
      total_publications: this.departments.reduce((s, d) => s + (d.metrics.publications || 0), 0),
      total_grants_lakhs: this.departments.reduce((s, d) => s + (Number(d.metrics.grants_lakhs) || 0), 0).toFixed(2),
      total_patents: this.departments.reduce((s, d) => s + (d.metrics.patents || 0), 0),
      total_vac_cc: this.departments.reduce((s, d) => s + (d.metrics.vac_cc || 0), 0),
      avg_placement_pct: (this.departments.reduce((s, d) => s + parseFloat(d.metrics.placement_pct || 0), 0) / this.departments.length).toFixed(1) + '%'
    };

    this.render();
  }

  syncLocalLockStates() {
    if (!window.dataStore) return;
    this.departments.forEach(dept => {
      const status = window.dataStore.getDepartmentSubmissionStatus(dept.name);
      if (status) {
        if (status.is_locked !== undefined) dept.is_locked = status.is_locked;
        if (status.status) dept.status = status.status;
      }
    });
  }

  switchAdminTab(tabKey) {
    this.activeTab = tabKey;
    this.render();
    if (tabKey === 'attribute_matrix') {
      setTimeout(() => this.renderAnalyticsCharts(), 50);
    }
  }

  setStatusFilter(status) {
    this.statusFilter = status;
    this.render();
  }

  toggleDeptLock(deptId) {
    const dept = this.departments.find(d => d.id === deptId);
    if (!dept) return;

    dept.is_locked = !dept.is_locked;
    if (window.dataStore) {
      window.dataStore.setDepartmentSubmissionStatus(dept.name, {
        is_locked: dept.is_locked,
        status: dept.is_locked ? 'locked' : (dept.status === 'locked' ? 'draft' : dept.status)
      });
    }

    // Call API if server exists
    try {
      fetch('api/status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ department_id: deptId, is_locked: dept.is_locked ? 1 : 0 })
      });
    } catch (e) {}

    this.render();
  }

  changeDeptStatus(deptId, newStatus) {
    const dept = this.departments.find(d => d.id === deptId);
    if (!dept) return;

    dept.status = newStatus;
    if (newStatus === 'locked') {
      dept.is_locked = true;
    } else if (newStatus === 'draft') {
      dept.is_locked = false;
    }

    if (window.dataStore) {
      window.dataStore.setDepartmentSubmissionStatus(dept.name, {
        status: newStatus,
        is_locked: dept.is_locked
      });
    }

    try {
      fetch('api/status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ department_id: deptId, status: newStatus, is_locked: dept.is_locked ? 1 : 0 })
      });
    } catch (e) {}

    this.render();
  }

  lockAllDepartments(lock = true) {
    this.departments.forEach(dept => {
      dept.is_locked = lock;
      if (lock && dept.status !== 'approved') dept.status = 'locked';
      if (!lock && dept.status === 'locked') dept.status = 'draft';
      if (window.dataStore) {
        window.dataStore.setDepartmentSubmissionStatus(dept.name, {
          is_locked: lock,
          status: dept.status
        });
      }
    });
    alert(lock ? 'All departmental submissions have been locked for audit review.' : 'All departmental submissions unlocked for data editing.');
    this.render();
  }

  launchMeetingForDept(deptName) {
    if (window.dataStore) {
      window.dataStore.switchDepartment(deptName);
    }
    if (window.app) {
      window.app.switchView('presentation');
    }
  }

  openDashboardForDept(deptName) {
    if (window.dataStore) {
      window.dataStore.switchDepartment(deptName);
    }
    if (window.app) {
      window.app.switchView('dashboard');
    }
  }

  openRubricForDept(deptName) {
    if (window.dataStore) {
      window.dataStore.switchDepartment(deptName);
    }
    if (window.app) {
      window.app.switchView('panel');
    }
  }

  exportDepartmentExcel(deptName) {
    if (!window.ExcelExporter) {
      alert('Excel exporter initializing...');
      return;
    }
    const data = window.dataStore && window.dataStore.data ? window.dataStore.data : (window.CS_SAMPLE_DATA || {});
    window.ExcelExporter.exportCompleteDepartmentToExcel(data, deptName);
  }

  exportAllSubmissionsRoster() {
    if (!window.ExcelExporter) return;
    const columns = ['#', 'Department Name', 'School', 'HOD Name', 'Submission Status', 'Locked?', 'Papers', 'Grants (L)', 'Patents', 'Placement %', 'Audit Grade'];
    const rows = this.departments.map((d, i) => [
      i + 1,
      d.name,
      d.school,
      d.hod_name,
      d.status.toUpperCase(),
      d.is_locked ? 'LOCKED' : 'OPEN',
      d.metrics.publications || 0,
      d.metrics.grants_lakhs || '0.00',
      d.metrics.patents || 0,
      d.metrics.placement_pct || '0%',
      d.evaluation?.grade || 'PENDING'
    ]);
    window.ExcelExporter.exportComparisonMatrixToExcel('All_Department_Submissions_Roster', columns, rows);
  }

  render() {
    if (!this.container) return;

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
              Annual Academic Audit (AAA) 2026-2027 Admin Command Center
            </h1>
            <p class="text-xs text-blue-200 mt-1">
              Submission control, college-wide macro benchmarks, cross-department attribute analytics, and faculty contributions directory.
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

        <!-- Admin Module Navigation Tabs -->
        <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
          ${this.renderAdminNavTab('sub_control', 'Department Submissions & Control', 'check-square')}
          ${this.renderAdminNavTab('overview', 'Institutional Overview & Macro KPIs', 'bar-chart-3')}
          ${this.renderAdminNavTab('attribute_matrix', 'Dept-Wise Attribute Analytics & Charts', 'table-properties')}
          ${this.renderAdminNavTab('faculty_tracker', 'Faculty-Wise Contribution Tracker', 'users')}
        </div>

        <!-- Active Admin View Content -->
        <div>
          ${this.renderActiveTabContent()}
        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  renderAdminNavTab(tabKey, label, icon) {
    const isActive = this.activeTab === tabKey;
    const activeClasses = isActive
      ? 'bg-blue-600 text-white shadow-sm font-bold'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold';

    return `
      <button type="button" onclick="adminDashboard.switchAdminTab('${tabKey}')" class="px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition ${activeClasses}">
        <i data-lucide="${icon}" class="w-4 h-4"></i>
        <span>${label}</span>
      </button>
    `;
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'sub_control':
        return this.renderSubmissionsControlTab();
      case 'overview':
        return this.renderOverviewTab();
      case 'attribute_matrix':
        return this.renderAttributeMatrixTab();
      case 'faculty_tracker':
        return this.renderFacultyTrackerTab();
      default:
        return this.renderSubmissionsControlTab();
    }
  }

  // TAB 1: Department Submissions & Meeting Control
  renderSubmissionsControlTab() {
    const filteredDepts = this.departments.filter(d => {
      if (this.statusFilter === 'all') return true;
      if (this.statusFilter === 'locked') return Boolean(d.is_locked);
      return d.status === this.statusFilter;
    });

    return `
      <div class="space-y-4">
        <!-- Submissions Batch Actions & Filters Bar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
            <span class="text-slate-400 font-bold uppercase text-[10px] mr-2">Status Filter:</span>
            <button type="button" onclick="adminDashboard.setStatusFilter('all')" class="px-3 py-1.5 rounded-lg transition ${this.statusFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              All (${this.departments.length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('submitted')" class="px-3 py-1.5 rounded-lg transition ${this.statusFilter === 'submitted' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              Submitted (${this.departments.filter(d => d.status === 'submitted' || d.status === 'approved').length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('in_progress')" class="px-3 py-1.5 rounded-lg transition ${this.statusFilter === 'in_progress' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              In Progress (${this.departments.filter(d => d.status === 'in_progress').length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('draft')" class="px-3 py-1.5 rounded-lg transition ${this.statusFilter === 'draft' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              Draft (${this.departments.filter(d => d.status === 'draft').length})
            </button>
            <button type="button" onclick="adminDashboard.setStatusFilter('locked')" class="px-3 py-1.5 rounded-lg transition ${this.statusFilter === 'locked' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
              Locked (${this.departments.filter(d => d.is_locked).length})
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="adminDashboard.lockAllDepartments(true)" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5">
              <i data-lucide="lock" class="w-3.5 h-3.5"></i> Lock All Submissions
            </button>
            <button type="button" onclick="adminDashboard.lockAllDepartments(false)" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5">
              <i data-lucide="unlock" class="w-3.5 h-3.5"></i> Unlock All
            </button>
            <button type="button" onclick="adminDashboard.exportAllSubmissionsRoster()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
              <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i> Export Roster (Excel)
            </button>
          </div>
        </div>

        <!-- Department Cards Grid for AAA Meetings -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b pb-2">
            <div>
              <h2 class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="presentation" class="w-4 h-4 text-purple-600"></i>
                Department Submissions & Live Meeting Controls
              </h2>
              <p class="text-[11px] text-slate-500">Lock/unlock data editing, monitor submission statuses, or launch the 60-Min Presentation slide deck directly on the projector.</p>
            </div>
            <span class="text-xs text-slate-500">Showing <strong>${filteredDepts.length}</strong> of ${this.departments.length} departments</span>
          </div>

          <div class="grid grid-cols-1 gap-4">
            ${filteredDepts.map(dept => this.renderDeptCard(dept)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderDeptCard(dept) {
    const statusBadges = {
      submitted: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Submitted to IQAC</span>',
      in_progress: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">⏳ In Progress</span>',
      draft: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300">📝 Draft</span>',
      approved: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">★ Approved</span>',
      needs_revision: '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">⚠️ Needs Revision</span>'
    };

    return `
      <div class="bg-white rounded-xl p-5 border ${dept.is_locked ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} shadow-sm hover:border-blue-400 transition space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-slate-900">${dept.name}</h3>
              ${statusBadges[dept.status] || statusBadges.draft}
              ${dept.is_locked ? '<span class="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded border border-rose-300 flex items-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> Locked</span>' : '<span class="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">Open for Edits</span>'}
              ${dept.evaluation?.grade ? `<span class="px-2 py-0.5 bg-purple-100 text-purple-900 font-black text-xs rounded border border-purple-200">Grade: ${dept.evaluation.grade}</span>` : ''}
            </div>
            <p class="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>School:</strong> ${dept.school}</span>
              <span><strong>HOD:</strong> ${dept.hod_name}</span>
              <span><strong>Scheduled Audit:</strong> ${dept.audit_date || 'TBD'}</span>
              <span><strong>Last Updated:</strong> ${dept.last_updated}</span>
            </p>
          </div>

          <!-- Submission Controls: Lock/Unlock & Status Selector -->
          <div class="flex flex-wrap items-center gap-2">
            <select onchange="adminDashboard.changeDeptStatus(${dept.id}, this.value)" class="text-xs p-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-medium outline-none">
              <option value="draft" ${dept.status === 'draft' ? 'selected' : ''}>Status: Draft</option>
              <option value="in_progress" ${dept.status === 'in_progress' ? 'selected' : ''}>Status: In Progress</option>
              <option value="submitted" ${dept.status === 'submitted' ? 'selected' : ''}>Status: Submitted</option>
              <option value="approved" ${dept.status === 'approved' ? 'selected' : ''}>Status: Approved</option>
              <option value="needs_revision" ${dept.status === 'needs_revision' ? 'selected' : ''}>Status: Needs Revision</option>
            </select>

            <button type="button" onclick="adminDashboard.toggleDeptLock(${dept.id})" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${dept.is_locked ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'}">
              <i data-lucide="${dept.is_locked ? 'unlock' : 'lock'}" class="w-3.5 h-3.5"></i>
              <span>${dept.is_locked ? 'Unlock' : 'Lock Edits'}</span>
            </button>
          </div>
        </div>

        <!-- Department Key Metric Pills -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Publications</span>
            <span class="text-base font-black text-slate-800">${dept.metrics.publications || 0}</span>
            <span class="text-[10px] text-purple-600 block">Scopus/WoS</span>
          </div>
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Grants Mobilized</span>
            <span class="text-base font-black text-slate-800">₹${dept.metrics.grants_lakhs || '0.00'} L</span>
            <span class="text-[10px] text-emerald-600 block">Ext + Seed</span>
          </div>
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Equipments Procured</span>
            <span class="text-base font-black text-slate-800">${dept.metrics.equipments_count || 0}</span>
            <span class="text-[10px] text-indigo-600 block">₹${dept.metrics.equipments_lakhs || '0'}L Spend</span>
          </div>
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Library Books</span>
            <span class="text-base font-black text-slate-800">${dept.metrics.library_books || 0}</span>
            <span class="text-[10px] text-blue-600 block">${dept.metrics.library_footfall || 0} visits/d</span>
          </div>
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Student Placements</span>
            <span class="text-base font-black text-slate-800">${dept.metrics.placement_pct || '0%'}</span>
            <span class="text-[10px] text-teal-600 block">Batch 2026</span>
          </div>
          <div class="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">CSR & Extension</span>
            <span class="text-base font-black text-slate-800">${dept.metrics.csr_events || 0}</span>
            <span class="text-[10px] text-emerald-600 block">₹${dept.metrics.csr_funds_lakhs || 0}L CSR</span>
          </div>
        </div>

        <!-- 1-Click Meeting & Export Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div class="flex items-center gap-2">
            <button type="button" onclick="adminDashboard.launchMeetingForDept('${dept.name}')" class="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition">
              <i data-lucide="play-circle" class="w-4 h-4"></i>
              <span>Launch 60m Meeting Deck</span>
            </button>
            <button type="button" onclick="adminDashboard.openDashboardForDept('${dept.name}')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold rounded-lg border border-blue-200 flex items-center gap-1.5 transition">
              <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i>
              <span>15m Dashboard</span>
            </button>
            <button type="button" onclick="adminDashboard.openRubricForDept('${dept.name}')" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-lg border border-amber-200 flex items-center gap-1.5 transition">
              <i data-lucide="clipboard-check" class="w-3.5 h-3.5"></i>
              <span>15m Panel Rubric</span>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="adminDashboard.exportDepartmentExcel('${dept.name}')" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg border border-emerald-200 flex items-center gap-1.5 transition">
              <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i>
              <span>Export Dossier (Excel)</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 2: Institutional Macro Overview & Benchmarks
  renderOverviewTab() {
    return `
      <div class="space-y-6">
        <!-- 6 Macro College-wide KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Submissions</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${this.overview.submitted_count} / ${this.departments.length}</div>
            <span class="text-[10px] text-emerald-600 font-semibold">Departments Done</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-purple-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Total Papers</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${this.overview.total_publications}</div>
            <span class="text-[10px] text-purple-600 font-semibold">Scopus & WoS Indexed</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Grants Mobilized</span>
            <div class="text-2xl font-black text-slate-800 mt-1">₹${this.overview.total_grants_lakhs} L</div>
            <span class="text-[10px] text-emerald-600 font-semibold">Ext + Seed Grants</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Total Patents</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${this.overview.total_patents}</div>
            <span class="text-[10px] text-amber-600 font-semibold">Applied & Granted</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-indigo-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Ph.D. Scholars</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${this.overview.total_scholars}</div>
            <span class="text-[10px] text-indigo-600 font-semibold">FT & PT Enrolled</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-teal-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Avg Placement Rate</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${this.overview.avg_placement_pct}</div>
            <span class="text-[10px] text-teal-600 font-semibold">Batch 2026</span>
          </div>
        </div>

        <!-- School-Wise Aggregated Summary Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <div class="flex justify-between items-center border-b pb-2">
            <div>
              <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">School-Wise Consolidated Aggregates</h3>
              <p class="text-[11px] text-slate-500">Performance aggregated across the 5 Academic Schools.</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left text-slate-700">
              <thead class="text-[10px] text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th class="p-2.5">Academic School</th>
                  <th class="p-2.5">Depts</th>
                  <th class="p-2.5">Research Scholars</th>
                  <th class="p-2.5">Scopus Papers</th>
                  <th class="p-2.5">Grants (₹ Lakhs)</th>
                  <th class="p-2.5">Patents</th>
                  <th class="p-2.5">Avg Placement %</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr class="hover:bg-slate-50">
                  <td class="p-2.5 font-bold text-blue-900">School of Computing Sciences</td>
                  <td class="p-2.5">2</td>
                  <td class="p-2.5 font-mono">38</td>
                  <td class="p-2.5 font-mono font-bold text-purple-700">73</td>
                  <td class="p-2.5 font-mono font-bold text-emerald-700">₹ 36.50 L</td>
                  <td class="p-2.5 font-mono">2</td>
                  <td class="p-2.5 font-mono text-teal-700">81.6%</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="p-2.5 font-bold text-blue-900">School of Physical Sciences</td>
                  <td class="p-2.5">1</td>
                  <td class="p-2.5 font-mono">22</td>
                  <td class="p-2.5 font-mono font-bold text-purple-700">38</td>
                  <td class="p-2.5 font-mono font-bold text-emerald-700">₹ 35.00 L</td>
                  <td class="p-2.5 font-mono">1</td>
                  <td class="p-2.5 font-mono text-teal-700">72.0%</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="p-2.5 font-bold text-blue-900">School of Chemical Sciences</td>
                  <td class="p-2.5">1</td>
                  <td class="p-2.5 font-mono">16</td>
                  <td class="p-2.5 font-mono font-bold text-purple-700">26</td>
                  <td class="p-2.5 font-mono font-bold text-emerald-700">₹ 18.20 L</td>
                  <td class="p-2.5 font-mono">1</td>
                  <td class="p-2.5 font-mono text-teal-700">70.5%</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="p-2.5 font-bold text-blue-900">School of Management Studies</td>
                  <td class="p-2.5">2</td>
                  <td class="p-2.5 font-mono">24</td>
                  <td class="p-2.5 font-mono font-bold text-purple-700">49</td>
                  <td class="p-2.5 font-mono font-bold text-emerald-700">₹ 20.50 L</td>
                  <td class="p-2.5 font-mono">0</td>
                  <td class="p-2.5 font-mono text-teal-700">85.5%</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="p-2.5 font-bold text-blue-900">School of Biological Sciences</td>
                  <td class="p-2.5">1</td>
                  <td class="p-2.5 font-mono">15</td>
                  <td class="p-2.5 font-mono font-bold text-purple-700">22</td>
                  <td class="p-2.5 font-mono font-bold text-emerald-700">₹ 16.80 L</td>
                  <td class="p-2.5 font-mono">0</td>
                  <td class="p-2.5 font-mono text-teal-700">65.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 3: Department-Wise Attribute Analytics & Visual Charts
  renderAttributeMatrixTab() {
    return `
      <div class="space-y-6">
        <!-- Attribute Matrix Selector Bar -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <label class="text-xs font-bold text-slate-700 uppercase">Select Attribute to Compare:</label>
            <select id="matrix-attr-selector" onchange="adminDashboard.onMatrixAttributeChanged(this.value)" class="text-xs p-2 border border-blue-300 rounded-lg bg-blue-50/50 font-bold text-blue-950 outline-none">
              <option value="att9" ${this.selectedAttributeForMatrix === 'att9' ? 'selected' : ''}>Attribute IX: Research, Publications & IPR</option>
              <option value="att4_7" ${this.selectedAttributeForMatrix === 'att4_7' ? 'selected' : ''}>Attribute IV & VII: External Grants & Seed Money</option>
              <option value="att3" ${this.selectedAttributeForMatrix === 'att3' ? 'selected' : ''}>Attribute III: Infrastructure & Learning Resources</option>
              <option value="t10_outcomes" ${this.selectedAttributeForMatrix === 't10_outcomes' ? 'selected' : ''}>Table 10: Student Outcomes (Placements & Higher Studies)</option>
              <option value="att1" ${this.selectedAttributeForMatrix === 'att1' ? 'selected' : ''}>Attribute I: Curriculum Design & PTM</option>
              <option value="att2" ${this.selectedAttributeForMatrix === 'att2' ? 'selected' : ''}>Attribute II: Faculty Qualifications & Development</option>
              <option value="att5" ${this.selectedAttributeForMatrix === 'att5' ? 'selected' : ''}>Attribute V: Teaching-Learning & MoUs</option>
              <option value="att6_8" ${this.selectedAttributeForMatrix === 'att6_8' ? 'selected' : ''}>Attribute VI & VIII: Clubs & Student Awards</option>
              <option value="att10" ${this.selectedAttributeForMatrix === 'att10' ? 'selected' : ''}>Attribute X: Values, Green Campus & CSR</option>
              <option value="t1_scholars" ${this.selectedAttributeForMatrix === 't1_scholars' ? 'selected' : ''}>Table 1: Research Scholars Matrix</option>
            </select>
          </div>

          <button type="button" onclick="adminDashboard.exportCurrentMatrixExcel()" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i>
            <span>Export Comparison Table to Excel</span>
          </button>
        </div>

        <!-- 4 Visual Analytics Charts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <i data-lucide="award" class="w-4 h-4 text-purple-600"></i> Research Publications by Department (Scopus / WoS)
            </h4>
            <div class="h-56 relative"><canvas id="chart-research-pubs"></canvas></div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <i data-lucide="indian-rupee" class="w-4 h-4 text-emerald-600"></i> Grants Mobilized by Department (₹ in Lakhs)
            </h4>
            <div class="h-56 relative"><canvas id="chart-grants-mob"></canvas></div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-600"></i> Student Outcomes & Placement Rates (%)
            </h4>
            <div class="h-56 relative"><canvas id="chart-outcomes-rate"></canvas></div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <i data-lucide="hard-drive" class="w-4 h-4 text-indigo-600"></i> Infrastructure Procurement (₹ Lakhs) & Library Footfall
            </h4>
            <div class="h-56 relative"><canvas id="chart-infra-footfall"></canvas></div>
          </div>
        </div>

        <!-- Dynamic Cross-Department Attribute Matrix Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <div class="border-b pb-2 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
                Side-by-Side Department Comparison: <span class="text-blue-600">${this.getAttributeTitle(this.selectedAttributeForMatrix)}</span>
              </h3>
              <p class="text-[11px] text-slate-500">Comparative metrics benchmarking all 8 departments.</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            ${this.renderDynamicMatrixTable(this.selectedAttributeForMatrix)}
          </div>
        </div>
      </div>
    `;
  }

  onMatrixAttributeChanged(attrId) {
    this.selectedAttributeForMatrix = attrId;
    this.render();
    setTimeout(() => this.renderAnalyticsCharts(), 50);
  }

  getAttributeTitle(attrId) {
    const titles = {
      att9: 'Attribute IX: Research, Publications & IPR',
      att4_7: 'Attribute IV & VII: External Grants & Seed Money',
      att3: 'Attribute III: Infrastructure & Learning Resources',
      t10_outcomes: 'Table 10: Student Outcomes 2026',
      att1: 'Attribute I: Curriculum Design & PTM',
      att2: 'Attribute II: Faculty Qualifications & Development',
      att5: 'Attribute V: Teaching-Learning & MoUs',
      att6_8: 'Attribute VI & VIII: Clubs & Student Awards',
      att10: 'Attribute X: Values, Green Campus & CSR',
      t1_scholars: 'Table 1: Research Scholars Matrix'
    };
    return titles[attrId] || 'Attribute Comparison';
  }

  renderDynamicMatrixTable(attrId) {
    if (attrId === 'att3') {
      return `
        <table class="w-full text-xs text-left text-slate-700">
          <thead class="text-[10px] text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th class="p-2.5">#</th>
              <th class="p-2.5">Department</th>
              <th class="p-2.5">Lab Equipments Procured</th>
              <th class="p-2.5">Investment (₹ Lakhs)</th>
              <th class="p-2.5">Total Dept Books</th>
              <th class="p-2.5">Daily Library Footfall</th>
              <th class="p-2.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${this.departments.map((d, i) => `
              <tr class="hover:bg-slate-50">
                <td class="p-2.5 text-slate-400 font-bold">${i + 1}</td>
                <td class="p-2.5 font-bold text-slate-900">${d.name}</td>
                <td class="p-2.5 font-mono font-bold text-indigo-700">${d.metrics.equipments_count || 2} units</td>
                <td class="p-2.5 font-mono font-bold text-emerald-700">₹ ${d.metrics.equipments_lakhs || '10.00'} L</td>
                <td class="p-2.5 font-mono">${d.metrics.library_books || 1500} books</td>
                <td class="p-2.5 font-mono text-purple-700 font-bold">${d.metrics.library_footfall || 80} visits/day</td>
                <td class="p-2.5 text-center">
                  <button type="button" onclick="adminDashboard.launchMeetingForDept('${d.name}')" class="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[11px] font-bold">Present</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    if (attrId === 'att4_7') {
      return `
        <table class="w-full text-xs text-left text-slate-700">
          <thead class="text-[10px] text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th class="p-2.5">#</th>
              <th class="p-2.5">Department</th>
              <th class="p-2.5">Grants Mobilized (₹)</th>
              <th class="p-2.5">Major Agencies</th>
              <th class="p-2.5">Management Seed Support</th>
              <th class="p-2.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${this.departments.map((d, i) => `
              <tr class="hover:bg-slate-50">
                <td class="p-2.5 text-slate-400 font-bold">${i + 1}</td>
                <td class="p-2.5 font-bold text-slate-900">${d.name}</td>
                <td class="p-2.5 font-mono font-bold text-emerald-700">₹ ${d.metrics.grants_lakhs || '0.00'} Lakhs</td>
                <td class="p-2.5">${d.code === 'physics' ? 'DST-SERB, CSIR' : (d.code === 'cs' ? 'DST-FIST, AICTE' : 'ICSSR, Management')}</td>
                <td class="p-2.5 font-mono text-blue-700 font-semibold">₹ 2.50 L</td>
                <td class="p-2.5 text-center">
                  <button type="button" onclick="adminDashboard.launchMeetingForDept('${d.name}')" class="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[11px] font-bold">Present</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Default to Attribute IX
    return `
      <table class="w-full text-xs text-left text-slate-700">
        <thead class="text-[10px] text-slate-500 uppercase bg-slate-50 border-b">
          <tr>
            <th class="p-2.5">#</th>
            <th class="p-2.5">Department</th>
            <th class="p-2.5">Scopus/WoS Publications</th>
            <th class="p-2.5">Patents Filed/Granted</th>
            <th class="p-2.5">Research Scholars</th>
            <th class="p-2.5 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${this.departments.map((d, i) => `
            <tr class="hover:bg-slate-50">
              <td class="p-2.5 text-slate-400 font-bold">${i + 1}</td>
              <td class="p-2.5 font-bold text-slate-900">${d.name}</td>
              <td class="p-2.5 font-mono font-bold text-purple-700">${d.metrics.publications || 0} papers</td>
              <td class="p-2.5 font-mono font-bold text-amber-700">${d.metrics.patents || 0}</td>
              <td class="p-2.5 font-mono text-indigo-700 font-bold">${d.metrics.scholars || 14} scholars</td>
              <td class="p-2.5 text-center">
                <button type="button" onclick="adminDashboard.launchMeetingForDept('${d.name}')" class="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[11px] font-bold">Present</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  exportCurrentMatrixExcel() {
    if (!window.ExcelExporter) return;
    const title = this.getAttributeTitle(this.selectedAttributeForMatrix);
    const columns = ['#', 'Department Name', 'School', 'Publications', 'Grants (Lakhs)', 'Patents', 'Placement %'];
    const rows = this.departments.map((d, i) => [
      i + 1,
      d.name,
      d.school,
      d.metrics.publications || 0,
      d.metrics.grants_lakhs || '0.00',
      d.metrics.patents || 0,
      d.metrics.placement_pct || '0%'
    ]);
    window.ExcelExporter.exportComparisonMatrixToExcel(title, columns, rows);
  }

  renderAnalyticsCharts() {
    if (!window.Chart) return;

    const labels = this.departments.map(d => d.code.toUpperCase());

    // 1. Research Publications Chart
    const ctx1 = document.getElementById('chart-research-pubs');
    if (ctx1) {
      if (this.comparisonCharts.pubs) this.comparisonCharts.pubs.destroy();
      this.comparisonCharts.pubs = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Scopus & WoS Papers',
            data: this.departments.map(d => d.metrics.publications || 0),
            backgroundColor: 'rgba(147, 51, 234, 0.7)',
            borderColor: 'rgb(147, 51, 234)',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } }
        }
      });
    }

    // 2. Grants Chart
    const ctx2 = document.getElementById('chart-grants-mob');
    if (ctx2) {
      if (this.comparisonCharts.grants) this.comparisonCharts.grants.destroy();
      this.comparisonCharts.grants = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Grants (₹ Lakhs)',
            data: this.departments.map(d => parseFloat(d.metrics.grants_lakhs || 0)),
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } }
        }
      });
    }

    // 3. Outcomes Rate Chart
    const ctx3 = document.getElementById('chart-outcomes-rate');
    if (ctx3) {
      if (this.comparisonCharts.outcomes) this.comparisonCharts.outcomes.destroy();
      this.comparisonCharts.outcomes = new Chart(ctx3, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Placement & Progression %',
            data: this.departments.map(d => parseFloat(d.metrics.placement_pct || 0)),
            borderColor: 'rgb(37, 99, 235)',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { min: 50, max: 100, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } }
        }
      });
    }

    // 4. Infrastructure & Footfall Chart
    const ctx4 = document.getElementById('chart-infra-footfall');
    if (ctx4) {
      if (this.comparisonCharts.infra) this.comparisonCharts.infra.destroy();
      this.comparisonCharts.infra = new Chart(ctx4, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Equipment Spend (₹ L)',
            data: this.departments.map(d => parseFloat(d.metrics.equipments_lakhs || 0)),
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } }
        }
      });
    }
  }

  // TAB 4: Faculty-Wise Contribution Tracker
  getFacultyDirectory() {
    return [
      { id: 1, name: 'Dr. S. Albert Rabara', department: 'PG & Research Department of Computer Science', designation: 'Associate Professor & HOD', qualification: 'Ph.D., M.Phil.', publications: 18, grantsINR: 2450000, patents: 1, books: 2, editorialRoles: 'Reviewer (IEEE, Elsevier)', contributions: 'DST-FIST Project PI, 1 Indian Patent Granted, Keynote Speaker at IEEE ICACCS' },
      { id: 2, name: 'Dr. D. P. Jeyapalan', department: 'PG & Research Department of Computer Science', designation: 'Associate Professor', qualification: 'Ph.D., M.Sc.', publications: 12, grantsINR: 350000, patents: 1, books: 1, editorialRoles: 'Editor (Springer LNCS)', contributions: 'AICTE ATAL FDP Coordinator, 1 Patent Published, Ph.D. Guide (6 Scholars)' },
      { id: 3, name: 'Dr. B. Rex Cyril', department: 'PG & Research Department of Computer Science', designation: 'Assistant Professor', qualification: 'Ph.D., SET', publications: 8, grantsINR: 150000, patents: 0, books: 0, editorialRoles: 'Reviewer (UGC CARE)', contributions: 'Management Seed Money Grantee, Four-Quadrant LMS E-Content Lead' },
      { id: 4, name: 'Dr. K. R. Martin', department: 'PG & Research Department of Computer Science', designation: 'Assistant Professor', qualification: 'Ph.D., NET/SET', publications: 6, grantsINR: 100000, patents: 0, books: 1, editorialRoles: 'None', contributions: 'MMTTC Refresher Course Completed, Club In-charge (Codelabs)' },
      { id: 5, name: 'Dr. F. R. Alexander Pravin Durai', department: 'PG & Research Department of Commerce', designation: 'Associate Professor & HOD', qualification: 'Ph.D., M.Com.', publications: 14, grantsINR: 800000, patents: 0, books: 3, editorialRoles: 'BoS Member, Reviewer', contributions: 'ICSSR Major Research Project PI, 3 Books Published with ISBN' },
      { id: 6, name: 'Dr. M. Antony Jesuraja', department: 'PG & Research Department of Commerce', designation: 'Associate Professor', qualification: 'Ph.D., NET', publications: 9, grantsINR: 450000, patents: 0, books: 1, editorialRoles: 'Reviewer (Scopus)', contributions: 'Management Seed Money Awardee, Ph.D. Guide (4 Scholars)' },
      { id: 7, name: 'Dr. K. Arockiam', department: 'PG & Research Department of Commerce', designation: 'Assistant Professor', qualification: 'Ph.D., M.Phil.', publications: 8, grantsINR: 200000, patents: 0, books: 2, editorialRoles: 'None', contributions: 'CSR Rural Finance Literacy Campaign Director, 2 Book Chapters' },
      { id: 8, name: 'Dr. N. Lawrence', department: 'PG & Research Department of Physics', designation: 'Associate Professor & HOD', qualification: 'Ph.D., Fellow IASc', publications: 22, grantsINR: 3500000, patents: 1, books: 1, editorialRoles: 'Editorial Board (AIP)', contributions: 'DST-SERB Core Grant PI, 1 Indian Patent Granted, h-index 18' },
      { id: 9, name: 'Dr. S. Alfred Cecil Raj', department: 'PG & Research Department of Physics', designation: 'Associate Professor', qualification: 'Ph.D.', publications: 16, grantsINR: 600000, patents: 0, books: 1, editorialRoles: 'BoS Member', contributions: 'Academic Abroad Visit to Singapore, Nano-Research Laboratory Lead' },
      { id: 10, name: 'Dr. A. Rose Venis', department: 'PG & Research Department of Chemistry', designation: 'Associate Professor & HOD', qualification: 'Ph.D., M.Sc.', publications: 19, grantsINR: 1820000, patents: 1, books: 1, editorialRoles: 'Reviewer (ACS, Elsevier)', contributions: 'CSIR Research Grant PI, 1 Patent Published on Green Synthesis' },
      { id: 11, name: 'Dr. S. Joseph Selvaraj', department: 'PG & Research Department of Chemistry', designation: 'Associate Professor', qualification: 'Ph.D.', publications: 11, grantsINR: 200000, patents: 0, books: 0, editorialRoles: 'Reviewer', contributions: 'Ph.D. Guide (5 Scholars), Advanced Analytical Instrumentation In-charge' },
      { id: 12, name: 'Dr. Y. Dominic', department: 'PG & Research Department of Mathematics', designation: 'Associate Professor & HOD', qualification: 'Ph.D.', publications: 15, grantsINR: 850000, patents: 0, books: 1, editorialRoles: 'BoS Member, Reviewer', contributions: 'NBHM Research Project PI, Differential Equations Monograph Author' },
      { id: 13, name: 'Dr. V. L. Jayapaul', department: 'PG & Research Department of English', designation: 'Associate Professor & HOD', qualification: 'Ph.D., NET', publications: 8, grantsINR: 420000, patents: 0, books: 3, editorialRoles: 'Journal Editor', contributions: 'UGC Minor Project PI, 3 Literary Criticism Volumes Published' },
      { id: 14, name: 'Dr. P. Bastin Jerome', department: 'Department of Business Administration (BBA)', designation: 'Associate Professor & HOD', qualification: 'Ph.D., MBA', publications: 11, grantsINR: 600000, patents: 0, books: 1, editorialRoles: 'BoS Member', contributions: 'ICSSR Project Co-PI, Industry Internship Placement Liaison' },
      { id: 15, name: 'Dr. S. Sahaya Sathish', department: 'PG & Research Department of Botany', designation: 'Associate Professor & HOD', qualification: 'Ph.D.', publications: 16, grantsINR: 1680000, patents: 0, books: 1, editorialRoles: 'Reviewer (Phytology)', contributions: 'MoEF Research Project PI, Herbarium Digital Archive Curator' }
    ];
  }

  renderFacultyTrackerTab() {
    const list = this.getFacultyDirectory();
    const filtered = list.filter(f => {
      const q = this.facultySearchQuery.toLowerCase();
      const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.contributions.toLowerCase().includes(q);
      const matchesDept = this.facultyDeptFilter === 'all' || f.department.includes(this.facultyDeptFilter);
      return matchesSearch && matchesDept;
    });

    const totalPubs = list.reduce((s, f) => s + f.publications, 0);
    const totalGrants = list.reduce((s, f) => s + f.grantsINR, 0);
    const totalPatents = list.reduce((s, f) => s + f.patents, 0);

    return `
      <div class="space-y-6">
        <!-- Faculty Macro Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-purple-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Faculty Tracked</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${list.length}</div>
            <span class="text-[10px] text-purple-600 font-semibold">Across 8 Departments</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Scopus/WoS Papers</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${totalPubs}</div>
            <span class="text-[10px] text-blue-600 font-semibold">Peer-Reviewed Articles</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-600">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Grants Mobilized</span>
            <div class="text-2xl font-black text-slate-800 mt-1">₹ ${(totalGrants / 100000).toFixed(2)} L</div>
            <span class="text-[10px] text-emerald-600 font-semibold">As Principal Investigators</span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Patents Granted/Filed</span>
            <div class="text-2xl font-black text-slate-800 mt-1">${totalPatents}</div>
            <span class="text-[10px] text-amber-600 font-semibold">IPR Inventions</span>
          </div>
        </div>

        <!-- Faculty Directory Filter & Search Header -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative min-w-[240px] flex-1">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
              <input type="text" value="${this.facultySearchQuery}" oninput="adminDashboard.onFacultySearch(this.value)" placeholder="Search faculty by name, topic, qualification..." class="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
            </div>

            <select onchange="adminDashboard.onFacultyDeptFilter(this.value)" class="text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 outline-none">
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Business Administration">BBA</option>
              <option value="Botany">Botany</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="adminDashboard.exportFacultyListExcel()" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i>
              <span>Export Faculty List (Excel)</span>
            </button>
            <button type="button" onclick="window.print()" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Print Directory (PDF)</span>
            </button>
          </div>
        </div>

        <!-- Faculty Contribution Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <div class="border-b pb-2 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">Faculty Academic & Research Accomplishments</h3>
              <p class="text-[11px] text-slate-500">Aggregated individual faculty achievements across Attributes II, IV, VII, and IX.</p>
            </div>
            <span class="text-xs text-slate-500">Showing <strong>${filtered.length}</strong> of ${list.length} faculty</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left text-slate-700">
              <thead class="text-[10px] text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th class="p-2.5">#</th>
                  <th class="p-2.5">Faculty Name & Dept</th>
                  <th class="p-2.5">Designation & Degree</th>
                  <th class="p-2.5 text-center">Scopus Papers</th>
                  <th class="p-2.5 text-right">Grants Mobilized</th>
                  <th class="p-2.5 text-center">Patents</th>
                  <th class="p-2.5">Editorial & Review Roles</th>
                  <th class="p-2.5">Key Contributions & Evidence</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filtered.length === 0 ? `
                  <tr><td colspan="8" class="text-center py-6 text-slate-400 italic">No faculty records match your search criteria.</td></tr>
                ` : filtered.map((fac, idx) => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5 text-slate-400 font-bold">${idx + 1}</td>
                    <td class="p-2.5">
                      <strong class="text-slate-900 block">${fac.name}</strong>
                      <span class="text-[10px] text-slate-500">${fac.department}</span>
                    </td>
                    <td class="p-2.5">
                      <span class="text-slate-800 font-medium block">${fac.designation}</span>
                      <span class="text-[10px] text-blue-600 font-semibold">${fac.qualification}</span>
                    </td>
                    <td class="p-2.5 text-center font-mono font-bold text-purple-700 text-sm">
                      ${fac.publications}
                    </td>
                    <td class="p-2.5 text-right font-mono font-bold text-emerald-700">
                      ₹ ${fac.grantsINR > 0 ? (fac.grantsINR / 100000).toFixed(2) + ' L' : '0.00'}
                    </td>
                    <td class="p-2.5 text-center font-mono font-bold ${fac.patents > 0 ? 'text-amber-600' : 'text-slate-400'}">
                      ${fac.patents}
                    </td>
                    <td class="p-2.5">
                      <span class="text-slate-700 font-medium">${fac.editorialRoles}</span>
                    </td>
                    <td class="p-2.5 text-[11px] text-slate-600 leading-snug">
                      ${fac.contributions}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  onFacultySearch(q) {
    this.facultySearchQuery = q;
    this.render();
  }

  onFacultyDeptFilter(dept) {
    this.facultyDeptFilter = dept;
    this.render();
  }

  exportFacultyListExcel() {
    if (!window.ExcelExporter) return;
    const list = this.getFacultyDirectory();
    window.ExcelExporter.exportFacultyListToExcel(list);
  }

  showAddDeptModal() {
    const modal = document.createElement('div');
    modal.id = 'add-dept-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-base font-bold text-slate-800">Add New Department to AAA Audit</h3>
          <button type="button" onclick="document.getElementById('add-dept-modal').remove()" class="text-slate-400 hover:text-slate-600">&times;</button>
        </div>
        <form onsubmit="event.preventDefault(); adminDashboard.saveNewDepartment(this);">
          <div class="space-y-3 text-xs">
            <div>
              <label class="font-bold text-slate-700 block mb-1">Department Name *</label>
              <input type="text" name="name" required placeholder="e.g. PG & Research Department of History" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block mb-1">Department Code *</label>
              <input type="text" name="code" required placeholder="e.g. history" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block mb-1">Academic School *</label>
              <select name="school" class="w-full p-2 border rounded">
                <option value="School of Computing Sciences">School of Computing Sciences</option>
                <option value="School of Physical Sciences">School of Physical Sciences</option>
                <option value="School of Chemical Sciences">School of Chemical Sciences</option>
                <option value="School of Biological Sciences">School of Biological Sciences</option>
                <option value="School of Management Studies">School of Management Studies</option>
                <option value="School of Languages and Culture">School of Languages and Culture</option>
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-700 block mb-1">Head of Department (HOD) Name</label>
              <input type="text" name="hod_name" placeholder="e.g. Dr. A. Historian" class="w-full p-2 border rounded" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block mb-1">Scheduled Audit Date</label>
              <input type="date" name="audit_date" value="2026-11-25" class="w-full p-2 border rounded" />
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-4 border-t mt-4">
            <button type="button" onclick="document.getElementById('add-dept-modal').remove()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow">Create Department & Account</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
  }

  saveNewDepartment(form) {
    const fd = new FormData(form);
    const newDept = {
      id: this.departments.length + 1,
      code: fd.get('code'),
      name: fd.get('name'),
      school: fd.get('school'),
      hod_name: fd.get('hod_name') || 'HOD In-Charge',
      audit_date: fd.get('audit_date'),
      status: 'draft',
      is_locked: false,
      last_updated: new Date().toISOString().replace('T', ' ').substring(0, 19),
      metrics: { publications: 0, grants_lakhs: '0.00', patents: 0, vac_cc: 0, mooc_pct: '0%', scholars: 0, placement_pct: '0%' },
      evaluation: { grade: null, score: null }
    };

    this.departments.push(newDept);
    if (window.dataStore) {
      const list = window.dataStore.getDepartmentList();
      if (!list.includes(newDept.name)) {
        list.push(newDept.name);
        window.dataStore.saveDepartmentList(list);
      }
    }

    document.getElementById('add-dept-modal').remove();
    alert(`Department "${newDept.name}" created successfully!\nLogin Account: ${newDept.code} (Password: ${newDept.code}123)`);
    this.render();
  }



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
