// IQAC AAA 2026-2027 - Dynamic Form Builder & Event Handlers

class FormBuilder {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTab = 'hub'; // Landing view: Attributes Directory Hub
    this.viewMode = 'edit'; // 'edit' or 'view'
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.render(window.dataStore.data);
  }

  openAttribute(attrKey, mode = 'edit') {
    this.activeTab = attrKey;
    this.viewMode = mode;
    this.render(window.dataStore.data);
  }

  saveCurrentData() {
    window.dataStore.saveCurrentData();
    this.showSaveIndicator();
    alert('Changes saved successfully!');
  }

  exportCurrentAttributeExcel() {
    if (!window.ExcelExporter) return;
    const data = window.dataStore.data;
    const deptName = data.departmentInfo?.departmentName || 'Department';
    window.ExcelExporter.exportAttributeToExcel(this.activeTab, data, deptName);
  }

  printCurrentAttributePdf() {
    window.print();
  }

  submitDepartmentToIQAC() {
    const data = window.dataStore.data;
    const deptName = data.departmentInfo?.departmentName || 'Department';
    if (confirm(`Submit final AAA 2026-2027 data for "${deptName}" to the IQAC Committee?`)) {
      window.dataStore.setDepartmentSubmissionStatus(deptName, { status: 'submitted' });
      alert('Department Audit Data successfully submitted to IQAC!\nStatus: SUBMITTED TO IQAC');
      this.render(data);
    }
  }

  render(data) {
    if (!this.container || !data) return;

    this.container.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- Form Header with Sub-tabs navigation -->
        <div class="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
              <i data-lucide="edit-3" class="w-5 h-5 text-blue-600"></i>
              Department Data Entry Form
            </h2>
            <p class="text-xs text-slate-500 mt-1">
              Fill in the standardized AAA Questionnaire. Data automatically synchronizes with the 15-Min Dashboard and 30-Min Presentation slides.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span id="save-indicator" class="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Auto-saved
            </span>
            <button type="button" onclick="formBuilder.resetActiveTab()" class="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition">
              Refresh Section
            </button>
          </div>
        </div>

        <!-- Section Navigation Pills (Attributes Hub, 10 Attributes, and Complete Dossier) -->
        <div class="px-6 py-3 bg-slate-100/70 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 text-xs font-medium text-slate-600 scrollbar-thin">
          <button type="button" onclick="formBuilder.switchTab('hub')" class="px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition font-bold ${this.activeTab === 'hub' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'}">
            <i data-lucide="grid" class="w-3.5 h-3.5"></i>
            <span>Attributes Hub</span>
          </button>
          ${this.renderNavTab('profile', 'Profile & Scholars (T1)', 'building', 't1_scholars')}
          ${this.renderNavTab('activities', 'Status of Activities (T2)', 'check-square', 't2_activities')}
          ${this.renderNavTab('att1', 'Att I: Curriculum', 'book-open', 'att1')}
          ${this.renderNavTab('att2', 'Att II: Faculty', 'users', 'att2')}
          ${this.renderNavTab('att3', 'Att III: Infrastructure', 'hard-drive', 'att3')}
          ${this.renderNavTab('att4_7', 'Att IV & VII: Grants', 'indian-rupee', 'att4_7')}
          ${this.renderNavTab('att5', 'Att V: Teaching & MoUs', 'laptop', 'att5')}
          ${this.renderNavTab('att6_8', 'Att VI & VIII: Clubs & Awards', 'trophy', 'att6_8')}
          ${this.renderNavTab('outcomes', 'Outcomes 2026 (T10)', 'graduation-cap', 't10_outcomes')}
          ${this.renderNavTab('att9', 'Att IX: Research & IPR', 'award', 'att9')}
          ${this.renderNavTab('att10', 'Att X: Values, Green & CSR', 'leaf', 'att10')}
          ${this.renderNavTab('qualitative', '30m Presentation Flow', 'presentation')}
          ${this.renderNavTab('pillars', 'Crucial Pillars', 'layers')}
          ${this.renderNavTab('panel', '15m Review Rubric', 'clipboard-check')}
          <button type="button" onclick="formBuilder.switchTab('complete_dossier')" class="px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition font-bold ${this.activeTab === 'complete_dossier' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'}">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
            <span>Complete Dossier</span>
          </button>
        </div>

        <!-- Form Tab Body -->
        <form id="aaa-main-form" class="p-6">
          <div id="form-tab-content">
            ${this.renderActiveTabContent(data)}
          </div>
        </form>
      </div>
    `;

    // If viewMode is 'view' or submission is locked, disable form fields
    const isLocked = window.dataStore ? window.dataStore.isDepartmentLocked() : false;
    if (this.viewMode === 'view' || isLocked) {
      const inputs = this.container.querySelectorAll('#form-tab-content input, #form-tab-content select, #form-tab-content textarea');
      inputs.forEach(el => {
        el.setAttribute('disabled', 'disabled');
        el.classList.add('bg-slate-50', 'cursor-not-allowed');
      });
    }

    // Initialize lucide icons if available
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  renderNavTab(tabKey, label, icon, attrKey) {
    const isActive = this.activeTab === tabKey;
    const isAgendaOn = attrKey && window.dataStore && typeof window.dataStore.isAttributeEnabled === 'function'
      ? window.dataStore.isAttributeEnabled(attrKey)
      : true;

    let agendaBadge = '';
    if (attrKey) {
      if (isAgendaOn) {
        agendaBadge = `<span class="ml-1 px-1 py-0.2 text-[9px] font-bold rounded bg-blue-100 text-blue-700 tracking-wider">★ AGENDA</span>`;
      } else {
        agendaBadge = `<span class="ml-1 px-1 py-0.2 text-[9px] font-medium rounded bg-slate-200 text-slate-500 tracking-wider">OFF</span>`;
      }
    }

    const activeClasses = isActive 
      ? 'bg-blue-600 text-white shadow-sm font-semibold' 
      : (isAgendaOn 
          ? 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200' 
          : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200 opacity-80');

    return `
      <button type="button" onclick="formBuilder.switchTab('${tabKey}')" class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${activeClasses}">
        <i data-lucide="${icon}" class="w-3.5 h-3.5"></i>
        <span>${label}</span>
        ${agendaBadge}
      </button>
    `;
  }

  renderAgendaBanner(attrKey, title) {
    if (!attrKey || !window.dataStore || typeof window.dataStore.isAttributeEnabled !== 'function') return '';
    const isOn = window.dataStore.isAttributeEnabled(attrKey);
    if (isOn) {
      return `
        <div class="mb-4 p-2.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs text-blue-800">
          <span class="flex items-center gap-1.5 font-medium">
            <i data-lucide="calendar" class="w-4 h-4 text-blue-600"></i>
            <span><strong>${title}</strong> is active in the upcoming Academic Audit Review Meeting Agenda.</span>
          </span>
          <span class="px-2 py-0.5 rounded text-[10px] bg-blue-600 text-white font-bold tracking-wide uppercase">Meeting Focus</span>
        </div>
      `;
    } else {
      return `
        <div class="mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-800">
          <span class="flex items-center gap-1.5 font-medium">
            <i data-lucide="info" class="w-4 h-4 text-amber-600"></i>
            <span><strong>${title}</strong> is currently unselected in the Admin Meeting Agenda. (Data is saved for records/archive).</span>
          </span>
          <span class="px-2 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-bold tracking-wide uppercase">Archival Only</span>
        </div>
      `;
    }
  }

  switchTab(tabKey) {
    this.activeTab = tabKey;
    const data = window.dataStore.data;
    this.render(data);
  }

  resetActiveTab() {
    this.render(window.dataStore.data);
  }

  renderActiveTabContent(data) {
    if (this.activeTab === 'hub') {
      return this.renderAttributeHub(data);
    }
    if (this.activeTab === 'complete_dossier') {
      return this.renderCompleteDossierTab(data);
    }

    const contentHtml = (() => {
      switch (this.activeTab) {
        case 'profile':
          return this.renderProfileTab(data.departmentInfo);
      case 'activities':
        return this.renderActivitiesTab(data.qualitativePresentation);
      case 'att1':
        return this.renderAtt1Tab(data.attributeI);
      case 'att2':
        return this.renderAtt2Tab(data.attributeII);
      case 'att3':
        return this.renderAtt3Tab(data.attributeIII);
      case 'att4_7':
        return this.renderAtt4_7Tab(data.attributeIV_VII);
      case 'att5':
        return this.renderAtt5Tab(data.attributeV);
      case 'att6_8':
        return this.renderAtt6_8Tab(data.attributeVI_VIII);
      case 'outcomes':
        return this.renderOutcomesTab(data.studentsOutcomes2026);
      case 'att9':
        return this.renderAtt9Tab(data.attributeIX);
      case 'att10':
        return this.renderAtt10Tab(data.attributeX);
      case 'qualitative':
        return this.renderQualitativeTab(data.qualitativePresentation);
      case 'pillars':
        return this.renderPillarsTab(data.qualitativePresentation.pillars);
      case 'panel':
        return this.renderPanelTab(data.panelReview);
      default:
        return this.renderProfileTab(data.departmentInfo);
      }
    })();

    return this.renderAttributeActionBar(data) + contentHtml;
  }


  renderAttributeActionBar(data) {
    const isLocked = window.dataStore ? window.dataStore.isDepartmentLocked() : false;
    const deptName = data.departmentInfo?.departmentName || 'Department';

    return `
      <div class="mb-5 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm no-print">
        <div class="flex items-center gap-2">
          <button type="button" onclick="formBuilder.switchTab('hub')" class="px-3 py-1.5 bg-white hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>All Attributes Hub</span>
          </button>
          
          <div class="flex items-center bg-white border border-slate-300 rounded-lg p-0.5 text-xs font-semibold">
            <button type="button" onclick="formBuilder.setViewMode('edit')" class="px-2.5 py-1 rounded transition ${this.viewMode === 'edit' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}">
              Edit Mode
            </button>
            <button type="button" onclick="formBuilder.setViewMode('view')" class="px-2.5 py-1 rounded transition ${this.viewMode === 'view' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}">
              View Preview
            </button>
          </div>

          ${isLocked ? `
            <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1">
              <i data-lucide="lock" class="w-3 h-3"></i> Submission Locked
            </span>
          ` : `
            <span class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Editing Active
            </span>
          `}
        </div>

        <div class="flex items-center gap-2">
          <button type="button" onclick="formBuilder.saveCurrentData()" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Save</span>
          </button>
          <button type="button" onclick="formBuilder.exportCurrentAttributeExcel()" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded-lg text-xs flex items-center gap-1.5 transition">
            <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i>
            <span>Excel</span>
          </button>
          <button type="button" onclick="formBuilder.printCurrentAttributePdf()" class="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 font-bold rounded-lg text-xs flex items-center gap-1.5 transition">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            <span>PDF</span>
          </button>
          <button type="button" onclick="app.switchView('dashboard')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition">
            <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i>
            <span>Show Dashboard</span>
          </button>
        </div>
      </div>

      ${isLocked ? `
        <div class="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2 font-medium">
          <i data-lucide="lock" class="w-4 h-4 text-rose-600 flex-shrink-0"></i>
          <span><strong>Submission Locked by IQAC Admin:</strong> This department has been locked for official evaluation. All fields are in read-only view. Contact IQAC to request editing unlock.</span>
        </div>
      ` : ''}
    `;
  }

  renderAttributeHub(data) {
    const dept = data.departmentInfo || {};
    const deptName = dept.departmentName || 'Department';
    const status = window.dataStore ? window.dataStore.getDepartmentSubmissionStatus(deptName) : { status: 'draft', is_locked: false };
    const sch = dept.scholars || {};
    const ftM = sch.fullTime?.male || 0;
    const ftF = sch.fullTime?.female || 0;
    const ptM = sch.partTime?.male || 0;
    const ptF = sch.partTime?.female || 0;
    const totalScholars = ftM + ftF + ptM + ptF;

    const cards = [
      {
        key: 'profile',
        attrId: 't1_scholars',
        code: 'Table 1',
        title: 'Department Profile & Research Scholars',
        icon: 'building',
        color: 'blue',
        summary: `${totalScholars} Scholars (${ftM + ftF} FT, ${ptM + ptF} PT) • Estd ${dept.establishedYear || 'N/A'}`
      },
      {
        key: 'att1',
        attrId: 'att1',
        code: 'Attribute I',
        title: 'Curriculum Design & PTM',
        icon: 'book-open',
        color: 'emerald',
        summary: `${(data.attributeI?.vac || []).length} VACs, ${(data.attributeI?.cc || []).length} CCs, ${data.attributeI?.ptm?.ptmCount || 0} PTMs`
      },
      {
        key: 'att2',
        attrId: 'att2',
        code: 'Attribute II',
        title: 'Faculty Resources & Excellence',
        icon: 'users',
        color: 'purple',
        summary: `${data.attributeII?.newDegrees?.count || 0} New Degrees, ${data.attributeII?.netSet?.count || 0} NET/SET, ${data.attributeII?.abroadVisits?.count || 0} Abroad Visits`
      },
      {
        key: 'att3',
        attrId: 'att3',
        code: 'Attribute III',
        title: 'Infrastructure & Learning Resources',
        icon: 'hard-drive',
        color: 'indigo',
        summary: `${(data.attributeIII?.purchasedEquipments || []).length} Procured Equipments, ${data.attributeIII?.departmentLibrary?.totalBooks || 0} Library Books`
      },
      {
        key: 'att4_7',
        attrId: 'att4_7',
        code: 'Attribute IV & VII',
        title: 'Grants, Seed Money & Endowments',
        icon: 'indian-rupee',
        color: 'emerald',
        summary: `${(data.attributeIV_VII?.externalFunds || []).length} External Grants, ${(data.attributeIV_VII?.managementFunds || []).length} Management Grants`
      },
      {
        key: 'att5',
        attrId: 'att5',
        code: 'Attribute V',
        title: 'Teaching-Learning, MoUs & Linkages',
        icon: 'laptop',
        color: 'blue',
        summary: `${data.attributeV?.mouCreated?.count || 0} New MoUs, ${data.attributeV?.linkages?.count || 0} Linkages, ${data.attributeV?.eContent?.count || 0} E-Contents`
      },
      {
        key: 'att6_8',
        attrId: 'att6_8',
        code: 'Attribute VI & VIII',
        title: 'Clubs, Exams & Student Awards',
        icon: 'trophy',
        color: 'amber',
        summary: `${(data.attributeVI_VIII?.clubs || []).length} Clubs, ${(data.attributeVI_VIII?.studentAwards || []).length} Student Awards Won`
      },
      {
        key: 'outcomes',
        attrId: 't10_outcomes',
        code: 'Table 10',
        title: 'Student Outcomes (Batch 2026)',
        icon: 'graduation-cap',
        color: 'teal',
        summary: `${data.studentsOutcomes2026?.ug?.strength || 0} UG, ${data.studentsOutcomes2026?.pg?.strength || 0} PG (${data.studentsOutcomes2026?.ug?.onCampus || 0} Placed On-Campus)`
      },
      {
        key: 'att9',
        attrId: 'att9',
        code: 'Attribute IX',
        title: 'Research, Publications & IPR',
        icon: 'award',
        color: 'rose',
        summary: `${(data.attributeIX?.papersPublished?.scopus || 0) + (data.attributeIX?.papersPublished?.wos || 0)} Scopus/WoS Papers, ${(data.attributeIX?.patents?.applied || 0) + (data.attributeIX?.patents?.granted || 0)} Patents`
      },
      {
        key: 'att10',
        attrId: 'att10',
        code: 'Attribute X',
        title: 'Values, Green Campus & CSR',
        icon: 'leaf',
        color: 'emerald',
        summary: `${(data.attributeX?.csrActivities || []).length} CSR Projects, 4 Green Pillars (Paperless, Solar, Water)`
      },
      {
        key: 'activities',
        attrId: 't2_activities',
        code: 'Table 2',
        title: 'Status of Activities Completed',
        icon: 'check-square',
        color: 'blue',
        summary: `${(data.qualitativePresentation?.statusOfActivities?.basedOnAAA2025_2026 || []).length} ATR Action Items Completed`
      },
      {
        key: 'qualitative',
        attrId: null,
        code: '30m Flow',
        title: '30-Min Qualitative Presentation Flow',
        icon: 'presentation',
        color: 'purple',
        summary: 'Signature Achievements, Uniqueness, 2 Flagship Best Practices, SWOC Matrix & Roadmap'
      },
      {
        key: 'pillars',
        attrId: null,
        code: 'Pillars',
        title: 'Crucial Academic Pillars',
        icon: 'layers',
        color: 'teal',
        summary: 'PTM & Feedback, Teaching Innovations, Remedial Coaching & Competitive Exams'
      },
      {
        key: 'panel',
        attrId: null,
        code: '15m Rubric',
        title: '15-Min Panel Review & Evaluation',
        icon: 'clipboard-check',
        color: 'amber',
        summary: `Assigned Grade: ${data.panelReview?.overallGrade || 'A++'} • 10 NAAC Criteria`
      }
    ];

    return `
      <div class="space-y-6">
        <!-- Department Portal Banner -->
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Department Data Hub
              </span>
              <span class="text-xs text-blue-200 font-semibold">St. Joseph's College (Autonomous)</span>
            </div>
            <h2 class="text-2xl font-black">${deptName}</h2>
            <p class="text-xs text-blue-200 mt-1">
              Select any attribute below to view, edit metrics, and download formatted Excel and PDF reports.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="formBuilder.switchTab('complete_dossier')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2">
              <i data-lucide="file-text" class="w-4 h-4"></i>
              <span>Complete Department Dossier</span>
            </button>
            <button type="button" onclick="app.switchView('dashboard')" class="px-4 py-2 bg-white text-blue-950 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2">
              <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
              <span>Show Dashboard</span>
            </button>
          </div>
        </div>

        <!-- Quick Status & Action Strip -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-4">
            <div>
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Submission Status</span>
              <span class="font-bold text-slate-800 uppercase ${status.status === 'submitted' ? 'text-emerald-700' : 'text-amber-700'}">
                ● ${status.status || 'Draft'}
              </span>
            </div>
            <div class="border-l pl-4">
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Data Editing</span>
              <span class="font-bold ${status.is_locked ? 'text-rose-600' : 'text-emerald-600'}">
                ${status.is_locked ? '🔒 Locked for Review' : '🔓 Open for Editing'}
              </span>
            </div>
            <div class="border-l pl-4 hidden sm:block">
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Last Synchronized</span>
              <span class="font-medium text-slate-600 font-mono text-[11px]">
                ${status.last_updated ? new Date(status.last_updated).toLocaleString() : 'Just now'}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="formBuilder.submitDepartmentToIQAC()" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition flex items-center gap-1.5">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              <span>Submit to IQAC</span>
            </button>
          </div>
        </div>

        <!-- Attributes Directory Cards Grid -->
        <div class="space-y-3">
          <div class="flex justify-between items-center border-b pb-2">
            <div>
              <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">Standardized 10 Attributes Directory</h3>
              <p class="text-[11px] text-slate-500">Click <strong>"Fill / Edit"</strong> to modify data, <strong>"View"</strong> to inspect, or download individual <strong>Excel</strong> and <strong>PDF</strong> files.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${cards.map(card => {
              const isAgendaOn = card.attrId && window.dataStore ? window.dataStore.isAttributeEnabled(card.attrId) : true;
              return `
                <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-blue-400 transition space-y-3 flex flex-col justify-between">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">${card.code}</span>
                      ${card.attrId ? (isAgendaOn 
                        ? '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">★ In Agenda</span>' 
                        : '<span class="px-2 py-0.5 rounded text-[9px] font-medium bg-slate-100 text-slate-500 uppercase tracking-wider">Archival</span>'
                      ) : ''}
                    </div>

                    <div class="flex items-start gap-2.5">
                      <span class="p-2 rounded-lg bg-${card.color}-50 text-${card.color}-600 mt-0.5">
                        <i data-lucide="${card.icon}" class="w-4 h-4"></i>
                      </span>
                      <div>
                        <h4 class="text-xs font-bold text-slate-900 leading-tight">${card.title}</h4>
                        <p class="text-[11px] text-slate-500 mt-1 leading-snug">${card.summary}</p>
                      </div>
                    </div>
                  </div>

                  <!-- 4 Action Buttons on Each Attribute Card -->
                  <div class="grid grid-cols-4 gap-1.5 pt-3 border-t border-slate-100 text-[11px]">
                    <button type="button" onclick="formBuilder.openAttribute('${card.key}', 'edit')" class="px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-center transition flex items-center justify-center gap-1 shadow-sm" title="Edit Form">
                      <i data-lucide="edit" class="w-3 h-3"></i>
                      <span>Fill</span>
                    </button>
                    <button type="button" onclick="formBuilder.openAttribute('${card.key}', 'view')" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-center transition flex items-center justify-center gap-1" title="View Preview">
                      <i data-lucide="eye" class="w-3 h-3"></i>
                      <span>View</span>
                    </button>
                    <button type="button" onclick="ExcelExporter.exportAttributeToExcel('${card.key}', window.dataStore.data, '${deptName}')" class="px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded text-center border border-emerald-200 transition flex items-center justify-center gap-1" title="Download Excel">
                      <i data-lucide="file-spreadsheet" class="w-3 h-3"></i>
                      <span>XLS</span>
                    </button>
                    <button type="button" onclick="formBuilder.openAttribute('${card.key}', 'view'); window.print();" class="px-2 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded text-center border border-purple-200 transition flex items-center justify-center gap-1" title="Download PDF / Print">
                      <i data-lucide="printer" class="w-3 h-3"></i>
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderCompleteDossierTab(data) {
    const dept = data.departmentInfo || {};
    const deptName = dept.departmentName || 'Department';
    const sch = dept.scholars || {};
    const ftM = sch.fullTime?.male || 0;
    const ftF = sch.fullTime?.female || 0;
    const ptM = sch.partTime?.male || 0;
    const ptF = sch.partTime?.female || 0;
    const totalScholars = ftM + ftF + ptM + ptF;

    return `
      <div class="space-y-6 max-w-5xl mx-auto">
        <!-- Top Dossier Action Header -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 no-print">
          <div class="flex items-center gap-2">
            <button type="button" onclick="formBuilder.switchTab('hub')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>Attributes Hub</span>
            </button>
            <span class="px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
              Complete Department Audit Dossier
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="ExcelExporter.exportCompleteDepartmentToExcel(window.dataStore.data, '${deptName}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow flex items-center gap-1.5 transition">
              <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
              <span>Download Complete Excel (.xls)</span>
            </button>
            <button type="button" onclick="window.print()" class="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs shadow flex items-center gap-1.5 transition">
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Complete Dossier (PDF)</span>
            </button>
            <button type="button" onclick="formBuilder.submitDepartmentToIQAC()" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow flex items-center gap-1.5 transition">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>Submit to IQAC</span>
            </button>
            <button type="button" onclick="app.switchView('dashboard')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition">
              <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        <!-- Official Institutional Header for Print & Dossier -->
        <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2 border-t-8 border-t-blue-900">
          <span class="text-xs uppercase tracking-widest font-black text-blue-950">Internal Quality Assurance Cell (IQAC)</span>
          <h1 class="text-2xl font-black text-slate-900">St. Joseph's College (Autonomous), Tiruchirappalli</h1>
          <h2 class="text-lg font-bold text-blue-700">Annual Academic and Administrative Audit (AAA) 2026 - 2027</h2>
          <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            <span><strong>Department:</strong> ${deptName}</span>
            <span><strong>Head of Department:</strong> ${dept.hodName || 'Dr. HOD'}</span>
            <span><strong>Established:</strong> ${dept.establishedYear || 'N/A'}</span>
            <span><strong>Audit Grade:</strong> <strong class="text-purple-700 font-bold">${data.panelReview?.overallGrade || 'A++'}</strong></span>
          </div>
        </div>

        <!-- Section 1: Research Scholars Matrix -->
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b pb-2">1. Table 1: Research Scholars Matrix</h3>
          <div class="grid grid-cols-4 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded border">Full-Time Male: <strong>${ftM}</strong></div>
            <div class="p-3 bg-slate-50 rounded border">Full-Time Female: <strong>${ftF}</strong></div>
            <div class="p-3 bg-slate-50 rounded border">Part-Time Male: <strong>${ptM}</strong></div>
            <div class="p-3 bg-slate-50 rounded border">Part-Time Female: <strong>${ptF}</strong></div>
            <div class="col-span-4 p-3 bg-blue-50 border border-blue-200 rounded font-bold text-blue-900 flex justify-between">
              <span>Total Research Scholars:</span>
              <span class="text-sm font-black font-mono">${totalScholars} Scholars</span>
            </div>
          </div>
        </div>

        <!-- Section 2: 10 Attributes High-Level Summary Matrix -->
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b pb-2">2. Consolidated 10-Attribute Audit Matrix</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att I: Value Added & Certificate Courses:</span>
              <strong class="text-slate-900">${(data.attributeI?.vac || []).length} VACs, ${(data.attributeI?.cc || []).length} CCs</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att II: Faculty Ph.D. / NET / SET:</span>
              <strong class="text-slate-900">${data.attributeII?.netSet?.count || 0} Qualified</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att III: Lab Equipments Procured:</span>
              <strong class="text-indigo-700 font-bold">${(data.attributeIII?.purchasedEquipments || []).length} items</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att III: Department Library Books:</span>
              <strong class="text-purple-700 font-bold">${data.attributeIII?.departmentLibrary?.totalBooks || 0} books</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att IV & VII: External Grants Mobilized:</span>
              <strong class="text-emerald-700 font-bold">${(data.attributeIV_VII?.externalFunds || []).length} Grants</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att V: Active MoUs & Linkages:</span>
              <strong class="text-blue-700 font-bold">${data.attributeV?.mouCreated?.count || 0} new, ${data.attributeV?.linkages?.count || 0} linkages</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att VI & VIII: Clubs & Student Awards:</span>
              <strong class="text-amber-700 font-bold">${(data.attributeVI_VIII?.clubs || []).length} clubs, ${(data.attributeVI_VIII?.studentAwards || []).length} awards</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Table 10: Student Placements (Batch 2026):</span>
              <strong class="text-teal-700 font-bold">${data.studentsOutcomes2026?.ug?.onCampus || 0} UG On-Campus</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att IX: Scopus & WoS Research Papers:</span>
              <strong class="text-purple-700 font-bold">${(data.attributeIX?.papersPublished?.scopus || 0) + (data.attributeIX?.papersPublished?.wos || 0)} papers</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded border flex justify-between">
              <span>Att X: CSR Projects & Green Campus:</span>
              <strong class="text-emerald-700 font-bold">${(data.attributeX?.csrActivities || []).length} CSR drives</strong>
            </div>
          </div>
        </div>

        <!-- Section 3: Committee Evaluation & Signatures -->
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b pb-2">3. Audit Committee Endorsement & Sign-Off</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-2">
            <div class="p-3 bg-slate-50 rounded border text-center space-y-1">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">External Expert</span>
              <span class="font-bold text-slate-800 block">${data.panelReview?.expertName || 'Prof. External Expert'}</span>
              <div class="pt-8 border-t border-slate-300 text-[10px] text-slate-400">Signature</div>
            </div>
            <div class="p-3 bg-slate-50 rounded border text-center space-y-1">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">School Dean</span>
              <span class="font-bold text-slate-800 block">${data.panelReview?.deanName || 'School Dean'}</span>
              <div class="pt-8 border-t border-slate-300 text-[10px] text-slate-400">Signature</div>
            </div>
            <div class="p-3 bg-slate-50 rounded border text-center space-y-1">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">IQAC Coordinator</span>
              <span class="font-bold text-slate-800 block">${data.panelReview?.iqacCoordinator || 'Dr. IQAC Coordinator'}</span>
              <div class="pt-8 border-t border-slate-300 text-[10px] text-slate-400">Signature</div>
            </div>
            <div class="p-3 bg-slate-50 rounded border text-center space-y-1">
              <span class="text-[10px] text-slate-500 uppercase block font-semibold">Principal</span>
              <span class="font-bold text-slate-800 block">${data.panelReview?.administratorName || 'Rev. Dr. Principal'}</span>
              <div class="pt-8 border-t border-slate-300 text-[10px] text-slate-400">Signature</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

    // TAB 1: Department Profile & Table 1 Scholars Matrix
  renderProfileTab(info) {
    const scholars = info.scholars || { fullTime: { male: 0, female: 0 }, partTime: { male: 0, female: 0 } };
    const ftM = scholars.fullTime?.male || 0;
    const ftF = scholars.fullTime?.female || 0;
    const ftTotal = ftM + ftF;
    const ptM = scholars.partTime?.male || 0;
    const ptF = scholars.partTime?.female || 0;
    const ptTotal = ptM + ptF;
    const maleTotal = ftM + ptM;
    const femaleTotal = ftF + ptF;
    const totalScholars = ftTotal + ptTotal || info.researchScholarsCount || 0;

    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Department Profile & Institutional Identity</h3>
            <p class="text-xs text-slate-500">Official identifiers for the Annual Academic Audit 2026 - 2027.</p>
          </div>
          <span class="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">questions.docx - Table 1</span>
        </div>

        ${this.renderAgendaBanner('t1_scholars', 'Table 1 - Research Scholars Profile')}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Institution Name</label>
            <input type="text" value="${info.collegeName || ''}" onchange="formBuilder.updateField('departmentInfo.collegeName', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Accreditation / Status</label>
            <input type="text" value="${info.accreditation || ''}" onchange="formBuilder.updateField('departmentInfo.accreditation', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Audit Academic Year</label>
            <input type="text" value="${info.academicYear || '2026 - 2027'}" onchange="formBuilder.updateField('departmentInfo.academicYear', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Department Name</label>
            <input type="text" value="${info.departmentName || ''}" onchange="formBuilder.updateField('departmentInfo.departmentName', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom font-medium text-blue-900" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">School</label>
            <input type="text" value="${info.school || ''}" onchange="formBuilder.updateField('departmentInfo.school', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Head of the Department (HOD)</label>
            <input type="text" value="${info.hodName || ''}" onchange="formBuilder.updateField('departmentInfo.hodName', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Audit Scheduled Date</label>
            <input type="date" value="${info.auditDate || ''}" onchange="formBuilder.updateField('departmentInfo.auditDate', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Total Faculty Members</label>
            <input type="number" value="${info.facultyCount || 0}" onchange="formBuilder.updateField('departmentInfo.facultyCount', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Total UG Students Enrolled</label>
            <input type="number" value="${info.studentCountUG || 0}" onchange="formBuilder.updateField('departmentInfo.studentCountUG', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Total PG Students Enrolled</label>
            <input type="number" value="${info.studentCountPG || 0}" onchange="formBuilder.updateField('departmentInfo.studentCountPG', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Total Research Scholars (Table 1)</label>
            <input type="number" readonly value="${totalScholars}" class="w-full text-xs px-3 py-2 border border-purple-300 rounded-lg bg-purple-50 font-bold text-purple-900 cursor-not-allowed" title="Auto-computed from Table 1 Scholars Matrix below" />
          </div>
        </div>

        <!-- Table 1: Research Scholars Matrix (From Word Doc Table 1) -->
        <div class="bg-purple-50/50 p-4 rounded-xl border border-purple-200 mt-4">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
                <i data-lucide="graduation-cap" class="w-4 h-4 text-purple-600"></i>
                Table 1: Research Scholars Matrix (FT & PT x Male & Female)
              </h4>
              <p class="text-[11px] text-slate-500">Official doctoral scholars enrollment distribution as required by IQAC AAA questionnaire.</p>
            </div>
            <span class="px-3 py-1 bg-purple-600 text-white text-xs font-black rounded-lg shadow-sm">
              Total: ${totalScholars} Scholars
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left bg-white rounded-lg border border-purple-200 overflow-hidden">
              <thead class="bg-purple-100/70 text-purple-950 font-bold border-b border-purple-200">
                <tr>
                  <th class="p-2.5">Scholars Type</th>
                  <th class="p-2.5 text-center">Male</th>
                  <th class="p-2.5 text-center">Female</th>
                  <th class="p-2.5 text-center font-black">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-purple-100">
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">FT (Full Time)</td>
                  <td class="p-2.5 text-center">
                    <input type="number" min="0" value="${scholars.fullTime?.male || 0}" onchange="formBuilder.updateScholarField('fullTime', 'male', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 text-center border border-slate-300 rounded font-bold text-blue-700" />
                  </td>
                  <td class="p-2.5 text-center">
                    <input type="number" min="0" value="${scholars.fullTime?.female || 0}" onchange="formBuilder.updateScholarField('fullTime', 'female', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 text-center border border-slate-300 rounded font-bold text-purple-700" />
                  </td>
                  <td class="p-2.5 text-center font-black text-slate-800 bg-purple-50/40">${ftTotal}</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">PT (Part Time)</td>
                  <td class="p-2.5 text-center">
                    <input type="number" min="0" value="${scholars.partTime?.male || 0}" onchange="formBuilder.updateScholarField('partTime', 'male', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 text-center border border-slate-300 rounded font-bold text-blue-700" />
                  </td>
                  <td class="p-2.5 text-center">
                    <input type="number" min="0" value="${scholars.partTime?.female || 0}" onchange="formBuilder.updateScholarField('partTime', 'female', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 text-center border border-slate-300 rounded font-bold text-purple-700" />
                  </td>
                  <td class="p-2.5 text-center font-black text-slate-800 bg-purple-50/40">${ptTotal}</td>
                </tr>
                <tr class="bg-purple-100/60 font-black text-slate-900 border-t border-purple-200">
                  <td class="p-2.5">Total</td>
                  <td class="p-2.5 text-center text-blue-900">${maleTotal}</td>
                  <td class="p-2.5 text-center text-purple-900">${femaleTotal}</td>
                  <td class="p-2.5 text-center text-emerald-800 text-sm">${totalScholars}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mt-4">
          <i data-lucide="info" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"></i>
          <div class="text-xs text-blue-900 leading-relaxed">
            <span class="font-semibold">60-Minute Presentation Standard:</span>
            First 15 minutes is strictly allocated for the Departmental Dashboard presentation covering numeric and graphical highlights across all Attributes. The subsequent 30 minutes is for deep-dive qualitative impact, followed by 15 minutes of panel interaction with Administrators, IQAC, School Dean, and External Expert.
          </div>
        </div>
      </div>
    `;
  }

  // TAB: Status of Activities Completed (Table 2 from Word Doc)
  renderActivitiesTab(qual) {
    if (!qual) qual = {};
    if (!qual.statusOfActivities) {
      qual.statusOfActivities = {
        basedOnAAA2025_2026: [],
        basedOnFacultyOrientation2026: []
      };
    }
    const act = qual.statusOfActivities;
    const listAAA = act.basedOnAAA2025_2026 || [];
    const listFOP = act.basedOnFacultyOrientation2026 || [];

    const completedAAA = listAAA.filter(x => x.status === 'Completed').length;
    const completedFOP = listFOP.filter(x => x.status === 'Completed').length;

    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Status of Activities Completed</h3>
            <p class="text-xs text-slate-500">Compliance and progress tracking based on previous audits and institutional commitments.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">questions.docx - Table 2</span>
        </div>

        ${this.renderAgendaBanner('t2_activities', 'Table 2 - Status of Activities')}

        <!-- Section A: Based on AAA 2025 - 2026 -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
                1. Based on AAA 2025 – 2026
              </h4>
              <p class="text-[11px] text-slate-500">Action taken on recommendations and commitments of the previous Academic Audit.</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                ${completedAAA} / ${listAAA.length} Completed
              </span>
              <button type="button" onclick="formBuilder.addActivityRow('basedOnAAA2025_2026')" class="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Activity
              </button>
            </div>
          </div>

          <div class="space-y-2">
            ${listAAA.map((item, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-12 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div class="md:col-span-4">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Event / Activity</label>
                  <input type="text" placeholder="Event / Activity name" value="${item.eventActivity || ''}" onchange="formBuilder.updateActivityItem('basedOnAAA2025_2026', ${idx}, 'eventActivity', this.value)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div class="md:col-span-2">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Month & Year</label>
                  <input type="text" placeholder="e.g. July 2026" value="${item.monthYear || ''}" onchange="formBuilder.updateActivityItem('basedOnAAA2025_2026', ${idx}, 'monthYear', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="md:col-span-2">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Status</label>
                  <select onchange="formBuilder.updateActivityItem('basedOnAAA2025_2026', ${idx}, 'status', this.value)" class="w-full text-xs p-1.5 border rounded font-bold ${item.status === 'Completed' ? 'text-emerald-700' : 'text-amber-700'}">
                    <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Not Completed" ${item.status === 'Not Completed' ? 'selected' : ''}>Not Completed</option>
                  </select>
                </div>
                <div class="md:col-span-3">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Remarks</label>
                  <input type="text" placeholder="Remarks & tangible impact" value="${item.remarks || ''}" onchange="formBuilder.updateActivityItem('basedOnAAA2025_2026', ${idx}, 'remarks', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="md:col-span-1 text-right">
                  <button type="button" onclick="formBuilder.removeActivityRow('basedOnAAA2025_2026', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
            ${listAAA.length === 0 ? '<div class="p-3 text-center text-xs text-slate-400 bg-white rounded border border-dashed">No activities listed yet. Click "+ Add Activity" above.</div>' : ''}
          </div>
        </div>

        <!-- Section B: Based on Faculty Orientation Programme June 2026 -->
        <div class="bg-blue-50/40 p-4 rounded-xl border border-blue-200 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-4 h-4 text-blue-600"></i>
                2. Based on Data provided during Faculty Orientation Programme – June 2026
              </h4>
              <p class="text-[11px] text-slate-500">Activities executed against commitments presented during the annual Faculty Orientation.</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                ${completedFOP} / ${listFOP.length} Completed
              </span>
              <button type="button" onclick="formBuilder.addActivityRow('basedOnFacultyOrientation2026')" class="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Activity
              </button>
            </div>
          </div>

          <div class="space-y-2">
            ${listFOP.map((item, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-12 gap-2 bg-white p-2.5 rounded-lg border border-blue-200 items-center">
                <div class="md:col-span-4">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Event / Activity</label>
                  <input type="text" placeholder="Event / Activity name" value="${item.eventActivity || ''}" onchange="formBuilder.updateActivityItem('basedOnFacultyOrientation2026', ${idx}, 'eventActivity', this.value)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div class="md:col-span-2">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Month & Year</label>
                  <input type="text" placeholder="e.g. August 2026" value="${item.monthYear || ''}" onchange="formBuilder.updateActivityItem('basedOnFacultyOrientation2026', ${idx}, 'monthYear', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="md:col-span-2">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Status</label>
                  <select onchange="formBuilder.updateActivityItem('basedOnFacultyOrientation2026', ${idx}, 'status', this.value)" class="w-full text-xs p-1.5 border rounded font-bold ${item.status === 'Completed' ? 'text-emerald-700' : 'text-amber-700'}">
                    <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Not Completed" ${item.status === 'Not Completed' ? 'selected' : ''}>Not Completed</option>
                  </select>
                </div>
                <div class="md:col-span-3">
                  <label class="text-[10px] font-semibold text-slate-500 block md:hidden">Remarks</label>
                  <input type="text" placeholder="Remarks & tangible impact" value="${item.remarks || ''}" onchange="formBuilder.updateActivityItem('basedOnFacultyOrientation2026', ${idx}, 'remarks', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="md:col-span-1 text-right">
                  <button type="button" onclick="formBuilder.removeActivityRow('basedOnFacultyOrientation2026', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
            ${listFOP.length === 0 ? '<div class="p-3 text-center text-xs text-slate-400 bg-white rounded border border-dashed">No activities listed yet. Click "+ Add Activity" above.</div>' : ''}
          </div>
        </div>
      </div>
    `;
  }

  // TAB 2: Attribute I - Curriculum Design
  renderAtt1Tab(att1) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute I - Curriculum Design</h3>
            <p class="text-xs text-slate-500">Value Added Courses (VAC), Certificate Courses (CC), Indian Knowledge Systems (IKS), Visits, Internships, and MOOCs.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">questions.docx - Table 1 & 2</span>
        </div>

        ${this.renderAgendaBanner('attr1', 'Attribute I - Curriculum Design')}

        <!-- 1. Value Added Courses (VAC) -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <i data-lucide="award" class="w-4 h-4 text-emerald-600"></i>
              1. Value Added Courses (VAC)
            </h4>
            <button type="button" onclick="formBuilder.addVacRow()" class="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add VAC
            </button>
          </div>
          <div class="space-y-2">
            ${(att1.vac || []).map((vac, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div class="md:col-span-2">
                  <input type="text" placeholder="Course Title" value="${vac.name || ''}" onchange="formBuilder.updateArrayItem('attributeI.vac', ${idx}, 'name', this.value)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
                <div>
                  <input type="number" placeholder="Enrolled" value="${vac.studentsEnrolled || 0}" onchange="formBuilder.updateArrayItem('attributeI.vac', ${idx}, 'studentsEnrolled', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" title="Students Enrolled" />
                </div>
                <div>
                  <input type="number" placeholder="Fee ₹" value="${vac.feeCollected || 0}" onchange="formBuilder.updateArrayItem('attributeI.vac', ${idx}, 'feeCollected', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" title="Fee Collected" />
                </div>
                <div class="flex items-center gap-1">
                  <input type="text" placeholder="Agencies Involved" value="${vac.agenciesInvolved || ''}" onchange="formBuilder.updateArrayItem('attributeI.vac', ${idx}, 'agenciesInvolved', this.value)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                  <button type="button" onclick="formBuilder.removeArrayItem('attributeI.vac', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Certificate Courses (CC) -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <i data-lucide="file-badge" class="w-4 h-4 text-blue-600"></i>
              2. Certificate Courses (CC)
            </h4>
            <button type="button" onclick="formBuilder.addCcRow()" class="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add CC
            </button>
          </div>
          <div class="space-y-2">
            ${(att1.cc || []).map((cc, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div class="md:col-span-2">
                  <input type="text" placeholder="Certificate Course Title" value="${cc.name || ''}" onchange="formBuilder.updateArrayItem('attributeI.cc', ${idx}, 'name', this.value)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
                <div>
                  <input type="number" placeholder="Enrolled" value="${cc.studentsEnrolled || 0}" onchange="formBuilder.updateArrayItem('attributeI.cc', ${idx}, 'studentsEnrolled', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
                <div>
                  <input type="number" placeholder="Fee ₹" value="${cc.feeCollected || 0}" onchange="formBuilder.updateArrayItem('attributeI.cc', ${idx}, 'feeCollected', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
                <div class="flex items-center gap-1">
                  <input type="text" placeholder="Agencies Involved" value="${cc.agenciesInvolved || ''}" onchange="formBuilder.updateArrayItem('attributeI.cc', ${idx}, 'agenciesInvolved', this.value)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                  <button type="button" onclick="formBuilder.removeArrayItem('attributeI.cc', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Indian Knowledge Systems (IKS) & Field Visits -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
              <i data-lucide="compass" class="w-4 h-4 text-amber-600"></i>
              3. IKS Activities (Indian Knowledge Systems)
            </h4>
            <div class="grid grid-cols-4 gap-2 mb-3">
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Seminar</label>
                <input type="number" value="${att1.iks?.seminarCount || 0}" onchange="formBuilder.updateField('attributeI.iks.seminarCount', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Workshop</label>
                <input type="number" value="${att1.iks?.workshopCount || 0}" onchange="formBuilder.updateField('attributeI.iks.workshopCount', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Field Visit</label>
                <input type="number" value="${att1.iks?.fieldVisitCount || 0}" onchange="formBuilder.updateField('attributeI.iks.fieldVisitCount', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Benefitted</label>
                <input type="number" value="${att1.iks?.studentsBenefitted || 0}" onchange="formBuilder.updateField('attributeI.iks.studentsBenefitted', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
            </div>
            <div>
              <label class="block text-[11px] text-slate-600 font-medium mb-1">Details & Specific Highlights</label>
              <textarea rows="2" onchange="formBuilder.updateField('attributeI.iks.details', this.value)" class="w-full text-xs p-2 border border-slate-300 rounded">${att1.iks?.details || ''}</textarea>
            </div>
          </div>

          <!-- 4. Visits -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-4 h-4 text-indigo-600"></i>
              4. Visits (Industrial / Educational / Field Work)
            </h4>
            <div class="grid grid-cols-4 gap-2 mb-3">
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Industrial</label>
                <input type="number" value="${att1.visits?.industrial || 0}" onchange="formBuilder.updateField('attributeI.visits.industrial', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Educational</label>
                <input type="number" value="${att1.visits?.educational || 0}" onchange="formBuilder.updateField('attributeI.visits.educational', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Field Work</label>
                <input type="number" value="${att1.visits?.fieldWork || 0}" onchange="formBuilder.updateField('attributeI.visits.fieldWork', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Field Visit</label>
                <input type="number" value="${att1.visits?.fieldVisit || 0}" onchange="formBuilder.updateField('attributeI.visits.fieldVisit', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Students Participated</label>
                <input type="number" value="${att1.visits?.studentsParticipated || 0}" onchange="formBuilder.updateField('attributeI.visits.studentsParticipated', parseInt(this.value)||0)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
              <div>
                <label class="block text-[11px] text-slate-600 font-medium">Class & Section</label>
                <input type="text" value="${att1.visits?.classSec || ''}" onchange="formBuilder.updateField('attributeI.visits.classSec', this.value)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
              </div>
            </div>
            <div>
              <input type="text" placeholder="Visit destinations & highlights" value="${att1.visits?.details || ''}" onchange="formBuilder.updateField('attributeI.visits.details', this.value)" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
            </div>
          </div>
        </div>

        <!-- 5. Internship / Outside Curriculum Projects -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <i data-lucide="briefcase" class="w-4 h-4 text-purple-600"></i>
            5. Internships / Projects with Industries / Other Institutions (Outside Curriculum)
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Students Involved (Count)</label>
              <input type="number" value="${att1.internships?.studentsInvolved || 0}" onchange="formBuilder.updateField('attributeI.internships.studentsInvolved', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
            </div>
            <div class="md:col-span-3">
              <label class="block text-xs font-medium text-slate-700 mb-1">Industry Details & Organizations</label>
              <input type="text" value="${att1.internships?.details || ''}" onchange="formBuilder.updateField('attributeI.internships.details', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" placeholder="Mention companies, research institutes, stipends..." />
            </div>
          </div>
        </div>

        <!-- 6. Parent Teacher Meetings (PTM) (Table 3 Row 7 from Word Doc) -->
        <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <i data-lucide="users" class="w-4 h-4 text-amber-600"></i>
              6. Parent Teacher Meetings (PTM)
            </h4>
            <span class="text-[11px] text-amber-800 font-semibold">Table 3 Row 7</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Number of PTMs</label>
              <input type="number" min="0" value="${att1.ptm?.numberOfPTMs || 0}" onchange="formBuilder.updateField('attributeI.ptm.numberOfPTMs', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Number of Parents Participated</label>
              <input type="number" min="0" value="${att1.ptm?.parentsParticipated || 0}" onchange="formBuilder.updateField('attributeI.ptm.parentsParticipated', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-slate-700 mb-1">PTM Progress / Feedback Highlights</label>
              <input type="text" value="${att1.ptm?.details || ''}" onchange="formBuilder.updateField('attributeI.ptm.details', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" placeholder="Mention mentoring outcomes, attendance review, parent feedback..." />
            </div>
          </div>
        </div>

        <!-- 7. MOOC Registrations and Completions (Table 4 from Word Doc) -->
        <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
          <h4 class="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
            <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i>
            7. Students Registering / Completing MOOC (NPTEL / SWAYAM / Coursera - Table 4)
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left bg-white rounded-lg overflow-hidden border border-slate-200">
              <thead class="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th class="p-2.5 border-b">Programme</th>
                  <th class="p-2.5 border-b">Total Students</th>
                  <th class="p-2.5 border-b">Reg. Cycle I (July-Oct)</th>
                  <th class="p-2.5 border-b">Reg. Cycle II (Nov-Apr)</th>
                  <th class="p-2.5 border-b">Completed Cycle I</th>
                  <th class="p-2.5 border-b">Completed Cycle II</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr>
                  <td class="p-2.5 font-bold text-slate-800">UG</td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.ug?.totalStudents || 0}" onchange="formBuilder.updateField('attributeI.moocs.ug.totalStudents', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.ug?.cycle1_registered || 0}" onchange="formBuilder.updateField('attributeI.moocs.ug.cycle1_registered', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.ug?.cycle2_registered || 0}" onchange="formBuilder.updateField('attributeI.moocs.ug.cycle2_registered', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.ug?.cycle1_completed || 0}" onchange="formBuilder.updateField('attributeI.moocs.ug.cycle1_completed', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.ug?.cycle2_completed || 0}" onchange="formBuilder.updateField('attributeI.moocs.ug.cycle2_completed', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-800">PG</td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.pg?.totalStudents || 0}" onchange="formBuilder.updateField('attributeI.moocs.pg.totalStudents', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.pg?.cycle1_registered || 0}" onchange="formBuilder.updateField('attributeI.moocs.pg.cycle1_registered', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.pg?.cycle2_registered || 0}" onchange="formBuilder.updateField('attributeI.moocs.pg.cycle2_registered', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.pg?.cycle1_completed || 0}" onchange="formBuilder.updateField('attributeI.moocs.pg.cycle1_completed', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                  <td class="p-2"><input type="number" value="${att1.moocs?.pg?.cycle2_completed || 0}" onchange="formBuilder.updateField('attributeI.moocs.pg.cycle2_completed', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 3: Attribute II - Faculty Resources
  renderAtt2Tab(att2) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute II - Faculty Resources</h3>
            <p class="text-xs text-slate-500">Qualifications, Editorial & Review, Professional bodies, Resource Persons, FDPs, Fellowships, and Abroad visits.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">questions.docx - Table 3</span>
        </div>

        ${this.renderAgendaBanner('attr2', 'Attribute II - Faculty Resources')}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Degrees & NET/SET -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold uppercase text-slate-700">1. Higher Degrees & Eligibility</h4>
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-medium text-slate-700">Faculty Receiving New Degrees (Ph.D./PDF)</label>
                <input type="number" value="${att2.newDegrees?.count || 0}" onchange="formBuilder.updateField('attributeII.newDegrees.count', parseInt(this.value)||0)" class="w-20 text-xs p-1 border rounded" />
              </div>
              <input type="text" placeholder="Details of faculty and degrees" value="${att2.newDegrees?.details || ''}" onchange="formBuilder.updateField('attributeII.newDegrees.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-medium text-slate-700">NET / SET / JRF / Others Qualified</label>
                <input type="number" value="${att2.netSetJrf?.count || 0}" onchange="formBuilder.updateField('attributeII.netSetJrf.count', parseInt(this.value)||0)" class="w-20 text-xs p-1 border rounded" />
              </div>
              <input type="text" placeholder="Details of exam cleared" value="${att2.netSetJrf?.details || ''}" onchange="formBuilder.updateField('attributeII.netSetJrf.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>

          <!-- Recognized Bodies & Research Journals -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold uppercase text-slate-700">2. Recognized Bodies & Editorial Roles</h4>
            <div>
              <label class="text-xs font-medium text-slate-700 block mb-1">Member in Recognized Bodies</label>
              <div class="grid grid-cols-2 gap-2 mb-1">
                <input type="number" placeholder="BoS Count" value="${att2.recognizedBodies?.bosCount || 0}" onchange="formBuilder.updateField('attributeII.recognizedBodies.bosCount', parseInt(this.value)||0)" class="text-xs p-1 border rounded" title="BoS Memberships" />
                <input type="number" placeholder="External Audit Member Count" value="${att2.recognizedBodies?.externalAuditCount || 0}" onchange="formBuilder.updateField('attributeII.recognizedBodies.externalAuditCount', parseInt(this.value)||0)" class="text-xs p-1 border rounded" title="External Audit Members" />
              </div>
              <input type="text" placeholder="Details of universities / colleges" value="${att2.recognizedBodies?.details || ''}" onchange="formBuilder.updateField('attributeII.recognizedBodies.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>

            <div>
              <label class="text-xs font-medium text-slate-700 block mb-1">Contribution to Research Journals</label>
              <div class="grid grid-cols-2 gap-2 mb-1">
                <input type="number" placeholder="Reviewers Count" value="${att2.researchJournals?.reviewersCount || 0}" onchange="formBuilder.updateField('attributeII.researchJournals.reviewersCount', parseInt(this.value)||0)" class="text-xs p-1 border rounded" />
                <input type="number" placeholder="Editors Count" value="${att2.researchJournals?.editorsCount || 0}" onchange="formBuilder.updateField('attributeII.researchJournals.editorsCount', parseInt(this.value)||0)" class="text-xs p-1 border rounded" />
              </div>
              <input type="text" placeholder="Journal titles" value="${att2.researchJournals?.details || ''}" onchange="formBuilder.updateField('attributeII.researchJournals.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>
        </div>

        <!-- Resource Person & Professional Bodies -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <h4 class="text-xs font-bold uppercase text-slate-700">3. Resource Person Engagements</h4>
          <div class="grid grid-cols-5 gap-2">
            <div>
              <label class="text-[11px] block font-medium">International</label>
              <input type="number" value="${att2.resourcePerson?.international || 0}" onchange="formBuilder.updateField('attributeII.resourcePerson.international', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">National</label>
              <input type="number" value="${att2.resourcePerson?.national || 0}" onchange="formBuilder.updateField('attributeII.resourcePerson.national', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">State</label>
              <input type="number" value="${att2.resourcePerson?.state || 0}" onchange="formBuilder.updateField('attributeII.resourcePerson.state', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Regional</label>
              <input type="number" value="${att2.resourcePerson?.regional || 0}" onchange="formBuilder.updateField('attributeII.resourcePerson.regional', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Institutional</label>
              <input type="number" value="${att2.resourcePerson?.institutional || 0}" onchange="formBuilder.updateField('attributeII.resourcePerson.institutional', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-slate-700 block mb-1">Mention Faculty served at International / National Level</label>
            <input type="text" value="${att2.resourcePerson?.servedFacultyNames || ''}" onchange="formBuilder.updateField('attributeII.resourcePerson.servedFacultyNames', this.value)" class="w-full text-xs p-2 border rounded" placeholder="Faculty name, event title, host institution..." />
          </div>
        </div>

        <!-- FDP & Industrial Training -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700">4. Faculty Development Programmes (FDP)</h4>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[11px] block text-slate-600">MMTTC / AICTE / UGC</label>
                <input type="number" value="${att2.fdp?.mmttc_aicte_ugc || 0}" onchange="formBuilder.updateField('attributeII.fdp.mmttc_aicte_ugc', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block text-slate-600">Other Institutions</label>
                <input type="number" value="${att2.fdp?.otherInstitutions || 0}" onchange="formBuilder.updateField('attributeII.fdp.otherInstitutions', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block text-slate-600">Through College FDC</label>
                <input type="number" value="${att2.fdp?.throughFdc || 0}" onchange="formBuilder.updateField('attributeII.fdp.throughFdc', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block text-slate-600">Institutional Level</label>
                <input type="number" value="${att2.fdp?.institutionalLevel || 0}" onchange="formBuilder.updateField('attributeII.fdp.institutionalLevel', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <input type="text" placeholder="FDP highlights / themes" value="${att2.fdp?.details || ''}" onchange="formBuilder.updateField('attributeII.fdp.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>

          <!-- Industrial Training, Fellowships, Abroad -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700">5. Industry Training & Abroad Visits</h4>
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-[11px] text-slate-700 font-medium">Gone for Industrial Training</label>
                <input type="number" value="${att2.industrialTraining?.count || 0}" onchange="formBuilder.updateField('attributeII.industrialTraining.count', parseInt(this.value)||0)" class="w-20 text-xs p-1 border rounded" />
              </div>
              <input type="text" placeholder="Sponsored by & Amount Sponsored" value="${att2.industrialTraining?.details || ''}" onchange="formBuilder.updateField('attributeII.industrialTraining.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-[11px] text-slate-700 font-medium">Abroad Visits for Academic Purpose</label>
                <input type="number" value="${att2.abroadVisits?.count || 0}" onchange="formBuilder.updateField('attributeII.abroadVisits.count', parseInt(this.value)||0)" class="w-20 text-xs p-1 border rounded" />
              </div>
              <input type="text" placeholder="Mention faculty names, countries visited" value="${att2.abroadVisits?.facultyNames || ''}" onchange="formBuilder.updateField('attributeII.abroadVisits.facultyNames', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>
        </div>

        <!-- Awards, Fellowships, Social Projects & MOOCs -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label class="text-xs font-medium text-slate-700 block mb-1">Awards from Recognized Agencies</label>
            <input type="number" value="${att2.awards?.count || 0}" onchange="formBuilder.updateField('attributeII.awards.count', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded mb-1" />
            <input type="text" placeholder="Details of awards" value="${att2.awards?.details || ''}" onchange="formBuilder.updateField('attributeII.awards.details', this.value)" class="w-full text-xs p-1 border rounded" />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-700 block mb-1">Fellowships (National / Int)</label>
            <div class="flex gap-1 mb-1">
              <input type="number" placeholder="Nat" value="${att2.fellowships?.national || 0}" onchange="formBuilder.updateField('attributeII.fellowships.national', parseInt(this.value)||0)" class="w-1/2 text-xs p-1 border rounded" />
              <input type="number" placeholder="Int" value="${att2.fellowships?.international || 0}" onchange="formBuilder.updateField('attributeII.fellowships.international', parseInt(this.value)||0)" class="w-1/2 text-xs p-1 border rounded" />
            </div>
            <input type="text" placeholder="Details" value="${att2.fellowships?.details || ''}" onchange="formBuilder.updateField('attributeII.fellowships.details', this.value)" class="w-full text-xs p-1 border rounded" />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-700 block mb-1">Social Sector Projects</label>
            <input type="number" value="${att2.socialSectorProjects?.count || 0}" onchange="formBuilder.updateField('attributeII.socialSectorProjects.count', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded mb-1" />
            <input type="text" placeholder="Community / NGO project details" value="${att2.socialSectorProjects?.details || ''}" onchange="formBuilder.updateField('attributeII.socialSectorProjects.details', this.value)" class="w-full text-xs p-1 border rounded" />
          </div>
          <div>
            <label class="text-xs font-medium text-slate-700 block mb-1">Faculty Enrolled in MOOC</label>
            <div class="flex gap-1 mb-1">
              <input type="number" placeholder="Reg" value="${att2.facultyMooc?.registered || 0}" onchange="formBuilder.updateField('attributeII.facultyMooc.registered', parseInt(this.value)||0)" class="w-1/2 text-xs p-1 border rounded" />
              <input type="number" placeholder="Comp" value="${att2.facultyMooc?.completed || 0}" onchange="formBuilder.updateField('attributeII.facultyMooc.completed', parseInt(this.value)||0)" class="w-1/2 text-xs p-1 border rounded" />
            </div>
            <input type="text" placeholder="NPTEL/Coursera details" value="${att2.facultyMooc?.details || ''}" onchange="formBuilder.updateField('attributeII.facultyMooc.details', this.value)" class="w-full text-xs p-1 border rounded" />
          </div>
        </div>
      </div>
    `;
  }


  // TAB: Attribute III - Infrastructure & Learning Resources
  renderAtt3Tab(att3) {
    const safeAtt3 = att3 || {};
    const equipments = safeAtt3.purchasedEquipments || [];
    const library = safeAtt3.departmentLibrary || {
      booksPurchased2026_2027: 0,
      totalBooks: 0,
      nationalJournalsPurchased2026_2027: 0,
      internationalJournalsPurchased2026_2027: 0,
      totalJournals: 0,
      dailyFacultyFootfall: 0,
      dailyStudentFootfall: 0
    };

    const totalEquipmentSpend = equipments.reduce((sum, item) => sum + (Number(item.amountINR) || 0), 0);

    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute III - Infrastructure & Learning Resources</h3>
            <p class="text-xs text-slate-500">Laboratory Equipment Purchases (3.1) and Department Library Resources & Footfall (3.2).</p>
          </div>
          <span class="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">Templates_AAA_2026-2027 - Attribute-III</span>
        </div>

        ${this.renderAgendaBanner('attr3', 'Attribute III - Infrastructure & Learning Resources')}

        <!-- Quick Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-indigo-700 uppercase">Equipments Purchased</span>
            <div class="text-xl font-bold text-indigo-900 mt-1">${equipments.length} <span class="text-xs font-normal text-indigo-600">items</span></div>
          </div>
          <div class="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-blue-700 uppercase">Equipment Investment</span>
            <div class="text-xl font-bold text-blue-900 mt-1">₹${(totalEquipmentSpend / 100000).toFixed(2)} <span class="text-xs font-normal text-blue-600">Lakhs</span></div>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-emerald-700 uppercase">Dept Library Books</span>
            <div class="text-xl font-bold text-emerald-900 mt-1">${library.totalBooks || 0} <span class="text-xs font-normal text-emerald-600">(+${library.booksPurchased2026_2027 || 0} new)</span></div>
          </div>
          <div class="bg-purple-50 border border-purple-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-purple-700 uppercase">Daily Library Footfall</span>
            <div class="text-xl font-bold text-purple-900 mt-1">${(library.dailyFacultyFootfall || 0) + (library.dailyStudentFootfall || 0)} <span class="text-xs font-normal text-purple-600">visits/day</span></div>
          </div>
        </div>

        <!-- Section 3.1: Purchased Equipments -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <i data-lucide="hard-drive" class="w-4 h-4 text-indigo-600"></i>
                3.1 Laboratory Equipment Purchased in A.Y. 2026-2027
              </h4>
              <p class="text-[11px] text-slate-500 mt-0.5">List of major equipment, software licenses, and research hardware procured.</p>
            </div>
            <button type="button" onclick="formBuilder.addFacilityRow()" class="text-xs px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Equipment
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left text-slate-700">
              <thead class="text-[11px] text-slate-600 uppercase bg-slate-200/70 border-b">
                <tr>
                  <th class="p-2">#</th>
                  <th class="p-2">Lab / Facility Name</th>
                  <th class="p-2">Equipment Name & Specs</th>
                  <th class="p-2">Type</th>
                  <th class="p-2">Date Purchased</th>
                  <th class="p-2">Cost (₹)</th>
                  <th class="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 bg-white">
                ${equipments.length === 0 ? `
                  <tr><td colspan="7" class="text-center py-4 text-slate-400 italic">No equipment entries recorded. Click 'Add Equipment' above to add.</td></tr>
                ` : equipments.map((eq, idx) => `
                  <tr>
                    <td class="p-2 font-semibold text-slate-400">${idx + 1}</td>
                    <td class="p-2">
                      <input type="text" value="${eq.labName || ''}" placeholder="e.g. AI Research Lab" onchange="formBuilder.updateFacilityItem(${idx}, 'labName', this.value)" class="w-full text-xs p-1.5 border rounded" />
                    </td>
                    <td class="p-2">
                      <input type="text" value="${eq.equipmentName || ''}" placeholder="Equipment / Model" onchange="formBuilder.updateFacilityItem(${idx}, 'equipmentName', this.value)" class="w-full text-xs p-1.5 border rounded" />
                    </td>
                    <td class="p-2">
                      <select onchange="formBuilder.updateFacilityItem(${idx}, 'type', this.value)" class="w-full text-xs p-1.5 border rounded">
                        <option value="Major Equipment" ${eq.type === 'Major Equipment' ? 'selected' : ''}>Major Equipment</option>
                        <option value="Minor Equipment" ${eq.type === 'Minor Equipment' ? 'selected' : ''}>Minor Equipment</option>
                        <option value="Software License" ${eq.type === 'Software License' ? 'selected' : ''}>Software License</option>
                        <option value="Compute Server" ${eq.type === 'Compute Server' ? 'selected' : ''}>Compute Server</option>
                        <option value="Other" ${eq.type === 'Other' ? 'selected' : ''}>Other</option>
                      </select>
                    </td>
                    <td class="p-2">
                      <input type="date" value="${eq.purchaseDate || ''}" onchange="formBuilder.updateFacilityItem(${idx}, 'purchaseDate', this.value)" class="w-full text-xs p-1.5 border rounded" />
                    </td>
                    <td class="p-2">
                      <input type="number" value="${eq.amountINR || 0}" onchange="formBuilder.updateFacilityItem(${idx}, 'amountINR', parseInt(this.value)||0)" class="w-28 text-xs p-1.5 border rounded font-mono font-medium" />
                    </td>
                    <td class="p-2 text-center">
                      <button type="button" onclick="formBuilder.removeFacilityRow(${idx})" class="text-red-500 hover:text-red-700 p-1" title="Delete">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 3.2: Department Library -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div class="border-b border-slate-200 pb-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <i data-lucide="book" class="w-4 h-4 text-purple-600"></i>
              3.2 Department Library Resources & Usage
            </h4>
            <p class="text-[11px] text-slate-500 mt-0.5">Volumes, print journals, e-subscriptions, and average daily footfall.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Books & Volumes -->
            <div class="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <i data-lucide="book-marked" class="w-3.5 h-3.5 text-blue-600"></i>
                Books & Titles
              </span>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">Purchased in 2026-2027</label>
                  <input type="number" value="${library.booksPurchased2026_2027 || 0}" onchange="formBuilder.updateLibraryField('booksPurchased2026_2027', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">Total Books in Dept</label>
                  <input type="number" value="${library.totalBooks || 0}" onchange="formBuilder.updateLibraryField('totalBooks', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
              </div>
            </div>

            <!-- Journals & Subscriptions -->
            <div class="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <i data-lucide="newspaper" class="w-3.5 h-3.5 text-emerald-600"></i>
                Journals Subscribed
              </span>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">National New</label>
                  <input type="number" value="${library.nationalJournalsPurchased2026_2027 || 0}" onchange="formBuilder.updateLibraryField('nationalJournalsPurchased2026_2027', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">Int'l New</label>
                  <input type="number" value="${library.internationalJournalsPurchased2026_2027 || 0}" onchange="formBuilder.updateLibraryField('internationalJournalsPurchased2026_2027', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">Total Journals</label>
                  <input type="number" value="${library.totalJournals || 0}" onchange="formBuilder.updateLibraryField('totalJournals', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
              </div>
            </div>

            <!-- Daily Footfall -->
            <div class="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3 md:col-span-2">
              <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <i data-lucide="users" class="w-3.5 h-3.5 text-purple-600"></i>
                Average Daily Footfall (Visits / Day)
              </span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">Faculty Footfall</label>
                  <input type="number" value="${library.dailyFacultyFootfall || 0}" onchange="formBuilder.updateLibraryField('dailyFacultyFootfall', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div>
                  <label class="text-[11px] text-slate-500 block mb-1">Student Footfall</label>
                  <input type="number" value="${library.dailyStudentFootfall || 0}" onchange="formBuilder.updateLibraryField('dailyStudentFootfall', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

    // TAB 4: Attribute 4 & 7 - Grants, Management Funds, Seed Money & Endowments
  renderAtt4_7Tab(att4_7) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute 4 & 7 - Infrastructure & Resource Mobilization</h3>
            <p class="text-xs text-slate-500">Funds from External Agencies, Management Grants, Seed Money, and Endowments.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">questions.docx - Table 4</span>
        </div>

        ${this.renderAgendaBanner('attr4', 'Attribute IV & VII - Grants & Seed Money')}

        <!-- 1. External Funds -->
        <div class="bg-emerald-50/40 p-4 rounded-xl border border-emerald-200">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold uppercase text-emerald-900 flex items-center gap-1.5">
              <i data-lucide="external-link" class="w-4 h-4 text-emerald-600"></i>
              1. Funds Received from External Agencies (DST, SERB, AICTE, UGC, ICSSR, etc.)
            </h4>
            <button type="button" onclick="formBuilder.addExternalFundRow()" class="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add External Grant
            </button>
          </div>
          <div class="space-y-2">
            ${(att4_7.externalFunds || []).map((fund, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div>
                  <select onchange="formBuilder.updateArrayItem('attributeIV_VII.externalFunds', ${idx}, 'category', this.value)" class="w-full text-xs p-1.5 border rounded">
                    <option value="Conduct of FDP/Conference/Seminar" ${fund.category?.includes('Conduct') ? 'selected' : ''}>FDP/Conf/Seminar</option>
                    <option value="Research Projects" ${fund.category?.includes('Projects') ? 'selected' : ''}>Research Projects</option>
                  </select>
                </div>
                <div>
                  <input type="text" placeholder="Funding Agency" value="${fund.agency || ''}" onchange="formBuilder.updateArrayItem('attributeIV_VII.externalFunds', ${idx}, 'agency', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div>
                  <input type="number" placeholder="Amount ₹" value="${fund.amount || 0}" onchange="formBuilder.updateArrayItem('attributeIV_VII.externalFunds', ${idx}, 'amount', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-emerald-800" />
                </div>
                <div>
                  <input type="text" placeholder="Faculty Involved / PI" value="${fund.facultyInvolved || ''}" onchange="formBuilder.updateArrayItem('attributeIV_VII.externalFunds', ${idx}, 'facultyInvolved', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="flex justify-end">
                  <button type="button" onclick="formBuilder.removeArrayItem('attributeIV_VII.externalFunds', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Management Funds -->
        <div class="bg-blue-50/40 p-4 rounded-xl border border-blue-200">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold uppercase text-blue-900 flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
              2. Funds Received from College Management
            </h4>
            <button type="button" onclick="formBuilder.addManagementFundRow()" class="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Management Grant
            </button>
          </div>
          <div class="space-y-2">
            ${(att4_7.managementFunds || []).map((fund, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div>
                  <select onchange="formBuilder.updateArrayItem('attributeIV_VII.managementFunds', ${idx}, 'category', this.value)" class="w-full text-xs p-1.5 border rounded">
                    <option value="Conduct of FDP/Conference/Seminar" ${fund.category?.includes('Conduct') ? 'selected' : ''}>Conduct of FDP/Conf</option>
                    <option value="Projects" ${fund.category === 'Projects' ? 'selected' : ''}>Projects Seed</option>
                    <option value="Attending Conference/Workshop/Seminar" ${fund.category?.includes('Attending') ? 'selected' : ''}>Attending Conference</option>
                  </select>
                </div>
                <div>
                  <input type="number" placeholder="Amount ₹" value="${fund.amount || 0}" onchange="formBuilder.updateArrayItem('attributeIV_VII.managementFunds', ${idx}, 'amount', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-blue-800" />
                </div>
                <div>
                  <input type="text" placeholder="Faculty Involved / Benefitted" value="${fund.facultyInvolved || ''}" onchange="formBuilder.updateArrayItem('attributeIV_VII.managementFunds', ${idx}, 'facultyInvolved', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="flex justify-end">
                  <button type="button" onclick="formBuilder.removeArrayItem('attributeIV_VII.managementFunds', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Seed Money & Endowments -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-3">
            <h4 class="text-xs font-bold uppercase text-amber-900 flex items-center gap-1.5">
              <i data-lucide="sprout" class="w-4 h-4 text-amber-600"></i>
              3. Seed Money (Projects, Patents, Copyright)
            </h4>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Projects ₹</label>
                <input type="number" value="${att4_7.seedMoney?.projectsAmount || 0}" onchange="formBuilder.updateField('attributeIV_VII.seedMoney.projectsAmount', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Patents ₹</label>
                <input type="number" value="${att4_7.seedMoney?.patentsAmount || 0}" onchange="formBuilder.updateField('attributeIV_VII.seedMoney.patentsAmount', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Copyright ₹</label>
                <input type="number" value="${att4_7.seedMoney?.copyrightAmount || 0}" onchange="formBuilder.updateField('attributeIV_VII.seedMoney.copyrightAmount', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <div>
              <label class="text-[11px] block font-medium mb-1">Details of Seed Support</label>
              <input type="text" value="${att4_7.seedMoney?.details || ''}" onchange="formBuilder.updateField('attributeIV_VII.seedMoney.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="landmark" class="w-4 h-4 text-slate-600"></i>
              4. Endowments Established (A.Y. 2026 - 2027)
            </h4>
            <div class="flex items-center gap-2">
              <label class="text-xs font-medium text-slate-700">Endowments Count</label>
              <input type="number" value="${att4_7.endowments?.count || 0}" onchange="formBuilder.updateField('attributeIV_VII.endowments.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium mb-1">Endowment Details (Title, Donor, Purpose, Corpus)</label>
              <textarea rows="3" onchange="formBuilder.updateField('attributeIV_VII.endowments.details', this.value)" class="w-full text-xs p-2 border rounded">${att4_7.endowments?.details || ''}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 5: Attribute V - Learning and Teaching
  renderAtt5Tab(att5) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute V - Learning and Teaching</h3>
            <p class="text-xs text-slate-500">MoUs, Linkages, and Four-Quadrant E-Contents.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">questions.docx - Table 5</span>
        </div>

        ${this.renderAgendaBanner('attr5', 'Attribute V - Learning & Teaching')}

        <div class="space-y-4">
          <!-- New MoUs -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold text-slate-700 uppercase">1. MoU Created in A.Y. 2026-2027</label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-600 font-medium">Count:</span>
                <input type="number" value="${att5.mouCreated?.count || 0}" onchange="formBuilder.updateField('attributeV.mouCreated.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
              </div>
            </div>
            <textarea rows="2" placeholder="Activities conducted under new MoUs..." onchange="formBuilder.updateField('attributeV.mouCreated.activitiesConducted', this.value)" class="w-full text-xs p-2 border rounded">${att5.mouCreated?.activitiesConducted || ''}</textarea>
          </div>

          <!-- Previous Active MoUs -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold text-slate-700 uppercase">2. Previous Active MoUs</label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-600 font-medium">Count:</span>
                <input type="number" value="${att5.previousMous?.count || 0}" onchange="formBuilder.updateField('attributeV.previousMous.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
              </div>
            </div>
            <textarea rows="2" placeholder="Activities conducted in this A.Y. under previous MoUs..." onchange="formBuilder.updateField('attributeV.previousMous.activitiesConducted', this.value)" class="w-full text-xs p-2 border rounded">${att5.previousMous?.activitiesConducted || ''}</textarea>
          </div>

          <!-- Linkages -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold text-slate-700 uppercase">3. Linkages Created in A.Y. 2026-2027</label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-600 font-medium">Count:</span>
                <input type="number" value="${att5.linkages?.count || 0}" onchange="formBuilder.updateField('attributeV.linkages.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
              </div>
            </div>
            <textarea rows="2" placeholder="Activities conducted through industry/institutional linkages..." onchange="formBuilder.updateField('attributeV.linkages.activitiesConducted', this.value)" class="w-full text-xs p-2 border rounded">${att5.linkages?.activitiesConducted || ''}</textarea>
          </div>

          <!-- E-Content (Four Quadrant) -->
          <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
            <div class="flex items-center justify-between mb-2">
              <div>
                <label class="text-xs font-bold text-blue-900 uppercase">4. E-Contents (Four Quadrant) Created</label>
                <p class="text-[11px] text-blue-700">Video, Text/E-book, Self-Assessment, Discussion forum.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-blue-800 font-medium">Count:</span>
                <input type="number" value="${att5.eContent?.count || 0}" onchange="formBuilder.updateField('attributeV.eContent.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
              </div>
            </div>
            <textarea rows="2" placeholder="Details of e-content modules created, LMS links, topics..." onchange="formBuilder.updateField('attributeV.eContent.details', this.value)" class="w-full text-xs p-2 border rounded">${att5.eContent?.details || ''}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 6: Attribute VI & VIII - Extended Curricular
  renderAtt6_8Tab(att6_8) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute VI & VIII - Extended Curricular Engagements</h3>
            <p class="text-xs text-slate-500">Club Activities, Dual Programmes, Professional Chapters, Competitive Exams, and Awards.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">questions.docx - Table 6 & 7</span>
        </div>

        ${this.renderAgendaBanner('attr6', 'Attribute VI & VIII - Extension, Clubs & Awards')}

        <!-- Clubs List -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="users-round" class="w-4 h-4 text-indigo-600"></i>
              1. Department Clubs & Associations
            </h4>
            <button type="button" onclick="formBuilder.addClubRow()" class="text-xs px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Club
            </button>
          </div>
          <div class="space-y-2">
            ${(att6_8.clubs || []).map((club, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-6 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div class="md:col-span-2">
                  <input type="text" placeholder="Club Name" value="${club.clubName || ''}" onchange="formBuilder.updateArrayItem('attributeVI_VIII.clubs', ${idx}, 'clubName', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div>
                  <input type="number" placeholder="UG Count" value="${club.studentsUG || 0}" onchange="formBuilder.updateArrayItem('attributeVI_VIII.clubs', ${idx}, 'studentsUG', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" title="UG Students" />
                </div>
                <div>
                  <input type="number" placeholder="PG Count" value="${club.studentsPG || 0}" onchange="formBuilder.updateArrayItem('attributeVI_VIII.clubs', ${idx}, 'studentsPG', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" title="PG Students" />
                </div>
                <div>
                  <input type="text" placeholder="Activities conducted this A.Y." value="${club.activities || ''}" onchange="formBuilder.updateArrayItem('attributeVI_VIII.clubs', ${idx}, 'activities', this.value)" class="w-full text-xs p-1.5 border rounded" />
                </div>
                <div class="flex justify-end">
                  <button type="button" onclick="formBuilder.removeArrayItem('attributeVI_VIII.clubs', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Degrees & Professional Chapters & Competitive Exams -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700">2. Pursuing Other Degrees</h4>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-600 font-medium">Count:</span>
              <input type="number" value="${att6_8.pursuingOtherDegrees?.count || 0}" onchange="formBuilder.updateField('attributeVI_VIII.pursuingOtherDegrees.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
            </div>
            <textarea rows="2" placeholder="Details of add-on programmes..." onchange="formBuilder.updateField('attributeVI_VIII.pursuingOtherDegrees.details', this.value)" class="w-full text-xs p-2 border rounded">${att6_8.pursuingOtherDegrees?.details || ''}</textarea>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700">3. Student Chapters Established</h4>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-600 font-medium">Count:</span>
              <input type="number" value="${att6_8.studentChapters?.count || 0}" onchange="formBuilder.updateField('attributeVI_VIII.studentChapters.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
            </div>
            <textarea rows="2" placeholder="Professional chapter names (IEEE, CSI, ACM)..." onchange="formBuilder.updateField('attributeVI_VIII.studentChapters.details', this.value)" class="w-full text-xs p-2 border rounded">${att6_8.studentChapters?.details || ''}</textarea>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700">4. Competitive Exams</h4>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Appeared</label>
                <input type="number" value="${att6_8.competitiveExams?.appeared || 0}" onchange="formBuilder.updateField('attributeVI_VIII.competitiveExams.appeared', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Qualified</label>
                <input type="number" value="${att6_8.competitiveExams?.qualified || 0}" onchange="formBuilder.updateField('attributeVI_VIII.competitiveExams.qualified', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-emerald-700" />
              </div>
            </div>
            <input type="text" placeholder="GATE, NET, UPSC, TNPSC details" value="${att6_8.competitiveExams?.details || ''}" onchange="formBuilder.updateField('attributeVI_VIII.competitiveExams.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>
        </div>

        <!-- Student Participation & Awards Breakdown -->
        <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-3">
          <h4 class="text-xs font-bold uppercase text-amber-900 flex items-center gap-1.5">
            <i data-lucide="trophy" class="w-4 h-4 text-amber-600"></i>
            5. Students' Participation and Awards
          </h4>
          <div class="grid grid-cols-5 gap-2">
            <div>
              <label class="text-[11px] block font-medium">Sports</label>
              <input type="number" value="${att6_8.studentParticipationAwards?.sports || 0}" onchange="formBuilder.updateField('attributeVI_VIII.studentParticipationAwards.sports', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Cultural</label>
              <input type="number" value="${att6_8.studentParticipationAwards?.cultural || 0}" onchange="formBuilder.updateField('attributeVI_VIII.studentParticipationAwards.cultural', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">External Academic</label>
              <input type="number" value="${att6_8.studentParticipationAwards?.externalAcademicEvents || 0}" onchange="formBuilder.updateField('attributeVI_VIII.studentParticipationAwards.externalAcademicEvents', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Extra-Curricular</label>
              <input type="number" value="${att6_8.studentParticipationAwards?.extraCurricularEvents || 0}" onchange="formBuilder.updateField('attributeVI_VIII.studentParticipationAwards.extraCurricularEvents', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Co-Curricular</label>
              <input type="number" value="${att6_8.studentParticipationAwards?.coCurricularEvents || 0}" onchange="formBuilder.updateField('attributeVI_VIII.studentParticipationAwards.coCurricularEvents', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-slate-700 block mb-1">Prizes, Championship Trophies & Recognition Details</label>
            <input type="text" value="${att6_8.studentParticipationAwards?.details || ''}" onchange="formBuilder.updateField('attributeVI_VIII.studentParticipationAwards.details', this.value)" class="w-full text-xs p-2 border rounded" placeholder="State/National/Inter-collegiate award details..." />
          </div>
        </div>
      </div>
    `;
  }

  // TAB: Students Outcomes – 2026 Passed out (Table 10 from Word Doc)
  renderOutcomesTab(outcomes) {
    if (!outcomes) {
      outcomes = {
        ug: { strength: 0, onCampus: 0, offCampus: 0, higherStudies: 0, entrepreneur: 0, others: 0 },
        pg: { strength: 0, onCampus: 0, offCampus: 0, higherStudies: 0, entrepreneur: 0, others: 0 },
        phd: { strength: 0, onCampus: 0, offCampus: 0, higherStudies: 0, entrepreneur: 0, others: 0 }
      };
    }

    const ug = outcomes.ug || {};
    const pg = outcomes.pg || {};
    const phd = outcomes.phd || {};

    const totalStrength = (ug.strength || 0) + (pg.strength || 0) + (phd.strength || 0);
    const totalOnCampus = (ug.onCampus || 0) + (pg.onCampus || 0) + (phd.onCampus || 0);
    const totalOffCampus = (ug.offCampus || 0) + (pg.offCampus || 0) + (phd.offCampus || 0);
    const totalPlaced = totalOnCampus + totalOffCampus;
    const totalHigherStudies = (ug.higherStudies || 0) + (pg.higherStudies || 0) + (phd.higherStudies || 0);
    const totalEntrepreneur = (ug.entrepreneur || 0) + (pg.entrepreneur || 0) + (phd.entrepreneur || 0);
    const totalOthers = (ug.others || 0) + (pg.others || 0) + (phd.others || 0);
    const totalPositive = totalPlaced + totalHigherStudies + totalEntrepreneur;

    const placementRate = totalStrength > 0 ? ((totalPlaced / totalStrength) * 100).toFixed(1) : '0.0';
    const progressionRate = totalStrength > 0 ? ((totalPositive / totalStrength) * 100).toFixed(1) : '0.0';

    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Students Outcomes – 2026 Passed out</h3>
            <p class="text-xs text-slate-500">Graduating batch placement, higher education progression, entrepreneurship, and career pathways.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">questions.docx - Table 10</span>
        </div>

        ${this.renderAgendaBanner('t10_outcomes', 'Table 10 - Student Outcomes 2026')}

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-blue-50 p-3.5 rounded-xl border border-blue-200">
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">Graduating Strength</span>
            <span class="text-2xl font-black text-blue-900 block mt-1">${totalStrength}</span>
            <span class="text-[11px] text-blue-700">UG (${ug.strength||0}) + PG (${pg.strength||0}) + PhD (${phd.strength||0})</span>
          </div>
          <div class="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Total Placements</span>
            <span class="text-2xl font-black text-emerald-900 block mt-1">${totalPlaced}</span>
            <span class="text-[11px] text-emerald-700 font-semibold">${placementRate}% Placement Rate</span>
          </div>
          <div class="bg-purple-50 p-3.5 rounded-xl border border-purple-200">
            <span class="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">Higher Studies</span>
            <span class="text-2xl font-black text-purple-900 block mt-1">${totalHigherStudies}</span>
            <span class="text-[11px] text-purple-700 font-semibold">${totalStrength > 0 ? ((totalHigherStudies/totalStrength)*100).toFixed(1) : 0}% Progression</span>
          </div>
          <div class="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Startups / Entrepreneurs</span>
            <span class="text-2xl font-black text-amber-900 block mt-1">${totalEntrepreneur}</span>
            <span class="text-[11px] text-amber-700 font-semibold">${progressionRate}% Overall Positive</span>
          </div>
        </div>

        <!-- Table 10 Input Matrix -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-600"></i>
              Table 10: Students Outcomes – 2026 Passed out Breakdown
            </h4>
            <span class="text-xs text-slate-500 font-medium">Auto-calculates totals & success rates</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-100 text-slate-700 font-semibold border-b">
                <tr>
                  <th class="p-3">Programme</th>
                  <th class="p-3 text-center">Batch Strength</th>
                  <th class="p-3 text-center">On Campus</th>
                  <th class="p-3 text-center">OFF Campus</th>
                  <th class="p-3 text-center">Higher Studies</th>
                  <th class="p-3 text-center">Entrepreneur</th>
                  <th class="p-3 text-center">Others</th>
                  <th class="p-3 text-center font-bold">Placed %</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${['ug', 'pg', 'phd'].map(prog => {
                  const pData = outcomes[prog] || {};
                  const str = pData.strength || 0;
                  const pl = (pData.onCampus || 0) + (pData.offCampus || 0);
                  const pRate = str > 0 ? ((pl / str) * 100).toFixed(1) : '0.0';
                  const label = prog === 'ug' ? 'UG (Undergraduate)' : (prog === 'pg' ? 'PG (Postgraduate)' : 'PhD (Doctoral)');
                  return `
                    <tr class="hover:bg-slate-50">
                      <td class="p-3 font-bold text-slate-800">${label}</td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${str}" onchange="formBuilder.updateOutcomeField('${prog}', 'strength', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 text-center border rounded font-semibold text-slate-800" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${pData.onCampus || 0}" onchange="formBuilder.updateOutcomeField('${prog}', 'onCampus', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 text-center border rounded font-semibold text-blue-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${pData.offCampus || 0}" onchange="formBuilder.updateOutcomeField('${prog}', 'offCampus', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 text-center border rounded font-semibold text-indigo-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${pData.higherStudies || 0}" onchange="formBuilder.updateOutcomeField('${prog}', 'higherStudies', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 text-center border rounded font-semibold text-purple-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${pData.entrepreneur || 0}" onchange="formBuilder.updateOutcomeField('${prog}', 'entrepreneur', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 text-center border rounded font-semibold text-amber-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${pData.others || 0}" onchange="formBuilder.updateOutcomeField('${prog}', 'others', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 text-center border rounded font-semibold text-slate-600" />
                      </td>
                      <td class="p-3 text-center font-bold text-emerald-700 bg-emerald-50/30">${pRate}%</td>
                    </tr>
                  `;
                }).join('')}
                <tr class="bg-slate-100 font-black text-slate-900 border-t-2 border-slate-300">
                  <td class="p-3">Total Passed Out</td>
                  <td class="p-3 text-center">${totalStrength}</td>
                  <td class="p-3 text-center text-blue-800">${totalOnCampus}</td>
                  <td class="p-3 text-center text-indigo-800">${totalOffCampus}</td>
                  <td class="p-3 text-center text-purple-800">${totalHigherStudies}</td>
                  <td class="p-3 text-center text-amber-800">${totalEntrepreneur}</td>
                  <td class="p-3 text-center text-slate-700">${totalOthers}</td>
                  <td class="p-3 text-center text-emerald-800 text-sm bg-emerald-100/50">${placementRate}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 7: Attribute IX - Research and Innovation
  renderAtt9Tab(att9) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute IX - Research and Innovation Outcomes</h3>
            <p class="text-xs text-slate-500">Ph.D. Conferred, Guides, Scholars, Papers, Books, Patents, Copyrights, and OER.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">questions.docx - Table 8</span>
        </div>

        ${this.renderAgendaBanner('attr9', 'Attribute IX - Research, Publications & IPR')}

        <!-- PhD Supervision & Research Scholars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-xs font-bold text-slate-700">1. Ph.D. Conferred</label>
              <input type="number" value="${att9.phdConferred?.count || 0}" onchange="formBuilder.updateField('attributeIX.phdConferred.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
            </div>
            <input type="text" placeholder="Names of scholars & guides" value="${att9.phdConferred?.details || ''}" onchange="formBuilder.updateField('attributeIX.phdConferred.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-xs font-bold text-slate-700">2. New Guides Recognized</label>
              <input type="number" value="${att9.newGuides?.count || 0}" onchange="formBuilder.updateField('attributeIX.newGuides.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
            </div>
            <input type="text" placeholder="Recognized faculty names" value="${att9.newGuides?.details || ''}" onchange="formBuilder.updateField('attributeIX.newGuides.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-xs font-bold text-slate-700">3. New Scholars Enrolled</label>
              <input type="number" value="${att9.newScholars?.count || 0}" onchange="formBuilder.updateField('attributeIX.newScholars.count', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded" />
            </div>
            <input type="text" placeholder="Full-time & part-time scholars" value="${att9.newScholars?.details || ''}" onchange="formBuilder.updateField('attributeIX.newScholars.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>
        </div>

        <!-- Papers & Conferences -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Journal Papers -->
          <div class="bg-blue-50/40 p-4 rounded-xl border border-blue-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-blue-900 flex items-center gap-1.5">
              <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i>
              4. Papers Published in Journals
            </h4>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Scopus</label>
                <input type="number" value="${att9.papersPublished?.scopus || 0}" onchange="formBuilder.updateField('attributeIX.papersPublished.scopus', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-bold text-blue-800" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">WoS</label>
                <input type="number" value="${att9.papersPublished?.wos || 0}" onchange="formBuilder.updateField('attributeIX.papersPublished.wos', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-bold text-indigo-800" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">UGC-CARE / Peer</label>
                <input type="number" value="${att9.papersPublished?.ugcCare || 0}" onchange="formBuilder.updateField('attributeIX.papersPublished.ugcCare', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <textarea rows="2" placeholder="Citation index, average impact factor, notable publications..." onchange="formBuilder.updateField('attributeIX.papersPublished.details', this.value)" class="w-full text-xs p-2 border rounded">${att9.papersPublished?.details || ''}</textarea>
          </div>

          <!-- Conference Papers -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="mic" class="w-4 h-4 text-purple-600"></i>
              5. Papers Presented in Conferences
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Indexed (IEEE/Springer/etc.)</label>
                <input type="number" value="${att9.conferencesPresented?.indexed || 0}" onchange="formBuilder.updateField('attributeIX.conferencesPresented.indexed', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Non-Indexed</label>
                <input type="number" value="${att9.conferencesPresented?.nonIndexed || 0}" onchange="formBuilder.updateField('attributeIX.conferencesPresented.nonIndexed', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <textarea rows="2" placeholder="Conferences, proceedings details..." onchange="formBuilder.updateField('attributeIX.conferencesPresented.details', this.value)" class="w-full text-xs p-2 border rounded">${att9.conferencesPresented?.details || ''}</textarea>
          </div>
        </div>

        <!-- Books, Patents, Copyrights, OER -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Books -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700">6. Books & Book Chapters</h4>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Published (ISBN)</label>
                <input type="number" value="${att9.books?.published || 0}" onchange="formBuilder.updateField('attributeIX.books.published', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Edited Books</label>
                <input type="number" value="${att9.books?.edited || 0}" onchange="formBuilder.updateField('attributeIX.books.edited', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Chapters</label>
                <input type="number" value="${att9.books?.chaptersContributed || 0}" onchange="formBuilder.updateField('attributeIX.books.chaptersContributed', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <input type="text" placeholder="Publishers, ISBN, book titles" value="${att9.books?.details || ''}" onchange="formBuilder.updateField('attributeIX.books.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>

          <!-- Patents, Copyrights & OER -->
          <div class="bg-emerald-50/40 p-4 rounded-xl border border-emerald-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-emerald-900">7. IPR: Patents, Copyrights & OER</h4>
            <div class="grid grid-cols-4 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Patents Appl.</label>
                <input type="number" value="${att9.patents?.applied || 0}" onchange="formBuilder.updateField('attributeIX.patents.applied', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Patents Grant</label>
                <input type="number" value="${att9.patents?.granted || 0}" onchange="formBuilder.updateField('attributeIX.patents.granted', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-bold text-emerald-700" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Copyrights</label>
                <input type="number" value="${att9.copyrights?.count || 0}" onchange="formBuilder.updateField('attributeIX.copyrights.count', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-bold text-blue-700" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">OER</label>
                <input type="number" value="${att9.oer?.count || 0}" onchange="formBuilder.updateField('attributeIX.oer.count', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <input type="text" placeholder="Patent titles, registration numbers, OER repositories" value="${att9.patents?.details || ''}" onchange="formBuilder.updateField('attributeIX.patents.details', this.value)" class="w-full text-xs p-1.5 border rounded" />
          </div>
        </div>
      </div>
    `;
  }


  // TAB: Attribute X - Institutional Values, Green Initiatives & CSR Extension
  renderAtt10Tab(att10) {
    const safeAtt10 = att10 || {};
    const csrList = safeAtt10.csrActivities || [];
    const sust = safeAtt10.sustainability || {
      paperlessCIA: '',
      solarEnergyUsage: '',
      plasticFreeCampus: '',
      rainwaterHarvesting: ''
    };

    const totalBeneficiaries = csrList.reduce((sum, item) => sum + (Number(item.studentsBenefited) || 0), 0);
    const totalCsrFunds = csrList.reduce((sum, item) => sum + (Number(item.amountINR) || 0), 0);

    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Attribute X - Institutional Values, Green Initiatives & CSR Extension</h3>
            <p class="text-xs text-slate-500">Corporate Social Responsibility (CSR), Environmental Sustainability, and Eco-friendly Best Practices.</p>
          </div>
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">Templates_AAA_2026-2027 - Attribute-X</span>
        </div>

        ${this.renderAgendaBanner('attr10', 'Attribute X - Institutional Values, Green Initiatives & CSR')}

        <!-- Quick Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-emerald-700 uppercase">Extension / CSR Events</span>
            <div class="text-xl font-bold text-emerald-900 mt-1">${csrList.length} <span class="text-xs font-normal text-emerald-600">conducted</span></div>
          </div>
          <div class="bg-teal-50 border border-teal-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-teal-700 uppercase">Community Beneficiaries</span>
            <div class="text-xl font-bold text-teal-900 mt-1">${totalBeneficiaries.toLocaleString()} <span class="text-xs font-normal text-teal-600">people</span></div>
          </div>
          <div class="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-blue-700 uppercase">CSR Funds Mobilized</span>
            <div class="text-xl font-bold text-blue-900 mt-1">₹${(totalCsrFunds / 100000).toFixed(2)} <span class="text-xs font-normal text-blue-600">Lakhs</span></div>
          </div>
          <div class="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <span class="text-[11px] font-semibold text-amber-700 uppercase">Green Pillars Tracked</span>
            <div class="text-xl font-bold text-amber-900 mt-1">4 <span class="text-xs font-normal text-amber-600">Sustainability areas</span></div>
          </div>
        </div>

        <!-- Section 10.1: Extension Activities & CSR -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <i data-lucide="heart-handshake" class="w-4 h-4 text-emerald-600"></i>
                10.1 Extension Activities & CSR Collaborations in A.Y. 2026-2027
              </h4>
              <p class="text-[11px] text-slate-500 mt-0.5">Outreach, societal development, NGO partnerships, and CSR projects.</p>
            </div>
            <button type="button" onclick="formBuilder.addCsrRow()" class="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Activity
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left text-slate-700">
              <thead class="text-[11px] text-slate-600 uppercase bg-slate-200/70 border-b">
                <tr>
                  <th class="p-2">#</th>
                  <th class="p-2">Activity / Initiative Title</th>
                  <th class="p-2">Type</th>
                  <th class="p-2">Collaborating Agency / Partner</th>
                  <th class="p-2 text-center">Is CSR?</th>
                  <th class="p-2">Beneficiaries</th>
                  <th class="p-2">Funding (₹)</th>
                  <th class="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 bg-white">
                ${csrList.length === 0 ? `
                  <tr><td colspan="8" class="text-center py-4 text-slate-400 italic">No CSR or extension activities recorded. Click 'Add Activity' to record.</td></tr>
                ` : csrList.map((c, idx) => `
                  <tr>
                    <td class="p-2 font-semibold text-slate-400">${idx + 1}</td>
                    <td class="p-2">
                      <input type="text" value="${c.activityName || ''}" placeholder="Activity Name" onchange="formBuilder.updateCsrItem(${idx}, 'activityName', this.value)" class="w-full text-xs p-1.5 border rounded" />
                    </td>
                    <td class="p-2">
                      <select onchange="formBuilder.updateCsrItem(${idx}, 'type', this.value)" class="w-full text-xs p-1.5 border rounded">
                        <option value="Extension Activity" ${c.type === 'Extension Activity' ? 'selected' : ''}>Extension Activity</option>
                        <option value="CSR Project" ${c.type === 'CSR Project' ? 'selected' : ''}>CSR Project</option>
                        <option value="Community Outreach" ${c.type === 'Community Outreach' ? 'selected' : ''}>Community Outreach</option>
                        <option value="Environmental Drive" ${c.type === 'Environmental Drive' ? 'selected' : ''}>Environmental Drive</option>
                      </select>
                    </td>
                    <td class="p-2">
                      <input type="text" value="${c.collaboratingAgency || ''}" placeholder="Collaborating Agency / NGO" onchange="formBuilder.updateCsrItem(${idx}, 'collaboratingAgency', this.value)" class="w-full text-xs p-1.5 border rounded" />
                    </td>
                    <td class="p-2 text-center">
                      <input type="checkbox" ${c.isCSR ? 'checked' : ''} onchange="formBuilder.updateCsrItem(${idx}, 'isCSR', this.checked)" class="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4" />
                    </td>
                    <td class="p-2">
                      <input type="number" value="${c.studentsBenefited || 0}" onchange="formBuilder.updateCsrItem(${idx}, 'studentsBenefited', parseInt(this.value)||0)" class="w-20 text-xs p-1.5 border rounded font-medium" />
                    </td>
                    <td class="p-2">
                      <input type="number" value="${c.amountINR || 0}" onchange="formBuilder.updateCsrItem(${idx}, 'amountINR', parseInt(this.value)||0)" class="w-24 text-xs p-1.5 border rounded font-mono font-medium" />
                    </td>
                    <td class="p-2 text-center">
                      <button type="button" onclick="formBuilder.removeCsrRow(${idx})" class="text-red-500 hover:text-red-700 p-1" title="Delete">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 10.2: Green Campus & Sustainability Initiatives -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div class="border-b border-slate-200 pb-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <i data-lucide="leaf" class="w-4 h-4 text-emerald-600"></i>
              10.2 Green Campus & Institutional Values
            </h4>
            <p class="text-[11px] text-slate-500 mt-0.5">Four core sustainability dimensions practiced in the department.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-3.5 rounded-lg border border-slate-200">
              <label class="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-blue-600"></i>
                Paperless Internal Assessments (CIA) & Operations
              </label>
              <textarea rows="2" placeholder="e.g. 100% digital submissions via Moodle LMS, digital grading rubrics..." onchange="formBuilder.updateGreenField('paperlessCIA', this.value)" class="w-full text-xs p-2 border rounded text-slate-800">${sust.paperlessCIA || ''}</textarea>
            </div>

            <div class="bg-white p-3.5 rounded-lg border border-slate-200">
              <label class="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <i data-lucide="sun" class="w-3.5 h-3.5 text-amber-500"></i>
                Renewable & Solar Energy Usage
              </label>
              <textarea rows="2" placeholder="e.g. 35% power requirement powered by rooftop solar panels..." onchange="formBuilder.updateGreenField('solarEnergyUsage', this.value)" class="w-full text-xs p-2 border rounded text-slate-800">${sust.solarEnergyUsage || ''}</textarea>
            </div>

            <div class="bg-white p-3.5 rounded-lg border border-slate-200">
              <label class="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <i data-lucide="recycle" class="w-3.5 h-3.5 text-emerald-600"></i>
                Plastic-Free Campus & Solid Waste Management
              </label>
              <textarea rows="2" placeholder="e.g. Strict ban on single-use plastics, electronic scrap recycling..." onchange="formBuilder.updateGreenField('plasticFreeCampus', this.value)" class="w-full text-xs p-2 border rounded text-slate-800">${sust.plasticFreeCampus || ''}</textarea>
            </div>

            <div class="bg-white p-3.5 rounded-lg border border-slate-200">
              <label class="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <i data-lucide="droplet" class="w-3.5 h-3.5 text-cyan-600"></i>
                Rainwater Harvesting & Water Conservation
              </label>
              <textarea rows="2" placeholder="e.g. Recharge wells, sensor taps, greywater recycling for gardens..." onchange="formBuilder.updateGreenField('rainwaterHarvesting', this.value)" class="w-full text-xs p-2 border rounded text-slate-800">${sust.rainwaterHarvesting || ''}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }

    // TAB 8: 30-Min Presentation Content Flow
  renderQualitativeTab(qual) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">30-Minute Qualitative & Impact Presentation Flow</h3>
            <p class="text-xs text-slate-500">Structured narrative for the presentation following the 15-minute dashboard.</p>
          </div>
          <span class="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">Phase 2: 30 Minutes</span>
        </div>

        <!-- 1. Signature Achievements & Verifiable Impact -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div class="flex justify-between items-center mb-3">
            <div>
              <h4 class="text-xs font-bold uppercase text-slate-700">1. Signature Achievements & Verifiable Impact (A.Y. 2026 - 2027)</h4>
              <p class="text-[11px] text-slate-500">Highlight quantifiable breakthroughs with verifiable institutional evidence.</p>
            </div>
            <button type="button" onclick="formBuilder.addSignatureAchievementRow()" class="text-xs px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Achievement
            </button>
          </div>
          <div class="space-y-2">
            ${(qual.signatureAchievements || []).map((item, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div class="md:col-span-2">
                  <input type="text" placeholder="Achievement Headline" value="${item.title || ''}" onchange="formBuilder.updateArrayItem('qualitativePresentation.signatureAchievements', ${idx}, 'title', this.value)" class="w-full text-xs p-1.5 border rounded font-semibold text-slate-800" />
                </div>
                <div class="md:col-span-3 flex items-center gap-1">
                  <input type="text" placeholder="Verifiable Impact & Evidence" value="${item.impact || ''}" onchange="formBuilder.updateArrayItem('qualitativePresentation.signatureAchievements', ${idx}, 'impact', this.value)" class="w-full text-xs p-1.5 border rounded" />
                  <button type="button" onclick="formBuilder.removeArrayItem('qualitativePresentation.signatureAchievements', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Uniqueness of the Department -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 class="text-xs font-bold uppercase text-slate-700 mb-1">2. Uniqueness of the Department (Distinctive Identity)</h4>
          <p class="text-[11px] text-slate-500 mb-2">What sets this department apart in pedagogy, research, outreach, or student ethos?</p>
          <textarea rows="3" onchange="formBuilder.updateField('qualitativePresentation.uniqueness', this.value)" class="w-full text-xs p-2.5 border rounded leading-relaxed">${qual.uniqueness || ''}</textarea>
        </div>

        <!-- 3. Status of Activities Completed based on AAA 2025 – 2026 (ATR) -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div class="flex justify-between items-center mb-3">
            <div>
              <h4 class="text-xs font-bold uppercase text-slate-700">3. Action Taken Report (ATR) based on AAA 2025 – 2026</h4>
              <p class="text-[11px] text-slate-500">Status of compliance on previous audit panel recommendations.</p>
            </div>
            <button type="button" onclick="formBuilder.addAtrRow()" class="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Recommendation
            </button>
          </div>
          <div class="space-y-2">
            ${(qual.statusAAA2025_2026 || []).map((atr, idx) => `
              <div class="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 items-center">
                <div class="md:col-span-2">
                  <input type="text" placeholder="Previous Recommendation" value="${atr.recommendation || ''}" onchange="formBuilder.updateArrayItem('qualitativePresentation.statusAAA2025_2026', ${idx}, 'recommendation', this.value)" class="w-full text-xs p-1.5 border rounded font-medium" />
                </div>
                <div>
                  <select onchange="formBuilder.updateArrayItem('qualitativePresentation.statusAAA2025_2026', ${idx}, 'status', this.value)" class="w-full text-xs p-1.5 border rounded font-semibold ${atr.status === 'Fully Completed' ? 'text-emerald-700' : 'text-amber-700'}">
                    <option value="Fully Completed" ${atr.status === 'Fully Completed' ? 'selected' : ''}>Fully Completed</option>
                    <option value="In Progress" ${atr.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Partially Completed" ${atr.status === 'Partially Completed' ? 'selected' : ''}>Partially Completed</option>
                  </select>
                </div>
                <div class="md:col-span-2 flex items-center gap-1">
                  <input type="text" placeholder="Measurable Evidence / Action Taken" value="${atr.evidence || ''}" onchange="formBuilder.updateArrayItem('qualitativePresentation.statusAAA2025_2026', ${idx}, 'evidence', this.value)" class="w-full text-xs p-1.5 border rounded" />
                  <button type="button" onclick="formBuilder.removeArrayItem('qualitativePresentation.statusAAA2025_2026', ${idx})" class="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Best Practices (NAAC Format) -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div class="flex justify-between items-center mb-3">
            <div>
              <h4 class="text-xs font-bold uppercase text-slate-700">4. Best Practices of the Department (Institutional NAAC Format)</h4>
              <p class="text-[11px] text-slate-500">Provide Title, Objectives, Context, The Practice, and Evidence of Success.</p>
            </div>
            <button type="button" onclick="formBuilder.addBestPracticeRow()" class="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Best Practice
            </button>
          </div>
          <div class="space-y-4">
            ${(qual.bestPractices || []).map((bp, idx) => `
              <div class="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div class="flex justify-between items-center border-b pb-2">
                  <input type="text" placeholder="Best Practice Title" value="${bp.title || ''}" onchange="formBuilder.updateArrayItem('qualitativePresentation.bestPractices', ${idx}, 'title', this.value)" class="w-3/4 text-xs font-bold text-slate-800 p-1.5 border rounded" />
                  <button type="button" onclick="formBuilder.removeArrayItem('qualitativePresentation.bestPractices', ${idx})" class="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label class="text-[10px] uppercase font-bold text-slate-500">Objectives of the Practice</label>
                    <textarea rows="2" onchange="formBuilder.updateArrayItem('qualitativePresentation.bestPractices', ${idx}, 'objectives', this.value)" class="w-full text-xs p-1.5 border rounded">${bp.objectives || ''}</textarea>
                  </div>
                  <div>
                    <label class="text-[10px] uppercase font-bold text-slate-500">The Context</label>
                    <textarea rows="2" onchange="formBuilder.updateArrayItem('qualitativePresentation.bestPractices', ${idx}, 'context', this.value)" class="w-full text-xs p-1.5 border rounded">${bp.context || ''}</textarea>
                  </div>
                  <div>
                    <label class="text-[10px] uppercase font-bold text-slate-500">The Practice</label>
                    <textarea rows="2" onchange="formBuilder.updateArrayItem('qualitativePresentation.bestPractices', ${idx}, 'practice', this.value)" class="w-full text-xs p-1.5 border rounded">${bp.practice || ''}</textarea>
                  </div>
                  <div>
                    <label class="text-[10px] uppercase font-bold text-slate-500">Evidence of Success</label>
                    <textarea rows="2" onchange="formBuilder.updateArrayItem('qualitativePresentation.bestPractices', ${idx}, 'evidence', this.value)" class="w-full text-xs p-1.5 border rounded">${bp.evidence || ''}</textarea>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. SWOC Analysis Matrix -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 class="text-xs font-bold uppercase text-slate-700 mb-3">5. SWOC Analysis (Strengths, Weaknesses, Opportunities, Challenges)</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
              <label class="text-xs font-bold text-emerald-900 block mb-1">Strengths (1 per line)</label>
              <textarea rows="4" onchange="formBuilder.updateLinesArray('qualitativePresentation.swoc.strengths', this.value)" class="w-full text-xs p-2 border border-emerald-300 rounded">${(qual.swoc?.strengths || []).join('\n')}</textarea>
            </div>
            <div class="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
              <label class="text-xs font-bold text-amber-900 block mb-1">Weaknesses (1 per line)</label>
              <textarea rows="4" onchange="formBuilder.updateLinesArray('qualitativePresentation.swoc.weaknesses', this.value)" class="w-full text-xs p-2 border border-amber-300 rounded">${(qual.swoc?.weaknesses || []).join('\n')}</textarea>
            </div>
            <div class="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
              <label class="text-xs font-bold text-blue-900 block mb-1">Opportunities (1 per line)</label>
              <textarea rows="4" onchange="formBuilder.updateLinesArray('qualitativePresentation.swoc.opportunities', this.value)" class="w-full text-xs p-2 border border-blue-300 rounded">${(qual.swoc?.opportunities || []).join('\n')}</textarea>
            </div>
            <div class="p-3 bg-red-50/70 border border-red-200 rounded-lg">
              <label class="text-xs font-bold text-red-900 block mb-1">Challenges (1 per line)</label>
              <textarea rows="4" onchange="formBuilder.updateLinesArray('qualitativePresentation.swoc.challenges', this.value)" class="w-full text-xs p-2 border border-red-300 rounded">${(qual.swoc?.challenges || []).join('\n')}</textarea>
            </div>
          </div>
        </div>

        <!-- 6. Future Plans -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 class="text-xs font-bold uppercase text-slate-700 mb-3">6. Future Strategic Roadmap</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-slate-800 block mb-1">Short-Term Plans (Next 1 Year, 1 per line)</label>
              <textarea rows="3" onchange="formBuilder.updateLinesArray('qualitativePresentation.futurePlans.shortTerm', this.value)" class="w-full text-xs p-2 border rounded">${(qual.futurePlans?.shortTerm || []).join('\n')}</textarea>
            </div>
            <div>
              <label class="text-xs font-bold text-slate-800 block mb-1">Long-Term Plans (3 to 5 Years, 1 per line)</label>
              <textarea rows="3" onchange="formBuilder.updateLinesArray('qualitativePresentation.futurePlans.longTerm', this.value)" class="w-full text-xs p-2 border rounded">${(qual.futurePlans?.longTerm || []).join('\n')}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 9: Crucial Academic Pillars
  renderPillarsTab(pillars) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">Crucial Departmental Academic Pillars</h3>
            <p class="text-xs text-slate-500">PTM, Stakeholder Feedback, TL Innovations, Assessment Process, Remedial Teaching, Student Support, Competitive Exams, and Sustainability.</p>
          </div>
          <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Core Quality Pillars</span>
        </div>

        <!-- 1. PTM & 2. Feedback -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- PTM -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="users" class="w-4 h-4 text-blue-600"></i>
              1. Parent-Teacher Meetings (PTM)
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Meetings Conducted</label>
                <input type="number" value="${pillars?.ptm?.meetingsConducted || 0}" onchange="formBuilder.updateField('qualitativePresentation.pillars.ptm.meetingsConducted', parseInt(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Attendance %</label>
                <input type="number" step="0.1" value="${pillars?.ptm?.parentAttendancePercentage || 0}" onchange="formBuilder.updateField('qualitativePresentation.pillars.ptm.parentAttendancePercentage', parseFloat(this.value)||0)" class="w-full text-xs p-1.5 border rounded" />
              </div>
            </div>
            <div>
              <label class="text-[11px] block font-medium">Meeting Dates</label>
              <input type="text" value="${pillars?.ptm?.dates || ''}" onchange="formBuilder.updateField('qualitativePresentation.pillars.ptm.dates', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Key Feedback & Discussion</label>
              <textarea rows="2" onchange="formBuilder.updateField('qualitativePresentation.pillars.ptm.keyFeedback', this.value)" class="w-full text-xs p-1.5 border rounded">${pillars?.ptm?.keyFeedback || ''}</textarea>
            </div>
            <div>
              <label class="text-[11px] block font-medium">Action Taken</label>
              <input type="text" value="${pillars?.ptm?.actionTaken || ''}" onchange="formBuilder.updateField('qualitativePresentation.pillars.ptm.actionTaken', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>

          <!-- Stakeholder Feedback -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="message-square" class="w-4 h-4 text-emerald-600"></i>
              2. Stakeholder Feedback (Rating out of 5.0)
            </h4>
            <div class="grid grid-cols-4 gap-2">
              <div>
                <label class="text-[11px] block font-medium">Students</label>
                <input type="number" step="0.1" max="5" value="${pillars?.feedback?.studentRating || 0}" onchange="formBuilder.updateField('qualitativePresentation.pillars.feedback.studentRating', parseFloat(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-blue-700" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Parents</label>
                <input type="number" step="0.1" max="5" value="${pillars?.feedback?.parentRating || 0}" onchange="formBuilder.updateField('qualitativePresentation.pillars.feedback.parentRating', parseFloat(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-blue-700" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Alumni</label>
                <input type="number" step="0.1" max="5" value="${pillars?.feedback?.alumniRating || 0}" onchange="formBuilder.updateField('qualitativePresentation.pillars.feedback.alumniRating', parseFloat(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-blue-700" />
              </div>
              <div>
                <label class="text-[11px] block font-medium">Employers</label>
                <input type="number" step="0.1" max="5" value="${pillars?.feedback?.employerRating || 0}" onchange="formBuilder.updateField('qualitativePresentation.pillars.feedback.employerRating', parseFloat(this.value)||0)" class="w-full text-xs p-1.5 border rounded font-semibold text-blue-700" />
              </div>
            </div>
            <div>
              <label class="text-[11px] block font-medium">Action Taken Report (ATR) on Feedback</label>
              <textarea rows="4" onchange="formBuilder.updateField('qualitativePresentation.pillars.feedback.actionTakenReport', this.value)" class="w-full text-xs p-2 border rounded leading-relaxed">${pillars?.feedback?.actionTakenReport || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- 3. TL Innovations & 4. Assessment Process -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Teaching-Learning -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="book" class="w-4 h-4 text-purple-600"></i>
              3. Teaching-Learning (TL) Innovations
            </h4>
            <div>
              <label class="text-[11px] block font-medium">Pedagogical Innovations (Flipped, Blended, Experiential)</label>
              <textarea rows="3" onchange="formBuilder.updateField('qualitativePresentation.pillars.teachingLearning.innovations', this.value)" class="w-full text-xs p-2 border rounded">${pillars?.teachingLearning?.innovations || ''}</textarea>
            </div>
            <div>
              <label class="text-[11px] block font-medium">ICT Tools / Platforms Used</label>
              <input type="text" value="${pillars?.teachingLearning?.ictToolsUsed || ''}" onchange="formBuilder.updateField('qualitativePresentation.pillars.teachingLearning.ictToolsUsed', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>

          <!-- Assessment Process -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="check-circle" class="w-4 h-4 text-indigo-600"></i>
              4. Assessment Process (Ass P.)
            </h4>
            <div>
              <label class="text-[11px] block font-medium">CIA Reforms & Bloom's Taxonomy Mapping</label>
              <textarea rows="4" onchange="formBuilder.updateField('qualitativePresentation.pillars.assessmentProcess.reforms', this.value)" class="w-full text-xs p-2 border rounded leading-relaxed">${pillars?.assessmentProcess?.reforms || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- 5. Remedial & 6. Student Support -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Remedial -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="life-buoy" class="w-4 h-4 text-amber-600"></i>
              5. Remedial Teaching (Slow / Advanced Learners)
            </h4>
            <div>
              <label class="text-[11px] block font-medium">Remedial Strategy & Peer Mentoring</label>
              <textarea rows="2" onchange="formBuilder.updateField('qualitativePresentation.pillars.remedialTeaching.strategy', this.value)" class="w-full text-xs p-2 border rounded">${pillars?.remedialTeaching?.strategy || ''}</textarea>
            </div>
            <div>
              <label class="text-[11px] block font-medium">Measurable Impact / Pass % Improvement</label>
              <input type="text" value="${pillars?.remedialTeaching?.impact || ''}" onchange="formBuilder.updateField('qualitativePresentation.pillars.remedialTeaching.impact', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>

          <!-- Student Support -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="heart" class="w-4 h-4 text-rose-600"></i>
              6. Student Support & Development
            </h4>
            <div class="flex items-center gap-2">
              <label class="text-[11px] font-medium">Faculty Mentoring Ratio:</label>
              <input type="text" value="${pillars?.studentSupport?.mentoringRatio || '1:20'}" onchange="formBuilder.updateField('qualitativePresentation.pillars.studentSupport.mentoringRatio', this.value)" class="w-28 text-xs p-1 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">Scholarships, Wellness & Career Support Measures</label>
              <textarea rows="2" onchange="formBuilder.updateField('qualitativePresentation.pillars.studentSupport.supportMeasures', this.value)" class="w-full text-xs p-2 border rounded">${pillars?.studentSupport?.supportMeasures || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- 7. Guidance for Competitive Exams & 8. Sustainability -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <i data-lucide="target" class="w-4 h-4 text-teal-600"></i>
              7. Guidance for Competitive Examinations
            </h4>
            <textarea rows="3" placeholder="Coaching sessions, GATE/NET circles, civil service guidance..." onchange="formBuilder.updateField('qualitativePresentation.pillars.guidanceCompExam.initiatives', this.value)" class="w-full text-xs p-2 border rounded">${pillars?.guidanceCompExam?.initiatives || ''}</textarea>
          </div>

          <div class="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-2">
            <h4 class="text-xs font-bold uppercase text-emerald-900 flex items-center gap-1.5">
              <i data-lucide="leaf" class="w-4 h-4 text-emerald-600"></i>
              8. Sustainability & Green Initiatives
            </h4>
            <textarea rows="3" placeholder="Paperless exams, e-waste handling, green computing, energy saving..." onchange="formBuilder.updateField('qualitativePresentation.pillars.sustainability.initiatives', this.value)" class="w-full text-xs p-2 border rounded">${pillars?.sustainability?.initiatives || ''}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 10: 15-Min Panel Review Rubric
  renderPanelTab(panel) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold text-slate-800">15-Minute Panel Review & Evaluation Rubric</h3>
            <p class="text-xs text-slate-500">Record scores and recommendations from Administrators, IQAC, School Dean, and External Expert.</p>
          </div>
          <span class="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">Phase 3: 15 Minutes</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold uppercase text-slate-700">Audit Panel Committee Members</h4>
            <div>
              <label class="text-[11px] block font-medium">External Academic Expert</label>
              <input type="text" value="${panel.expertName || ''}" onchange="formBuilder.updateField('panelReview.expertName', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">School Dean</label>
              <input type="text" value="${panel.deanName || ''}" onchange="formBuilder.updateField('panelReview.deanName', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">IQAC Coordinator</label>
              <input type="text" value="${panel.iqacCoordinator || ''}" onchange="formBuilder.updateField('panelReview.iqacCoordinator', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
            <div>
              <label class="text-[11px] block font-medium">College Administrator / Principal</label>
              <input type="text" value="${panel.administratorName || ''}" onchange="formBuilder.updateField('panelReview.administratorName', this.value)" class="w-full text-xs p-1.5 border rounded" />
            </div>
          </div>

          <div class="bg-blue-50/40 p-4 rounded-xl border border-blue-200 space-y-3">
            <h4 class="text-xs font-bold uppercase text-blue-900">Scoring Rubric (Rating 1 to 5)</h4>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>Curriculum (Att I)</span>
                <input type="number" min="1" max="5" value="${panel.scores?.curriculum || 5}" onchange="formBuilder.updateField('panelReview.scores.curriculum', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>Faculty (Att II)</span>
                <input type="number" min="1" max="5" value="${panel.scores?.faculty || 5}" onchange="formBuilder.updateField('panelReview.scores.faculty', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>Grants & Seed (Att 4&7)</span>
                <input type="number" min="1" max="5" value="${panel.scores?.resources || 4}" onchange="formBuilder.updateField('panelReview.scores.resources', parseInt(this.value)||4)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>TL & MoUs (Att V)</span>
                <input type="number" min="1" max="5" value="${panel.scores?.learningTeaching || 5}" onchange="formBuilder.updateField('panelReview.scores.learningTeaching', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>Clubs & Awards (Att VI)</span>
                <input type="number" min="1" max="5" value="${panel.scores?.extendedCurricular || 5}" onchange="formBuilder.updateField('panelReview.scores.extendedCurricular', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>Research & IPR (Att IX)</span>
                <input type="number" min="1" max="5" value="${panel.scores?.research || 5}" onchange="formBuilder.updateField('panelReview.scores.research', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>Presentation Quality</span>
                <input type="number" min="1" max="5" value="${panel.scores?.presentationQuality || 5}" onchange="formBuilder.updateField('panelReview.scores.presentationQuality', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
              <div class="flex justify-between items-center bg-white p-1.5 rounded border">
                <span>AAA 2025-26 Compliance</span>
                <input type="number" min="1" max="5" value="${panel.scores?.complianceAAA || 5}" onchange="formBuilder.updateField('panelReview.scores.complianceAAA', parseInt(this.value)||5)" class="w-12 text-center border rounded" />
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t">
              <span class="text-xs font-bold text-slate-800">Overall Assigned Grade:</span>
              <select onchange="formBuilder.updateField('panelReview.overallGrade', this.value)" class="text-xs font-bold p-1.5 border rounded bg-white text-blue-900">
                <option value="A++" ${panel.overallGrade === 'A++' ? 'selected' : ''}>A++ (Outstanding)</option>
                <option value="A+" ${panel.overallGrade === 'A+' ? 'selected' : ''}>A+ (Excellent)</option>
                <option value="A" ${panel.overallGrade === 'A' ? 'selected' : ''}>A (Very Good)</option>
                <option value="B++" ${panel.overallGrade === 'B++' ? 'selected' : ''}>B++ (Good)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-emerald-50/40 p-4 rounded-xl border border-emerald-200">
            <label class="text-xs font-bold uppercase text-emerald-900 block mb-1">Key Commendations by External Expert & IQAC</label>
            <textarea rows="4" onchange="formBuilder.updateField('panelReview.commendations', this.value)" class="w-full text-xs p-2.5 border border-emerald-300 rounded leading-relaxed">${panel.commendations || ''}</textarea>
          </div>
          <div class="bg-amber-50/40 p-4 rounded-xl border border-amber-200">
            <label class="text-xs font-bold uppercase text-amber-900 block mb-1">Actionable Recommendations for A.Y. 2027 - 2028</label>
            <textarea rows="4" onchange="formBuilder.updateField('panelReview.recommendations', this.value)" class="w-full text-xs p-2.5 border border-amber-300 rounded leading-relaxed">${panel.recommendations || ''}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  // Field Helpers & Real-time Updaters
  updateField(path, value) {
    const data = window.dataStore.data;
    const parts = path.split('.');
    let current = data;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    window.dataStore.saveCurrentData();
    this.showSaveIndicator();
  }

  updateArrayItem(arrayPath, index, field, value) {
    const data = window.dataStore.data;
    const parts = arrayPath.split('.');
    let arr = data;
    for (const part of parts) {
      arr = arr[part];
    }
    if (arr && arr[index]) {
      arr[index][field] = value;
      window.dataStore.saveCurrentData();
      this.showSaveIndicator();
    }
  }

  updateLinesArray(path, textValue) {
    const lines = textValue.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    this.updateField(path, lines);
  }

  removeArrayItem(arrayPath, index) {
    const data = window.dataStore.data;
    const parts = arrayPath.split('.');
    let arr = data;
    for (const part of parts) {
      arr = arr[part];
    }
    if (arr && arr.length > index) {
      arr.splice(index, 1);
      window.dataStore.saveCurrentData();
      this.render(data);
    }
  }

  addVacRow() {
    const data = window.dataStore.data;
    if (!data.attributeI.vac) data.attributeI.vac = [];
    data.attributeI.vac.push({ name: '', count: 1, studentsEnrolled: 0, feeCollected: 0, agenciesInvolved: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addCcRow() {
    const data = window.dataStore.data;
    if (!data.attributeI.cc) data.attributeI.cc = [];
    data.attributeI.cc.push({ name: '', count: 1, studentsEnrolled: 0, feeCollected: 0, agenciesInvolved: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addExternalFundRow() {
    const data = window.dataStore.data;
    if (!data.attributeIV_VII.externalFunds) data.attributeIV_VII.externalFunds = [];
    data.attributeIV_VII.externalFunds.push({ category: 'Conduct of FDP/Conference/Seminar', agency: '', amount: 0, facultyInvolved: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addManagementFundRow() {
    const data = window.dataStore.data;
    if (!data.attributeIV_VII.managementFunds) data.attributeIV_VII.managementFunds = [];
    data.attributeIV_VII.managementFunds.push({ category: 'Conduct of FDP/Conference/Seminar', amount: 0, facultyInvolved: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addClubRow() {
    const data = window.dataStore.data;
    if (!data.attributeVI_VIII.clubs) data.attributeVI_VIII.clubs = [];
    data.attributeVI_VIII.clubs.push({ clubName: '', studentsUG: 0, studentsPG: 0, activities: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addSignatureAchievementRow() {
    const data = window.dataStore.data;
    if (!data.qualitativePresentation.signatureAchievements) data.qualitativePresentation.signatureAchievements = [];
    data.qualitativePresentation.signatureAchievements.push({ title: '', impact: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addAtrRow() {
    const data = window.dataStore.data;
    if (!data.qualitativePresentation.statusAAA2025_2026) data.qualitativePresentation.statusAAA2025_2026 = [];
    data.qualitativePresentation.statusAAA2025_2026.push({ recommendation: '', status: 'Fully Completed', evidence: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  addBestPracticeRow() {
    const data = window.dataStore.data;
    if (!data.qualitativePresentation.bestPractices) data.qualitativePresentation.bestPractices = [];
    data.qualitativePresentation.bestPractices.push({ title: '', objectives: '', context: '', practice: '', evidence: '', resourcesRequired: '' });
    window.dataStore.saveCurrentData();
    this.render(data);
  }

  updateScholarField(type, gender, val) {
    const data = window.dataStore.data;
    if (!data.departmentInfo) data.departmentInfo = {};
    if (!data.departmentInfo.scholars) {
      data.departmentInfo.scholars = { fullTime: { male: 0, female: 0 }, partTime: { male: 0, female: 0 } };
    }
    if (!data.departmentInfo.scholars[type]) data.departmentInfo.scholars[type] = { male: 0, female: 0 };
    data.departmentInfo.scholars[type][gender] = val;

    const ftM = data.departmentInfo.scholars.fullTime?.male || 0;
    const ftF = data.departmentInfo.scholars.fullTime?.female || 0;
    const ptM = data.departmentInfo.scholars.partTime?.male || 0;
    const ptF = data.departmentInfo.scholars.partTime?.female || 0;
    data.departmentInfo.researchScholarsCount = ftM + ftF + ptM + ptF;

    window.dataStore.saveCurrentData();
    window.dataStore.notify();
    this.render(data);
  }

  updateOutcomeField(prog, metric, val) {
    const data = window.dataStore.data;
    if (!data.studentsOutcomes2026) data.studentsOutcomes2026 = {};
    if (!data.studentsOutcomes2026[prog]) data.studentsOutcomes2026[prog] = {};
    data.studentsOutcomes2026[prog][metric] = val;
    window.dataStore.saveCurrentData();
    window.dataStore.notify();
    this.render(data);
  }

  addActivityRow(category) {
    const data = window.dataStore.data;
    if (!data.qualitativePresentation) data.qualitativePresentation = {};
    if (!data.qualitativePresentation.statusOfActivities) {
      data.qualitativePresentation.statusOfActivities = { basedOnAAA2025_2026: [], basedOnFacultyOrientation2026: [] };
    }
    if (!data.qualitativePresentation.statusOfActivities[category]) {
      data.qualitativePresentation.statusOfActivities[category] = [];
    }
    data.qualitativePresentation.statusOfActivities[category].push({
      eventActivity: '',
      monthYear: '',
      status: 'Completed',
      remarks: ''
    });
    window.dataStore.saveCurrentData();
    window.dataStore.notify();
    this.render(data);
  }

  removeActivityRow(category, index) {
    const data = window.dataStore.data;
    if (data.qualitativePresentation?.statusOfActivities?.[category]) {
      data.qualitativePresentation.statusOfActivities[category].splice(index, 1);
      window.dataStore.saveCurrentData();
      window.dataStore.notify();
      this.render(data);
    }
  }

  updateActivityItem(category, index, field, val) {
    const data = window.dataStore.data;
    if (data.qualitativePresentation?.statusOfActivities?.[category]?.[index]) {
      data.qualitativePresentation.statusOfActivities[category][index][field] = val;
      window.dataStore.saveCurrentData();
      this.showSaveIndicator();
    }
  }

  addFacilityRow() {
    const data = window.dataStore.data;
    if (!data.attributeIII) data.attributeIII = {};
    if (!data.attributeIII.purchasedEquipments) data.attributeIII.purchasedEquipments = [];
    data.attributeIII.purchasedEquipments.push({
      labName: '',
      equipmentName: '',
      type: 'Major Equipment',
      purchaseDate: new Date().toISOString().split('T')[0],
      amountINR: 0
    });
    window.dataStore.saveCurrentData();
    window.dataStore.notify();
    this.render(data);
  }

  removeFacilityRow(index) {
    const data = window.dataStore.data;
    if (data.attributeIII?.purchasedEquipments) {
      data.attributeIII.purchasedEquipments.splice(index, 1);
      window.dataStore.saveCurrentData();
      window.dataStore.notify();
      this.render(data);
    }
  }

  updateFacilityItem(index, field, val) {
    const data = window.dataStore.data;
    if (data.attributeIII?.purchasedEquipments?.[index]) {
      data.attributeIII.purchasedEquipments[index][field] = val;
      window.dataStore.saveCurrentData();
      this.showSaveIndicator();
    }
  }

  updateLibraryField(field, val) {
    const data = window.dataStore.data;
    if (!data.attributeIII) data.attributeIII = {};
    if (!data.attributeIII.departmentLibrary) data.attributeIII.departmentLibrary = {};
    data.attributeIII.departmentLibrary[field] = val;
    window.dataStore.saveCurrentData();
    this.showSaveIndicator();
  }

  addCsrRow() {
    const data = window.dataStore.data;
    if (!data.attributeX) data.attributeX = {};
    if (!data.attributeX.csrActivities) data.attributeX.csrActivities = [];
    data.attributeX.csrActivities.push({
      activityName: '',
      type: 'Extension Activity',
      collaboratingAgency: '',
      isCSR: true,
      studentsBenefited: 0,
      amountINR: 0
    });
    window.dataStore.saveCurrentData();
    window.dataStore.notify();
    this.render(data);
  }

  removeCsrRow(index) {
    const data = window.dataStore.data;
    if (data.attributeX?.csrActivities) {
      data.attributeX.csrActivities.splice(index, 1);
      window.dataStore.saveCurrentData();
      window.dataStore.notify();
      this.render(data);
    }
  }

  updateCsrItem(index, field, val) {
    const data = window.dataStore.data;
    if (data.attributeX?.csrActivities?.[index]) {
      data.attributeX.csrActivities[index][field] = val;
      window.dataStore.saveCurrentData();
      this.showSaveIndicator();
    }
  }

  updateGreenField(field, val) {
    const data = window.dataStore.data;
    if (!data.attributeX) data.attributeX = {};
    if (!data.attributeX.sustainability) data.attributeX.sustainability = {};
    data.attributeX.sustainability[field] = val;
    window.dataStore.saveCurrentData();
    this.showSaveIndicator();
  }

  showSaveIndicator() {
    const ind = document.getElementById('save-indicator');
    if (ind) {
      ind.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
      ind.classList.add('bg-blue-50', 'text-blue-700', 'border-blue-200');
      ind.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> Saving...`;
      setTimeout(() => {
        ind.classList.remove('bg-blue-50', 'text-blue-700', 'border-blue-200');
        ind.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
        ind.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Auto-saved`;
      }, 500);
    }
  }
}

window.FormBuilder = FormBuilder;
