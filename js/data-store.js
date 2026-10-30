// IQAC AAA 2026-2027 - Central Data Store & State Management

const STORAGE_KEY_PREFIX = 'IQAC_AAA_DATA_';
const DEPT_LIST_KEY = 'IQAC_AAA_DEPARTMENTS_LIST';
const ACTIVE_DEPT_KEY = 'IQAC_AAA_ACTIVE_DEPT';

class DataStore {
  constructor() {
    this.activeDepartment = null;
    this.data = null;
    this.listeners = [];
  }

  // Subscribe to changes
  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.data); } catch (e) { console.error(e); }
    });
  }

  // Initialize store: check if data exists in localStorage, else load sample
  async init() {
    let deptList = this.getDepartmentList();
    if (!deptList || deptList.length === 0) {
      deptList = ['PG & Research Department of Computer Science', 'PG & Research Department of Commerce'];
      this.saveDepartmentList(deptList);
    }

    let activeDeptName = localStorage.getItem(ACTIVE_DEPT_KEY) || deptList[0];
    let stored = localStorage.getItem(STORAGE_KEY_PREFIX + activeDeptName);

    if (stored) {
      try {
        this.data = this.ensureSchema(JSON.parse(stored));
        this.activeDepartment = activeDeptName;
        this.notify();
        return;
      } catch (e) {
        console.warn('Could not parse stored data, loading default', e);
      }
    }

    // First check embedded sample data (guarantees 100% offline file:// support with zero CORS issues)
    if (window.CS_SAMPLE_DATA) {
      this.data = this.ensureSchema(JSON.parse(JSON.stringify(window.CS_SAMPLE_DATA)));
      this.activeDepartment = this.data.departmentInfo.departmentName;
      this.saveCurrentData();
      this.notify();
      return;
    }

    // Fallback: Try fetching cs_sample.json if embedded data is not available
    try {
      const resp = await fetch('sample-data/cs_sample.json');
      if (resp.ok) {
        this.data = this.ensureSchema(await resp.json());
        this.activeDepartment = this.data.departmentInfo.departmentName;
        this.saveCurrentData();
        this.notify();
        return;
      }
    } catch (e) {
      console.warn('Fetch sample error (running on file:// or network restriction):', e);
    }

    // Fallback inline template if fetch fails
    this.data = this.ensureSchema(this.createDefaultData('PG & Research Department of Computer Science'));
    this.activeDepartment = this.data.departmentInfo.departmentName;
    this.saveCurrentData();
    this.notify();
  }

  ensureSchema(data) {
    if (!data) return data;
    if (!data.departmentInfo) data.departmentInfo = {};
    if (!data.departmentInfo.scholars) {
      const total = data.departmentInfo.researchScholarsCount || 24;
      data.departmentInfo.scholars = {
        fullTime: { male: Math.floor(total * 0.4), female: Math.floor(total * 0.3) },
        partTime: { male: Math.floor(total * 0.15), female: Math.ceil(total * 0.15) }
      };
    }
    if (!data.attributeI) data.attributeI = {};
    if (!data.attributeI.ptm) {
      data.attributeI.ptm = {
        numberOfPTMs: 2,
        parentsParticipated: 340,
        details: "Conducted semester-wise parent-teacher meetings for UG & PG with academic progress review and digital feedback capture."
      };
    }
    if (!data.studentsOutcomes2026) {
      data.studentsOutcomes2026 = {
        ug: { strength: 120, onCampus: 68, offCampus: 18, higherStudies: 22, entrepreneur: 5, others: 7 },
        pg: { strength: 58, onCampus: 36, offCampus: 10, higherStudies: 6, entrepreneur: 3, others: 3 },
        phd: { strength: 6, onCampus: 0, offCampus: 4, higherStudies: 1, entrepreneur: 1, others: 0 }
      };
    }
    if (!data.attributeIII) {
      data.attributeIII = {
        researchFacility: [
          { labName: "Research Computing & Advanced Analytics Lab", equipment: "High-Performance Workstation Nodes", facilityType: "New Facility", purchaseDate: "15.07.2026", amount: 450000 },
          { labName: "IoT & Instrumentation Lab", equipment: "Microcontroller & Sensor Interface Kits", facilityType: "Existing", purchaseDate: "18.08.2026", amount: 185000 }
        ],
        departmentLibrary: {
          booksPurchased: 125,
          journalsPurchased: 15,
          totalBooks: 3250,
          totalJournals: 85,
          facultyVisitsPerDay: 8,
          studentVisitsPerDay: 45
        }
      };
    }
    if (!data.attributeX) {
      data.attributeX = {
        csrExtension: [
          { activityName: "Green Campus Tree Plantation & Environmental Awareness", type: "Industry", agency: "ABC Industries Pvt. Ltd.", isCsr: "YES", beneficiaries: 240, amount: 75000 },
          { activityName: "Plastic Waste Segregation & E-Waste Recycling Drive", type: "NGO", agency: "Tiruchirappalli Green Foundation", isCsr: "NO", beneficiaries: 180, amount: 35000 }
        ],
        greenInitiatives: {
          paperlessCIA: "100% paperless internal assessments via Moodle LMS",
          solarEnergyUsage: "Solar rooftop array powering 35% of departmental lab load",
          plasticFreeCampus: "Single-use plastic banned across department blocks",
          rainWaterHarvesting: "Operational rainwater harvesting sumps and recharge points"
        }
      };
    }
    if (!data.qualitativePresentation) data.qualitativePresentation = {};
    if (!data.qualitativePresentation.statusOfActivities) {
      const oldAtr = data.qualitativePresentation.statusAAA2025_2026 || [];
      data.qualitativePresentation.statusOfActivities = {
        basedOnAAA2025_2026: oldAtr.length > 0 ? oldAtr.map(atr => ({
          eventActivity: atr.recommendation || '',
          monthYear: 'July 2026',
          status: atr.status === 'In Progress' ? 'Not Completed' : 'Completed',
          remarks: atr.evidence || ''
        })) : [
          { eventActivity: "Enhance Scopus/WoS publication output per faculty member", monthYear: "July 2026", status: "Completed", remarks: "Publications increased in Scopus and WoS" },
          { eventActivity: "Establish active student chapters of international professional societies", monthYear: "September 2026", status: "Completed", remarks: "Inaugurated ACM & CSI branches" },
          { eventActivity: "File for IPR and patents from PG student projects", monthYear: "October 2026", status: "Completed", remarks: "Patents and copyrights registered" }
        ],
        basedOnFacultyOrientation2026: [
          { eventActivity: "Implement Four-Quadrant E-Content Creation (SWAYAM model)", monthYear: "August 2026", status: "Completed", remarks: "6 complete CC-BY e-content packages uploaded" },
          { eventActivity: "Launch Outcome-Based Remedial Coaching for Slow Learners", monthYear: "July 2026", status: "Completed", remarks: "Conducted 30-hour peer-assisted learning clinics" },
          { eventActivity: "Mandatory MOOC registration for final year UG and PG students", monthYear: "September 2026", status: "Completed", remarks: "Final year students registered in Cycle I" }
        ]
      };
    }
    return data;
  }

  getDepartmentList() {
    try {
      const list = localStorage.getItem(DEPT_LIST_KEY);
      return list ? JSON.parse(list) : [];
    } catch (e) {
      return [];
    }
  }

  saveDepartmentList(list) {
    localStorage.setItem(DEPT_LIST_KEY, JSON.stringify(list));
  }

  getDepartmentSubmissionStatus(deptName) {
    const name = deptName || this.activeDepartment || 'Default';
    const key = 'IQAC_AAA_STATUS_' + name;
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      status: 'draft',
      is_locked: false,
      last_updated: new Date().toISOString()
    };
  }

  setDepartmentSubmissionStatus(deptName, statusObj) {
    const name = deptName || this.activeDepartment || 'Default';
    const key = 'IQAC_AAA_STATUS_' + name;
    const current = this.getDepartmentSubmissionStatus(name);
    const updated = { ...current, ...statusObj, last_updated: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(updated));
    this.notify();
    return updated;
  }

  isDepartmentLocked(deptName) {
    const status = this.getDepartmentSubmissionStatus(deptName || this.activeDepartment);
    return Boolean(status.is_locked);
  }

  switchDepartment(deptName) {
    // Save current before switching
    if (this.data && this.activeDepartment) {
      this.saveCurrentData();
    }

    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + deptName);
    if (stored) {
      try {
        this.data = this.ensureSchema(JSON.parse(stored));
        this.activeDepartment = deptName;
        localStorage.setItem(ACTIVE_DEPT_KEY, deptName);
        this.notify();
        return;
      } catch (e) {
        console.error('Error switching department', e);
      }
    }

    // Create new blank if not found
    this.data = this.ensureSchema(this.createDefaultData(deptName));
    this.activeDepartment = deptName;
    localStorage.setItem(ACTIVE_DEPT_KEY, deptName);
    this.saveCurrentData();
    this.notify();
  }

  saveCurrentData() {
    if (!this.data || !this.data.departmentInfo) return;
    const name = this.data.departmentInfo.departmentName || 'Untitled Department';
    this.activeDepartment = name;
    localStorage.setItem(STORAGE_KEY_PREFIX + name, JSON.stringify(this.data));
    localStorage.setItem(ACTIVE_DEPT_KEY, name);

    // ensure in dept list
    let list = this.getDepartmentList();
    if (!list.includes(name)) {
      list.push(name);
      this.saveDepartmentList(list);
    }
  }

  updateData(newData) {
    this.data = newData;
    this.saveCurrentData();
    this.notify();
  }

  async loadSample(sampleType = 'cs') {
    if (sampleType === 'commerce' && window.COMMERCE_SAMPLE_DATA) {
      this.data = JSON.parse(JSON.stringify(window.COMMERCE_SAMPLE_DATA));
      this.activeDepartment = this.data.departmentInfo.departmentName;
      this.saveCurrentData();
      this.notify();
      return true;
    } else if (window.CS_SAMPLE_DATA) {
      this.data = JSON.parse(JSON.stringify(window.CS_SAMPLE_DATA));
      this.activeDepartment = this.data.departmentInfo.departmentName;
      this.saveCurrentData();
      this.notify();
      return true;
    }

    const filename = sampleType === 'commerce' ? 'sample-data/commerce_sample.json' : 'sample-data/cs_sample.json';
    try {
      const resp = await fetch(filename);
      if (resp.ok) {
        this.data = await resp.json();
        this.activeDepartment = this.data.departmentInfo.departmentName;
        this.saveCurrentData();
        this.notify();
        return true;
      }
    } catch (e) {
      console.error('Error loading sample data:', e);
    }
    return false;
  }

  async loadBlankTemplate() {
    if (window.BLANK_TEMPLATE_DATA) {
      this.data = JSON.parse(JSON.stringify(window.BLANK_TEMPLATE_DATA));
      this.activeDepartment = this.data.departmentInfo.departmentName;
      this.saveCurrentData();
      this.notify();
      return true;
    }

    try {
      const resp = await fetch('sample-data/blank_template.json');
      if (resp.ok) {
        this.data = await resp.json();
        this.activeDepartment = this.data.departmentInfo.departmentName;
        this.saveCurrentData();
        this.notify();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    this.data = this.createDefaultData('New Department');
    this.activeDepartment = 'New Department';
    this.saveCurrentData();
    this.notify();
    return true;
  }

  exportJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const filename = `IQAC_AAA_2026_27_${(this.data.departmentInfo.departmentName || 'Department').replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.departmentInfo) {
        throw new Error('Invalid format: departmentInfo is missing');
      }
      this.data = parsed;
      this.activeDepartment = parsed.departmentInfo.departmentName;
      this.saveCurrentData();
      this.notify();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  createDefaultData(deptName = 'Department of Computer Science') {
    return {
      departmentInfo: {
        collegeName: "St. Joseph's College (Autonomous)",
        accreditation: "Special Heritage Status, NIRF Ranked, NAAC A++ Accredited",
        academicYear: "2026 - 2027",
        departmentName: deptName,
        school: "School of Computing Sciences",
        hodName: "Head of the Department",
        auditDate: new Date().toISOString().split('T')[0],
        facultyCount: 15,
        studentCountUG: 300,
        studentCountPG: 80,
        researchScholarsCount: 12,
        scholars: {
          fullTime: { male: 5, female: 4 },
          partTime: { male: 2, female: 1 }
        }
      },
      attributeI: {
        vac: [{ name: "Advanced Web Technologies", count: 1, studentsEnrolled: 60, feeCollected: 30000, agenciesInvolved: "Industry Partner" }],
        cc: [{ name: "Applied Data Analytics", count: 1, studentsEnrolled: 45, feeCollected: 22500, agenciesInvolved: "Professional Body" }],
        iks: { seminarCount: 1, workshopCount: 1, fieldVisitCount: 1, studentsBenefitted: 120, details: "Vedic mathematics and traditional knowledge systems workshop." },
        visits: { industrial: 1, educational: 1, fieldWork: 1, fieldVisit: 1, studentsParticipated: 150, classSec: "III UG & II PG", details: "Industrial visit to IT tech park and research facility." },
        internships: { studentsInvolved: 80, details: "Internships across premier software and corporate institutions." },
        ptm: { numberOfPTMs: 2, parentsParticipated: 240, details: "Conducted semester-wise parent-teacher meetings for UG & PG with academic progress review." },
        moocs: {
          ug: { totalStudents: 300, cycle1_registered: 180, cycle2_registered: 160, cycle1_completed: 165, cycle2_completed: 145 },
          pg: { totalStudents: 80, cycle1_registered: 75, cycle2_registered: 70, cycle1_completed: 72, cycle2_completed: 68 }
        }
      },
      attributeII: {
        newDegrees: { count: 1, details: "Faculty awarded Ph.D." },
        netSetJrf: { count: 4, details: "Faculty cleared NET/SET/JRF." },
        recognizedBodies: { bosCount: 5, externalAuditCount: 2, details: "BoS members at universities and autonomous colleges." },
        researchJournals: { reviewersCount: 6, editorsCount: 2, details: "Reviewers and editors in Scopus/WoS indexed journals." },
        professionalBodies: { count: 15, details: "Memberships in CSI, IEEE, ACM." },
        resourcePerson: { international: 2, national: 8, state: 5, regional: 6, institutional: 10, servedFacultyNames: "Faculty invited as keynote speakers." },
        fdp: { mmttc_aicte_ugc: 10, otherInstitutions: 12, throughFdc: 8, institutionalLevel: 15, details: "FDPs attended on AI, pedagogical reforms, NEP 2020." },
        industrialTraining: { count: 2, details: "Faculty industry immersion programs." },
        socialSectorProjects: { count: 2, details: "Community extension projects." },
        fellowships: { national: 1, international: 0, details: "National research fellowships." },
        awards: { count: 4, details: "Best teacher and researcher awards." },
        facultyMooc: { registered: 12, completed: 10, details: "NPTEL/Coursera certifications." },
        abroadVisits: { count: 1, facultyNames: "Academic conference presentations abroad." }
      },
      attributeIV_VII: {
        externalFunds: [
          { category: "Conduct of FDP/Conference/Seminar", agency: "AICTE/SERB", amount: 200000, facultyInvolved: "Senior Faculty Team" },
          { category: "Research Projects", agency: "DST/UGC", amount: 800000, facultyInvolved: "Principal Investigator" }
        ],
        managementFunds: [
          { category: "Conduct of FDP/Conference/Seminar", amount: 80000, facultyInvolved: "Department Association" },
          { category: "Projects", amount: 150000, facultyInvolved: "Faculty Seed Grant" },
          { category: "Attending Conference/Workshop/Seminar", amount: 100000, facultyInvolved: "Faculty Participants" }
        ],
        seedMoney: { projectsAmount: 120000, patentsAmount: 50000, copyrightAmount: 30000, totalSanctioned: 200000, details: "College seed grants for research and IPR filing." },
        endowments: { count: 1, details: "Endowment instituted for academic excellence." }
      },
      attributeV: {
        mouCreated: { count: 2, activitiesConducted: "MoUs signed for training and internships." },
        previousMous: { count: 4, activitiesConducted: "Active linkages for technical lectures and guest talks." },
        linkages: { count: 5, activitiesConducted: "Industry linkages for student capstone projects." },
        eContent: { count: 10, details: "4-Quadrant e-content modules created on LMS." }
      },
      attributeVI_VIII: {
        clubs: [{ clubName: "Department Association Club", studentsUG: 180, studentsPG: 60, activities: "Workshops, coding competitions, technical symposium." }],
        pursuingOtherDegrees: { count: 25, details: "Students enrolled in add-on diploma and dual certifications." },
        studentChapters: { count: 1, details: "Active student chapter of professional society." },
        competitiveExams: { appeared: 40, qualified: 12, details: "GATE, NET, Banking, Civil Services." },
        studentParticipationAwards: { sports: 10, cultural: 18, externalAcademicEvents: 35, extraCurricularEvents: 20, coCurricularEvents: 45, details: "Prizes in state and university events." }
      },
      attributeIX: {
        phdConferred: { count: 3, details: "Ph.D. degrees conferred." },
        newGuides: { count: 2, details: "Recognized Ph.D. research supervisors." },
        newScholars: { count: 4, details: "New scholars enrolled." },
        papersPublished: { scopus: 18, wos: 10, ugcCare: 8, details: "Publications in peer-reviewed journals." },
        conferencesPresented: { indexed: 15, nonIndexed: 4, details: "Conference papers presented." },
        books: { published: 2, edited: 1, chaptersContributed: 5, details: "Books and chapters authored." },
        patents: { applied: 3, granted: 1, details: "Patents filed and granted." },
        copyrights: { count: 3, details: "Software copyrights registered." },
        oer: { count: 4, details: "Open Educational Resources produced." }
      },
      studentsOutcomes2026: {
        ug: { strength: 120, onCampus: 68, offCampus: 18, higherStudies: 22, entrepreneur: 5, others: 7 },
        pg: { strength: 58, onCampus: 36, offCampus: 10, higherStudies: 6, entrepreneur: 3, others: 3 },
        phd: { strength: 6, onCampus: 0, offCampus: 4, higherStudies: 1, entrepreneur: 1, others: 0 }
      },
      qualitativePresentation: {
        signatureAchievements: [
          { title: "Significant Research Grants Mobilized", impact: "Upgraded advanced departmental research laboratory." },
          { title: "Patents and IPR Registered", impact: "Strengthened innovation culture among faculty and scholars." },
          { title: "High Placement Conversion Rate", impact: "Over 80% eligible students placed in top organizations." }
        ],
        uniqueness: "Holistic student formation blending rigorous academic standards with industry-focused practical exposure and Jesuit values.",
        statusOfActivities: {
          basedOnAAA2025_2026: [
            { eventActivity: "Increase publication count in indexed journals", monthYear: "July 2026", status: "Completed", remarks: "Indexed publications grew by 40%." },
            { eventActivity: "Strengthen industry MoUs and student internships", monthYear: "September 2026", status: "Completed", remarks: "Signed 2 new industry MoUs and placed 80+ interns." }
          ],
          basedOnFacultyOrientation2026: [
            { eventActivity: "Implement Four-Quadrant E-Content Creation", monthYear: "August 2026", status: "Completed", remarks: "E-content modules uploaded on institutional LMS." },
            { eventActivity: "Mandatory MOOC enrollment for outgoing batch", monthYear: "September 2026", status: "Completed", remarks: "Cycle I enrollment achieved 90%+." }
          ]
        },
        statusAAA2025_2026: [
          { recommendation: "Increase publication count in indexed journals", status: "Fully Completed", evidence: "Indexed publications grew by 40%." },
          { recommendation: "Strengthen industry MoUs and student internships", status: "Fully Completed", evidence: "Signed 2 new industry MoUs and placed 80+ interns." }
        ],
        bestPractices: [
          {
            title: "Industry Mentored Capstone Projects",
            objectives: "To provide real-world problem-solving experience under corporate guidance.",
            context: "Bridging the gap between theory and industry implementation.",
            practice: "Pairing final year student groups with industry mentors with continuous milestone tracking.",
            evidence: "High internship conversion and quality project demonstrations.",
            resourcesRequired: "Corporate network, mentorship coordination cell."
          }
        ],
        swoc: {
          strengths: ["Dedicated faculty with high research credentials", "Up-to-date curriculum aligned with emerging trends", "Strong student mentoring and support system"],
          weaknesses: ["Revenue from consultancy needs expansion", "Need for higher international academic collaborations"],
          opportunities: ["Emerging technological avenues for interdisciplinary research", "Industry funded labs and skill incubators"],
          challenges: ["Fast-paced curriculum obsolescence", "Balancing academic rigor with diverse student entry levels"]
        },
        futurePlans: {
          shortTerm: ["Establish Center of Excellence in emerging field", "Attain 100% faculty Ph.D. qualification"],
          longTerm: ["Launch international collaborative program", "Establish student startup innovation pod"]
        },
        pillars: {
          ptm: { meetingsConducted: 2, dates: "Semester I & II PTM dates", parentAttendancePercentage: 85, keyFeedback: "Positive feedback on mentoring and academic progress.", actionTaken: "Enhanced aptitude training and communication skill modules." },
          feedback: { studentRating: 4.6, parentRating: 4.5, alumniRating: 4.7, employerRating: 4.6, actionTakenReport: "Curricular updates incorporated based on stakeholder recommendations." },
          teachingLearning: { innovations: "Flipped classrooms, LMS interactive quizzes, blended learning modules.", ictToolsUsed: "Moodle LMS, Google Suite, Virtual Labs." },
          assessmentProcess: { reforms: "Bloom's Taxonomy mapped question design, transparent evaluation rubrics, continuous CIA feedback." },
          remedialTeaching: { strategy: "Early diagnostic tests, peer-assisted study groups, bilingual coaching sessions.", impact: "Significant improvement in end-semester pass rates." },
          studentSupport: { mentoringRatio: "1:20", supportMeasures: "Structured mentoring, counseling support, scholarship distribution." },
          guidanceCompExam: { initiatives: "Specialized coaching for GATE, NET, and competitive public service exams." },
          sustainability: { initiatives: "Paperless assessments, energy conservation protocols, e-waste recycling." }
        }
      },
      panelReview: {
        expertName: "External Expert, Academic Reviewer",
        deanName: "School Dean",
        iqacCoordinator: "IQAC Coordinator",
        administratorName: "Principal / Administrator",
        scores: { curriculum: 5, faculty: 4, resources: 4, learningTeaching: 5, extendedCurricular: 4, research: 5, presentationQuality: 5, complianceAAA: 5 },
        overallGrade: "A+",
        commendations: "Strong research progress, commendable student support practices, and impactful curriculum.",
        recommendations: "Scale up consultancy projects and expand international academic tie-ups."
      }
    };
  }

  // --- Meeting Agenda & Question Selection Management ---
  getAllAttributesMetadata() {
    return [
      {
        id: 't1_scholars',
        code: 'T1',
        name: 'Table 1: Research Scholars Matrix',
        category: 'Research',
        questions: [
          { id: 't1_fulltime', code: '1.A', label: 'Full-Time Research Scholars (M/F)', default: true },
          { id: 't1_parttime', code: '1.B', label: 'Part-Time Research Scholars (M/F)', default: true }
        ]
      },
      {
        id: 't2_activities',
        code: 'T2',
        name: 'Table 2: Status of Activities Completed (ATR & FOP 2026)',
        category: 'Governance',
        questions: [
          { id: 't2_aaa_atr', code: '2.A', label: 'Status based on AAA 2025–2026 ATR', default: true },
          { id: 't2_fop_2026', code: '2.B', label: 'Status based on Faculty Orientation June 2026', default: true }
        ]
      },
      {
        id: 'att1',
        code: 'Attr I',
        name: 'Attribute I: Curriculum Design & MOOC Progression',
        category: 'Curriculum',
        questions: [
          { id: 'att1_vac', code: '1.2a', label: 'Value-Added Courses (VAC)', default: true },
          { id: 'att1_cc', code: '1.2b', label: 'Certificate Courses (CC)', default: true },
          { id: 'att1_iks', code: '1.3', label: 'Indian Knowledge Systems (IKS)', default: true },
          { id: 'att1_visits', code: '1.4', label: 'Industrial, Educational & Field Visits', default: true },
          { id: 'att1_internships', code: '1.5', label: 'Corporate & Field Internships', default: true },
          { id: 'att1_moocs', code: '1.8', label: 'SWAYAM / NPTEL MOOC Progression (UG/PG)', default: true },
          { id: 'att1_ptm', code: '1.10', label: 'Parent Teacher Meetings (PTM)', default: true }
        ]
      },
      {
        id: 'att2',
        code: 'Attr II',
        name: 'Attribute II: Faculty Resources & Development',
        category: 'Faculty',
        questions: [
          { id: 'att2_degrees', code: '2.2', label: 'New Degrees Conferred (Ph.D./PDF)', default: true },
          { id: 'att2_netset', code: '2.10', label: 'NET / SET / JRF Qualified Faculty', default: true },
          { id: 'att2_bodies', code: '2.3', label: 'Memberships in Recognised Bodies & Audits', default: true },
          { id: 'att2_journals', code: '2.4', label: 'Journal Editors & Reviewers (Scopus/WoS)', default: true },
          { id: 'att2_prof_bodies', code: '2.5', label: 'Professional Body Memberships', default: true },
          { id: 'att2_resource', code: '2.6', label: 'Resource Person / Keynote Invites', default: true },
          { id: 'att2_fdp', code: '2.7', label: 'FDPs & Orientation Courses', default: true },
          { id: 'att2_industry', code: '2.9', label: 'Industrial Training & Fellowships', default: true },
          { id: 'att2_abroad', code: '2.13', label: 'Faculty Abroad Academic Visits', default: true }
        ]
      },
      {
        id: 'att3',
        code: 'Attr III',
        name: 'Attribute III: Infrastructure & Learning Resources',
        category: 'Infrastructure',
        questions: [
          { id: 'att3_facility', code: '3.1', label: 'Research Facility & Lab Equipment Purchased', default: true },
          { id: 'att3_library', code: '3.2', label: 'Department Library (Volumes & Daily Visits)', default: true }
        ]
      },
      {
        id: 'att4_7',
        code: 'Attr IV & VII',
        name: 'Attribute IV & VII: Research Grants, Seed Money & Endowments',
        category: 'Grants',
        questions: [
          { id: 'att4_external', code: '4.3', label: 'External Agency Research & Conference Grants', default: true },
          { id: 'att7_mgmt', code: '7.1', label: 'Management Research & Conference Support', default: true },
          { id: 'att7_seed', code: '7.2', label: 'Seed Money for Projects, Patents & Copyrights', default: true },
          { id: 'att4_endowments', code: '4.4', label: 'Endowments Established & Memorial Lectures', default: true }
        ]
      },
      {
        id: 'att5',
        code: 'Attr V',
        name: 'Attribute V: Learning, Teaching & Evaluation (MoUs & E-Content)',
        category: 'Teaching',
        questions: [
          { id: 'att5_mou', code: '5.5a', label: 'New MoUs Signed in 2026–27', default: true },
          { id: 'att5_prev_mou', code: '5.5b', label: 'Previous Active Industry MoUs', default: true },
          { id: 'att5_linkages', code: '5.5c', label: 'Academic & Research Linkages', default: true },
          { id: 'att5_econtent', code: '5.6', label: 'Four-Quadrant E-Contents (LMS/MOOC)', default: true }
        ]
      },
      {
        id: 'att6_8',
        code: 'Attr VI & VIII',
        name: 'Attribute VI & VIII: Extended Curricular, Clubs & Awards',
        category: 'Student Activities',
        questions: [
          { id: 'att6_clubs', code: '6.4', label: 'Departmental Clubs & Student Chapters', default: true },
          { id: 'att6_exams', code: '6.2', label: 'Competitive Examinations (GATE, NET, UPSC)', default: true },
          { id: 'att8_awards', code: '8.2', label: 'Student Prizes & Championship Trophies', default: true }
        ]
      },
      {
        id: 't10_outcomes',
        code: 'T10',
        name: 'Table 10: Students Outcomes – 2026 Passed Out',
        category: 'Outcomes',
        questions: [
          { id: 't10_ug', code: '10.A', label: 'UG Placements, Higher Studies & Entrepreneurs', default: true },
          { id: 't10_pg', code: '10.B', label: 'PG Placements, Higher Studies & Entrepreneurs', default: true },
          { id: 't10_phd', code: '10.C', label: 'Ph.D. Placements & Career Progression', default: true }
        ]
      },
      {
        id: 'att9',
        code: 'Attr IX',
        name: 'Attribute IX: Research, Innovations & Intellectual Property',
        category: 'Research',
        questions: [
          { id: 'att9_phd', code: '9.1', label: 'Ph.D. Conferred, Guides & Enrolment', default: true },
          { id: 'att9_papers', code: '9.8', label: 'Journal Papers (Scopus, WoS, UGC-CARE)', default: true },
          { id: 'att9_conferences', code: '9.9', label: 'Conference Papers Presented', default: true },
          { id: 'att9_books', code: '9.10', label: 'Books Authored & Chapters Contributed', default: true },
          { id: 'att9_patents', code: '9.11a', label: 'Indian Patents (Granted & Applied)', default: true },
          { id: 'att9_copyrights', code: '9.11b', label: 'Software Copyrights Registered', default: true },
          { id: 'att9_oer', code: '9.11c', label: 'Open Educational Resources (OER)', default: true }
        ]
      },
      {
        id: 'att10',
        code: 'Attr X',
        name: 'Attribute X: Institutional Values, Green Initiatives & CSR',
        category: 'Values & CSR',
        questions: [
          { id: 'att10_csr', code: '10.1', label: 'CSR Collaborations & Extension Outreach', default: true },
          { id: 'att10_green', code: '10.2', label: 'Sustainability & Green Campus Practices', default: true }
        ]
      }
    ];
  }

  getMeetingAgendaConfig() {
    try {
      const stored = localStorage.getItem('IQAC_AAA_MEETING_AGENDA_CONFIG');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading agenda config:', e);
    }
    return this.getDefaultAgendaConfig();
  }

  getDefaultAgendaConfig() {
    const config = {
      preset: 'all',
      enabledAttributes: {},
      enabledQuestions: {}
    };
    this.getAllAttributesMetadata().forEach(attr => {
      config.enabledAttributes[attr.id] = true;
      attr.questions.forEach(q => {
        config.enabledQuestions[q.id] = true;
      });
    });
    return config;
  }

  saveMeetingAgendaConfig(config) {
    localStorage.setItem('IQAC_AAA_MEETING_AGENDA_CONFIG', JSON.stringify(config));
    this.notify();
  }

  isAttributeEnabled(attrId) {
    if (!attrId) return true;
    const config = this.getMeetingAgendaConfig();
    if (!config || !config.enabledAttributes) return true;
    if (config.enabledAttributes[attrId] !== undefined) {
      return config.enabledAttributes[attrId] !== false;
    }
    const alt = attrId.startsWith('attr') ? attrId.replace('attr', 'att') : (attrId.startsWith('att') ? attrId.replace('att', 'attr') : attrId);
    if (config.enabledAttributes[alt] !== undefined) {
      return config.enabledAttributes[alt] !== false;
    }
    return true;
  }

  isQuestionEnabled(questionId) {
    const config = this.getMeetingAgendaConfig();
    return config.enabledQuestions ? config.enabledQuestions[questionId] !== false : true;
  }

  getAgendaStats() {
    const config = this.getMeetingAgendaConfig();
    const all = this.getAllAttributesMetadata();
    const totalAttrs = all.length;
    let activeAttrs = 0;
    let totalQuestions = 0;
    let activeQuestions = 0;

    all.forEach(attr => {
      const attrActive = config.enabledAttributes ? config.enabledAttributes[attr.id] !== false : true;
      if (attrActive) activeAttrs++;
      attr.questions.forEach(q => {
        totalQuestions++;
        const qActive = config.enabledQuestions ? config.enabledQuestions[q.id] !== false : true;
        if (attrActive && qActive) {
          activeQuestions++;
        }
      });
    });

    return {
      totalAttributes: totalAttrs,
      activeAttributes: activeAttrs,
      totalQuestions: totalQuestions,
      activeQuestions: activeQuestions,
      isFiltered: activeAttrs < totalAttrs || activeQuestions < totalQuestions,
      preset: config.preset || 'custom'
    };
  }

  applyAgendaPreset(presetKey) {
    const all = this.getAllAttributesMetadata();
    const config = {
      preset: presetKey,
      enabledAttributes: {},
      enabledQuestions: {}
    };

    const enableAllInAttr = (attrId) => {
      config.enabledAttributes[attrId] = true;
      const attr = all.find(a => a.id === attrId);
      if (attr) {
        attr.questions.forEach(q => { config.enabledQuestions[q.id] = true; });
      }
    };

    const disableAllInAttr = (attrId) => {
      config.enabledAttributes[attrId] = false;
      const attr = all.find(a => a.id === attrId);
      if (attr) {
        attr.questions.forEach(q => { config.enabledQuestions[q.id] = false; });
      }
    };

    if (presetKey === 'all') {
      const full = this.getDefaultAgendaConfig();
      this.saveMeetingAgendaConfig(full);
      return full;
    }

    // Default everything to disabled first
    all.forEach(a => disableAllInAttr(a.id));

    if (presetKey === 'executive_15m') {
      ['t1_scholars', 't2_activities', 'att1', 'att2', 'att4_7', 'att5', 't10_outcomes', 'att9'].forEach(enableAllInAttr);
    } else if (presetKey === 'research_ipr') {
      ['t1_scholars', 'att3', 'att4_7', 'att9'].forEach(enableAllInAttr);
    } else if (presetKey === 'curriculum_teaching') {
      ['att1', 'att2', 'att5'].forEach(enableAllInAttr);
    } else if (presetKey === 'student_progression') {
      ['att4_7', 'att6_8', 't10_outcomes', 'att10'].forEach(enableAllInAttr);
    } else if (presetKey === 'governance_atr') {
      ['t2_activities', 'att1', 'att5', 'att10'].forEach(enableAllInAttr);
    }

    this.saveMeetingAgendaConfig(config);
    return config;
  }
}

// Global singleton instance
window.dataStore = new DataStore();
