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
        this.data = JSON.parse(stored);
        this.activeDepartment = activeDeptName;
        this.notify();
        return;
      } catch (e) {
        console.warn('Could not parse stored data, loading default', e);
      }
    }

    // First check embedded sample data (guarantees 100% offline file:// support with zero CORS issues)
    if (window.CS_SAMPLE_DATA) {
      this.data = JSON.parse(JSON.stringify(window.CS_SAMPLE_DATA));
      this.activeDepartment = this.data.departmentInfo.departmentName;
      this.saveCurrentData();
      this.notify();
      return;
    }

    // Fallback: Try fetching cs_sample.json if embedded data is not available
    try {
      const resp = await fetch('sample-data/cs_sample.json');
      if (resp.ok) {
        this.data = await resp.json();
        this.activeDepartment = this.data.departmentInfo.departmentName;
        this.saveCurrentData();
        this.notify();
        return;
      }
    } catch (e) {
      console.warn('Fetch sample error (running on file:// or network restriction):', e);
    }

    // Fallback inline template if fetch fails
    this.data = this.createDefaultData('PG & Research Department of Computer Science');
    this.activeDepartment = this.data.departmentInfo.departmentName;
    this.saveCurrentData();
    this.notify();
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

  switchDepartment(deptName) {
    // Save current before switching
    if (this.data && this.activeDepartment) {
      this.saveCurrentData();
    }

    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + deptName);
    if (stored) {
      try {
        this.data = JSON.parse(stored);
        this.activeDepartment = deptName;
        localStorage.setItem(ACTIVE_DEPT_KEY, deptName);
        this.notify();
        return;
      } catch (e) {
        console.error('Error switching department', e);
      }
    }

    // Create new blank if not found
    this.data = this.createDefaultData(deptName);
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
        researchScholarsCount: 12
      },
      attributeI: {
        vac: [{ name: "Advanced Web Technologies", count: 1, studentsEnrolled: 60, feeCollected: 30000, agenciesInvolved: "Industry Partner" }],
        cc: [{ name: "Applied Data Analytics", count: 1, studentsEnrolled: 45, feeCollected: 22500, agenciesInvolved: "Professional Body" }],
        iks: { seminarCount: 1, workshopCount: 1, fieldVisitCount: 1, studentsBenefitted: 120, details: "Vedic mathematics and traditional knowledge systems workshop." },
        visits: { industrial: 1, educational: 1, fieldWork: 1, fieldVisit: 1, studentsParticipated: 150, classSec: "III UG & II PG", details: "Industrial visit to IT tech park and research facility." },
        internships: { studentsInvolved: 80, details: "Internships across premier software and corporate institutions." },
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
      qualitativePresentation: {
        signatureAchievements: [
          { title: "Significant Research Grants Mobilized", impact: "Upgraded advanced departmental research laboratory." },
          { title: "Patents and IPR Registered", impact: "Strengthened innovation culture among faculty and scholars." },
          { title: "High Placement Conversion Rate", impact: "Over 80% eligible students placed in top organizations." }
        ],
        uniqueness: "Holistic student formation blending rigorous academic standards with industry-focused practical exposure and Jesuit values.",
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
}

// Global singleton instance
window.dataStore = new DataStore();
