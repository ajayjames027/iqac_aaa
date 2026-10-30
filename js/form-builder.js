// IQAC AAA 2026-2027 - Dynamic Form Builder & Event Handlers

class FormBuilder {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTab = 'profile';
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

        <!-- Section Navigation Pills -->
        <div class="px-6 py-3 bg-slate-100/70 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 text-xs font-medium text-slate-600 scrollbar-thin">
          ${this.renderNavTab('profile', 'Department Profile', 'building')}
          ${this.renderNavTab('att1', 'Att I: Curriculum', 'book-open')}
          ${this.renderNavTab('att2', 'Att II: Faculty', 'users')}
          ${this.renderNavTab('att4_7', 'Att 4 & 7: Grants & IPR', 'indian-rupee')}
          ${this.renderNavTab('att5', 'Att V: Teaching & MoUs', 'laptop')}
          ${this.renderNavTab('att6_8', 'Att VI & VIII: Clubs & Awards', 'trophy')}
          ${this.renderNavTab('att9', 'Att IX: Research & Books', 'award')}
          ${this.renderNavTab('qualitative', '30-Min Presentation Flow', 'presentation')}
          ${this.renderNavTab('pillars', 'Crucial Academic Pillars', 'layers')}
          ${this.renderNavTab('panel', '15-Min Review Rubric', 'clipboard-check')}
        </div>

        <!-- Form Tab Body -->
        <form id="aaa-main-form" class="p-6">
          <div id="form-tab-content">
            ${this.renderActiveTabContent(data)}
          </div>
        </form>
      </div>
    `;

    // Initialize lucide icons if available
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  renderNavTab(tabKey, label, icon) {
    const isActive = this.activeTab === tabKey;
    const activeClasses = isActive ? 'bg-blue-600 text-white shadow-sm font-semibold' : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200';
    return `
      <button type="button" onclick="formBuilder.switchTab('${tabKey}')" class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${activeClasses}">
        <i data-lucide="${icon}" class="w-3.5 h-3.5"></i>
        <span>${label}</span>
      </button>
    `;
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
    switch (this.activeTab) {
      case 'profile':
        return this.renderProfileTab(data.departmentInfo);
      case 'att1':
        return this.renderAtt1Tab(data.attributeI);
      case 'att2':
        return this.renderAtt2Tab(data.attributeII);
      case 'att4_7':
        return this.renderAtt4_7Tab(data.attributeIV_VII);
      case 'att5':
        return this.renderAtt5Tab(data.attributeV);
      case 'att6_8':
        return this.renderAtt6_8Tab(data.attributeVI_VIII);
      case 'att9':
        return this.renderAtt9Tab(data.attributeIX);
      case 'qualitative':
        return this.renderQualitativeTab(data.qualitativePresentation);
      case 'pillars':
        return this.renderPillarsTab(data.qualitativePresentation.pillars);
      case 'panel':
        return this.renderPanelTab(data.panelReview);
      default:
        return this.renderProfileTab(data.departmentInfo);
    }
  }

  // TAB 1: Department Profile
  renderProfileTab(info) {
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-200 pb-3">
          <h3 class="text-base font-semibold text-slate-800">Department Profile & Institutional Identity</h3>
          <p class="text-xs text-slate-500">Official identifiers for the Annual Academic Audit 2026 - 2027.</p>
        </div>

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
            <label class="block text-xs font-semibold text-slate-700 mb-1">Research Scholars (Ph.D. / M.Phil.)</label>
            <input type="number" value="${info.researchScholarsCount || 0}" onchange="formBuilder.updateField('departmentInfo.researchScholarsCount', parseInt(this.value)||0)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg form-input-custom" />
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

        <!-- 6. MOOC Registrations and Completions (Table 2 from Word Doc) -->
        <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
          <h4 class="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
            <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i>
            6. Students Registering / Completing MOOC (NPTEL / SWAYAM / Coursera)
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
