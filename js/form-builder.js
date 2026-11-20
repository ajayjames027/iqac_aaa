// IQAC AAA February 2027 - Master Form Builder with Attribute Cards & Sheet Navigation
// Rules:
// 1. Landing view displays Cards for: PART-A and Attributes 1 to 10.
// 2. Each card shows exact progress: e.g. "4/11 Sheets Finished".
// 3. No placeholders in input boxes.
// 4. Needed columns use dropdown options: (VAC / CC), (Online / Offline / Blended), (Mention YES/NO), (SKILL, KNOWLEDGE, BOTH), etc.
// 5. Full width layout for viewing all boxes comfortably.
// 6. Every sheet has dedicated Save Sheet Data buttons at top and bottom.
// 7. Prominent title: Annual Academic Audit (AAA) 2026-2027.
// 8. Questions/Headers are EDITABLE ONLY BY ADMIN; Departments can ONLY FILL DATA.

class FormBuilder {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeCardId = null; // null = Cards Gallery View; 'part_a', 'att1', etc. = Active Attribute
    this.activeSheetKey = null; // Key of active sheet within current card
    this.adminEditQuestionsMode = false; // Toggleable ONLY by Admin
    this.saveTimeout = null;
    this.academicYear = '2026–2027';
    this.isCardsUnlocked = true;
  }

  unlockAttributeCards() {
    this.isCardsUnlocked = true;
  }

  toggleCardsLock() {
    this.isCardsUnlocked = true;
    this.render(window.dataStore?.data);
  }

  // Check if current logged-in user is IQAC Admin
  isAdmin() {
    return window.authManager && typeof window.authManager.isAdmin === 'function' 
      ? window.authManager.isAdmin() 
      : false;
  }

  // Retrieve Master Cards Schema
  getMasterSchema() {
    if (window.dataStore && typeof window.dataStore.getAllCardsSchema === 'function') {
      return window.dataStore.getAllCardsSchema();
    }
    return window.ALL_ATTRIBUTES_CARDS_SCHEMA || [];
  }

  // Open specific card
  openCard(cardId) {
    this.activeCardId = cardId;
    const card = this.getActiveCard();
    if (card && card.sheets && card.sheets.length > 0) {
      this.activeSheetKey = card.sheets[0].key;
    } else {
      this.activeSheetKey = null;
    }
    this.adminEditQuestionsMode = false;
    this.render(window.dataStore ? window.dataStore.data : null);
    if (typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Return to Cards Gallery
  backToCards() {
    this.activeCardId = null;
    this.activeSheetKey = null;
    this.adminEditQuestionsMode = false;
    this.render(window.dataStore ? window.dataStore.data : null);
    if (typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Get active card object
  getActiveCard() {
    if (!this.activeCardId) return null;
    const schema = this.getMasterSchema();
    return schema.find(c => c.id === this.activeCardId) || null;
  }

  // Get active sheet definition
  getActiveSheet() {
    const card = this.getActiveCard();
    if (!card || !card.sheets) return null;
    return card.sheets.find(s => s.key === this.activeSheetKey) || card.sheets[0] || null;
  }

  // Switch sheet within active card
  switchSheet(sheetKey) {
    this.activeSheetKey = sheetKey;
    this.render(window.dataStore ? window.dataStore.data : null);
    if (typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Toggle Admin Question Edit Mode
  toggleAdminEditQuestionsMode() {
    if (!this.isAdmin()) {
      window.showToast('Access Denied: Only IQAC Administrators can edit the questionnaire schema.', 'error', 3500, 'Access Denied');
      return;
    }
    this.adminEditQuestionsMode = !this.adminEditQuestionsMode;
    this.render(window.dataStore ? window.dataStore.data : null);
  }

  // Save changes to Question Schema (Admin Only)
  saveQuestionSchema() {
    if (!this.isAdmin()) return;
    const schema = this.getMasterSchema();
    if (window.dataStore) {
      window.dataStore.saveAllCardsSchema(schema);
    }
    this.adminEditQuestionsMode = false;
    window.showToast('Questionnaire template successfully saved and updated across all departments!', 'success', 3500, 'Template Saved');
    this.render(window.dataStore ? window.dataStore.data : null);
  }

  // Reset Question Schema to original Excel template (Admin Only)
  async resetQuestionSchemaToDefault() {
    if (!this.isAdmin()) return;
    const ok = await window.showConfirmDialog(
      'Reset questionnaire structure and column headers to the official Excel template? (This will restore default question text)',
      'Reset Template',
      { confirmText: 'Reset to Default', cancelText: 'Cancel', type: 'warning' }
    );
    if (ok) {
      if (window.dataStore) {
        window.dataStore.resetAllCardsSchema();
      }
      this.adminEditQuestionsMode = false;
      window.showToast('Questionnaire reset to default Excel template.', 'warning', 3500, 'Template Reset');
      this.render(window.dataStore ? window.dataStore.data : null);
    }
  }

  // Show visual save feedback
  showSaveIndicator() {
    const els = document.querySelectorAll('.card-save-indicator');
    els.forEach(el => {
      el.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Saved';
      el.className = 'card-save-indicator text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium flex items-center gap-1.5 shadow-xs';
    });
  }

  // Trigger auto-save
  triggerAutoSave() {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    const els = document.querySelectorAll('.card-save-indicator');
    els.forEach(el => {
      el.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-500 animate-spin"></span> Saving...';
      el.className = 'card-save-indicator text-xs px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium flex items-center gap-1.5';
    });
    this.saveTimeout = setTimeout(() => {
      if (window.dataStore) {
        window.dataStore.saveCurrentData();
      }
      this.showSaveIndicator();
    }, 350);
  }

  // Dedicated Save Sheet Data method
  saveCurrentSheetData(sheetKey) {
    if (this.isSubmissionLocked()) {
      window.showToast('The submission deadline has expired. Records are locked in read-only mode.', 'warning', 4000, 'Deadline Locked');
      return;
    }
    if (window.dataStore) {
      window.dataStore.saveCurrentData();
    }
    this.showSaveIndicator();
    const sheet = this.getActiveSheet();
    const sheetName = sheet ? (sheet.sheetName || sheet.key) : (sheetKey || 'Sheet');
    window.showToast(`Data for ${sheetName} saved successfully!`, 'success', 3500, 'Sheet Saved');
    this.render(window.dataStore ? window.dataStore.data : null);
  }

  saveCurrentDepartmentData() {
    if (window.dataStore) {
      window.dataStore.saveCurrentData();
    }
    this.showSaveIndicator();
    window.showToast('Department data saved successfully!', 'success', 3500, 'Records Saved');
    this.render(window.dataStore ? window.dataStore.data : null);
  }

  exportCurrentCardToExcel() {
    const card = this.getActiveCard();
    if (!card) return;
    const deptName = window.dataStore?.activeDepartment || 'Department';
    this.academicYear = window.dataStore ? window.dataStore.getActiveYear() : '2026 - 2027';
    const cardData = this.getCardData(card.id);

    if (window.ExcelExporter && typeof window.ExcelExporter.exportAttribute1Workbook === 'function') {
      window.ExcelExporter.exportAttribute1Workbook(cardData, card.sheets, `${deptName}_${card.cardCode}`);
    } else {
      alert('Excel exporter ready. Downloading sheets...');
    }
  }

  // Retrieve current card's data object from store
  getCardData(cardId) {
    const data = window.dataStore?.data;
    if (!data) return {};
    if (!data.attributeFormData) {
      if (window.dataStore && typeof window.dataStore.initDefaultCardsFormData === 'function') {
        data.attributeFormData = window.dataStore.initDefaultCardsFormData();
      } else {
        data.attributeFormData = {};
      }
    }
    if (!data.attributeFormData[cardId]) {
      data.attributeFormData[cardId] = {};
    }
    return data.attributeFormData[cardId];
  }

  // ================= PROGRESS & COMPLETION CALCULATOR =================
  // Calculates: how many sheets in a card have finished (e.g., 4 / 11)
  getCompletionStats(card) {
    const cardData = this.getCardData(card.id);
    const totalSheets = card.sheets?.length || 0;
    let finishedCount = 0;

    (card.sheets || []).forEach(sheet => {
      const sData = cardData[sheet.key];
      let isFinished = false;

      if (sheet.type === 'profile') {
        const prof = sData?.profile || {};
        const facRows = sData?.facultyDetails || [];
        const stuRows = sData?.studentDetails || [];
        const hasProf = Boolean((prof.hodName && prof.hodName.trim()) || (prof.programmesOffered && prof.programmesOffered.trim()));
        const hasFac = facRows.some(r => (Number(r.male) > 0 || Number(r.female) > 0));
        const hasStu = stuRows.some(r => (Number(r.male) > 0 || Number(r.female) > 0));
        if (hasProf || hasFac || hasStu) isFinished = true;
      } else if (sheet.type === 'multi_table' || sheet.type === 'batch_table') {
        if (sData && typeof sData === 'object') {
          if (Array.isArray(sData)) {
            isFinished = sData.some(row => Object.entries(row).some(([k, v]) => k !== 'sno' && k !== 's_no' && k !== 'sl_no' && String(v).trim() !== ''));
          } else {
            isFinished = Object.values(sData).some(arr => Array.isArray(arr) && arr.length > 0 && arr.some(r => Object.values(r).some(v => String(v).trim() !== '')));
          }
        }
      } else {
        // Standard table
        if (Array.isArray(sData) && sData.length > 0) {
          isFinished = sData.some(row => {
            return Object.entries(row).some(([k, v]) => k !== 'sno' && k !== 's_no' && k !== 'sl_no' && String(v).trim() !== '');
          });
        }
      }

      if (isFinished) finishedCount++;
    });

    const percentage = totalSheets > 0 ? Math.round((finishedCount / totalSheets) * 100) : 0;
    return { finishedCount, totalSheets, percentage };
  }

  // ================= DROPDOWN OPTIONS DETECTOR =================
  // Detects if a column requires a dropdown, e.g. (VAC / CC), (Online/Offline), YES/NO, etc.
  getDropdownOptions(label, key = '') {
    const lbl = (label || '').trim().toLowerCase();
    const k = (key || '').toLowerCase();

    // 0. SDG Goal Dropdown (All 17 UN Sustainable Development Goals)
    if (k === 'sdggoal' || lbl.includes('sdg goal') || lbl.includes('sdg') || lbl.includes('sustainable development')) {
      return [
        '',
        'Goal 1: No Poverty',
        'Goal 2: Zero Hunger',
        'Goal 3: Good Health and Well-being',
        'Goal 4: Quality Education',
        'Goal 5: Gender Equality',
        'Goal 6: Clean Water and Sanitation',
        'Goal 7: Affordable and Clean Energy',
        'Goal 8: Decent Work and Economic Growth',
        'Goal 9: Industry, Innovation and Infrastructure',
        'Goal 10: Reduced Inequalities',
        'Goal 11: Sustainable Cities and Communities',
        'Goal 12: Responsible Consumption and Production',
        'Goal 13: Climate Action',
        'Goal 14: Life Below Water',
        'Goal 15: Life on Land',
        'Goal 16: Peace, Justice and Strong Institutions',
        'Goal 17: Partnerships for the Goals'
      ];
    }

    // 1. VAC / CC
    if (lbl.includes('vac / cc') || lbl.includes('vac/cc') || lbl.includes('(vac / cc)')) {
      return ['', 'VAC', 'CC'];
    }

    // 2. Mode (Online / Offline / Blended)
    if (lbl.includes('online') && lbl.includes('offline')) {
      if (lbl.includes('blended')) {
        return ['', 'Online', 'Offline', 'Blended'];
      }
      return ['', 'Online', 'Offline'];
    }

    // 3. YES / NO
    if (lbl.includes('yes/no') || lbl.includes('yes / no') || lbl.includes('mention yes/no') || lbl.includes('iks based') || lbl.includes('multidisciplinary') || lbl.includes('industry collab') || (lbl.includes('part of the') && lbl.includes('mou'))) {
      return ['', 'YES', 'NO'];
    }
    if (lbl.includes('mention yes if')) {
      return ['', 'YES', 'NO'];
    }
    if (lbl.includes('whether part of csr') || lbl.includes('is csr')) {
      return ['', 'YES', 'NO'];
    }

    // 4. Focus: SKILL, KNOWLEDGE, BOTH
    if (lbl.includes('skill, knowledge, both') || (lbl.includes('skill') && lbl.includes('knowledge') && lbl.includes('both'))) {
      return ['', 'SKILL', 'KNOWLEDGE', 'BOTH'];
    }

    // 5. Status: Completed / Ongoing
    if (lbl.includes('completed/ongoing') || lbl.includes('completed / ongoing')) {
      return ['', 'Completed', 'Ongoing'];
    }

    // 6. Registered / Completed
    if (lbl.includes('registered / completed') || lbl.includes('registered/completed')) {
      return ['', 'Registered', 'Completed'];
    }

    // 7. Level (International/National/State/Institutional/Regional/University)
    if (lbl.includes('international') && lbl.includes('national')) {
      return ['', 'International', 'National', 'State', 'Regional', 'University', 'Institutional'];
    }

    // 8. Shift (I/II)
    if (lbl.includes('shift (i/ii)') || k === 'shift') {
      return ['', 'Shift I', 'Shift II'];
    }

    // 9. Government / Non-Government
    if (lbl.includes('government/non-government') || lbl.includes('government / non-government')) {
      return ['', 'Government', 'Non-Government'];
    }

    // 10. Books / Journal
    if (lbl.includes('books/jounal') || lbl.includes('books/journal') || lbl.includes('books / journal')) {
      return ['', 'Books', 'Journal'];
    }

    // 11. Gender
    if (k === 'gender' || lbl === 'gender') {
      return ['', 'Male', 'Female', 'Other'];
    }

    // 12. Status (Applied / Granted / Published / Registered)
    if (lbl.includes('applied / granted') || lbl.includes('status (applied')) {
      return ['', 'Applied', 'Granted', 'Published', 'Registered'];
    }

    // 13. PG / UG
    if (lbl.includes('pg / ug') || lbl.includes('pg/ug')) {
      return ['', 'UG', 'PG', 'PhD'];
    }

    // 14. Appointment Type (Aided/Coordinator/Secretary)
    if (lbl.includes('aided/coordinator/secretary') || lbl.includes('appointment type')) {
      return ['', 'Aided', 'Coordinator', 'Secretary', 'Professor of Practice', 'Hourly Basis'];
    }

    // 15. Stakeholder Type
    if (lbl.includes('type of stakeholder') || lbl.includes('teachers/alumni/employers')) {
      return ['', 'Teachers', 'Alumni', 'Employers', 'Industry', 'Entrepreneurs', 'Students'];
    }

    // 16. Nature of Place
    if (lbl.includes('nature of the place') || lbl.includes('industry/company/institution')) {
      return ['', 'Industry', 'Company', 'Institution', 'Educational Institution', 'Government Organization', 'NGO'];
    }

    // 17. Competitive Exams
    if (lbl.includes('competitive exam') || lbl.includes('net/ set/ gate')) {
      return ['', 'NET', 'SET', 'GATE', 'CAT', 'UPSC', 'TNPSC', 'JAM', 'Others'];
    }

    // 18. Internship / Project (Sheet 1.8)
    if (k === 'activitytype' || lbl.includes('internship / project') || lbl.includes('internship/project')) {
      return ['', 'Internship', 'Project', 'Both Internship & Project'];
    }

    return null;
  }

  // ================= DATA MUTATION HELPERS =================
  updateProfileField(fieldPath, value) {
    const cardData = this.getCardData('part_a');
    if (!cardData['PART-A']) cardData['PART-A'] = {};
    if (!cardData['PART-A'].profile) cardData['PART-A'].profile = {};

    const parts = fieldPath.split('.');
    let curr = cardData['PART-A'].profile;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!curr[parts[i]]) curr[parts[i]] = {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = value;
    this.triggerAutoSave();
  }

  updateFacultyDetail(idx, field, value) {
    const cardData = this.getCardData('part_a');
    if (!cardData['PART-A']?.facultyDetails) return;
    if (cardData['PART-A'].facultyDetails[idx]) {
      cardData['PART-A'].facultyDetails[idx][field] = Number(value) || 0;
      this.triggerAutoSave();
      const row = cardData['PART-A'].facultyDetails[idx];
      const totalEl = document.getElementById(`fac-total-${idx}`);
      if (totalEl) totalEl.textContent = (Number(row.male) || 0) + (Number(row.female) || 0);
    }
  }

  updateStudentDetail(idx, field, value) {
    const cardData = this.getCardData('part_a');
    if (!cardData['PART-A']?.studentDetails) return;
    if (cardData['PART-A'].studentDetails[idx]) {
      cardData['PART-A'].studentDetails[idx][field] = Number(value) || 0;
      this.triggerAutoSave();
      const row = cardData['PART-A'].studentDetails[idx];
      const totalEl = document.getElementById(`stu-total-${idx}`);
      if (totalEl) totalEl.textContent = (Number(row.male) || 0) + (Number(row.female) || 0) + (Number(row.otherGender) || 0);
    }
  }

  updateTableCell(sheetKey, rowIdx, colKey, value) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!Array.isArray(cardData[sheetKey])) cardData[sheetKey] = [];
    if (cardData[sheetKey][rowIdx]) {
      cardData[sheetKey][rowIdx][colKey] = value;
      this.triggerAutoSave();
    }
  }

  addTableRow(sheetKey) {
    if (this.isSubmissionLocked()) {
      window.showToast('The submission deadline has expired. Data cannot be edited or added.', 'warning', 4000, 'Deadline Locked');
      return;
    }
    const card = this.getActiveCard();
    const sheet = this.getActiveSheet();
    if (!card || !sheet) return;
    const cardData = this.getCardData(card.id);
    if (!Array.isArray(cardData[sheetKey])) cardData[sheetKey] = [];

    const newRow = {};
    (sheet.columns || []).forEach(col => {
      newRow[col.key] = (col.key === 'sno' || col.key === 's_no' || col.key === 'sl_no') 
        ? String(cardData[sheetKey].length + 1) 
        : '';
    });
    cardData[sheetKey].push(newRow);
    this.triggerAutoSave();
    this.render(window.dataStore?.data);
  }

  async deleteTableRow(sheetKey, rowIdx) {
    if (this.isSubmissionLocked()) {
      window.showToast('The submission deadline has expired. Records cannot be deleted.', 'warning', 4000, 'Deadline Locked');
      return;
    }
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!Array.isArray(cardData[sheetKey])) return;
    const ok = await window.showConfirmDialog('Are you sure you want to delete this data row?', 'Delete Row', { confirmText: 'Delete', cancelText: 'Cancel', type: 'danger' });
    if (ok) {
      cardData[sheetKey].splice(rowIdx, 1);
      cardData[sheetKey].forEach((r, idx) => {
        if (r.sno !== undefined) r.sno = String(idx + 1);
        if (r.s_no !== undefined) r.s_no = String(idx + 1);
        if (r.sl_no !== undefined) r.sl_no = String(idx + 1);
      });
      this.triggerAutoSave();
      this.render(window.dataStore?.data);
    }
  }

  // Multi-table sections (Sheet 1.2)
  updateMultiTableCell(sheetKey, sectionId, rowIdx, colKey, value) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]) cardData[sheetKey] = {};
    if (!Array.isArray(cardData[sheetKey][sectionId])) cardData[sheetKey][sectionId] = [];
    if (cardData[sheetKey][sectionId][rowIdx]) {
      cardData[sheetKey][sectionId][rowIdx][colKey] = value;
      this.triggerAutoSave();
    }
  }

  addMultiTableRow(sheetKey, sectionId) {
    const card = this.getActiveCard();
    const sheet = this.getActiveSheet();
    if (!card || !sheet) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]) cardData[sheetKey] = {};
    if (!Array.isArray(cardData[sheetKey][sectionId])) cardData[sheetKey][sectionId] = [];

    const sec = (sheet.sections || []).find(s => s.id === sectionId);
    const newRow = {};
    (sec?.columns || []).forEach(col => {
      newRow[col.key] = col.key === 'sno' ? String(cardData[sheetKey][sectionId].length + 1) : '';
    });
    cardData[sheetKey][sectionId].push(newRow);
    this.triggerAutoSave();
    this.render(window.dataStore?.data);
  }

  async deleteMultiTableRow(sheetKey, sectionId, rowIdx) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]?.[sectionId]) return;
    const ok = await window.showConfirmDialog('Are you sure you want to delete this row?', 'Delete Row', { confirmText: 'Delete', cancelText: 'Cancel', type: 'danger' });
    if (ok) {
      cardData[sheetKey][sectionId].splice(rowIdx, 1);
      cardData[sheetKey][sectionId].forEach((r, idx) => {
        if (r.sno !== undefined) r.sno = String(idx + 1);
      });
      this.triggerAutoSave();
      this.render(window.dataStore?.data);
    }
  }

  // Batch tables (Sheet 1.5, 1.6)
  updateBatchTableCell(sheetKey, batchId, rowIdx, colKey, value) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]) cardData[sheetKey] = {};
    if (!Array.isArray(cardData[sheetKey][batchId])) cardData[sheetKey][batchId] = [];
    if (cardData[sheetKey][batchId][rowIdx]) {
      cardData[sheetKey][batchId][rowIdx][colKey] = value;
      this.triggerAutoSave();
    }
  }

  addBatchTableRow(sheetKey, batchId) {
    const card = this.getActiveCard();
    const sheet = this.getActiveSheet();
    if (!card || !sheet) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]) cardData[sheetKey] = {};
    if (!Array.isArray(cardData[sheetKey][batchId])) cardData[sheetKey][batchId] = [];

    const newRow = {};
    (sheet.columns || []).forEach(col => {
      newRow[col.key] = col.key === 'sno' ? String(cardData[sheetKey][batchId].length + 1) : '';
    });
    cardData[sheetKey][batchId].push(newRow);
    this.triggerAutoSave();
    this.render(window.dataStore?.data);
  }

  async deleteBatchTableRow(sheetKey, batchId, rowIdx) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]?.[batchId]) return;
    const ok = await window.showConfirmDialog('Are you sure you want to delete this row?', 'Delete Row', { confirmText: 'Delete', cancelText: 'Cancel', type: 'danger' });
    if (ok) {
      cardData[sheetKey][batchId].splice(rowIdx, 1);
      cardData[sheetKey][batchId].forEach((r, idx) => {
        if (r.sno !== undefined) r.sno = String(idx + 1);
      });
      this.triggerAutoSave();
      this.render(window.dataStore?.data);
    }
  }

  // ================= ADMIN QUESTION EDITORS =================
  updateSchemaTitle(sheetKey, newTitle) {
    if (!this.isAdmin()) return;
    const sheet = this.getActiveSheet();
    if (sheet && sheet.key === sheetKey) {
      sheet.title = newTitle;
      window.dataStore?.saveAllCardsSchema(this.getMasterSchema());
    }
  }

  updateSchemaInstruction(sheetKey, newInstruction) {
    if (!this.isAdmin()) return;
    const sheet = this.getActiveSheet();
    if (sheet && sheet.key === sheetKey) {
      sheet.instruction = newInstruction;
      window.dataStore?.saveAllCardsSchema(this.getMasterSchema());
    }
  }

  updateSchemaColumnLabel(sheetKey, colKey, newLabel, sectionId = null) {
    if (!this.isAdmin()) return;
    const sheet = this.getActiveSheet();
    if (!sheet) return;

    if (sectionId) {
      const sec = (sheet.sections || []).find(s => s.id === sectionId);
      const col = (sec?.columns || []).find(c => c.key === colKey);
      if (col) col.label = newLabel;
    } else {
      const col = (sheet.columns || []).find(c => c.key === colKey);
      if (col) col.label = newLabel;
    }
    window.dataStore?.saveAllCardsSchema(this.getMasterSchema());
  }

  async addColumnToSchema(sheetKey, sectionId = null) {
    if (!this.isAdmin()) return;
    const colName = await window.showPromptDialog('Enter new Question Column Title:', '', 'Add Question Column', { placeholder: 'e.g. Activity Name / Date / Beneficiaries', confirmText: 'Add Column' });
    if (!colName || !colName.trim()) return;

    const sheet = this.getActiveSheet();
    if (!sheet) return;

    const colKey = 'col_' + Date.now();
    const newCol = { key: colKey, label: colName.trim(), width: 'w-44' };

    if (sectionId) {
      const sec = (sheet.sections || []).find(s => s.id === sectionId);
      if (sec) {
        if (!sec.columns) sec.columns = [];
        sec.columns.push(newCol);
      }
    } else {
      if (!sheet.columns) sheet.columns = [];
      sheet.columns.push(newCol);
    }

    window.dataStore?.saveAllCardsSchema(this.getMasterSchema());
    this.render(window.dataStore?.data);
  }

  async deleteColumnFromSchema(sheetKey, colKey, sectionId = null) {
    if (!this.isAdmin()) return;
    const ok = await window.showConfirmDialog('Are you sure you want to remove this question column from the template?', 'Remove Column', { confirmText: 'Remove', cancelText: 'Cancel', type: 'danger' });
    if (!ok) return;

    const sheet = this.getActiveSheet();
    if (!sheet) return;

    if (sectionId) {
      const sec = (sheet.sections || []).find(s => s.id === sectionId);
      if (sec && sec.columns) {
        sec.columns = sec.columns.filter(c => c.key !== colKey);
      }
    } else {
      if (sheet.columns) {
        sheet.columns = sheet.columns.filter(c => c.key !== colKey);
      }
    }

    window.dataStore?.saveAllCardsSchema(this.getMasterSchema());
    this.render(window.dataStore?.data);
  }

  // ================= MAIN RENDER PIPELINE =================
  render(data) {
    if (!this.container) return;

    if (!this.activeCardId) {
      this.renderCardsGalleryView(data);
    } else {
      this.renderActiveAttributeSheetsView(data);
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // ================= 1. CARDS GALLERY VIEW (FULL PAGE & ARCTIC FROST THEME) =================
  renderCardsGalleryView(data) {
    const cards = this.getMasterSchema();
    const isAdmin = this.isAdmin();
    const deptName = window.dataStore?.activeDepartment || 'Department';
    this.academicYear = window.dataStore ? window.dataStore.getActiveYear() : '2026 - 2027';
    this.isCardsUnlocked = true;

    this.container.innerHTML = `
      <div class="w-full space-y-6 animate-fadeIn">
        
        <!-- Clean Arctic Frost Header Banner -->
        <div class="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#26648E]/10 text-[#26648E] border border-[#26648E]/25 uppercase tracking-wide">
                IQAC Academic Audit
              </span>
            </div>

            <h1 class="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Annual Academic Audit (AAA)
            </h1>
          </div>

          <div class="flex items-center gap-2.5">
            <button 
              type="button" 
              onclick="formBuilder.exportAllAttributesConsolidated()" 
              class="px-5 py-2.5 bg-gradient-to-r from-[#26648E] to-[#1e40af] hover:from-[#1b4b6d] hover:to-[#1e3a8a] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-[#26648E]/25 hover:shadow-lg flex items-center gap-2 cursor-pointer"
              title="Download consolidated audit report for all attributes in Excel"
            >
              <i data-lucide="download" class="w-4 h-4 text-[#53D2DC]"></i>
              <span>Download Complete Audit (All Attributes)</span>
            </button>
          </div>
        </div>

        ${this.renderDeadlineNoticeBanner()}

        <!-- Full-Page Wide Cards Grid (Simple, Clean, Micro-Animated) -->
        <div id="cards-grid-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          ${cards.map(card => {
            const isPartA = card.id === 'part_a';
            const { finishedCount, totalSheets, percentage } = this.getCompletionStats(card);
            const isAllFinished = totalSheets > 0 && finishedCount === totalSheets;

            return `
              <div 
                onclick="formBuilder.openCard('${card.id}')"
                class="arctic-card flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div class="p-6 space-y-4">
                  <!-- Header: Code & Completion Badges -->
                  <div class="flex items-center justify-between gap-2">
                    <span class="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                      isPartA 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                        : 'bg-blue-50 text-[#1e40af] border border-blue-200/80'
                    }">
                      ${card.cardCode}
                    </span>
                    
                    <span class="text-xs font-bold ${isAllFinished ? 'text-emerald-700' : 'text-slate-500'} flex items-center gap-1.5">
                      <i data-lucide="${isAllFinished ? 'check-circle' : 'file-spreadsheet'}" class="w-3.5 h-3.5 ${isAllFinished ? 'text-emerald-600' : 'text-slate-400'}"></i>
                      <span>${finishedCount} / ${totalSheets} Sheets</span>
                    </span>
                  </div>

                  <!-- Attribute Title & Icon -->
                  <div class="flex items-start gap-3 pt-1">
                    <div class="w-10 h-10 rounded-xl ${isPartA ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-[#1e40af] border border-blue-200/60'} flex items-center justify-center font-bold shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <i data-lucide="${card.icon || 'file-text'}" class="w-5 h-5"></i>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 group-hover:text-[#1e40af] transition-colors leading-snug line-clamp-2">
                      ${card.cardTitle}
                    </h3>
                  </div>

                  <!-- Sleek Progress Bar -->
                  <div class="space-y-1.5 pt-2">
                    <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
                      <div class="h-full ${isAllFinished ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#26648E] to-[#2563eb]'} transition-all duration-300 rounded-full" style="width: ${percentage}%"></div>
                    </div>
                    <div class="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span>${percentage}% Finished</span>
                      <span>${totalSheets} Total ${totalSheets === 1 ? 'Sheet' : 'Sheets'}</span>
                    </div>
                  </div>
                </div>

                <!-- Footer Action Bar -->
                <div class="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100/90 flex items-center justify-between">
                  <span class="text-[11px] font-bold ${isAllFinished ? 'text-emerald-700' : (finishedCount > 0 ? 'text-blue-700' : 'text-slate-400')}">
                    ${isAllFinished ? 'Completed' : (finishedCount > 0 ? `${finishedCount} of ${totalSheets} filled` : 'Pending entry')}
                  </span>

                  <span 
                    class="px-3.5 py-1.5 ${isPartA ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold' : 'bg-gradient-to-r from-[#26648E] to-[#1e40af] hover:from-[#1b4b6d] hover:to-[#1e3a8a] text-white font-bold'} text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 group-hover:shadow-md group-hover:translate-x-0.5"
                  >
                    <span>${isPartA ? 'Open Profile' : 'Fill Attribute'}</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ================= 2. ACTIVE ATTRIBUTE SHEETS VIEW (SIMPLE & CLEAN) =================
  renderActiveAttributeSheetsView(data) {
    const card = this.getActiveCard();
    if (!card) return;

    const sheets = card.sheets || [];
    const activeSheet = this.getActiveSheet();
    const cardData = this.getCardData(card.id);
    const isAdmin = this.isAdmin();
    const deptName = window.dataStore?.activeDepartment || 'Department';
    const { finishedCount, totalSheets } = this.getCompletionStats(card);

    this.container.innerHTML = `
      <div class="space-y-4 w-full animate-fadeIn">
        
        <!-- Clean Streamlined Header (No Nested Boxes) -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <button 
              type="button" 
              onclick="formBuilder.backToCards()" 
              class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#26648E] border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer shrink-0" 
              title="Return to Attribute Cards Gallery"
            >
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>All Attributes</span>
            </button>
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#FFE3B3] text-[#26648E]">
                  ${card.cardCode}
                </span>
                <span class="text-xs text-slate-500 font-bold">${finishedCount} of ${totalSheets} Sheets Finished</span>
              </div>
              <h2 class="text-xl font-black tracking-tight text-slate-900">
                ${card.cardTitle}
              </h2>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <span class="card-save-indicator text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-medium flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Auto-saved
            </span>
          </div>
        </div>

        <!-- Horizontal Sheets Navigation Tabs (Clean Pill Style, No Nested Box) -->
        ${sheets.length > 1 ? `
          <div class="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full">
            ${sheets.map(s => {
              const isActive = s.key === this.activeSheetKey;
              const sData = cardData[s.key];
              let rowCount = 0;
              if (Array.isArray(sData)) rowCount = sData.length;
              else if (sData && typeof sData === 'object') {
                Object.values(sData).forEach(v => { if (Array.isArray(v)) rowCount += v.length; });
              }

              return `
                <button 
                  type="button" 
                  onclick="formBuilder.switchSheet('${s.key}')" 
                  class="px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer text-xs ${
                    isActive 
                      ? 'bg-[#26648E] text-white font-black shadow-xs' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold'
                  }"
                >
                  <i data-lucide="${s.type === 'profile' ? 'user-check' : 'table'}" class="w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}"></i>
                  <span>${s.sheetName || s.key}</span>
                  ${rowCount > 0 ? `
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-100 text-slate-600 border border-slate-200 font-bold'}">
                      ${rowCount}
                    </span>
                  ` : ''}
                </button>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Active Sheet Content (Clean Table View Without Stacked Nested Wrapper Boxes) -->
        <div class="w-full">
          ${activeSheet ? this.renderActiveSheetContent(activeSheet, cardData[activeSheet.key], isAdmin) : '<div class="text-slate-500">No sheet selected.</div>'}
        </div>

        <!-- Bottom Action Bar (Review & Save All Down Here) -->
        <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            ${sheets.length > 1 ? `
              <button type="button" onclick="formBuilder.navigateSheet(-1)" class="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 rounded-xl transition flex items-center gap-1.5 shadow-2xs text-xs cursor-pointer">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Prev Sheet
              </button>
              <span class="text-xs text-slate-500 font-medium px-2">
                ${activeSheet?.sheetName || ''} (${sheets.findIndex(s => s.key === activeSheet?.key) + 1} of ${sheets.length})
              </span>
              <button type="button" onclick="formBuilder.navigateSheet(1)" class="px-3.5 py-2 bg-[#26648E] hover:bg-[#1b4b6d] text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs text-xs cursor-pointer">
                Next Sheet <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </div>

          <!-- Prominent Review & Save All Records Down Button -->
          <div class="flex items-center gap-3">
            <button 
              type="button" 
              onclick="formBuilder.openReviewAndSaveModal('${card.id}')" 
              class="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black rounded-xl text-xs transition shadow-md shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
              title="Review full attribute print sheet and save all records"
            >
              <i data-lucide="file-check" class="w-4 h-4"></i>
              <span>Review & Save All Records</span>
            </button>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) {
      lucide.createIcons({ root: this.container });
    }
  }


    navigateSheet(direction) {
    const card = this.getActiveCard();
    if (!card || !card.sheets || card.sheets.length <= 1) return;
    const currIdx = card.sheets.findIndex(s => s.key === this.activeSheetKey);
    let nextIdx = currIdx + direction;
    if (nextIdx < 0) nextIdx = card.sheets.length - 1;
    if (nextIdx >= card.sheets.length) nextIdx = 0;
    this.switchSheet(card.sheets[nextIdx].key);
  }

  // ================= SHEET RENDER DISPATCHER =================
  renderActiveSheetContent(sheet, sheetData, isAdmin) {
    const isEditQuestions = isAdmin && this.adminEditQuestionsMode;

    switch (sheet.type) {
      case 'profile':
        return this.renderProfileSheet(sheet, sheetData, isEditQuestions);
      case 'multi_table':
        return this.renderMultiTableSheet(sheet, sheetData, isEditQuestions);
      case 'batch_table':
        return this.renderBatchTableSheet(sheet, sheetData, isEditQuestions);
      case 'table':
      default:
        return this.renderStandardTableSheet(sheet, sheetData, isEditQuestions);
    }
  }

  // Helper to render cell input or dropdown with NO placeholder
  renderCellControl(val, onchangeCode, colLabel, colKey, isSno = false, sheetKey = '', rowIdx = 0) {
    const isLocked = this.isSubmissionLocked();

    if (isSno) {
      return `
        <input 
          type="text" 
          value="${val !== undefined ? val : ''}" 
          class="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded text-center font-bold text-slate-500 bg-slate-50 focus:outline-none"
          readonly 
        />
      `;
    }

    // 1. Dropdown Column
    const options = this.getDropdownOptions(colLabel, colKey);
    if (options && Array.isArray(options)) {
      const currentVal = String(val !== undefined ? val : '').trim().toUpperCase();
      return `
        <select 
          onchange="${onchangeCode}" 
          ${isLocked ? 'disabled' : ''}
          class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition bg-white font-semibold text-slate-800 ${isLocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}"
        >
          ${options.map(opt => `
            <option value="${opt}" ${currentVal === opt.toUpperCase() ? 'selected' : ''}>
              ${opt === '' ? '-- Select --' : opt}
            </option>
          `).join('')}
        </select>
      `;
    }

    // 2. Split Date Range (From - To) Calendar Inputs
    if (this.isDateRangeColumn(colLabel, colKey)) {
      const [fromDate, toDate] = this.parseDateRange(val);
      return `
        <div class="flex flex-col gap-1 w-full min-w-[200px]">
          <div class="flex items-center gap-1.5 bg-slate-50 p-1 rounded border border-slate-200">
            <span class="text-[10px] font-bold text-slate-500 w-10 shrink-0">From:</span>
            <input 
              type="date" 
              value="${fromDate}" 
              ${isLocked ? 'disabled' : ''}
              onchange="formBuilder.updateDateRangeCell('${sheetKey}', ${rowIdx}, '${colKey}', this.value, '${toDate}', 'from')"
              class="w-full text-xs px-1.5 py-1 border border-slate-300 rounded font-mono bg-white focus:border-blue-500 focus:outline-none ${isLocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}"
            />
          </div>
          <div class="flex items-center gap-1.5 bg-slate-50 p-1 rounded border border-slate-200">
            <span class="text-[10px] font-bold text-slate-500 w-10 shrink-0">To:</span>
            <input 
              type="date" 
              value="${toDate}" 
              ${isLocked ? 'disabled' : ''}
              onchange="formBuilder.updateDateRangeCell('${sheetKey}', ${rowIdx}, '${colKey}', '${fromDate}', this.value, 'to')"
              class="w-full text-xs px-1.5 py-1 border border-slate-300 rounded font-mono bg-white focus:border-blue-500 focus:outline-none ${isLocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}"
            />
          </div>
        </div>
      `;
    }

    // 3. Single Date Calendar Picker
    if (this.isDateColumn(colLabel, colKey)) {
      const dateVal = this.formatDateForInput(val);
      return `
        <input 
          type="date" 
          value="${dateVal}" 
          ${isLocked ? 'disabled' : ''}
          onchange="${onchangeCode}" 
          class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded font-mono bg-white hover:border-slate-400 focus:border-blue-500 focus:outline-none transition text-slate-800 ${isLocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}"
        />
      `;
    }

    // 4. Strict Numeric Input (Numbers Only, NO letters allowed)
    if (this.isNumericColumn(colLabel, colKey)) {
      return `
        <input 
          type="text" 
          inputmode="numeric" 
          pattern="[0-9.]*" 
          value="${val !== undefined ? val : ''}" 
          ${isLocked ? 'disabled' : ''}
          onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
          onchange="${onchangeCode}" 
          class="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded text-right font-mono bg-white hover:border-slate-400 focus:border-blue-500 focus:outline-none transition text-slate-800 ${isLocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}"
        />
      `;
    }

    // 5. Standard Text Input with Sentence Case (First Letter Capital) & NO placeholder
    return `
      <input 
        type="text" 
        value="${val !== undefined ? val : ''}" 
        ${isLocked ? 'disabled' : ''}
        oninput="this.value = this.value ? (this.value.charAt(0).toUpperCase() + this.value.slice(1)) : ''"
        onchange="${onchangeCode}" 
        style="text-transform: capitalize;"
        class="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition bg-white text-slate-800 capitalize ${isLocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}"
      />
    `;
  }

  // ================= 1. SHEET: PART-A (PROFILE) =================
  renderProfileSheet(sheet, sheetData, isEditQuestions) {
    const prof = sheetData?.profile || sheet.profileQuestions || {};
    const facRows = sheetData?.facultyDetails || sheet.facultyDetails?.rows || [];
    const stuRows = sheetData?.studentDetails || sheet.studentDetails?.rows || [];

    return `
      <div class="space-y-6 w-full">
        <!-- Sheet Header -->
        <div class="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            ${isEditQuestions ? `
              <div class="space-y-2 mb-3">
                <label class="block text-xs font-bold text-purple-900 uppercase">Edit Sheet Title (Admin)</label>
                <input type="text" value="${sheet.title || ''}" onchange="formBuilder.updateSchemaTitle('${sheet.key}', this.value)" class="w-full text-base font-bold px-3 py-1.5 border border-purple-300 rounded-lg bg-purple-50" />
                <label class="block text-xs font-bold text-purple-900 uppercase">Edit Subtitle / Notice (Admin)</label>
                <input type="text" value="${sheet.subtitle || ''}" onchange="formBuilder.updateSchemaInstruction('${sheet.key}', this.value)" class="w-full text-xs px-3 py-1.5 border border-purple-300 rounded-lg bg-purple-50" />
              </div>
            ` : `
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
                  MANDATORY PROFILE
                </span>
                <span class="text-xs text-slate-400">Academic Year: ${this.academicYear}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900">${sheet.title}</h3>
              <p class="text-xs text-rose-600 font-semibold mt-0.5">${sheet.subtitle || ''}</p>
            `}
          </div>

          
        </div>

        <!-- Section 1: Department Info Fields (NO placeholders) -->
        <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 w-full">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
            <i data-lucide="building" class="w-4 h-4 text-blue-600"></i>
            Department Profile Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Department</label>
              <input type="text" value="${prof.department || ''}" onchange="formBuilder.updateProfileField('department', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Shift</label>
              <select onchange="formBuilder.updateProfileField('shift', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold">
                <option value="Shift I" ${prof.shift === 'Shift I' ? 'selected' : ''}>Shift I</option>
                <option value="Shift II" ${prof.shift === 'Shift II' ? 'selected' : ''}>Shift II</option>
                <option value="Shift I & Shift II" ${prof.shift === 'Shift I & Shift II' || !prof.shift ? 'selected' : ''}>Shift I & Shift II (Both)</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-slate-600 mb-1">Programmes Offered (UG, PG, PhD)</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <span class="text-[10px] text-slate-500 font-medium">UG Programmes:</span>
                  <input type="text" value="${prof.programmes?.ug || ''}" onchange="formBuilder.updateProfileField('programmes.ug', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500 font-medium">PG Programmes:</span>
                  <input type="text" value="${prof.programmes?.pg || ''}" onchange="formBuilder.updateProfileField('programmes.pg', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div>
                  <span class="text-[10px] text-slate-500 font-medium">PhD Programmes:</span>
                  <input type="text" value="${prof.programmes?.phd || ''}" onchange="formBuilder.updateProfileField('programmes.phd', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
              </div>
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-slate-600 mb-1">Name of the Head / Coordinator</label>
              <input type="text" value="${prof.hodName || ''}" onchange="formBuilder.updateProfileField('hodName', this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium" />
            </div>
          </div>
        </div>

        <!-- Section 2: Faculty Details Table -->
        <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 w-full">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <i data-lucide="users" class="w-4 h-4 text-emerald-600"></i>
            Faculty Details
          </h4>
          <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white w-full">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="p-2.5">Faculty Details / Category</th>
                  <th class="p-2.5 w-28 text-center">Male</th>
                  <th class="p-2.5 w-28 text-center">Female</th>
                  <th class="p-2.5 w-28 text-center bg-slate-200/50">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${facRows.map((fr, idx) => {
                  const m = Number(fr.male) || 0;
                  const f = Number(fr.female) || 0;
                  return `
                    <tr class="hover:bg-slate-50/80">
                      <td class="p-2.5 font-medium text-slate-800">${fr.label}</td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${m}" onchange="formBuilder.updateFacultyDetail(${idx}, 'male', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded font-semibold text-blue-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${f}" onchange="formBuilder.updateFacultyDetail(${idx}, 'female', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded font-semibold text-purple-700" />
                      </td>
                      <td id="fac-total-${idx}" class="p-2.5 text-center font-bold text-slate-900 bg-slate-50">
                        ${m + f}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 3: Student Details Table -->
        <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 w-full">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <i data-lucide="graduation-cap" class="w-4 h-4 text-purple-600"></i>
            Student Details (Total No. of Students)
          </h4>
          <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white w-full">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="p-2.5">Level</th>
                  <th class="p-2.5 w-24 text-center">Male</th>
                  <th class="p-2.5 w-24 text-center">Female</th>
                  <th class="p-2.5 w-24 text-center">Other Gender</th>
                  <th class="p-2.5 w-24 text-center">Other States</th>
                  <th class="p-2.5 w-24 text-center">Other Countries</th>
                  <th class="p-2.5 w-24 text-center bg-slate-200/50">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${stuRows.map((sr, idx) => {
                  const m = Number(sr.male) || 0;
                  const f = Number(sr.female) || 0;
                  const og = Number(sr.otherGender) || 0;
                  const os = Number(sr.otherStates) || 0;
                  const oc = Number(sr.otherCountries) || 0;
                  return `
                    <tr class="hover:bg-slate-50/80">
                      <td class="p-2.5 font-bold text-slate-800">${sr.programme}</td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${m}" onchange="formBuilder.updateStudentDetail(${idx}, 'male', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded font-semibold text-blue-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${f}" onchange="formBuilder.updateStudentDetail(${idx}, 'female', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded font-semibold text-purple-700" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${og}" onchange="formBuilder.updateStudentDetail(${idx}, 'otherGender', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${os}" onchange="formBuilder.updateStudentDetail(${idx}, 'otherStates', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded" />
                      </td>
                      <td class="p-2 text-center">
                        <input type="number" min="0" value="${oc}" onchange="formBuilder.updateStudentDetail(${idx}, 'otherCountries', this.value)" class="w-20 text-center text-xs p-1.5 border border-slate-300 rounded" />
                      </td>
                      <td id="stu-total-${idx}" class="p-2.5 text-center font-bold text-slate-900 bg-slate-50">
                        ${m + f + og}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="pt-2 flex justify-end">
          
        </div>
      </div>
    `;
  }

  // ================= 2. STANDARD TABLE SHEETS =================
  renderStandardTableSheet(sheet, sheetData, isEditQuestions) {
    const rows = Array.isArray(sheetData) ? sheetData : [];
    const columns = sheet.columns || [];

    return `
      <div class="space-y-4 w-full">
        <!-- Sheet Title & Instructions -->
        <div class="border-b border-slate-200 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
          <div class="flex-1">
            ${isEditQuestions ? `
              <div class="space-y-1.5">
                <label class="block text-[11px] font-bold text-purple-900 uppercase">Edit Question Title (Admin)</label>
                <input type="text" value="${sheet.title || ''}" onchange="formBuilder.updateSchemaTitle('${sheet.key}', this.value)" class="w-full text-sm font-bold px-3 py-1.5 border border-purple-300 rounded bg-purple-50" />
                <label class="block text-[11px] font-bold text-purple-900 uppercase">Edit Instruction / Note (Admin)</label>
                <input type="text" value="${sheet.instruction || sheet.note || ''}" onchange="formBuilder.updateSchemaInstruction('${sheet.key}', this.value)" class="w-full text-xs px-3 py-1.5 border border-purple-300 rounded bg-purple-50" />
              </div>
            ` : `
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-800">
                  ${sheet.badge || sheet.key}
                </span>
                ${sheet.note ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">${sheet.note}</span>` : ''}
              </div>
              <h3 class="text-lg font-bold text-slate-900">${sheet.title}</h3>
              ${sheet.instruction ? `<p class="text-xs text-slate-500 mt-0.5">${sheet.instruction}</p>` : ''}
            `}
          </div>

          <div class="flex items-center gap-2 shrink-0">
            ${isEditQuestions ? `
              <button type="button" onclick="formBuilder.addColumnToSchema('${sheet.key}')" class="text-xs px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition flex items-center gap-1 shadow-sm">
                <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add Question Column
              </button>
            ` : ''}
            
            <button type="button" onclick="formBuilder.addTableRow('${sheet.key}')" class="text-xs px-3.5 py-1.5 bg-[#4F8FC0] hover:bg-[#3a7ca9] text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Data Row
            </button>
            <button type="button" onclick="formBuilder.openBulkImportModal('${sheet.key}', null, 'excel')" class="text-xs px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-700/20 hover:shadow-md cursor-pointer" title="Directly open Excel interactive template sheet to insert data">
              <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-emerald-300"></i>
              <span>Insert Direct to Excel</span>
            </button>
            <button type="button" onclick="formBuilder.openBulkImportModal('${sheet.key}', null, 'file')" class="text-xs px-3.5 py-1.5 bg-gradient-to-r from-[#26648E] to-[#1e40af] hover:from-[#1b4b6d] hover:to-[#1e3a8a] text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm shadow-[#26648E]/20 hover:shadow-md cursor-pointer" title="Bulk Import data via Excel/CSV file upload">
              <i data-lucide="file-up" class="w-3.5 h-3.5 text-[#53D2DC]"></i>
              <span>Bulk Import</span>
            </button>

            
          </div>
        </div>

        <!-- Table Container (Full Wide) -->
        <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs max-h-[650px] scrollbar-thin w-full">
          <table class="w-full min-w-full text-left text-xs border-collapse">
            <thead class="sticky top-0 z-10 bg-slate-100 border-b border-slate-200 shadow-xs">
              <tr>
                ${columns.map(col => `
                  <th class="p-2.5 font-bold text-slate-700 whitespace-nowrap ${col.width || 'w-44'}">
                    ${isEditQuestions ? `
                      <div class="space-y-1">
                        <input type="text" value="${col.label}" onchange="formBuilder.updateSchemaColumnLabel('${sheet.key}', '${col.key}', this.value)" class="w-full text-xs p-1 border border-purple-300 rounded font-bold bg-purple-50" title="Edit Question Header" />
                        <button type="button" onclick="formBuilder.deleteColumnFromSchema('${sheet.key}', '${col.key}')" class="text-[10px] text-red-600 hover:underline">Remove Col</button>
                      </div>
                    ` : `
                      <span>${col.label}</span>
                    `}
                  </th>
                `).join('')}
                <th class="p-2.5 font-bold text-slate-700 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${rows.length === 0 ? `
                <tr>
                  <td colspan="${columns.length + 1}" class="p-8 text-center text-slate-400 font-medium">
                    No data rows entered yet. Click <strong>+ Add Data Row</strong> above to begin filling this sheet.
                  </td>
                </tr>
              ` : rows.map((row, rIdx) => `
                <tr class="hover:bg-slate-50/70 transition">
                  ${columns.map(col => {
                    const isSno = col.key === 'sno' || col.key === 's_no' || col.key === 'sl_no';
                    const onchangeCode = `formBuilder.updateTableCell('${sheet.key}', ${rIdx}, '${col.key}', this.value)`;
                    return `
                      <td class="p-1.5 ${col.width || 'w-44'}">
                        ${this.renderCellControl(row[col.key], onchangeCode, col.label, col.key, isSno, sheet.key, rIdx)}
                      </td>
                    `;
                  }).join('')}
                  <td class="p-1.5 text-center">
                    <button type="button" onclick="formBuilder.deleteTableRow('${sheet.key}', ${rIdx})" title="Delete Row" class="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="pt-2 flex items-center justify-between">
          <span class="text-xs text-slate-500 font-medium">${rows.length} ${rows.length === 1 ? 'row' : 'rows'} entered</span>
          
        </div>
      </div>
    `;
  }

  // ================= 3. MULTI-TABLE SHEET (SHEET 1.2) =================
  renderMultiTableSheet(sheet, sheetData, isEditQuestions) {
    const sections = sheet.sections || [];

    return `
      <div class="space-y-8 w-full">
        <div class="border-b border-slate-200 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
          <div>
            ${isEditQuestions ? `
              <div class="space-y-1.5">
                <label class="block text-[11px] font-bold text-purple-900 uppercase">Edit Sheet Title (Admin)</label>
                <input type="text" value="${sheet.title || ''}" onchange="formBuilder.updateSchemaTitle('${sheet.key}', this.value)" class="w-full text-sm font-bold px-3 py-1.5 border border-purple-300 rounded bg-purple-50" />
              </div>
            ` : `
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-800">
                  ${sheet.badge || sheet.key}
                </span>
              </div>
              <h3 class="text-xl font-bold text-slate-900">${sheet.title}</h3>
            `}
          </div>

          
        </div>

        ${sections.map(sec => {
          const rows = (sheetData && Array.isArray(sheetData[sec.id])) ? sheetData[sec.id] : [];
          const columns = sec.columns || [];

          return `
            <div class="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4 w-full">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <i data-lucide="bookmark" class="w-4 h-4 text-blue-600"></i>
                  ${sec.title}
                </h4>
                <div class="flex items-center gap-2">
                  ${isEditQuestions ? `
                    <button type="button" onclick="formBuilder.addColumnToSchema('${sheet.key}', '${sec.id}')" class="text-xs px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition flex items-center gap-1 shadow-sm">
                      <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add Column
                    </button>
                  ` : ''}
                  <button type="button" onclick="formBuilder.addMultiTableRow('${sheet.key}', '${sec.id}')" class="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Row
                  </button>
                  <button type="button" onclick="formBuilder.openBulkImportModal('${sheet.key}', '${sec.id}', 'excel')" class="text-xs px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer" title="Directly open Excel interactive template sheet to insert data">
                    <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-emerald-300"></i>
                    <span>Insert Direct to Excel</span>
                  </button>
                  <button type="button" onclick="formBuilder.openBulkImportModal('${sheet.key}', '${sec.id}', 'file')" class="text-xs px-3 py-1.5 bg-gradient-to-r from-[#26648E] to-[#1e40af] hover:from-[#1b4b6d] hover:to-[#1e3a8a] text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer" title="Bulk Import data via file upload">
                    <i data-lucide="file-up" class="w-3.5 h-3.5 text-[#53D2DC]"></i>
                    <span>Bulk Import</span>
                  </button>
                </div>
              </div>

              <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs max-h-[500px] scrollbar-thin w-full">
                <table class="w-full min-w-full text-left text-xs border-collapse">
                  <thead class="sticky top-0 z-10 bg-slate-100 border-b border-slate-200 shadow-xs">
                    <tr>
                      ${columns.map(col => `
                        <th class="p-2.5 font-bold text-slate-700 whitespace-nowrap ${col.width || 'w-44'}">
                          ${isEditQuestions ? `
                            <div class="space-y-1">
                              <input type="text" value="${col.label}" onchange="formBuilder.updateSchemaColumnLabel('${sheet.key}', '${col.key}', this.value, '${sec.id}')" class="w-full text-xs p-1 border border-purple-300 rounded font-bold bg-purple-50" title="Edit Question Header" />
                              <button type="button" onclick="formBuilder.deleteColumnFromSchema('${sheet.key}', '${col.key}', '${sec.id}')" class="text-[10px] text-red-600 hover:underline">Remove Col</button>
                            </div>
                          ` : `
                            <span>${col.label}</span>
                          `}
                        </th>
                      `).join('')}
                      <th class="p-2.5 font-bold text-slate-700 w-12 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${rows.length === 0 ? `
                      <tr>
                        <td colspan="${columns.length + 1}" class="p-8 text-center text-slate-400 font-medium">
                          No records in this section yet. Click <strong>+ Add Row</strong> to enter data.
                        </td>
                      </tr>
                    ` : rows.map((row, rIdx) => `
                      <tr class="hover:bg-slate-50/70 transition">
                        ${columns.map(col => {
                          const isSno = col.key === 'sno';
                          const onchangeCode = `formBuilder.updateMultiTableCell('${sheet.key}', '${sec.id}', ${rIdx}, '${col.key}', this.value)`;
                          return `
                            <td class="p-1.5 ${col.width || 'w-44'}">
                              ${this.renderCellControl(row[col.key], onchangeCode, col.label, col.key, isSno, sheet.key, rIdx)}
                            </td>
                          `;
                        }).join('')}
                        <td class="p-1.5 text-center">
                          <button type="button" onclick="formBuilder.deleteMultiTableRow('${sheet.key}', '${sec.id}', ${rIdx})" title="Delete Row" class="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }).join('')}

        <div class="pt-2 flex justify-end">
          
        </div>
      </div>
    `;
  }

  // ================= 4. BATCH TABLE SHEETS (1.5 & 1.6) =================
  renderBatchTableSheet(sheet, sheetData, isEditQuestions) {
    const batches = sheet.batches || [];
    const columns = sheet.columns || [];

    return `
      <div class="space-y-8 w-full">
        <div class="border-b border-slate-200 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
          <div>
            ${isEditQuestions ? `
              <div class="space-y-1.5">
                <label class="block text-[11px] font-bold text-purple-900 uppercase">Edit Sheet Title (Admin)</label>
                <input type="text" value="${sheet.title || ''}" onchange="formBuilder.updateSchemaTitle('${sheet.key}', this.value)" class="w-full text-sm font-bold px-3 py-1.5 border border-purple-300 rounded bg-purple-50" />
              </div>
            ` : `
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-800">
                  ${sheet.badge || sheet.key}
                </span>
              </div>
              <h3 class="text-xl font-bold text-slate-900">${sheet.title}</h3>
            `}
          </div>

          <div class="flex items-center gap-2">
            ${isEditQuestions ? `
              <button type="button" onclick="formBuilder.addColumnToSchema('${sheet.key}')" class="text-xs px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition flex items-center gap-1 shadow-sm">
                <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add Question Column
              </button>
            ` : ''}
            
          </div>
        </div>

        ${batches.map(bat => {
          const rows = (sheetData && Array.isArray(sheetData[bat.id])) ? sheetData[bat.id] : [];

          return `
            <div class="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4 w-full">
              <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <i data-lucide="layers" class="w-4 h-4 text-emerald-600"></i>
                  ${bat.name}
                </h4>
                <button type="button" onclick="formBuilder.addBatchTableRow('${sheet.key}', '${bat.id}')" class="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Student
                </button>
                <button type="button" onclick="formBuilder.openBulkImportModal('${sheet.key}', '${bat.id}', 'excel')" class="text-xs px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer" title="Directly open Excel interactive template sheet to insert data">
                  <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-emerald-300"></i>
                  <span>Insert Direct to Excel</span>
                </button>
                <button type="button" onclick="formBuilder.openBulkImportModal('${sheet.key}', '${bat.id}', 'file')" class="text-xs px-3 py-1.5 bg-gradient-to-r from-[#26648E] to-[#1e40af] hover:from-[#1b4b6d] hover:to-[#1e3a8a] text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer" title="Bulk Import data via file upload">
                  <i data-lucide="file-up" class="w-3.5 h-3.5 text-[#53D2DC]"></i>
                  <span>Bulk Import</span>
                </button>
              </div>

              <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs max-h-[500px] scrollbar-thin w-full">
                <table class="w-full min-w-full text-left text-xs border-collapse">
                  <thead class="sticky top-0 z-10 bg-slate-100 border-b border-slate-200 shadow-xs">
                    <tr>
                      ${columns.map(col => `
                        <th class="p-2.5 font-bold text-slate-700 whitespace-nowrap ${col.width || 'w-44'}">
                          ${isEditQuestions ? `
                            <div class="space-y-1">
                              <input type="text" value="${col.label}" onchange="formBuilder.updateSchemaColumnLabel('${sheet.key}', '${col.key}', this.value)" class="w-full text-xs p-1 border border-purple-300 rounded font-bold bg-purple-50" title="Edit Question Header" />
                              <button type="button" onclick="formBuilder.deleteColumnFromSchema('${sheet.key}', '${col.key}')" class="text-[10px] text-red-600 hover:underline">Remove Col</button>
                            </div>
                          ` : `
                            <span>${col.label}</span>
                          `}
                        </th>
                      `).join('')}
                      <th class="p-2.5 font-bold text-slate-700 w-12 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${rows.length === 0 ? `
                      <tr>
                        <td colspan="${columns.length + 1}" class="p-8 text-center text-slate-400 font-medium">
                          No students added for ${bat.name} yet. Click <strong>+ Add Student</strong> to add entries.
                        </td>
                      </tr>
                    ` : rows.map((row, rIdx) => `
                      <tr class="hover:bg-slate-50/70 transition">
                        ${columns.map(col => {
                          const isSno = col.key === 'sno';
                          const onchangeCode = `formBuilder.updateBatchTableCell('${sheet.key}', '${bat.id}', ${rIdx}, '${col.key}', this.value)`;
                          return `
                            <td class="p-1.5 ${col.width || 'w-44'}">
                              ${this.renderCellControl(row[col.key], onchangeCode, col.label, col.key, isSno, sheet.key, rIdx)}
                            </td>
                          `;
                        }).join('')}
                        <td class="p-1.5 text-center">
                          <button type="button" onclick="formBuilder.deleteBatchTableRow('${sheet.key}', '${bat.id}', ${rIdx})" title="Delete Row" class="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }).join('')}

        <div class="pt-2 flex justify-end">
          
        </div>
      </div>
    `;
  }

  // ================= SUBMISSION LOCK & DEADLINE CHECK =================
  isSubmissionLocked() {
    if (this.isAdmin()) return false;
    if (window.dataStore && typeof window.dataStore.isDeadlinePassed === 'function') {
      if (window.dataStore.isDeadlinePassed()) return true;
    }
    const activeDept = window.dataStore?.activeDepartment;
    if (activeDept && window.dataStore && typeof window.dataStore.isDepartmentLocked === 'function') {
      if (window.dataStore.isDepartmentLocked(activeDept)) return true;
    }
    return false;
  }

  renderDeadlineNoticeBanner() {
    const isLocked = this.isSubmissionLocked();
    const formatted = window.dataStore ? window.dataStore.formatDeadlineForDisplay() : 'Not Configured';

    return `
      <div class="rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs shadow-2xs ${
        isLocked 
          ? 'bg-red-50 border border-red-200 text-red-900' 
          : 'bg-amber-50/70 border border-amber-200 text-amber-950'
      }">
        <div class="flex items-center gap-2.5">
          <i data-lucide="${isLocked ? 'lock' : 'clock'}" class="w-4 h-4 ${isLocked ? 'text-red-600' : 'text-amber-600'}"></i>
          <span class="font-bold text-xs">Submission Deadline:</span>
          <span class="font-black text-xs font-mono">${formatted}</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            isLocked ? 'bg-red-200 text-red-900' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
          }">
            ${isLocked ? 'LOCKED' : 'ACTIVE'}
          </span>
        </div>
        ${this.isAdmin() ? `
          <span class="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-200 rounded font-bold">
            Admin Mode
          </span>
        ` : ''}
      </div>
    `;
  }

  // ================= DATE & NUMERIC HELPERS =================
  isDateRangeColumn(label, key = '') {
    const lbl = (label || '').toLowerCase();
    const k = (key || '').toLowerCase();
    return k.includes('datesfromto') || k.includes('from_to') || k.includes('fromto') ||
           (lbl.includes('from') && lbl.includes('to')) || lbl.includes('period from');
  }

  isDateColumn(label, key = '') {
    if (this.isDateRangeColumn(label, key)) return false;
    const lbl = (label || '').toLowerCase();
    const k = (key || '').toLowerCase();
    return k.includes('date') || lbl.includes('date') || lbl.includes('(dd.mm.yyyy)') || lbl.includes('dd/mm/yyyy');
  }

  isNumericColumn(label, key = '') {
    const lbl = (label || '').toLowerCase();
    const k = (key || '').toLowerCase();

    // Never numeric for registration numbers, codes, references
    if (k.includes('reg') || k.includes('code') || k.includes('phone') || k.includes('ref') || k.includes('isbn') || k.includes('issn') || k.includes('pan')) {
      return false;
    }
    if (lbl.includes('reg') || lbl.includes('code') || lbl.includes('phone')) {
      return false;
    }

    return (
      k.includes('benefitted') || lbl.includes('benefitted') ||
      k.includes('durationdays') || lbl.includes('duration (days)') || lbl.includes('no. of days') || lbl.includes('no of days') || lbl.includes('in days') ||
      k.includes('stipend') || lbl.includes('stipend') ||
      k.includes('credits') || lbl.includes('credits') ||
      k.includes('pct') || k.includes('percent') || lbl.includes('%') || lbl.includes('percentage') ||
      lbl.includes('number of') || lbl.includes('no. of') || lbl.includes('no of') ||
      k.includes('amount') || lbl.includes('amount') || lbl.includes('lakhs') ||
      lbl.includes('footfall') || lbl.includes('marks') ||
      lbl.includes('male') || lbl.includes('female') ||
      lbl.includes('other states') || lbl.includes('other countries')
    );
  }

  formatDateForInput(val) {
    if (!val || typeof val !== 'string') return '';
    const s = val.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const m1 = s.match(/^(\d{1,2})[\.\/-](\d{1,2})[\.\/-](\d{4})$/);
    if (m1) {
      return `${m1[3]}-${m1[2].padStart(2, '0')}-${m1[1].padStart(2, '0')}`;
    }
    const m2 = s.match(/^(\d{4})[\.\/-](\d{1,2})[\.\/-](\d{1,2})$/);
    if (m2) {
      return `${m2[1]}-${m2[2].padStart(2, '0')}-${m2[3].padStart(2, '0')}`;
    }
    return '';
  }

  parseDateRange(val) {
    if (!val || typeof val !== 'string') return ['', ''];
    const cleaned = val.trim();
    if (cleaned.includes(' to ')) {
      const parts = cleaned.split(' to ').map(s => s.trim());
      return [this.formatDateForInput(parts[0]), this.formatDateForInput(parts[1])];
    }
    if (cleaned.includes(' - ')) {
      const parts = cleaned.split(' - ').map(s => s.trim());
      return [this.formatDateForInput(parts[0]), this.formatDateForInput(parts[1])];
    }
    return [this.formatDateForInput(cleaned), ''];
  }

  updateDateRangeCell(sheetKey, rowIdx, colKey, val1, val2, changedField) {
    if (this.isSubmissionLocked()) {
      window.showToast('Submissions are locked. Cannot edit data.', 'warning', 4000, 'Deadline Locked');
      return;
    }
    let combined = '';
    if (changedField === 'from') {
      combined = val2 ? `${val1} to ${val2}` : val1;
    } else {
      combined = val1 ? `${val1} to ${val2}` : val2;
    }
    this.updateTableCell(sheetKey, rowIdx, colKey, combined);
  }


  // Consolidated single save for entire attribute card
  reviewAndSaveAllCurrentAttribute() {
    const card = this.getActiveCard();
    if (!card) return;
    this.openReviewPrintPreviewModal(card.id);
  }

  // Full-page PDF/Print-Style Audit Review Sheet Modal
  openReviewPrintPreviewModal(cardId) {
    const schema = this.getMasterSchema();
    const card = schema.find(c => c.id === cardId);
    if (!card) return;

    const deptName = window.dataStore?.activeDepartment || 'Department';
    const cardData = this.getCardData(card.id);
    const sheets = card.sheets || [];

    // Remove existing if any
    const existing = document.getElementById('review-save-preview-modal');
    if (existing) {
      if (typeof existing.remove === 'function') existing.remove();
      else if (existing.parentNode) existing.parentNode.removeChild(existing);
    }

    const modal = document.createElement('div');
    modal.id = 'review-save-preview-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl border border-slate-300 max-w-5xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh]">
        
        <!-- Document Print Header (College Audit Format) -->
        <div class="bg-gradient-to-r from-[#26648E] via-[#33729e] to-[#4F8FC0] text-white p-6 shrink-0 flex items-center justify-between gap-4 border-b border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-14 h-16 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
              <img src="assets/weblogo.png" alt="College Crest" class="h-full w-auto object-contain" />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFE3B3] text-[#26648E]">
                  Audit Review Sheet
                </span>
                <span class="text-xs text-blue-100 font-semibold">
                  A.Y. ${this.academicYear}
                </span>
              </div>
              <h2 class="text-lg font-black tracking-tight leading-snug">
                St. Joseph's College (Autonomous), Tiruchirappalli
              </h2>
              <p class="text-xs text-blue-100">
                Internal Quality Assurance Cell (IQAC) &bull; Annual Academic Audit (AAA)
              </p>
            </div>
          </div>

          <div class="text-right shrink-0 hidden sm:block">
            <span class="px-3 py-1 rounded-xl bg-white/15 text-white text-xs font-mono font-bold block mb-1">
              ${card.cardCode}
            </span>
            <span class="text-[11px] text-blue-200">
              ${new Date().toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>

        <!-- Meta Sub-bar -->
        <div class="bg-[#f0f5f9] px-6 py-3 border-b border-[#4F8FC0]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span class="text-slate-500 font-semibold">Department:</span>
            <strong class="text-[#26648E] font-black ml-1">${deptName}</strong>
          </div>
          <div>
            <span class="text-slate-500 font-semibold">Attribute:</span>
            <strong class="text-slate-900 font-bold ml-1">${card.cardTitle}</strong>
          </div>
          <div>
            <span class="text-slate-500 font-semibold">Total Sheets:</span>
            <span class="px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200 ml-1">
              ${sheets.length}
            </span>
          </div>
        </div>

        <!-- Print-Style Sheet Preview Body -->
        <div class="p-6 overflow-y-auto space-y-8 flex-1 bg-white font-sans text-slate-800 text-xs">
          
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
            <i data-lucide="info" class="w-4 h-4 text-amber-700 shrink-0"></i>
            <span>
              <strong>Verification Preview:</strong> Please review all data entered below for <strong>${card.cardTitle}</strong>. When satisfied, click <strong>Save All Records</strong> at the bottom to confirm.
            </span>
          </div>

          ${sheets.map((s, sIdx) => {
            const sData = cardData[s.key];
            return `
              <div class="space-y-3 pb-6 border-b border-slate-200 last:border-b-0">
                <div class="flex items-center justify-between gap-2">
                  <h4 class="text-sm font-black text-[#26648E] flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-[#26648E] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      ${sIdx + 1}
                    </span>
                    <span>${s.title || s.sheetName || s.key}</span>
                  </h4>
                </div>

                <!-- Content by Sheet Type -->
                ${this.renderSheetPrintPreview(s, sData)}
              </div>
            `;
          }).join('')}

        </div>

        <!-- Footer Action Bar -->
        <div class="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <button 
            type="button" 
            onclick="formBuilder.closeReviewModal()" 
            class="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <i data-lucide="x" class="w-4 h-4"></i>
            <span>Return to Edit</span>
          </button>

          <button 
            type="button" 
            onclick="formBuilder.confirmAndSaveCardRecords('${card.id}')" 
            class="px-6 py-2.5 bg-[#26648E] hover:bg-[#1b4b6d] text-white font-black rounded-xl text-xs transition shadow-md shadow-[#26648E]/25 ring-2 ring-[#53D2DC]/50 flex items-center gap-2 cursor-pointer"
          >
            <i data-lucide="check-check" class="w-4 h-4 text-[#53D2DC]"></i>
            <span>Save All Records</span>
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons({ root: modal });
  }

  // Render individual sheet in clean document print format
  renderSheetPrintPreview(sheet, sheetData) {
    if (sheet.type === 'profile') {
      const prof = sheetData?.profile || sheet.profileQuestions || {};
      const facRows = sheetData?.facultyDetails || sheet.facultyDetails?.rows || [];
      const stuRows = sheetData?.studentDetails || sheet.studentDetails?.rows || [];

      return `
        <div class="space-y-4">
          <!-- Profile Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div><span class="text-slate-400 block text-[10px] uppercase font-bold">Department</span><strong class="text-slate-800">${prof.department || '-'}</strong></div>
            <div><span class="text-slate-400 block text-[10px] uppercase font-bold">Shift</span><strong class="text-slate-800">${prof.shift || '-'}</strong></div>
            <div><span class="text-slate-400 block text-[10px] uppercase font-bold">HOD Name</span><strong class="text-slate-800">${prof.hodName || '-'}</strong></div>
            <div><span class="text-slate-400 block text-[10px] uppercase font-bold">Coordinator</span><strong class="text-slate-800">${prof.coordinatorName || '-'}</strong></div>
          </div>

          <!-- Faculty Cadres Table -->
          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-100 font-bold text-slate-700 border-b">
                <tr>
                  <th class="p-2">Cadre Designation</th>
                  <th class="p-2 text-right">Male</th>
                  <th class="p-2 text-right">Female</th>
                  <th class="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${facRows.map(r => `
                  <tr>
                    <td class="p-2 font-medium">${r.cadre || '-'}</td>
                    <td class="p-2 text-right font-mono">${r.male ?? 0}</td>
                    <td class="p-2 text-right font-mono">${r.female ?? 0}</td>
                    <td class="p-2 text-right font-mono font-bold">${(Number(r.male)||0) + (Number(r.female)||0)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (sheet.type === 'table') {
      const rows = Array.isArray(sheetData) ? sheetData : [];
      const columns = sheet.columns || [];

      if (!rows || rows.length === 0) {
        return '<div class="p-3 bg-slate-50 rounded-lg text-slate-400 italic text-center">No records entered for this sheet.</div>';
      }

      return `
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-100 font-bold text-slate-700 border-b">
              <tr>
                ${columns.map(c => `<th class="p-2 whitespace-nowrap">${c.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${rows.map(r => `
                <tr>
                  ${columns.map(c => `<td class="p-2 font-medium">${r[c.key] !== undefined && r[c.key] !== '' ? r[c.key] : '-'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (sheet.type === 'multi_table') {
      const sections = sheet.sections || [];
      return sections.map(sec => {
        const rows = (sheetData && Array.isArray(sheetData[sec.id])) ? sheetData[sec.id] : [];
        const columns = sec.columns || [];

        return `
          <div class="space-y-2 mt-3">
            <h5 class="text-xs font-black text-slate-700 uppercase tracking-wider">${sec.title}</h5>
            ${(!rows || rows.length === 0) ? '<div class="p-2.5 bg-slate-50 rounded text-slate-400 italic text-center">No rows recorded</div>' : `
              <div class="overflow-x-auto rounded-xl border border-slate-200">
                <table class="w-full text-left text-xs border-collapse">
                  <thead class="bg-slate-100 font-bold text-slate-700 border-b">
                    <tr>${columns.map(c => `<th class="p-2 whitespace-nowrap">${c.label}</th>`).join('')}</tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${rows.map(r => `
                      <tr>${columns.map(c => `<td class="p-2 font-medium">${r[c.key] !== undefined && r[c.key] !== '' ? r[c.key] : '-'}</td>`).join('')}</tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        `;
      }).join('');
    }

    return '<div class="p-3 bg-slate-50 rounded-lg text-slate-500 font-medium">Sheet records available</div>';
  }

  closeReviewModal() {
    const modal = document.getElementById('review-save-preview-modal');
    if (modal) {
      if (typeof modal.remove === 'function') modal.remove();
      else if (modal.parentNode) modal.parentNode.removeChild(modal);
    }
  }

  confirmAndSaveCardRecords(cardId) {
    const card = this.getMasterSchema().find(c => c.id === cardId);
    if (window.dataStore) {
      window.dataStore.saveCurrentData();
    }
    this.closeReviewModal();
    this.showSaveIndicator();

    const title = card ? card.cardTitle : 'Attribute';
    window.showToast(`All records for ${title} have been verified and saved successfully!`, 'success', 4000, 'All Records Saved');
    this.render(window.dataStore?.data);
  }

  // Export complete department audit (Attributes 1 to 10 + Part A)
  exportAllAttributesToExcel() {
    const deptName = window.dataStore?.activeDepartment || 'Department';
    if (!window.ExcelExporter) {
      window.showToast('Excel exporter initializing. Please try again.', 'info', 2500, 'Exporter');
      return;
    }
    window.showToast('Preparing complete audit workbook download...', 'info', 2500, 'Download Starting');
    try {
      window.ExcelExporter.exportCompleteDepartmentToExcel(window.dataStore?.data, deptName);
    } catch (e) {
      console.error('Export complete error:', e);
      window.showToast('Error exporting complete audit: ' + e.message, 'error', 3500, 'Export Failed');
    }
  }



  // ================= BULK IMPORT & TEMPLATE MANAGEMENT =================

  getColumnsForImport(sheetKey, targetId = null) {
    const card = this.getActiveCard();
    if (!card) return [];
    const sheet = (card.sheets || []).find(s => s.key === sheetKey) || this.getActiveSheet();
    if (!sheet) return [];

    if (sheet.type === 'multi_table') {
      const sec = (sheet.sections || []).find(s => s.id === targetId) || sheet.sections?.[0];
      return sec ? (sec.columns || []) : [];
    }

    if (sheet.type === 'batch_table') {
      const bat = (sheet.batches || []).find(b => b.id === targetId) || sheet.batches?.[0];
      return sheet.columns || bat?.columns || [];
    }

    return sheet.columns || [];
  }

  // Download Question Template CSV with exact column structure and allowed dropdown options
  downloadQuestionTemplate(sheetKey, targetId = null) {
    const card = this.getActiveCard();
    const sheet = (card?.sheets || []).find(s => s.key === sheetKey) || this.getActiveSheet();
    if (!sheet) return;

    const cols = this.getColumnsForImport(sheetKey, targetId);
    if (!cols || cols.length === 0) {
      window.showToast('No tabular columns found for this sheet.', 'warning', 3500, 'Template Notice');
      return;
    }

    // 1. Header row
    const headers = cols.map(c => '"' + (c.label || c.key).replace(/"/g, '""') + '"').join(',');

    // 2. Sample Guidance Row showing dropdown choices
    const sampleRow = cols.map((col, idx) => {
      if (idx === 0) return '"1"';
      const opts = this.getDropdownOptions(col.label, col.key);
      if (opts && Array.isArray(opts) && opts.length > 1) {
        return '"' + opts.filter(Boolean).slice(0, 3).join('/') + '"';
      }
      return '"Sample ' + (col.label || col.key).replace(/[^a-zA-Z0-9 ]/g, '').trim() + '"';
    }).join(',');

    const csvContent = headers + '\r\n' + sampleRow + '\r\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `${card.cardCode}_${sheet.key}${targetId ? '_' + targetId : ''}_Question_Template.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    window.showToast(`Question Template for ${sheet.sheetName || sheet.key} downloaded successfully!`, 'success', 4000, 'Template Ready');
  }

  // Open the Bulk Import / Direct Excel Modal (Redesigned like Original Excel for 1-Time Insertion)
  openBulkImportModal(sheetKey, targetId = null, initialTab = 'excel') {
    const card = this.getActiveCard();
    const sheet = (card?.sheets || []).find(s => s.key === sheetKey) || this.getActiveSheet();
    if (!sheet) return;

    const cols = this.getColumnsForImport(sheetKey, targetId);
    let existingModal = document.getElementById('bulk-import-modal');
    if (existingModal) existingModal.remove();

    this._pendingBulkRows = [];
    this._currentBulkSheetKey = sheetKey;
    this._currentBulkTargetId = targetId;
    this._currentBulkCols = cols;

    const modal = document.createElement('div');
    modal.id = 'bulk-import-modal';
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-3 sm:p-5 animate-fadeIn overflow-y-auto';

    modal.innerHTML = `
      <div class="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl max-w-5xl md:max-w-6xl w-full overflow-hidden my-6 flex flex-col max-h-[94vh]">
        
        <!-- Header: Excel Green / College Blue Gradient -->
        <div class="bg-gradient-to-r from-[#107c41] via-[#1b5e20] to-[#26648E] text-white p-5 flex items-center justify-between gap-4 shrink-0 shadow-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-2xs font-black text-sm">
              <i data-lucide="file-spreadsheet" class="w-5 h-5 text-emerald-200"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFE3B3] text-[#26648E]">
                  ${card.cardCode} • ${sheet.sheetName || sheet.key}
                </span>
                <span class="text-xs text-emerald-100 font-semibold">${cols.length} Columns</span>
              </div>
              <h3 class="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Excel Direct Template & Bulk Importer</span>
              </h3>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              onclick="formBuilder.downloadQuestionTemplate('${sheetKey}', '${targetId || ''}')" 
              class="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/25 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              title="Download offline template CSV"
            >
              <i data-lucide="download" class="w-3.5 h-3.5 text-emerald-200"></i>
              <span class="hidden sm:inline">Download Question Template (.csv)</span>
            </button>
            <button 
              type="button" 
              onclick="formBuilder.closeBulkImportModal()" 
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
              title="Close modal"
            >
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- 2 Main Import Options (Tabs) -->
        <div class="px-6 pt-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center gap-5 text-xs font-bold shrink-0">
          <button 
            type="button" 
            id="tab-btn-insert-template" 
            onclick="formBuilder.switchBulkImportTab('excel')"
            class="pb-3 border-b-2 ${initialTab === 'excel' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'} flex items-center gap-2 transition cursor-pointer font-bold"
          >
            <i data-lucide="table-2" class="w-4 h-4 ${initialTab === 'excel' ? 'text-emerald-600' : 'text-slate-400'}"></i>
            <span>Option 2: Insert Direct to Excel</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">1-Click Fast Import</span>
          </button>

          <button 
            type="button" 
            id="tab-btn-file-upload" 
            onclick="formBuilder.switchBulkImportTab('file')"
            class="pb-3 border-b-2 ${initialTab === 'file' ? 'border-[#26648E] text-[#26648E]' : 'border-transparent text-slate-500 hover:text-slate-800'} flex items-center gap-2 transition cursor-pointer font-bold"
          >
            <i data-lucide="upload-cloud" class="w-4 h-4 ${initialTab === 'file' ? 'text-[#26648E]' : 'text-slate-400'}"></i>
            <span>Option 1: File Upload (.xlsx, .csv, .json)</span>
          </button>
        </div>

        <!-- Tab Content Body (Scrollable) -->
        <div class="p-5 md:p-6 space-y-4 overflow-y-auto flex-1">
          
          <!-- TAB 2: INSERT DIRECT TO EXCEL (1-Click Paste & Spreadsheet Table) -->
          <div id="bulk-tab-excel-panel" class="${initialTab === 'excel' ? '' : 'hidden'} space-y-4">
            
            <!-- Quick Excel Paste Zone (1-Time Insertion for Entire Sheet) -->
            <div class="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <label class="text-xs font-black text-emerald-950 flex items-center gap-2">
                  <i data-lucide="clipboard" class="w-4 h-4 text-emerald-700"></i>
                  <span>Copy from Microsoft Excel (Ctrl+C) and Paste Below (Ctrl+V) to Insert All Data at Once:</span>
                </label>
                <div class="flex items-center gap-2">
                  <button 
                    type="button" 
                    onclick="formBuilder.pasteClipboardToExcelGrid()" 
                    class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <i data-lucide="clipboard-paste" class="w-3.5 h-3.5"></i>
                    <span>1-Click Paste from Clipboard</span>
                  </button>
                  <button 
                    type="button" 
                    onclick="formBuilder.clearExcelGrid()" 
                    class="px-2.5 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-semibold rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <!-- Multi-line Excel Raw Table Paste Box -->
              <textarea 
                id="excel-bulk-paste-input" 
                rows="3" 
                oninput="formBuilder.onExcelBulkPasteInput(this.value)"
                placeholder="Paste tabular rows directly from Excel or Google Sheets here... (All columns and rows will be parsed into the spreadsheet grid below in 1 second!)"
                class="w-full text-xs font-mono p-3 border border-emerald-300 rounded-xl bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              ></textarea>
              
              <!-- Columns Guide Pill Bar -->
              <div class="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500 pt-0.5">
                <span class="font-bold text-slate-700">Aligned Columns:</span>
                ${cols.map((c, i) => `
                  <span class="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">
                    ${i + 1}. ${c.label}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Live Excel Spreadsheet Table (Original Excel Format) -->
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <i data-lucide="table" class="w-4 h-4 text-emerald-700"></i>
                    <span>Spreadsheet Preview & Inline Editor</span>
                  </span>
                  <span id="excel-grid-count-badge" class="px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-full text-xs font-black">
                    0 Records Ready
                  </span>
                </div>
                
                <div class="flex items-center gap-2">
                  <button 
                    type="button" 
                    onclick="formBuilder.addExcelGridRow()" 
                    class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-lg text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
                  >
                    <i data-lucide="plus" class="w-3 h-3 text-emerald-600"></i> Add Row
                  </button>
                  <button 
                    type="button" 
                    onclick="formBuilder.addExcelGridRows(5)" 
                    class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-lg text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
                  >
                    <i data-lucide="plus-circle" class="w-3 h-3 text-blue-600"></i> +5 Rows
                  </button>
                </div>
              </div>

              <!-- Real Excel-styled Grid Container -->
              <div class="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-xs max-h-[380px] scrollbar-thin">
                <table id="bulk-excel-grid-table" class="w-full text-left text-xs border-collapse font-sans select-text">
                  <thead class="sticky top-0 z-10">
                    <!-- Row 1: Excel Column Letters (A, B, C...) -->
                    <tr class="bg-slate-200 border-b border-slate-300 text-slate-500 font-bold text-[10px] select-none">
                      <th class="w-12 px-2 py-1 text-center bg-slate-300 border-r border-slate-300 font-mono">#</th>
                      ${cols.map((c, i) => `
                        <th class="px-3 py-1 text-center border-r border-slate-300 font-mono ${c.width || 'min-w-[160px]'}">
                          ${String.fromCharCode(65 + (i % 26))}
                        </th>
                      `).join('')}
                      <th class="w-10 px-2 py-1 text-center bg-slate-300">Del</th>
                    </tr>
                    <!-- Row 2: Template Question Titles -->
                    <tr class="bg-slate-100 border-b-2 border-slate-300 text-slate-800 font-bold text-xs select-none">
                      <th class="w-12 px-2 py-2 text-center bg-slate-200 border-r border-slate-300">S.No</th>
                      ${cols.map(c => `
                        <th class="px-3 py-2 border-r border-slate-300 ${c.width || 'min-w-[160px]'}">
                          <span class="block text-slate-900 font-bold">${c.label}</span>
                        </th>
                      `).join('')}
                      <th class="w-10 px-2 py-2 text-center text-slate-400">Del</th>
                    </tr>
                  </thead>
                  <tbody id="bulk-excel-grid-tbody" class="divide-y divide-slate-200">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Under-Excel Import Controls & 1-Time Execution Button -->
            <div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div class="space-y-1">
                <div class="flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <span class="text-slate-800 font-black">Import Mode:</span>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="excel-grid-import-mode" value="append" checked class="text-emerald-600 focus:ring-0 cursor-pointer" />
                    <span>Append to existing sheet rows</span>
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="excel-grid-import-mode" value="replace" class="text-emerald-600 focus:ring-0 cursor-pointer" />
                    <span>Replace all existing rows</span>
                  </label>
                </div>
                <p class="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                  <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i>
                  Clicking below will insert all records directly into <strong>${sheet.sheetName || sheet.key}</strong> in one time.
                </p>
              </div>

              <button 
                type="button" 
                onclick="formBuilder.importFromExcelGrid('${sheetKey}', '${targetId || ''}')" 
                class="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black rounded-xl text-xs transition shadow-md shadow-emerald-700/25 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <i data-lucide="check-check" class="w-4 h-4 text-emerald-200"></i>
                <span id="excel-grid-import-btn-label">Import All Records into Sheet</span>
              </button>
            </div>

          </div>

          <!-- TAB 1: File Upload (.xlsx, .csv, .json) -->
          <div id="bulk-tab-file-panel" class="${initialTab === 'file' ? '' : 'hidden'} space-y-4">
            <div 
              class="dropzone-area rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3"
              onclick="document.getElementById('bulk-import-file-input').click()"
              ondragover="event.preventDefault(); this.classList.add('dragover');"
              ondragleave="this.classList.remove('dragover');"
              ondrop="event.preventDefault(); this.classList.remove('dragover'); formBuilder.handleBulkFileDrop(event, '${sheetKey}', '${targetId || ''}');"
            >
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-[#1e40af] flex items-center justify-center shadow-xs">
                <i data-lucide="upload-cloud" class="w-7 h-7"></i>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-bold text-slate-800">
                  Click to select file or drag & drop here
                </p>
                <p class="text-xs text-slate-500 font-medium">
                  Supported: Excel (.xlsx, .xls), CSV (.csv, .tsv), or JSON (.json)
                </p>
              </div>
              <input 
                type="file" 
                id="bulk-import-file-input" 
                class="hidden" 
                accept=".csv, .tsv, .txt, .json, .xlsx, .xls"
                onchange="formBuilder.handleBulkFileSelected(event, '${sheetKey}', '${targetId || ''}')"
              />
            </div>
            
            <div id="bulk-file-status" class="hidden p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
              <span id="bulk-file-status-text" class="font-bold"></span>
              <button type="button" onclick="document.getElementById('bulk-import-file-input').value=''; document.getElementById('bulk-file-status').classList.add('hidden'); formBuilder._pendingBulkRows=[];" class="text-xs text-rose-600 hover:underline">Remove</button>
            </div>

            <!-- Live Parsed Rows Preview Table -->
            <div id="bulk-import-preview-container" class="hidden space-y-2">
              <div class="flex items-center justify-between">
                <span id="bulk-preview-count-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                  0 Rows Parsed
                </span>
                <span class="text-[11px] text-slate-400">Previewing first 5 rows</span>
              </div>
              
              <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white max-h-48 scrollbar-thin">
                <table id="bulk-import-preview-table" class="w-full text-left text-xs border-collapse">
                  <!-- Injected dynamically -->
                </table>
              </div>

              <!-- File Upload Action Bar -->
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div class="flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <span class="text-slate-500 font-bold">Import Mode:</span>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="bulk-file-import-mode" value="append" checked class="text-blue-600 focus:ring-0 cursor-pointer" />
                    <span>Append to existing rows</span>
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="bulk-file-import-mode" value="replace" class="text-blue-600 focus:ring-0 cursor-pointer" />
                    <span>Replace existing rows</span>
                  </label>
                </div>

                <button 
                  type="button" 
                  id="bulk-import-file-execute-btn"
                  onclick="formBuilder.executeBulkFileImport('${sheetKey}', '${targetId || ''}')" 
                  disabled
                  class="px-5 py-2.5 bg-gradient-to-r from-[#26648E] to-[#1e40af] hover:from-[#1b4b6d] hover:to-[#1e3a8a] text-white font-black rounded-xl text-xs transition shadow-md shadow-[#26648E]/25 flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <i data-lucide="check" class="w-4 h-4 text-[#53D2DC]"></i>
                  <span>Import Uploaded Records</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        <!-- Footer -->
        <div class="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <p class="text-xs text-slate-500 font-medium">
            Official IQAC Audit Format • St. Joseph's College (Autonomous)
          </p>
          <button 
            type="button" 
            onclick="formBuilder.closeBulkImportModal()" 
            class="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-300 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons({ root: modal });

    // Render initial 3 rows ready for typing or pasting
    this.renderInitialExcelGridRows(cols, 3);
  }

  // Live input handler when user pastes entire Excel table into the raw paste area
  onExcelBulkPasteInput(text) {
    if (!text || !text.trim()) {
      const cols = this._currentBulkCols || [];
      this.renderInitialExcelGridRows(cols, 3);
      return;
    }
    this.fillExcelGridFromText(text, 0, null);
  }

  // ================= INTERACTIVE EXCEL GRID HELPERS =================

  renderInitialExcelGridRows(cols, rowCount = 3) {
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (let r = 0; r < rowCount; r++) {
      this.appendExcelRowToDOM(r, cols);
    }
    this.updateExcelGridCounter();
    if (window.lucide) lucide.createIcons({ root: tbody });
  }

  appendExcelRowToDOM(rIdx, cols, rowData = null) {
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;

    const tr = document.createElement('tr');
    tr.id = `excel-grid-row-${rIdx}`;
    tr.className = 'hover:bg-emerald-50/30 transition border-b border-slate-200';

    // 1. S.No Row Header
    let rowHtml = `
      <td class="w-12 px-2 py-1.5 text-center bg-slate-100 border-r border-slate-300 font-mono font-bold text-slate-600 text-xs select-none">
        ${rIdx + 1}
      </td>
    `;

    // 2. Data Cells (Direct Excel Spreadsheet Cells)
    cols.forEach((col, cIdx) => {
      const isSno = col.key === 'sno' || col.key === 's_no' || col.key === 'sl_no';
      const cellVal = rowData ? (rowData[col.key] || '') : '';
      const opts = this.getDropdownOptions(col.label, col.key);

      if (isSno) {
        rowHtml += `
          <td class="px-2 py-1 border-r border-slate-200 bg-slate-50 text-center font-bold text-slate-500">
            <input 
              type="text" 
              value="${cellVal || (rIdx + 1)}" 
              readonly 
              data-row="${rIdx}" 
              data-col="${col.key}" 
              class="w-full text-center bg-transparent border-0 outline-none text-slate-500 text-xs font-bold"
            />
          </td>
        `;
      } else if (opts && Array.isArray(opts) && opts.length > 0) {
        rowHtml += `
          <td class="px-1 py-0.5 border-r border-slate-200">
            <select 
              data-row="${rIdx}" 
              data-col="${col.key}" 
              onchange="formBuilder.updateExcelGridCounter()"
              class="excel-cell-input w-full px-2 py-1 text-xs text-slate-800 bg-white border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 rounded outline-none transition font-semibold"
            >
              ${opts.map(o => `
                <option value="${o}" ${String(cellVal).trim().toLowerCase() === String(o).trim().toLowerCase() ? 'selected' : ''}>
                  ${o === '' ? '-- Select --' : o}
                </option>
              `).join('')}
            </select>
          </td>
        `;
      } else if (this.isNumericColumn(col.label, col.key)) {
        rowHtml += `
          <td class="px-1 py-0.5 border-r border-slate-200">
            <input 
              type="text" 
              inputmode="numeric" 
              pattern="[0-9.]*" 
              value="${cellVal}" 
              data-row="${rIdx}" 
              data-col="${col.key}" 
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46"
              oninput="this.value = this.value.replace(/[^0-9.]/g, ''); formBuilder.updateExcelGridCounter()"
              onkeydown="formBuilder.handleExcelCellKeyDown(event, ${rIdx}, '${col.key}')"
              class="excel-cell-input w-full px-2 py-1 text-xs text-right font-mono text-slate-800 bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 rounded outline-none transition" 
            />
          </td>
        `;
      } else {
        rowHtml += `
          <td class="px-1 py-0.5 border-r border-slate-200">
            <input 
              type="text" 
              value="${cellVal}" 
              data-row="${rIdx}" 
              data-col="${col.key}" 
              oninput="this.value = this.value ? (this.value.charAt(0).toUpperCase() + this.value.slice(1)) : ''; formBuilder.updateExcelGridCounter()"
              onkeydown="formBuilder.handleExcelCellKeyDown(event, ${rIdx}, '${col.key}')"
              class="excel-cell-input w-full px-2 py-1 text-xs text-slate-800 bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 rounded outline-none transition font-medium" 
            />
          </td>
        `;
      }
    });

    // 3. Delete Row Button
    rowHtml += `
      <td class="w-10 px-1 py-1 text-center">
        <button 
          type="button" 
          onclick="formBuilder.deleteExcelGridRow(${rIdx})" 
          class="p-1 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer" 
          title="Delete row"
        >
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    `;

    tr.innerHTML = rowHtml;
    tbody.appendChild(tr);
  }

  addExcelGridRow() {
    const cols = this._currentBulkCols || [];
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;
    const currentRows = tbody.querySelectorAll('tr').length;
    this.appendExcelRowToDOM(currentRows, cols);
    this.updateExcelGridCounter();
    if (window.lucide) lucide.createIcons({ root: tbody });

    const firstInput = tbody.querySelector(`tr:last-child input:not([readonly])`);
    if (firstInput) firstInput.focus();
  }

  addExcelGridRows(count = 5) {
    const cols = this._currentBulkCols || [];
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;
    for (let i = 0; i < count; i++) {
      const currentRows = tbody.querySelectorAll('tr').length;
      this.appendExcelRowToDOM(currentRows, cols);
    }
    this.updateExcelGridCounter();
    if (window.lucide) lucide.createIcons({ root: tbody });
  }

  deleteExcelGridRow(rIdx) {
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length <= 1) {
      this.clearExcelGrid();
      return;
    }
    if (rows[rIdx]) rows[rIdx].remove();

    // Re-index remaining rows
    const remaining = tbody.querySelectorAll('tr');
    remaining.forEach((tr, newIdx) => {
      tr.id = `excel-grid-row-${newIdx}`;
      const headerCell = tr.querySelector('td:first-child');
      if (headerCell) headerCell.textContent = String(newIdx + 1);

      tr.querySelectorAll('input').forEach(inp => {
        inp.setAttribute('data-row', String(newIdx));
        const colKey = inp.getAttribute('data-col');
        if (colKey === 'sno' || colKey === 's_no' || colKey === 'sl_no') {
          inp.value = String(newIdx + 1);
        }
      });

      const delBtn = tr.querySelector('button');
      if (delBtn) delBtn.setAttribute('onclick', `formBuilder.deleteExcelGridRow(${newIdx})`);
    });

    this.updateExcelGridCounter();
  }

  clearExcelGrid() {
    const cols = this._currentBulkCols || [];
    const pasteBox = document.getElementById('excel-bulk-paste-input');
    if (pasteBox) pasteBox.value = '';
    this.renderInitialExcelGridRows(cols, 3);
    window.showToast('Excel grid reset.', 'info', 2000, 'Grid Cleared');
  }

  updateExcelGridCounter() {
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;
    const trs = tbody.querySelectorAll('tr');
    let filledCount = 0;

    trs.forEach(tr => {
      const inputs = tr.querySelectorAll('[data-col]:not([readonly])');
      const isFilled = Array.from(inputs).some(inp => {
        const isSno = inp.getAttribute('data-col') === 'sno' || inp.getAttribute('data-col') === 's_no' || inp.getAttribute('data-col') === 'sl_no';
        return !isSno && (inp.value || '').trim() !== '';
      });
      if (isFilled) filledCount++;
    });

    const badge = document.getElementById('excel-grid-count-badge');
    if (badge) {
      badge.textContent = `${filledCount} Records Ready`;
      if (filledCount > 0) {
        badge.className = 'px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-full text-xs font-black';
      } else {
        badge.className = 'px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-xs font-semibold';
      }
    }

    const btnLabel = document.getElementById('excel-grid-import-btn-label');
    if (btnLabel) {
      btnLabel.textContent = filledCount > 0 ? `Import All (${filledCount} Records) into Sheet` : 'Import All Records into Sheet';
    }
  }

  handleExcelCellKeyDown(event, rIdx, colKey) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextInput = document.querySelector(`input[data-row="${rIdx + 1}"][data-col="${colKey}"]`);
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      } else {
        this.addExcelGridRow();
        setTimeout(() => {
          const addedInput = document.querySelector(`input[data-row="${rIdx + 1}"][data-col="${colKey}"]`);
          if (addedInput) {
            addedInput.focus();
            addedInput.select();
          }
        }, 50);
      }
    }
  }

  async pasteClipboardToExcelGrid() {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          const pasteBox = document.getElementById('excel-bulk-paste-input');
          if (pasteBox) pasteBox.value = text;
          this.fillExcelGridFromText(text, 0, null);
          return;
        }
      }
    } catch (e) {
      console.warn('Clipboard direct read not permitted:', e);
    }

    // Fallback: Focus paste input so user can press Ctrl+V
    const pasteBox = document.getElementById('excel-bulk-paste-input');
    if (pasteBox) {
      pasteBox.focus();
      pasteBox.select();
      window.showToast('Press Ctrl+V to paste your Excel table rows into the box.', 'info', 3000, 'Paste Here');
    }
  }

  fillExcelGridFromText(text, startRowIdx = 0, startColKey = null) {
    if (!text || !text.trim()) return;
    const cols = this._currentBulkCols || [];
    if (!cols || cols.length === 0) return;

    const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return;

    // Detect delimiter: tab or comma
    const delimiter = lines[0].includes('\t') ? '\t' : ',';
    const firstTokens = lines[0].split(delimiter).map(t => t.trim().replace(/^["']|["']$/g, ''));

    // Check if first row is header
    let rowStartIndex = 0;
    const matchesHeader = firstTokens.some(tok => {
      const lower = tok.toLowerCase();
      return cols.some(c => (c.label || '').toLowerCase().includes(lower) || (c.key || '').toLowerCase() === lower);
    });
    if (matchesHeader) {
      rowStartIndex = 1;
    }

    const dataLines = lines.slice(rowStartIndex);
    if (dataLines.length === 0) {
      window.showToast('No data rows found in pasted text.', 'warning', 3000, 'Paste Notice');
      return;
    }

    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;

    // Reset table and fill all rows cleanly
    tbody.innerHTML = '';

    dataLines.forEach((line, rIdx) => {
      const tokens = line.split(delimiter).map(t => t.trim().replace(/^["']|["']$/g, ''));
      
      // Auto-adjust offset if tokens match without sno
      let offset = 0;
      if (tokens.length === cols.length - 1 && (cols[0].key === 'sno' || cols[0].key === 's_no' || cols[0].key === 'sl_no')) {
        offset = 1;
      }

      const rowObj = {};
      cols.forEach((col, cIdx) => {
        const isSno = col.key === 'sno' || col.key === 's_no' || col.key === 'sl_no';
        if (isSno) {
          rowObj[col.key] = String(rIdx + 1);
        } else {
          const tokenIdx = cIdx - offset;
          rowObj[col.key] = (tokenIdx >= 0 && tokens[tokenIdx] !== undefined) ? tokens[tokenIdx] : '';
        }
      });

      this.appendExcelRowToDOM(rIdx, cols, rowObj);
    });

    this.updateExcelGridCounter();
    if (window.lucide) lucide.createIcons({ root: tbody });
    window.showToast(`✓ ${dataLines.length} rows loaded from Excel! Ready to import.`, 'success', 3500, 'Excel Data Loaded');
  }

  // Import directly from the Excel Grid into the active sheet
  importFromExcelGrid(sheetKey, targetId = null) {
    const tbody = document.getElementById('bulk-excel-grid-tbody');
    if (!tbody) return;
    const cols = this._currentBulkCols || this.getColumnsForImport(sheetKey, targetId);

    const rows = [];
    const trs = tbody.querySelectorAll('tr');

    trs.forEach((tr, rIdx) => {
      const rowObj = {};
      let hasData = false;

      cols.forEach(col => {
        const input = tr.querySelector(`[data-col="${col.key}"]`);
        const val = input ? (input.value || '').trim() : '';
        rowObj[col.key] = val;

        const isSno = col.key === 'sno' || col.key === 's_no' || col.key === 'sl_no';
        if (!isSno && val !== '') {
          hasData = true;
        }
      });

      if (hasData) {
        rows.push(rowObj);
      }
    });

    if (rows.length === 0) {
      window.showToast('Please paste or enter at least one record before importing.', 'warning', 4000, 'Grid Empty');
      return;
    }

    const modeRadio = document.querySelector('input[name="excel-grid-import-mode"]:checked');
    const importMode = modeRadio ? modeRadio.value : 'append';

    this._pendingBulkRows = rows;
    this.executeBulkImportWithMode(sheetKey, targetId, importMode);
  }

  // Execute import of records with explicit mode
  executeBulkImportWithMode(sheetKey, targetId = null, importMode = 'append') {
    const rows = this._pendingBulkRows || [];
    if (rows.length === 0) return;

    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    const sheet = (card.sheets || []).find(s => s.key === sheetKey) || this.getActiveSheet();
    if (!sheet) return;

    if (sheet.type === 'multi_table' && targetId) {
      if (!cardData[sheetKey]) cardData[sheetKey] = {};
      if (!Array.isArray(cardData[sheetKey][targetId]) || importMode === 'replace') {
        cardData[sheetKey][targetId] = [];
      }
      const cur = cardData[sheetKey][targetId];
      rows.forEach(r => {
        r.sno = String(cur.length + 1);
        cur.push(r);
      });
    } else if (sheet.type === 'batch_table' && targetId) {
      if (!cardData[sheetKey]) cardData[sheetKey] = {};
      if (!Array.isArray(cardData[sheetKey][targetId]) || importMode === 'replace') {
        cardData[sheetKey][targetId] = [];
      }
      const cur = cardData[sheetKey][targetId];
      rows.forEach(r => {
        r.sno = String(cur.length + 1);
        cur.push(r);
      });
    } else {
      if (!Array.isArray(cardData[sheetKey]) || importMode === 'replace') {
        cardData[sheetKey] = [];
      }
      const cur = cardData[sheetKey];
      rows.forEach(r => {
        if (r.sno !== undefined) r.sno = String(cur.length + 1);
        if (r.s_no !== undefined) r.s_no = String(cur.length + 1);
        if (r.sl_no !== undefined) r.sl_no = String(cur.length + 1);
        cur.push(r);
      });
    }

    this.triggerAutoSave();
    this.closeBulkImportModal();
    window.showToast(`Successfully imported ${rows.length} records into ${sheet.sheetName || sheetKey}!`, 'success', 4000, 'Import Complete');
    this.render(window.dataStore?.data);
  }

  closeBulkImportModal() {
    const modal = document.getElementById('bulk-import-modal');
    if (modal) modal.remove();
    this._stagedImportData = null;
    this._pendingBulkRows = null;
  }

  handleBulkFileDrop(event, sheetKey, targetId = null) {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : null;
    if (file) {
      this.processUploadedBulkFile(file, sheetKey, targetId);
    }
  }

  handleBulkFileSelected(event, sheetKey, targetId = null) {
    const file = event.target ? event.target.files[0] : null;
    if (file) {
      this.processUploadedBulkFile(file, sheetKey, targetId);
    }
  }

  processUploadedBulkFile(file, sheetKey, targetId = null) {
    const cols = this._currentBulkCols || this.getColumnsForImport(sheetKey, targetId);
    const statusDiv = document.getElementById('bulk-file-status');
    const statusText = document.getElementById('bulk-file-status-text');
    const previewContainer = document.getElementById('bulk-import-preview-container');
    const previewCountBadge = document.getElementById('bulk-preview-count-badge');
    const previewTable = document.getElementById('bulk-import-preview-table');
    const execBtn = document.getElementById('bulk-import-file-execute-btn');

    if (!file) return;

    if (statusDiv && statusText) {
      statusDiv.classList.remove('hidden');
      statusText.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        let parsedRows = [];

        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          parsedRows = Array.isArray(parsed) ? parsed : (parsed.rows || []);
        } else {
          // CSV / TSV / plain text parser
          const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
          if (lines.length > 0) {
            const delimiter = lines[0].includes('\t') ? '\t' : ',';
            const firstTokens = lines[0].split(delimiter).map(t => t.trim().replace(/^["']|["']$/g, ''));
            let rowStartIndex = 0;
            const matchesHeader = firstTokens.some(tok => {
              const lower = tok.toLowerCase();
              return cols.some(c => (c.label || '').toLowerCase().includes(lower) || (c.key || '').toLowerCase() === lower);
            });
            if (matchesHeader) rowStartIndex = 1;

            const dataLines = lines.slice(rowStartIndex);
            dataLines.forEach((line, rIdx) => {
              const tokens = line.split(delimiter).map(t => t.trim().replace(/^["']|["']$/g, ''));
              let offset = 0;
              if (tokens.length === cols.length - 1 && (cols[0].key === 'sno' || cols[0].key === 's_no' || cols[0].key === 'sl_no')) {
                offset = 1;
              }
              const rowObj = {};
              let hasData = false;
              cols.forEach((col, cIdx) => {
                const isSno = col.key === 'sno' || col.key === 's_no' || col.key === 'sl_no';
                if (isSno) {
                  rowObj[col.key] = String(rIdx + 1);
                } else {
                  const tokenIdx = cIdx - offset;
                  const val = (tokenIdx >= 0 && tokens[tokenIdx] !== undefined) ? tokens[tokenIdx] : '';
                  rowObj[col.key] = val;
                  if (val !== '') hasData = true;
                }
              });
              if (hasData) parsedRows.push(rowObj);
            });
          }
        }

        if (parsedRows.length === 0) {
          window.showToast('No valid records found in the uploaded file.', 'warning', 3500, 'Empty File');
          if (execBtn) execBtn.disabled = true;
          return;
        }

        this._pendingBulkRows = parsedRows;

        if (previewContainer && previewTable) {
          previewContainer.classList.remove('hidden');
          if (previewCountBadge) {
            previewCountBadge.textContent = `${parsedRows.length} Rows Parsed`;
          }

          let tableHtml = `
            <thead>
              <tr class="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                ${cols.map(c => `<th class="p-2 border-r border-slate-200 ${c.width || ''}">${c.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${parsedRows.slice(0, 5).map(r => `
                <tr class="hover:bg-slate-50">
                  ${cols.map(c => `<td class="p-2 border-r border-slate-100 font-medium text-slate-800">${r[c.key] || ''}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          `;
          previewTable.innerHTML = tableHtml;
        }

        if (execBtn) {
          execBtn.disabled = false;
          execBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-[#53D2DC]"></i><span>Import ${parsedRows.length} Uploaded Records</span>`;
          if (window.lucide) lucide.createIcons({ root: execBtn });
        }

        window.showToast(`Parsed ${parsedRows.length} rows successfully from ${file.name}. Ready to import!`, 'success', 3500, 'File Parsed');
      } catch (err) {
        console.error('Error parsing file:', err);
        window.showToast('Failed to parse uploaded file: ' + err.message, 'error', 4000, 'Parse Error');
        if (execBtn) execBtn.disabled = true;
      }
    };
    reader.readAsText(file);
  }

  // File Upload execute wrapper
  executeBulkFileImport(sheetKey, targetId = null) {
    const modeRadio = document.querySelector('input[name="bulk-file-import-mode"]:checked');
    const importMode = modeRadio ? modeRadio.value : 'append';
    this.executeBulkImportWithMode(sheetKey, targetId, importMode);
  }

  switchBulkImportTab(tab) {
    const fileTab = document.getElementById('tab-btn-file-upload');
    const excelTab = document.getElementById('tab-btn-insert-template');
    const filePanel = document.getElementById('bulk-tab-file-panel');
    const excelPanel = document.getElementById('bulk-tab-excel-panel');

    if (tab === 'file') {
      fileTab.className = 'pb-3 border-b-2 border-[#26648E] text-[#26648E] flex items-center gap-2 transition cursor-pointer font-bold';
      excelTab.className = 'pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2 transition cursor-pointer font-bold';
      filePanel.classList.remove('hidden');
      excelPanel.classList.add('hidden');
    } else {
      excelTab.className = 'pb-3 border-b-2 border-emerald-600 text-emerald-800 flex items-center gap-2 transition cursor-pointer font-bold';
      fileTab.className = 'pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2 transition cursor-pointer font-bold';
      excelPanel.classList.remove('hidden');
      filePanel.classList.add('hidden');
    }
    if (window.lucide) lucide.createIcons();
  }

  executeBulkImport(sheetKey, targetId = null) {
    this.importFromExcelGrid(sheetKey, targetId);
  }

}
