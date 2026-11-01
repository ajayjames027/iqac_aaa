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
  resetQuestionSchemaToDefault() {
    if (!this.isAdmin()) return;
    if (confirm('Reset questionnaire structure and column headers to the official Excel template? (This will restore default question text)')) {
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
        const prof = sData?.profile || sheet.profileQuestions || {};
        const facRows = sData?.facultyDetails || sheet.facultyDetails?.rows || [];
        const hasProf = Boolean(prof.department || prof.hodName);
        const hasFac = facRows.some(r => (Number(r.male) > 0 || Number(r.female) > 0));
        if (hasProf || hasFac) isFinished = true;
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

  deleteTableRow(sheetKey, rowIdx) {
    if (this.isSubmissionLocked()) {
      window.showToast('The submission deadline has expired. Records cannot be deleted.', 'warning', 4000, 'Deadline Locked');
      return;
    }
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!Array.isArray(cardData[sheetKey])) return;
    if (confirm('Delete this data row?')) {
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

  deleteMultiTableRow(sheetKey, sectionId, rowIdx) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]?.[sectionId]) return;
    if (confirm('Delete this row?')) {
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

  deleteBatchTableRow(sheetKey, batchId, rowIdx) {
    const card = this.getActiveCard();
    if (!card) return;
    const cardData = this.getCardData(card.id);
    if (!cardData[sheetKey]?.[batchId]) return;
    if (confirm('Delete this row?')) {
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

  addColumnToSchema(sheetKey, sectionId = null) {
    if (!this.isAdmin()) return;
    const colName = prompt('Enter new Question Column Title:');
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

  deleteColumnFromSchema(sheetKey, colKey, sectionId = null) {
    if (!this.isAdmin()) return;
    if (!confirm('Are you sure you want to remove this question column from the template?')) return;

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

  // ================= 1. CARDS GALLERY VIEW =================
  renderCardsGalleryView(data) {
    const cards = this.getMasterSchema();
    const isAdmin = this.isAdmin();
    const deptName = window.dataStore?.activeDepartment || 'Department';

    this.container.innerHTML = `
      <div class="w-full space-y-6 animate-fadeIn">
        
        <!-- Simple & Professional Header Banner -->
        <div class="bg-gradient-to-r from-[#26648E]/10 via-[#4F8FC0]/10 to-[#FFE3B3]/25 rounded-2xl p-5 sm:p-6 border border-[#4F8FC0]/30 shadow-2xs flex items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#FFE3B3] text-[#26648E] border border-[#fedba0] shadow-2xs">
                Active Year: ${this.academicYear}
              </span>
            </div>
            <h1 class="text-2xl md:text-3xl font-black tracking-tight text-[#26648E]">
              Annual Academic Audit (AAA) ${this.academicYear}
            </h1>
          </div>
        </div>

        ${this.renderDeadlineNoticeBanner()}

        <!-- Cards Grid with Exact Finished Count (e.g. 4/11) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          ${cards.map(card => {
            const isPartA = card.id === 'part_a';
            const { finishedCount, totalSheets, percentage } = this.getCompletionStats(card);
            const isAllFinished = totalSheets > 0 && finishedCount === totalSheets;

            return `
              <div class="bg-white rounded-2xl border ${isPartA ? 'border-amber-300 shadow-md ring-1 ring-amber-300/30' : 'border-slate-200 shadow-xs'} hover:shadow-lg hover:border-blue-500 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
                
                <div class="p-5">
                  <div class="flex items-center justify-between gap-2 mb-2.5">
                    <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                      isPartA 
                        ? 'bg-amber-100 text-amber-950 border border-amber-300' 
                        : 'bg-blue-50 text-blue-900 border border-blue-200'
                    }">
                      ${card.cardCode}
                    </span>
                    
                    <span class="text-[11px] font-bold ${isAllFinished ? 'text-emerald-700' : 'text-blue-700'} flex items-center gap-1">
                      <i data-lucide="${isAllFinished ? 'check-circle' : 'file-spreadsheet'}" class="w-3.5 h-3.5 ${isAllFinished ? 'text-emerald-600' : 'text-blue-600'}"></i>
                      <span>${finishedCount} / ${totalSheets} Finished</span>
                    </span>
                  </div>

                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition mb-1.5 flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg ${isPartA ? 'bg-amber-500 text-amber-950' : 'bg-blue-100 text-blue-700'} flex items-center justify-center font-bold shrink-0">
                      <i data-lucide="${card.icon || 'file-text'}" class="w-3.5 h-3.5"></i>
                    </div>
                    <span class="line-clamp-1">${card.cardTitle}</span>
                  </h3>

                  <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
                    ${card.cardSubtitle}
                  </p>

                  <!-- Progress Bar -->
                  <div class="space-y-1">
                    <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div class="h-full ${isAllFinished ? 'bg-emerald-500' : 'bg-blue-600'} transition-all duration-300" style="width: ${percentage}%"></div>
                    </div>
                    <div class="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                      <span>${percentage}% Finished</span>
                      <span>${totalSheets} Total ${totalSheets === 1 ? 'Sheet' : 'Sheets'}</span>
                    </div>
                  </div>
                </div>

                <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-[10px] font-bold ${isAllFinished ? 'text-emerald-700' : (finishedCount > 0 ? 'text-blue-700' : 'text-slate-400')}">
                    ${isAllFinished ? 'Completed' : (finishedCount > 0 ? `${finishedCount} of ${totalSheets} filled` : 'Pending entry')}
                  </span>

                  <button 
                    type="button" 
                    onclick="formBuilder.openCard('${card.id}')"
                    class="px-3.5 py-1.5 ${isPartA ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 font-black' : 'bg-blue-600 hover:bg-blue-700 text-white font-bold'} text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 group-hover:translate-x-0.5"
                  >
                    <span>${isPartA ? 'Open Profile' : 'Fill Attribute'}</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </button>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  // ================= 2. ACTIVE ATTRIBUTE SHEETS VIEW (FULL WIDE) =================
  renderActiveAttributeSheetsView(data) {
    const card = this.getActiveCard();
    if (!card) {
      this.backToCards();
      return;
    }

    const sheets = card.sheets || [];
    const activeSheet = this.getActiveSheet() || sheets[0];
    const isAdmin = this.isAdmin();
    const deptName = window.dataStore?.activeDepartment || 'Department';
    const cardData = this.getCardData(card.id);
    const { finishedCount, totalSheets } = this.getCompletionStats(card);

    this.container.innerHTML = `
      <div class="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
        
        <!-- Academic Royal Header Banner -->
        <div class="bg-gradient-to-r from-[#26648E] via-[#33729e] to-[#4F8FC0] text-white px-6 py-5 border-b border-[#26648E]/40 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full shadow-xs">
          <div class="flex items-center gap-3">
            <button 
              type="button" 
              onclick="formBuilder.backToCards()" 
              class="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 border border-white/20 shrink-0 shadow-xs backdrop-blur-xs"
              title="Return to Attributes Cards"
            >
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Back to Cards</span>
            </button>

            <div>
              <div class="flex items-center flex-wrap gap-2 mb-1">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950">
                  AAA ${this.academicYear}
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900 text-blue-200 border border-blue-700">
                  ${card.cardCode}
                </span>
                <span class="text-slate-500">•</span>
                <span class="text-xs text-emerald-300 font-bold">${finishedCount}/${totalSheets} Completed</span>
              </div>
              <h2 class="text-lg md:text-xl font-black tracking-tight flex items-center gap-2 text-white">
                <span>${card.cardTitle}</span>
              </h2>
            </div>
          </div>

          <div class="flex items-center flex-wrap gap-2">
            <span class="card-save-indicator text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Auto-saved
            </span>

            <button type="button" onclick="formBuilder.saveCurrentSheetData('${activeSheet?.key}')" class="text-xs px-3.5 py-2 bg-[#26648E] hover:bg-[#1a4a6b] text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-[#26648E]/25 ring-2 ring-[#53D2DC]/50">
              <i data-lucide="save" class="w-3.5 h-3.5"></i>
              <span>Save Sheet Data</span>
            </button>

            <button type="button" onclick="formBuilder.exportCurrentCardToExcel()" class="text-xs px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Export (.xls)</span>
            </button>
          </div>
        </div>

        ${this.renderDeadlineNoticeBanner()}

        <!-- Role Access Control Banner -->
        ${isAdmin ? `
          <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping"></span>
              <span class="text-xs font-bold text-purple-900">IQAC Admin Mode:</span>
              <span class="text-xs text-purple-700">Toggle question editing to customize question text, subtitles, and column headers.</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="formBuilder.toggleAdminEditQuestionsMode()" class="text-xs px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition ${this.adminEditQuestionsMode ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300'}">
                <i data-lucide="${this.adminEditQuestionsMode ? 'check' : 'edit-3'}" class="w-3.5 h-3.5"></i>
                <span>${this.adminEditQuestionsMode ? 'Done Editing Questions' : 'Edit Questions / Column Headers'}</span>
              </button>
              ${this.adminEditQuestionsMode ? `
                <button type="button" onclick="formBuilder.saveQuestionSchema()" class="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1">
                  <i data-lucide="check-square" class="w-3.5 h-3.5"></i> Save Template
                </button>
                <button type="button" onclick="formBuilder.resetQuestionSchemaToDefault()" class="text-xs px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold rounded-lg transition flex items-center gap-1">
                  <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset to Excel
                </button>
              ` : ''}
            </div>
          </div>
        ` : `
          <div class="bg-blue-50 border-b border-blue-200 px-6 py-2 flex items-center justify-between text-xs text-blue-900">
            <div class="flex items-center gap-2">
              <i data-lucide="lock" class="w-4 h-4 text-blue-600"></i>
              <span class="font-bold">Department Data Entry Mode (${deptName}):</span>
              <span class="text-blue-700">Questions are locked. Fill data into the fields below and click <strong>Save Sheet Data</strong> to save.</span>
            </div>
            <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] border border-blue-200">
              Read-Only Questions
            </span>
          </div>
        `}

        <!-- Horizontal Sheets Navigation Tabs -->
        ${sheets.length > 1 ? `
          <div class="px-4 py-2 bg-slate-100/90 border-b border-slate-200 overflow-x-auto flex items-center gap-1 text-xs font-semibold scrollbar-thin w-full">
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
                  class="px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition ${
                    isActive 
                      ? 'bg-[#26648E] text-white font-black shadow-sm border border-[#26648E]' 
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold'
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

        <!-- Active Sheet Content (Full Wide) -->
        <div class="p-6 space-y-6 w-full">
          ${activeSheet ? this.renderActiveSheetContent(activeSheet, cardData[activeSheet.key], isAdmin) : '<div class="text-slate-500">No sheet selected.</div>'}
        </div>

        <!-- Footer Bar with Dedicated Save Button and Quick Prev/Next Navigation -->
        <div class="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 w-full">
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              onclick="formBuilder.backToCards()" 
              class="text-xs px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <i data-lucide="layout-grid" class="w-4 h-4"></i>
              <span>All Cards</span>
            </button>

            <button 
              type="button" 
              onclick="formBuilder.saveCurrentSheetData('${activeSheet?.key}')" 
              class="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Save ${activeSheet?.sheetName || 'Sheet'} Data</span>
            </button>
          </div>

          ${sheets.length > 1 ? `
            <div class="flex items-center gap-2">
              <button type="button" onclick="formBuilder.navigateSheet(-1)" class="text-xs px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 rounded-lg transition flex items-center gap-1">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Prev Sheet
              </button>
              <span class="text-xs text-slate-500 font-medium">
                ${activeSheet?.sheetName || ''} (${sheets.findIndex(s => s.key === activeSheet?.key) + 1} of ${sheets.length})
              </span>
              <button type="button" onclick="formBuilder.navigateSheet(1)" class="text-xs px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-1">
                Next Sheet <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          ` : '<div></div>'}
        </div>

      </div>
    `;
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

          <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm self-start">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Save Profile Data</span>
          </button>
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
          <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="save" class="w-4 h-4"></i>
            <span>Save Profile Data</span>
          </button>
        </div>
      </div>
    `;
  }

  // ================= 2. STANDARD TABLE SHEETS =================
  renderStandardTableSheet(sheet, sheetData, isEditQuestions) {
    const rows = Array.isArray(sheetData) ? sheetData : (sheet.rows || []);
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
            
            <button type="button" onclick="formBuilder.addTableRow('${sheet.key}')" class="text-xs px-3.5 py-1.5 bg-[#4F8FC0] hover:bg-[#3a7ca9] text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Data Row
            </button>

            <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="save" class="w-3.5 h-3.5"></i> Save Sheet Data
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
          <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Save ${sheet.sheetName || 'Sheet'} Data</span>
          </button>
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

          <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Save Sheet Data</span>
          </button>
        </div>

        ${sections.map(sec => {
          const rows = (sheetData && Array.isArray(sheetData[sec.id])) ? sheetData[sec.id] : (sec.rows || []);
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
                  <button type="button" onclick="formBuilder.addMultiTableRow('${sheet.key}', '${sec.id}')" class="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Row
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
          <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Save ${sheet.sheetName || 'Sheet'} Data</span>
          </button>
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
            <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
              <i data-lucide="save" class="w-3.5 h-3.5"></i>
              <span>Save Sheet Data</span>
            </button>
          </div>
        </div>

        ${batches.map(bat => {
          const rows = (sheetData && Array.isArray(sheetData[bat.id])) ? sheetData[bat.id] : (bat.rows || []);

          return `
            <div class="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4 w-full">
              <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <i data-lucide="layers" class="w-4 h-4 text-emerald-600"></i>
                  ${bat.name}
                </h4>
                <button type="button" onclick="formBuilder.addBatchTableRow('${sheet.key}', '${bat.id}')" class="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Student
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
          <button type="button" onclick="formBuilder.saveCurrentSheetData('${sheet.key}')" class="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Save ${sheet.sheetName || 'Sheet'} Data</span>
          </button>
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

}
