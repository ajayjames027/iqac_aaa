// IQAC AAA February 2027 - Complete Master Questionnaire Schema for All Attributes (PART-A and Attributes 1 to 10)
// Extracted 1:1 from Templates_AAA_2026-2027 Excel files

window.ALL_ATTRIBUTES_CARDS_SCHEMA = [
  {
    "id": "part_a",
    "cardNumber": 0,
    "cardTitle": "PART A - Profile of the Department",
    "cardCode": "PART-A",
    "cardSubtitle": "Mandatory Institutional Profile: Programmes Offered, Head/Coordinator, Faculty Cadres & Student Details",
    "icon": "building",
    "color": "blue",
    "sheets": [
      {
        "key": "PART-A",
        "sheetName": "PART-A",
        "title": "PART A - PROFILE OF THE DEPARTMENT",
        "subtitle": "(Presenting Data on all the questions in Part A is mandatory)",
        "type": "profile",
        "profileQuestions": {
          "department": "PG & Research Department of Computer Science",
          "shift": "Shift I & Shift II",
          "programmes": {
            "ug": "B.Sc. Computer Science",
            "pg": "M.Sc. Computer Science, MCA",
            "phd": "Ph.D. Computer Science"
          },
          "hodName": "Dr. S. Albert Rabara"
        },
        "facultyDetails": {
          "headers": [
            "Faculty Category / Cadre",
            "Male",
            "Female"
          ],
          "rows": [
            {
              "label": "Total No. of Teaching Faculty",
              "male": 18,
              "female": 12
            },
            {
              "label": "No. of Faculty (Aided)",
              "male": 8,
              "female": 4
            },
            {
              "label": "No. of Faculty (Coordinator-Appointed)",
              "male": 4,
              "female": 3
            },
            {
              "label": "No. of Faculty (Secretary-Appointed)",
              "male": 5,
              "female": 4
            },
            {
              "label": "No. of Professor of Practice",
              "male": 1,
              "female": 0
            },
            {
              "label": "No. of Faculty (Hourly Basis)",
              "male": 0,
              "female": 1
            },
            {
              "label": "No. of Faculty from Other States",
              "male": 1,
              "female": 1
            },
            {
              "label": "No. of Faculty Graduating from Other States",
              "male": 2,
              "female": 1
            },
            {
              "label": "No. of Academic Support Staff (Technical) and Non-teaching Staff",
              "male": 4,
              "female": 2
            }
          ]
        },
        "studentDetails": {
          "headers": [
            "Programme Level",
            "Male",
            "Female",
            "Other Gender",
            "Other States",
            "Other Countries"
          ],
          "rows": [
            {
              "programme": "UG",
              "male": 160,
              "female": 120,
              "otherGender": 0,
              "otherStates": 4,
              "otherCountries": 2
            },
            {
              "programme": "PG",
              "male": 55,
              "female": 45,
              "otherGender": 0,
              "otherStates": 2,
              "otherCountries": 1
            },
            {
              "programme": "PhD",
              "male": 14,
              "female": 10,
              "otherGender": 0,
              "otherStates": 1,
              "otherCountries": 0
            }
          ]
        }
      }
    ]
  },
  {
    "id": "att1",
    "cardNumber": 1,
    "cardTitle": "Attribute I - Curriculum Design",
    "cardCode": "Attribute 1",
    "cardSubtitle": "Value-Added & Certificate Courses, IKS, Internships, Projects, MOOCs, PTM & Stakeholder Feedback (1.1 - 1.11)",
    "icon": "book-open",
    "color": "indigo",
    "sheets": [
      {
        "key": "1.1",
        "sheetName": "1.1",
        "title": "1.1 Courses offered by the Department during the year 2026-27",
        "badge": "Part B - Attribute I: Curriculum Design",
        "instruction": "Mention all the Courses offered by the Department during the year 2026-2027",
        "note": "No need to fill this Data for this Academic Year",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No.",
            "width": "w-14"
          },
          {
            "key": "programmeName",
            "label": "Programme Name (Commerce CA, History, etc.,)",
            "width": "w-48"
          },
          {
            "key": "level",
            "label": "PG / UG (MSc, BA, BSc, BCom, etc.,)",
            "width": "w-36"
          },
          {
            "key": "courseCode",
            "label": "Course Code",
            "width": "w-32"
          },
          {
            "key": "courseTitle",
            "label": "Title of the Course",
            "width": "w-64"
          },
          {
            "key": "newSyllabus",
            "label": "Mention YES if it is introduced in the new syllabus",
            "width": "w-36"
          },
          {
            "key": "revisionPct",
            "label": "Percentage (%) of the revision",
            "width": "w-28"
          },
          {
            "key": "skillPractical",
            "label": "Skill / Practical Hands on Training (Mention Yes if applicable)",
            "width": "w-36"
          },
          {
            "key": "iksBased",
            "label": "IKS Based (Mention Yes if applicable)",
            "width": "w-28"
          },
          {
            "key": "nsqfAligned",
            "label": "Aligned with NSQF / NHEQF (Mention Yes if applicable)",
            "width": "w-32"
          },
          {
            "key": "fieldWorkVisit",
            "label": "Field Work/Field Visit/Industrial Visit (Mention Yes if applicable)",
            "width": "w-36"
          },
          {
            "key": "internship",
            "label": "Internship (Mention Yes if applicable)",
            "width": "w-28"
          },
          {
            "key": "project",
            "label": "Project (Mention Yes if applicable)",
            "width": "w-28"
          }
        ],
        "rows": []
      },
      {
        "key": "1.2",
        "sheetName": "1.2",
        "title": "1.2 Value-Added Courses & Certificate Courses",
        "badge": "Attribute I - Section 1.2",
        "type": "multi_table",
        "sections": [
          {
            "id": "1.2_a",
            "title": "1.2 (a) Value-Added Courses / Certificate Course Conducted by SJC",
            "columns": [
              {
                "key": "sno",
                "label": "S.No.",
                "width": "w-14"
              },
              {
                "key": "nature",
                "label": "Nature of the Course (VAC / CC)",
                "width": "w-28"
              },
              {
                "key": "collaboratingAgency",
                "label": "Collaborating institutions/Agency, Name and Address",
                "width": "w-64"
              },
              {
                "key": "courseCode",
                "label": "Course Code",
                "width": "w-28"
              },
              {
                "key": "courseTitle",
                "label": "Title of the Course",
                "width": "w-56"
              },
              {
                "key": "creditsAssigned",
                "label": "Credits Assigned (For Certificate Course)",
                "width": "w-28"
              },
              {
                "key": "coordinatorName",
                "label": "Name of the Course Coordinator",
                "width": "w-44"
              },
              {
                "key": "mode",
                "label": "Mode (Online / Offline / Blended)",
                "width": "w-32"
              },
              {
                "key": "iksBased",
                "label": "Course conducted based on IKS (Mention YES/NO)",
                "width": "w-32"
              },
              {
                "key": "focus",
                "label": "Focus (Mention SKILL, KNOWLEDGE, BOTH)",
                "width": "w-36"
              },
              {
                "key": "multidisciplinary",
                "label": "Multidisciplinary (Mention YES/NO)",
                "width": "w-32"
              },
              {
                "key": "durationHours",
                "label": "Duration of the Course (in hrs)",
                "width": "w-28"
              },
              {
                "key": "datesFromTo",
                "label": "Dates conducted From - To (DD.MM.YYYY)",
                "width": "w-40"
              },
              {
                "key": "industryCollab",
                "label": "Industry Collaboration (Mention YES/NO)",
                "width": "w-32"
              },
              {
                "key": "staffOrExperts",
                "label": "Staff Members / External Experts Handling the Course",
                "width": "w-72"
              },
              {
                "key": "enrolled",
                "label": "No. of Students Enrolled",
                "width": "w-28"
              },
              {
                "key": "completed",
                "label": "No. of Students Completing the Course",
                "width": "w-28"
              }
            ],
            "rows": [
              {
                "sno": "1",
                "nature": "VAC",
                "collaboratingAgency": "Not Applicable",
                "courseCode": "VAC-CS01",
                "courseTitle": "Digital Literacy and Productivity Tools",
                "creditsAssigned": "0",
                "coordinatorName": "Dr. A. Vimal Jerald",
                "mode": "Blended",
                "iksBased": "No",
                "focus": "Skill",
                "multidisciplinary": "Yes",
                "durationHours": "30",
                "datesFromTo": "01.07.2026 – 15.07.2026",
                "industryCollab": "No",
                "staffOrExperts": "Dr. A. Vimal Jerald, Assistant Professor, Department of Computer Science, St. Joseph’s College (Autonomous), Tiruchirappalli – 620002",
                "enrolled": "80",
                "completed": "75"
              },
              {
                "sno": "2",
                "nature": "CC",
                "collaboratingAgency": "Not Applicable",
                "courseCode": "CC-AI01",
                "courseTitle": "Artificial Intelligence and Generative AI",
                "creditsAssigned": "2",
                "coordinatorName": "Dr. R. Lenin",
                "mode": "Offline",
                "iksBased": "No",
                "focus": "Both",
                "multidisciplinary": "Yes",
                "durationHours": "40",
                "datesFromTo": "15.07.2026 – 30.07.2026",
                "industryCollab": "Yes",
                "staffOrExperts": "Dr. R. Lenin, Associate Professor, Department of Computer Science, St. Joseph’s College (Autonomous), Tiruchirappalli – 620002; Mr. Arun Kumar, Senior AI Engineer, ABC Technologies Pvt. Ltd., 25 Anna Salai, Chennai – 600002",
                "enrolled": "60",
                "completed": "55"
              },
              {
                "sno": "3",
                "nature": "CC",
                "collaboratingAgency": "ABC Technologies Pvt. Ltd., 25 Anna Salai, Chennai – 600002, Tamil Nadu",
                "courseCode": "CC-FS01",
                "courseTitle": "Full Stack Web Development",
                "creditsAssigned": "3",
                "coordinatorName": "Mr. G. Novin Senetra Roy",
                "mode": "Blended",
                "iksBased": "No",
                "focus": "Skill",
                "multidisciplinary": "Yes",
                "durationHours": "60",
                "datesFromTo": "01.08.2026 – 20.08.2026",
                "industryCollab": "Yes",
                "staffOrExperts": "Mr. G. Novin Senetra Roy, Assistant Professor, Department of Computer Science, St. Joseph’s College (Autonomous); Ms. Priya Joseph, Senior Software Developer, ABC Technologies Pvt. Ltd.",
                "enrolled": "50",
                "completed": "45"
              },
              {
                "sno": "4",
                "nature": "VAC",
                "collaboratingAgency": "Not Applicable",
                "courseCode": "VAC-IKS01",
                "courseTitle": "Indian Knowledge Systems and Sustainable Living",
                "creditsAssigned": "0",
                "coordinatorName": "Dr. S. Thulasi Bharathi",
                "mode": "Offline",
                "iksBased": "Yes",
                "focus": "Knowledge",
                "multidisciplinary": "Yes",
                "durationHours": "20",
                "datesFromTo": "05.08.2026 – 12.08.2026",
                "industryCollab": "No",
                "staffOrExperts": "Dr. S. Thulasi Bharathi, Assistant Professor, Department of Commerce, St. Joseph’s College (Autonomous), Tiruchirappalli – 620002",
                "enrolled": "100",
                "completed": "96"
              }
            ]
          },
          {
            "id": "1.2_b",
            "title": "1.2 (b) Students Attending Certificate Courses Offered by Other Agencies/Industries (Do not include MOOC)",
            "columns": [
              {
                "key": "sno",
                "label": "S.No.",
                "width": "w-14"
              },
              {
                "key": "regNo",
                "label": "Register Number",
                "width": "w-32"
              },
              {
                "key": "studentName",
                "label": "Name of the Student",
                "width": "w-44"
              },
              {
                "key": "courseTitle",
                "label": "Title of the Certificate Course",
                "width": "w-56"
              },
              {
                "key": "agencyDetails",
                "label": "Name and Address of the Agency offering the Course",
                "width": "w-64"
              },
              {
                "key": "mode",
                "label": "Mode (Online / Offline / Blended)",
                "width": "w-32"
              },
              {
                "key": "datesFromTo",
                "label": "Dates conducted FROM-TO",
                "width": "w-40"
              },
              {
                "key": "credits",
                "label": "Credits from Recognized Body / Agency, if any",
                "width": "w-32"
              }
            ],
            "rows": [
              {
                "sno": "1",
                "regNo": "26UCS101",
                "studentName": "Arun Kumar",
                "courseTitle": "Certificate Course in Full Stack Web Development",
                "agencyDetails": "ABC Technologies Pvt. Ltd., 25 Anna Salai, Chennai – 600002, Tamil Nadu",
                "mode": "Offline",
                "datesFromTo": "01.07.2026 – 15.07.2026",
                "credits": "2"
              },
              {
                "sno": "2",
                "regNo": "26UCS115",
                "studentName": "Priya Joseph",
                "courseTitle": "Certificate Course in Data Analytics",
                "agencyDetails": "XYZ Analytics Solutions, 18 MG Road, Bengaluru – 560001, Karnataka",
                "mode": "Blended",
                "datesFromTo": "10.07.2026 – 25.07.2026",
                "credits": "3"
              }
            ]
          }
        ]
      },
      {
        "key": "1.3",
        "sheetName": "1.3",
        "title": "1.3 Activities conducted with reference to IKS",
        "badge": "Attribute I - Section 1.3",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No",
            "width": "w-14"
          },
          {
            "key": "title",
            "label": "Title of the Programme",
            "width": "w-60"
          },
          {
            "key": "nature",
            "label": "Nature of Programme (Workshop, Seminar, Field Visit, Industry Visit, Guest Lectures, etc.,)",
            "width": "w-52"
          },
          {
            "key": "relevance",
            "label": "Academic/Course Relevance",
            "width": "w-44"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-28"
          },
          {
            "key": "placeVisited",
            "label": "Name and Address of Place Visited (In case of FV/IV)",
            "width": "w-52"
          },
          {
            "key": "resourcePerson",
            "label": "Name, Designation of Resource Person",
            "width": "w-56"
          },
          {
            "key": "studentsBenefitted",
            "label": "No. of Student Benefitted",
            "width": "w-28"
          },
          {
            "key": "facultyBenefitted",
            "label": "No. of Faculty Benefitted",
            "width": "w-28"
          }
        ],
        "rows": [
          {
            "sno": "1",
            "title": "Traditional Knowledge Systems in Sustainable Agriculture",
            "nature": "Seminar",
            "relevance": "25PCA1CC01-Industrial IoT",
            "date": "22.09.2025",
            "placeVisited": "NIL",
            "resourcePerson": "Dr. R. Anitha, Associate Professor of Botany, ABC College, Tiruchirappalli",
            "studentsBenefitted": "25",
            "facultyBenefitted": "5"
          }
        ]
      },
      {
        "key": "1.4",
        "sheetName": "1.4",
        "title": "1.4 Industrial Visit, Educational Visit, Field Visit, Field Work, etc",
        "badge": "Attribute I - Section 1.4",
        "instruction": "Don't include if mentioned in 1.3",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No.",
            "width": "w-14"
          },
          {
            "key": "nature",
            "label": "Nature (Industrial Visit / Educational Visit / Field Visit / Field Work)",
            "width": "w-48"
          },
          {
            "key": "placeDetails",
            "label": "Details of Industry / Institution / Places Visited",
            "width": "w-60"
          },
          {
            "key": "relevance",
            "label": "Academic/Course Relevance",
            "width": "w-40"
          },
          {
            "key": "staffAccompanying",
            "label": "Name of the Staff Accompanying the Students",
            "width": "w-52"
          },
          {
            "key": "datesFromTo",
            "label": "Date From – To DD.MM.YYYY",
            "width": "w-36"
          },
          {
            "key": "durationDays",
            "label": "Duration (Days)",
            "width": "w-28"
          },
          {
            "key": "mouLinkage",
            "label": "Part of the MoU/Linkage",
            "width": "w-32"
          },
          {
            "key": "learningOutcome",
            "label": "Learning Outcome",
            "width": "w-52"
          },
          {
            "key": "targetGroup",
            "label": "Target Group",
            "width": "w-40"
          },
          {
            "key": "studentsBenefitted",
            "label": "Students Benefitted",
            "width": "w-28"
          }
        ],
        "rows": [
          {
            "sno": "1",
            "nature": "Industrial Visit",
            "placeDetails": "Systech Hardware & Networking Academy Pvt. Ltd., Tiruchirappalli, Tamil Nadu",
            "relevance": "25UCS4CC05-Internship",
            "staffAccompanying": "Dr. J. Antony John Prabu & Dr. K. Subash",
            "datesFromTo": "30.08.2025",
            "durationDays": "0.5",
            "mouLinkage": "MoU",
            "learningOutcome": "Enhanced Industry Awareness, Practical Learning Impact, Career Motivation",
            "targetGroup": "III BSc Computer Science 'A'",
            "studentsBenefitted": "60"
          }
        ]
      },
      {
        "key": "1.5",
        "sheetName": "1.5",
        "title": "1.5 Internship",
        "badge": "Attribute I - Section 1.5",
        "type": "batch_table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No.",
            "width": "w-14"
          },
          {
            "key": "studentName",
            "label": "Name of the Student",
            "width": "w-40"
          },
          {
            "key": "regNo",
            "label": "Reg. No.",
            "width": "w-28"
          },
          {
            "key": "internshipTitle",
            "label": "Title of the Internship",
            "width": "w-44"
          },
          {
            "key": "organizationDetails",
            "label": "Name and Address of the Organization",
            "width": "w-56"
          },
          {
            "key": "placeNature",
            "label": "Nature of Place (Industry / Company / Institution, etc.)",
            "width": "w-40"
          },
          {
            "key": "durationDays",
            "label": "Duration (No. of Days)",
            "width": "w-28"
          },
          {
            "key": "datesFromTo",
            "label": "Dates FROM-TO DD.MM.YYYY - DD.MM.YYYY",
            "width": "w-40"
          },
          {
            "key": "staffInCharge",
            "label": "Name of the Staff in charge",
            "width": "w-40"
          },
          {
            "key": "sdgGoal",
            "label": "SDG Goal with Title",
            "width": "w-48"
          },
          {
            "key": "mouLinkage",
            "label": "Part of the MoU/Linkage",
            "width": "w-32"
          },
          {
            "key": "iksBased",
            "label": "Was the Internship based on IKS ? (Mention Yes/No)",
            "width": "w-36"
          }
        ],
        "batches": [
          {
            "id": "ug_batch",
            "name": "(2024 UG Batch)",
            "rows": [
              {
                "sno": "1",
                "studentName": "Kishore Ignatius R",
                "regNo": "24UCS604",
                "internshipTitle": "Data Analytics",
                "organizationDetails": "We Touch Technologies Pvt. Ltd., No. 45, IT Park, Coimbatore",
                "placeNature": "Industry",
                "durationDays": "30",
                "datesFromTo": "02.05.2026 - 03.06.2026",
                "staffInCharge": "Ms. I. Reshma Monica",
                "sdgGoal": "GOAL 8: Decent Work and Economic Growth",
                "mouLinkage": "MoU",
                "iksBased": "No"
              }
            ]
          },
          {
            "id": "pg_batch",
            "name": "(2025 PG Batch)",
            "rows": []
          }
        ]
      },
      {
        "key": "1.6",
        "sheetName": "1.6",
        "title": "1.6 Project",
        "badge": "Attribute I - Section 1.6",
        "type": "batch_table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No.",
            "width": "w-14"
          },
          {
            "key": "studentName",
            "label": "Name of the Student",
            "width": "w-40"
          },
          {
            "key": "regNo",
            "label": "Reg. No.",
            "width": "w-28"
          },
          {
            "key": "projectTitle",
            "label": "Title of the Project",
            "width": "w-44"
          },
          {
            "key": "organizationDetails",
            "label": "Name and Address of the Organization",
            "width": "w-56"
          },
          {
            "key": "placeNature",
            "label": "Nature of Place (Industry / Company / Institution)",
            "width": "w-40"
          },
          {
            "key": "durationDays",
            "label": "Duration (No. of Days)",
            "width": "w-28"
          },
          {
            "key": "datesFromTo",
            "label": "Dates FROM-TO DD.MM.YYYY - DD.MM.YYYY",
            "width": "w-40"
          },
          {
            "key": "staffInCharge",
            "label": "Name of the Staff in charge",
            "width": "w-40"
          },
          {
            "key": "sdgGoal",
            "label": "SDG Goal with Title",
            "width": "w-48"
          },
          {
            "key": "mouLinkage",
            "label": "Part of the MoU/Linkage",
            "width": "w-32"
          },
          {
            "key": "iksBased",
            "label": "Was the Project based on IKS ? (Mention Yes/No)",
            "width": "w-36"
          }
        ],
        "batches": [
          {
            "id": "ug_batch",
            "name": "(2024 UG Batch)",
            "rows": [
              {
                "sno": "1",
                "studentName": "Santhosh S",
                "regNo": "24UCS101",
                "projectTitle": "Web Application Development",
                "organizationDetails": "Tech Solutions Pvt. Ltd., No. 45, IT Park, Coimbatore",
                "placeNature": "Industry",
                "durationDays": "30",
                "datesFromTo": "01.12.2025-30.12.2025",
                "staffInCharge": "Dr. V. Jude Nirmal",
                "sdgGoal": "GOAL 8: Decent Work and Economic Growth",
                "mouLinkage": "Linkage",
                "iksBased": "NO"
              }
            ]
          },
          {
            "id": "pg_batch",
            "name": "(2025 PG Batch)",
            "rows": []
          }
        ]
      },
      {
        "key": "1.7",
        "sheetName": "1.7",
        "title": "1.7 Apprenticeship",
        "badge": "Attribute I - Section 1.7",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No.",
            "width": "w-14"
          },
          {
            "key": "studentName",
            "label": "Name of the Student",
            "width": "w-44"
          },
          {
            "key": "regNo",
            "label": "Reg. No.",
            "width": "w-28"
          },
          {
            "key": "apprenticeshipTitle",
            "label": "Title of the Apprenticeship",
            "width": "w-52"
          },
          {
            "key": "organizationDetails",
            "label": "Name and Address of the Organization",
            "width": "w-60"
          },
          {
            "key": "durationDays",
            "label": "Duration (No of Days)",
            "width": "w-28"
          },
          {
            "key": "datesFromTo",
            "label": "Date From - To",
            "width": "w-36"
          },
          {
            "key": "status",
            "label": "Status (Completed/Ongoing)",
            "width": "w-32"
          },
          {
            "key": "stipend",
            "label": "Stipend (if applicable)",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "sno": "1",
            "studentName": "Thomas A",
            "regNo": "25UCS101",
            "apprenticeshipTitle": "Full Stack Development",
            "organizationDetails": "Tech Solutions Pvt. Ltd., No. 45, IT Park, Coimbatore",
            "durationDays": "180",
            "datesFromTo": "01.01.2025-30.06.2025",
            "status": "Ongoing",
            "stipend": "Rs. 4000"
          }
        ]
      },
      {
        "key": "1.8",
        "sheetName": "1.8",
        "title": "1.8 INTERNSHIP / PROJECT ACTIVITY OUTSIDE THE CURRICULUM",
        "badge": "Attribute I - Section 1.8",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "Sl. No",
            "width": "w-14"
          },
          {
            "key": "className",
            "label": "Class",
            "width": "w-36"
          },
          {
            "key": "regNo",
            "label": "Reg. No. of the Student",
            "width": "w-32"
          },
          {
            "key": "studentName",
            "label": "Name of the Student",
            "width": "w-44"
          },
          {
            "key": "activityType",
            "label": "Internship / Project",
            "width": "w-48"
          },
          {
            "key": "agencyDetails",
            "label": "Name and Address of the Agency providing Internship/Project",
            "width": "w-64"
          },
          {
            "key": "durationDays",
            "label": "Duration in Days",
            "width": "w-28"
          },
          {
            "key": "datesFromTo",
            "label": "Dates From - To",
            "width": "w-36"
          },
          {
            "key": "skillsAcquired",
            "label": "Skills Acquired",
            "width": "w-52"
          },
          {
            "key": "stipend",
            "label": "Stipend, if any (₹)",
            "width": "w-28"
          }
        ],
        "rows": [
          {
            "sno": "1",
            "className": "III B.Com.",
            "regNo": "24UCO115",
            "studentName": "Priya Joseph",
            "activityType": "Project – Financial Data Analysis",
            "agencyDetails": "XYZ Financial Services, 45 MG Road, Bengaluru – 560001, Karnataka",
            "durationDays": "20",
            "datesFromTo": "10.06.2026 – 29.06.2026",
            "skillsAcquired": "Excel, Data Analysis, Financial Reporting",
            "stipend": "-"
          },
          {
            "sno": "2",
            "className": "II B.A. English",
            "regNo": "25UEN208",
            "studentName": "David Paul",
            "activityType": "Internship – Content Writing",
            "agencyDetails": "Creative Media Solutions, 18 College Road, Tiruchirappalli – 620002, Tamil Nadu",
            "durationDays": "15",
            "datesFromTo": "15.07.2026 – 29.07.2026",
            "skillsAcquired": "Content Writing, Editing, Communication",
            "stipend": "3000"
          }
        ]
      },
      {
        "key": "1.9",
        "sheetName": "1.9",
        "title": "1.9 Students Registering / Completing MOOC",
        "badge": "Attribute I - Section 1.9",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "S. No.",
            "width": "w-14"
          },
          {
            "key": "className",
            "label": "Class",
            "width": "w-36"
          },
          {
            "key": "regNo",
            "label": "Reg. No. of the Student",
            "width": "w-32"
          },
          {
            "key": "studentName",
            "label": "Name of the Student",
            "width": "w-44"
          },
          {
            "key": "courseTitle",
            "label": "Title of the MOOC",
            "width": "w-52"
          },
          {
            "key": "platform",
            "label": "Platform (SWAYAM/NPTEL, Coursera, EdX, Udemy, SWAYAM PLUS)",
            "width": "w-56"
          },
          {
            "key": "cycle",
            "label": "Cycle (incase the platform is SWAYAM / NPTEL)",
            "width": "w-36"
          },
          {
            "key": "duration",
            "label": "Duration (Weeks for SWAYAM/NPTEL, Hrs for others)",
            "width": "w-36"
          },
          {
            "key": "examDate",
            "label": "Date of Examination",
            "width": "w-32"
          },
          {
            "key": "credits",
            "label": "No. of Credits",
            "width": "w-24"
          },
          {
            "key": "status",
            "label": "Registered / Completed",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "sno": "1",
            "className": "I BSc Computer Science",
            "regNo": "26UCS101",
            "studentName": "Raju S",
            "courseTitle": "Relational Database Management",
            "platform": "SWAYAM",
            "cycle": "July 2026",
            "duration": "8",
            "examDate": "28.09.2026",
            "credits": "2",
            "status": "Registered"
          },
          {
            "sno": "2",
            "className": "I MCA",
            "regNo": "26PCA101",
            "studentName": "Abishek A",
            "courseTitle": "C++ & Data Structures",
            "platform": "Coursera",
            "cycle": "NIL",
            "duration": "30",
            "examDate": "NIL",
            "credits": "NIL",
            "status": "Completed"
          }
        ]
      },
      {
        "key": "1.10",
        "sheetName": "1.10",
        "title": "1.10 Parent Teacher Meet Conducted",
        "badge": "Attribute I - Section 1.10",
        "type": "table",
        "columns": [
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "className",
            "label": "Class",
            "width": "w-44"
          },
          {
            "key": "studentsOrganized",
            "label": "No. of Students for whom PT was organised",
            "width": "w-36"
          },
          {
            "key": "parentsAttending",
            "label": "No. of Parents Attending",
            "width": "w-36"
          },
          {
            "key": "feedbackReceived",
            "label": "No. of Feedback Received",
            "width": "w-36"
          },
          {
            "key": "actionTaken",
            "label": "Action Taken based on feedback received",
            "width": "w-72"
          }
        ],
        "rows": [
          {
            "date": "15.07.2026",
            "className": "II B.Sc. Computer Science",
            "studentsOrganized": "45",
            "parentsAttending": "38",
            "feedbackReceived": "32",
            "actionTaken": "Individual counselling and academic follow-up initiated for students requiring support"
          },
          {
            "date": "22.07.2026",
            "className": "I B.Com.",
            "studentsOrganized": "52",
            "parentsAttending": "45",
            "feedbackReceived": "40",
            "actionTaken": "Attendance and academic performance concerns communicated to parents and monitored"
          }
        ]
      },
      {
        "key": "1.11",
        "sheetName": "1.11",
        "title": "1.11 Feedback Collected from Stakeholders",
        "badge": "Attribute I - Section 1.11",
        "type": "table",
        "columns": [
          {
            "key": "sno",
            "label": "S.No",
            "width": "w-14"
          },
          {
            "key": "stakeholderType",
            "label": "Type of Stakeholder (Teachers/Alumni/Employers/Industry/Entrepreneurs/Students)",
            "width": "w-64"
          },
          {
            "key": "feedbackDate",
            "label": "Date of Feedback Collected",
            "width": "w-36"
          },
          {
            "key": "feedbackReceived",
            "label": "No. of Feedback Received",
            "width": "w-36"
          },
          {
            "key": "mode",
            "label": "Mode of Feedback (Online / Offline)",
            "width": "w-36"
          },
          {
            "key": "actionTaken",
            "label": "Action Taken",
            "width": "w-72"
          }
        ],
        "rows": [
          {
            "sno": "1",
            "stakeholderType": "Teachers",
            "feedbackDate": "15.07.2026",
            "feedbackReceived": "85",
            "mode": "Online",
            "actionTaken": "Faculty suggestions regarding curriculum delivery were reviewed and necessary improvements initiated"
          },
          {
            "sno": "2",
            "stakeholderType": "Alumni",
            "feedbackDate": "20.07.2026",
            "feedbackReceived": "120",
            "mode": "Online",
            "actionTaken": "Suggestions regarding employability and skill development were considered for curriculum enrichment"
          },
          {
            "sno": "3",
            "stakeholderType": "Employers/Industry",
            "feedbackDate": "25.07.2026",
            "feedbackReceived": "35",
            "mode": "Online / Offline",
            "actionTaken": "Industry suggestions were incorporated into skill-oriented training and curriculum review"
          },
          {
            "sno": "4",
            "stakeholderType": "Entrepreneurs",
            "feedbackDate": "30.07.2026",
            "feedbackReceived": "20",
            "mode": "Online",
            "actionTaken": "Suggestions regarding entrepreneurship and start-up skills were considered for student development activities"
          },
          {
            "sno": "5",
            "stakeholderType": "Students",
            "feedbackDate": "05.08.2026",
            "feedbackReceived": "450",
            "mode": "Online",
            "actionTaken": "Feedback on teaching-learning, infrastructure and student support services was analysed and corrective measures initiated"
          }
        ]
      }
    ]
  },
  {
    "id": "att2",
    "cardNumber": 2,
    "cardTitle": "Attribute II - Faculty Resources",
    "cardCode": "Attribute 2",
    "cardSubtitle": "Faculty Appointments, Ph.D./PDF Degrees, Recognized Bodies, Reviewers, FDPs, Awards, Abroad Visits (2.1 - 2.13)",
    "icon": "users",
    "color": "purple",
    "sheets": [
      {
        "key": "2_2_1",
        "sheetName": "2.1",
        "title": "Attribute II",
        "badge": "Attribute 2 - 2.1",
        "instruction": "Faculty Resources",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "shift_i_ii",
            "label": "Shift (I/II)",
            "width": "w-32"
          },
          {
            "key": "appointment_type_aided_coordin",
            "label": "Appointment Type (Aided/Coordinator/Secretary)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_teaching_staff",
            "label": "Name of the Teaching Staff",
            "width": "w-52"
          },
          {
            "key": "designation",
            "label": "Designation",
            "width": "w-32"
          },
          {
            "key": "date_of_appointment",
            "label": "Date of Appointment",
            "width": "w-52"
          },
          {
            "key": "educational_qualification",
            "label": "Educational Qualification",
            "width": "w-52"
          },
          {
            "key": "does_the_staff_have_a_doctoral",
            "label": "Does the staff have a Doctoral Degree Yes/No",
            "width": "w-52"
          },
          {
            "key": "if_no_year_of_registration_of_",
            "label": "If No, Year of  registration of PhD Degree (Mention NIL if not registered)",
            "width": "w-52"
          },
          {
            "key": "year_of_acquiring_doctoral_deg",
            "label": "Year of Acquiring  Doctoral Degree",
            "width": "w-52"
          },
          {
            "key": "phd_guide_mention_yes_no",
            "label": "PhD Guide Mention (Yes/No)",
            "width": "w-52"
          },
          {
            "key": "year_of_recognition_as_phd_gui",
            "label": "Year of Recognition as PhD Guide",
            "width": "w-52"
          },
          {
            "key": "guideship_reference_number",
            "label": "Guideship Reference Number",
            "width": "w-52"
          },
          {
            "key": "total_no_of_doctoral_research_",
            "label": "Total No. of Doctoral Research Scholars Guided",
            "width": "w-52"
          },
          {
            "key": "no_of_doctoral_research_schola",
            "label": "No. of Doctoral Research Scholars Guiding",
            "width": "w-52"
          },
          {
            "key": "personal_mail_id",
            "label": "Personal Mail ID",
            "width": "w-52"
          },
          {
            "key": "institutional_email_address",
            "label": "Institutional Email Address",
            "width": "w-52"
          },
          {
            "key": "aadhaar_no",
            "label": "AADHAAR No.",
            "width": "w-32"
          },
          {
            "key": "pan_no",
            "label": "PAN No.",
            "width": "w-32"
          },
          {
            "key": "linkedin_profile",
            "label": "LinkedIn Profile",
            "width": "w-52"
          },
          {
            "key": "vidwan_id",
            "label": "VIDWAN ID",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "No need to fill this Data for this Academic Year",
            "shift_i_ii": "",
            "appointment_type_aided_coordin": "",
            "name_of_the_teaching_staff": "",
            "designation": "",
            "date_of_appointment": "",
            "educational_qualification": "",
            "does_the_staff_have_a_doctoral": "",
            "if_no_year_of_registration_of_": "",
            "year_of_acquiring_doctoral_deg": "",
            "phd_guide_mention_yes_no": "",
            "year_of_recognition_as_phd_gui": "",
            "guideship_reference_number": "",
            "total_no_of_doctoral_research_": "",
            "no_of_doctoral_research_schola": "",
            "personal_mail_id": "",
            "institutional_email_address": "",
            "aadhaar_no": "",
            "pan_no": "",
            "linkedin_profile": "",
            "vidwan_id": ""
          }
        ]
      },
      {
        "key": "2_2_2",
        "sheetName": "2.2",
        "title": "2.2 New Degrees Awarded",
        "badge": "Attribute 2 - 2.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "degree_awarded",
            "label": "Degree Awarded",
            "width": "w-32"
          },
          {
            "key": "specialization",
            "label": "Specialization",
            "width": "w-32"
          },
          {
            "key": "name_address_of_the_awarding_i",
            "label": "Name & Address of the Awarding Institution",
            "width": "w-52"
          },
          {
            "key": "month_year",
            "label": "Month & Year",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. D. Ravindran",
            "degree_awarded": "MBA",
            "specialization": "Human Resource Management",
            "name_address_of_the_awarding_i": "Pondicherry University, Pondicherry",
            "month_year": "2026-06-01 00:00:00"
          }
        ]
      },
      {
        "key": "2_2_3",
        "sheetName": "2.3",
        "title": "2.3  Member in various recognized bodies",
        "badge": "Attribute 2 - 2.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State/Institutional)",
            "width": "w-52"
          },
          {
            "key": "nature_of_body_committee_acade",
            "label": "Nature of Body/Committee (Academic /Co-curricular Administrative Bodies /External Member in Academic or Administrative Audits, Mock Visits)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_activity",
            "label": "Name of the Activity",
            "width": "w-52"
          },
          {
            "key": "position_chairperson_member_un",
            "label": "Position (Chairperson, Member, University Nominee, External Expert etc.)",
            "width": "w-52"
          },
          {
            "key": "institution_address",
            "label": "Institution & Address",
            "width": "w-52"
          },
          {
            "key": "no_of_days",
            "label": "No. of Days",
            "width": "w-32"
          },
          {
            "key": "dates_from_to_dd_mm_yyyy_dd_mm",
            "label": "Dates From - To                    (DD.MM.YYYY - DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. S. Britto Ramesh Kumar",
            "level_international_national_s": "National",
            "nature_of_body_committee_acade": "Academic Body",
            "name_of_the_activity": "Board of Studies Meeting  – Department of Computer Science",
            "position_chairperson_member_un": "External Member",
            "institution_address": "ABC College (Autonomous), Chennai, Tamil Nadu",
            "no_of_days": "2",
            "dates_from_to_dd_mm_yyyy_dd_mm": "15.07.2026 – 16.07.2026"
          }
        ]
      },
      {
        "key": "2_2_4",
        "sheetName": "2.4",
        "title": "2.4 Contribution to Research Journals",
        "badge": "Attribute 2 - 2.4",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State)",
            "width": "w-52"
          },
          {
            "key": "position_editor_co_editor_memb",
            "label": "Position (Editor, Co-Editor, Member, Reviewer, etc.,)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_journal",
            "label": "Name of the Journal",
            "width": "w-52"
          },
          {
            "key": "mention_if_wos_scopus_etc",
            "label": "Mention if WoS, SCOPUS, etc.,",
            "width": "w-52"
          },
          {
            "key": "url_of_the_journal",
            "label": "URL of the Journal",
            "width": "w-52"
          },
          {
            "key": "duration_in_years",
            "label": "Duration in Years",
            "width": "w-52"
          },
          {
            "key": "date_from_to_dd_mm_yyyy_dd_mm_",
            "label": "Date  From – To                                (DD.MM.YYYY - DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr.A.Angelpreethi",
            "level_international_national_s": "National",
            "position_editor_co_editor_memb": "Editorial Board Member",
            "name_of_the_journal": "Edwin Group of Journals",
            "mention_if_wos_scopus_etc": "Scopus",
            "url_of_the_journal": "https://www.edwinepc.com/",
            "duration_in_years": "Life time",
            "date_from_to_dd_mm_yyyy_dd_mm_": "24.04.2025 to Life time"
          }
        ]
      },
      {
        "key": "2_2_5",
        "sheetName": "2.5",
        "title": "2.5 Member in Professional Bodies",
        "badge": "Attribute 2 - 2.5",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_professional_body",
            "label": "Name of the Professional Body",
            "width": "w-52"
          },
          {
            "key": "institution_address",
            "label": "Institution & Address",
            "width": "w-52"
          },
          {
            "key": "membership_id_no",
            "label": "Membership ID/No.",
            "width": "w-52"
          },
          {
            "key": "duration_of_membership_in_year",
            "label": "Duration of Membership in Years",
            "width": "w-52"
          },
          {
            "key": "from_to_dd_mm_yyyy_dd_mm_yyyy",
            "label": "From - To (DD.MM.YYYY - DD.MM.YYYY)",
            "width": "w-52"
          },
          {
            "key": "amount_provided_by_the_institu",
            "label": "Amount provided by the Institution (Rs.)",
            "width": "w-52"
          },
          {
            "key": "date_of_financial_support",
            "label": "Date of Financial Support",
            "width": "w-52"
          },
          {
            "key": "activity_involved_in_this_acad",
            "label": "Activity involved in this academic year as a member",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. S. Britto Ramesh Kumar",
            "level_international_national_s": "National",
            "name_of_the_professional_body": "Computer Soicety of India (Membership No. 7151250012)",
            "institution_address": "302, Archana Arcade, Secundrapad-500025",
            "membership_id_no": "7151250012",
            "duration_of_membership_in_year": "1",
            "from_to_dd_mm_yyyy_dd_mm_yyyy": "30.08.2025-30.08.2026",
            "amount_provided_by_the_institu": "5000",
            "date_of_financial_support": "05.07.2026",
            "activity_involved_in_this_acad": "Participated in CSI Chapter technical seminar conducted on 15.07.2026."
          }
        ]
      },
      {
        "key": "2_2_6",
        "sheetName": "2.6",
        "title": "2.6 Activity as Resource Person",
        "badge": "Attribute 2 - 2.6",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State/Institutional)",
            "width": "w-52"
          },
          {
            "key": "title_of_the_seminar_conf_ws",
            "label": "Title of the Seminar/Conf/WS",
            "width": "w-52"
          },
          {
            "key": "type_of_programme_sem_conf_ws_",
            "label": "Type of Programme (Sem, Conf, WS, Webinar, FDP, etc.)",
            "width": "w-52"
          },
          {
            "key": "institution_address",
            "label": "Institution & Address",
            "width": "w-52"
          },
          {
            "key": "date_dd_mm_yyyy",
            "label": "Date                    (DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. A. Vimal Jerald",
            "level_international_national_s": "National",
            "title_of_the_seminar_conf_ws": "Personal Profile Creation / ICT Tools for SMART Teaching",
            "type_of_programme_sem_conf_ws_": "FIP",
            "institution_address": "UGC MMTTC, Madurai Kamaraj University, Madurai",
            "date_dd_mm_yyyy": "11.08.2025"
          }
        ]
      },
      {
        "key": "2_2_7",
        "sheetName": "2.7",
        "title": "2.7 Faculty Development / Training Programmes through Govt. Recognised Bodies",
        "badge": "Attribute 2 - 2.7",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "refresher_course_orientation_p",
            "label": "Refresher Course/Orientation Programme/Short-Term Course/Faculty Development Programme/others",
            "width": "w-52"
          },
          {
            "key": "mention_online_offline",
            "label": "Mention ONLINE/OFFLINE",
            "width": "w-52"
          },
          {
            "key": "title_of_the_programme",
            "label": "Title of the Programme",
            "width": "w-52"
          },
          {
            "key": "name_and_address_of_the_univer",
            "label": "Name and Address of the University",
            "width": "w-52"
          },
          {
            "key": "duration_in_days",
            "label": "Duration in Days",
            "width": "w-52"
          },
          {
            "key": "date_from_to_dd_mm_yyyy_dd_mm_",
            "label": "Date  From – To                                (DD.MM.YYYY - DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. George Gabriel Richard Roy",
            "refresher_course_orientation_p": "Orientation Programme",
            "mention_online_offline": "Online",
            "title_of_the_programme": "NEP 2020 Orientation & Sensitization Programme",
            "name_and_address_of_the_univer": "UGC-Malaviya Mission Teacher Training Centre (UGC-MMTTC), Bharathidasan University, Tiruchirappalli, Tamil Nadu",
            "duration_in_days": "8",
            "date_from_to_dd_mm_yyyy_dd_mm_": "02.12.2025 - 10.12.2025"
          }
        ]
      },
      {
        "key": "2_2_8",
        "sheetName": "2.8",
        "title": "2.8  Participation in Academic and Professional Development Programmes (Other than 2.7)",
        "badge": "Attribute 2 - 2.8",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State/Institutional)",
            "width": "w-52"
          },
          {
            "key": "type_of_programme_seminar_conf",
            "label": "Type of Programme  (Seminar, Conference,FDP, Workshop, Webinar, etc.)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_programme",
            "label": "Name of the Programme",
            "width": "w-52"
          },
          {
            "key": "name_and_place_of_the_institut",
            "label": "Name and Place of the Institution",
            "width": "w-52"
          },
          {
            "key": "duration_in_days",
            "label": "Duration in Days",
            "width": "w-52"
          },
          {
            "key": "date_from_to_dd_mm_yyyy_dd_mm_",
            "label": "Date  From – To                                (DD.MM.YYYY - DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr.A.Aloysius",
            "level_international_national_s": "National",
            "type_of_programme_seminar_conf": "FDP",
            "name_of_the_programme": "Artificial Intelleigence ‘s Impact on Tranforming Software,Robotics,Electrical Electronics and Mechanical Fields(Series-3)",
            "name_and_place_of_the_institut": "Dhaanish Ahmad College of Engineering, Chennai.",
            "duration_in_days": "6",
            "date_from_to_dd_mm_yyyy_dd_mm_": "21.07.2025 - 26.07.2025"
          }
        ]
      },
      {
        "key": "2_2_9",
        "sheetName": "2.9",
        "title": "2.9 Industrial Training / Social Sector Projects / Fellowships Attended",
        "badge": "Attribute 2 - 2.9",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State)",
            "width": "w-52"
          },
          {
            "key": "type_industrial_training_socia",
            "label": "Type (Industrial Training / Social Sector Projects / Fellowships)",
            "width": "w-52"
          },
          {
            "key": "sponsored_by_management_others",
            "label": "Sponsored by Management/Others (mention the details)",
            "width": "w-52"
          },
          {
            "key": "amount_received_in",
            "label": "Amount Received  (in ₹)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_scheme_under_which",
            "label": "Name of the Scheme under which the Training was Offered",
            "width": "w-52"
          },
          {
            "key": "name_and_address_of_the_indust",
            "label": "Name and Address of the Industry",
            "width": "w-52"
          },
          {
            "key": "duration_in_days",
            "label": "Duration in Days",
            "width": "w-52"
          },
          {
            "key": "date_from_to_dd_mm_yyyy_dd_mm_",
            "label": "Date  From – To                                (DD.MM.YYYY - DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. A. Vimal Jerald",
            "level_international_national_s": "National",
            "type_industrial_training_socia": "Industrial Training",
            "sponsored_by_management_others": "Management",
            "amount_received_in": "10000",
            "name_of_the_scheme_under_which": "Faculty Industrial Training Programme",
            "name_and_address_of_the_indust": "ABC Technologies Pvt. Ltd., Chennai, Tamil Nadu",
            "duration_in_days": "5",
            "date_from_to_dd_mm_yyyy_dd_mm_": "03.06.2026 – 07.06.2026"
          },
          {
            "s_no": "2",
            "name_of_the_faculty": "Dr. M. Rajesh",
            "level_international_national_s": "International",
            "type_industrial_training_socia": "Fellowship",
            "sponsored_by_management_others": "Others",
            "amount_received_in": "75000",
            "name_of_the_scheme_under_which": "International Faculty Fellowship Programme",
            "name_and_address_of_the_indust": "University of Melbourne, Australia",
            "duration_in_days": "14",
            "date_from_to_dd_mm_yyyy_dd_mm_": "01.07.2026 – 14.07.2026"
          },
          {
            "s_no": "3",
            "name_of_the_faculty": "Dr. R. Kumar",
            "level_international_national_s": "National",
            "type_industrial_training_socia": "Social Sector Project",
            "sponsored_by_management_others": "Others",
            "amount_received_in": "5000",
            "name_of_the_scheme_under_which": "Community Development Programme",
            "name_and_address_of_the_indust": "XYZ Foundation, Tiruchirappalli, Tamil Nadu",
            "duration_in_days": "7",
            "date_from_to_dd_mm_yyyy_dd_mm_": "15.06.2026 – 21.06.2026"
          }
        ]
      },
      {
        "key": "2_2_10",
        "sheetName": "2.10",
        "title": "2.10  NET / SET / JRF / Others Qualified in the current Academic Year",
        "badge": "Attribute 2 - 2.10",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "examination_registration_numbe",
            "label": "Examination Registration Number",
            "width": "w-52"
          },
          {
            "key": "net_set_jrf_others",
            "label": "NET/SET/JRF/Others",
            "width": "w-52"
          },
          {
            "key": "subject",
            "label": "SUBJECT",
            "width": "w-32"
          },
          {
            "key": "date_of_passing_dd_mm_yyyy",
            "label": "Date of Passing             (DD.MM.YYYY)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Ms. I. Reshma Monica",
            "examination_registration_numbe": "TN14001039",
            "net_set_jrf_others": "UGC NET",
            "subject": "Computer Science",
            "date_of_passing_dd_mm_yyyy": "21.07.2025"
          }
        ]
      },
      {
        "key": "2_2_11",
        "sheetName": "2.11",
        "title": "2.11 Awards Received",
        "badge": "Attribute 2 - 2.11",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International/National/State/Institutional)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_award",
            "label": "Name of the Award",
            "width": "w-52"
          },
          {
            "key": "date_dd_mm_yyyy",
            "label": "Date                        (DD.MM.YYYY)",
            "width": "w-52"
          },
          {
            "key": "awarding_agency_and_contact_de",
            "label": "Awarding Agency and Contact Details",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr. A. Vimal Jerald",
            "level_international_national_s": "National",
            "name_of_the_award": "Best Faculty in Computer Science",
            "date_dd_mm_yyyy": "15.06.2026",
            "awarding_agency_and_contact_de": "ABC Educational Foundation, Chennai, Tamil Nadu – awards@abcfoundation.org"
          }
        ]
      },
      {
        "key": "2_2_12",
        "sheetName": "2.12",
        "title": "2.12 Faculty Registering  / Completing MOOC",
        "badge": "Attribute 2 - 2.12",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "platform_offering_mooc_swayam_",
            "label": "Platform offering MOOC (SWAYAM/NPTEL, Recognized Platforms by the Departments (Coursera, EdX, Udemy, etc.), SWAYAM PLUS",
            "width": "w-52"
          },
          {
            "key": "title_of_the_mooc",
            "label": "Title of the MOOC",
            "width": "w-52"
          },
          {
            "key": "cycle_incase_the_platform_is_s",
            "label": "Cycle (incase the platform is SWAYAM / NPTEL)",
            "width": "w-52"
          },
          {
            "key": "duration_of_course",
            "label": "Duration of Course",
            "width": "w-52"
          },
          {
            "key": "number_of_credits",
            "label": "Number of Credits",
            "width": "w-52"
          },
          {
            "key": "fdp_yes_no",
            "label": "FDP (YES/NO)",
            "width": "w-32"
          },
          {
            "key": "date_of_examination_dd_mm_yyyy",
            "label": "Date of Examination  (DD.MM.YYYY)",
            "width": "w-52"
          },
          {
            "key": "registered_completed",
            "label": "Registered / Completed",
            "width": "w-52"
          },
          {
            "key": "result",
            "label": "Result",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr. K. Maheswaran",
            "platform_offering_mooc_swayam_": "SWAYAM",
            "title_of_the_mooc": "Introduction to Programming in C",
            "cycle_incase_the_platform_is_s": "2026-07-01 00:00:00",
            "duration_of_course": "8 weeks",
            "number_of_credits": "2",
            "fdp_yes_no": "Yes",
            "date_of_examination_dd_mm_yyyy": "21.09.2025",
            "registered_completed": "Completed",
            "result": "Pass"
          }
        ]
      },
      {
        "key": "2_2_13",
        "sheetName": "2.13",
        "title": "2.13 Faculty Going Abroad for Academic Visits",
        "badge": "Attribute 2 - 2.13",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "name_of_the_country_visited",
            "label": "Name of the Country Visited",
            "width": "w-52"
          },
          {
            "key": "purpose_nature_of_the_visit",
            "label": "Purpose / Nature of the Visit",
            "width": "w-52"
          },
          {
            "key": "name_of_the_fellowship_if_any",
            "label": "Name of the Fellowship, if any",
            "width": "w-52"
          },
          {
            "key": "awarding_agency_host_instituti",
            "label": "Awarding Agency / Host Institution with Complete Address",
            "width": "w-52"
          },
          {
            "key": "whether_the_visit_based_on_mou",
            "label": "Whether the visit based on MoU",
            "width": "w-52"
          },
          {
            "key": "no_of_days",
            "label": "No. of Days",
            "width": "w-32"
          },
          {
            "key": "date_from_to_dd_mm_yyyy_dd_mm_",
            "label": "Date FROM - TO                 DD.MM.YYYY - DD.MM.YYYY",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr George Gabriel Richard Roy",
            "name_of_the_country_visited": "Singapore",
            "purpose_nature_of_the_visit": "Academic Visit and Research Interaction",
            "name_of_the_fellowship_if_any": "International Faculty Fellowship Programme",
            "awarding_agency_host_instituti": "National University of Singapore, Singapore – international@nus.edu.sg",
            "whether_the_visit_based_on_mou": "Yes",
            "no_of_days": "7",
            "date_from_to_dd_mm_yyyy_dd_mm_": "10.06.2026 – 16.06.2026"
          }
        ]
      }
    ]
  },
  {
    "id": "att3",
    "cardNumber": 3,
    "cardTitle": "Attribute III - Infrastructure & Learning Resources",
    "cardCode": "Attribute 3",
    "cardSubtitle": "Laboratory Equipment Purchases, Computing Facilities, Department Library Books & Journals (3.1 - 3.2)",
    "icon": "hard-drive",
    "color": "emerald",
    "sheets": [
      {
        "key": "3_3_1",
        "sheetName": "3.1",
        "title": "Attribute III",
        "badge": "Attribute 3 - 3.1",
        "instruction": "Infrastructure",
        "type": "table",
        "columns": [
          {
            "key": "attribute_iii",
            "label": "Attribute III",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "attribute_iii": "Infrastructure"
          },
          {
            "attribute_iii": "3.1 Research Facility"
          }
        ]
      },
      {
        "key": "3_3_2",
        "sheetName": "3.2",
        "title": "3.2  Department Library",
        "badge": "Attribute 3 - 3.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "department",
            "label": "Department",
            "width": "w-32"
          },
          {
            "key": "type_books_jounal",
            "label": "Type (Books/Jounal)",
            "width": "w-52"
          },
          {
            "key": "purchased_during_2026_2027_in_",
            "label": "Purchased during 2026-2027 (in numbers)",
            "width": "w-52"
          },
          {
            "key": "total_number_in_the_department",
            "label": "Total Number in the Department Library",
            "width": "w-52"
          },
          {
            "key": "no_of_visits_to_the_department",
            "label": "No. of Visits to the Department Library by Faculty /Day",
            "width": "w-52"
          },
          {
            "key": "col_7",
            "label": "No. of Visits to the Department Library by Students/Day",
            "width": "w-52"
          },
          {
            "key": "no_of_books_checked_out_by_fac",
            "label": "No. of Books checked out by faculty  in the Academic Year",
            "width": "w-52"
          },
          {
            "key": "no_of_books_checked_out_by_stu",
            "label": "No. of Books checked out by students in the Academic Year",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "department": "Department of Computer Science",
            "type_books_jounal": "Books",
            "purchased_during_2026_2027_in_": "125",
            "total_number_in_the_department": "3250",
            "no_of_visits_to_the_department": "8",
            "col_7": "45",
            "no_of_books_checked_out_by_fac": "85",
            "no_of_books_checked_out_by_stu": "620"
          },
          {
            "s_no": "2",
            "department": "Department of Computer Science",
            "type_books_jounal": "Journal",
            "purchased_during_2026_2027_in_": "15",
            "total_number_in_the_department": "85",
            "no_of_visits_to_the_department": "3",
            "col_7": "12",
            "no_of_books_checked_out_by_fac": "10",
            "no_of_books_checked_out_by_stu": "25"
          }
        ]
      }
    ]
  },
  {
    "id": "att4",
    "cardNumber": 4,
    "cardTitle": "Attribute IV - Student Support & Financial Aid",
    "cardCode": "Attribute 4",
    "cardSubtitle": "Alumni Interactions, Scholarships, External Research Grants, Management Grants & Seed Money (4.1 - 4.5)",
    "icon": "banknote",
    "color": "amber",
    "sheets": [
      {
        "key": "4_4_1",
        "sheetName": "4.1",
        "title": "Attribute IV",
        "badge": "Attribute 4 - 4.1",
        "instruction": "Financial Resources & Management",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "programme",
            "label": "Programme",
            "width": "w-32"
          },
          {
            "key": "batch",
            "label": "Batch",
            "width": "w-32"
          },
          {
            "key": "no_of_alumni_participated",
            "label": "No. of Alumni Participated",
            "width": "w-52"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "details_of_notable_alumni_part",
            "label": "Details of Notable Alumni Participated with Designation and Official Address \n(Mention the details of each Alumni in separate rows)",
            "width": "w-52"
          },
          {
            "key": "contribution_by_the_alumni",
            "label": "Contribution by the Alumni",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "",
            "programme": "",
            "batch": "",
            "no_of_alumni_participated": "",
            "date": "",
            "details_of_notable_alumni_part": "",
            "contribution_by_the_alumni": "Financial Contribution (₹), if any"
          },
          {
            "s_no": "1",
            "programme": "MCA",
            "batch": "2012–2015",
            "no_of_alumni_participated": "35",
            "date": "20.07.2026",
            "details_of_notable_alumni_part": "Dr. Arun Kumar, Senior Manager, ABC Technologies Pvt. Ltd., Chennai, Tamil Nadu",
            "contribution_by_the_alumni": "50000"
          },
          {
            "s_no": "",
            "programme": "",
            "batch": "",
            "no_of_alumni_participated": "",
            "date": "",
            "details_of_notable_alumni_part": "Mr. Joseph, HR Manager, XYZ Solutions Ltd., Bengaluru, Karnataka",
            "contribution_by_the_alumni": "25000"
          },
          {
            "s_no": "",
            "programme": "",
            "batch": "",
            "no_of_alumni_participated": "",
            "date": "",
            "details_of_notable_alumni_part": "Mr. Rahul Raj, Project Manager, Global Systems Pvt. Ltd., Coimbatore, Tamil Nadu",
            "contribution_by_the_alumni": "0"
          },
          {
            "s_no": "2",
            "programme": "BSc Computer Science",
            "batch": "2009-2012",
            "no_of_alumni_participated": "35",
            "date": "28.08.2026",
            "details_of_notable_alumni_part": "Mr. Joseph, HR Manager, XYZ Solutions Ltd., Bengaluru, Karnataka",
            "contribution_by_the_alumni": "25000"
          }
        ]
      },
      {
        "key": "4_4_2",
        "sheetName": "4.2",
        "title": "4.2 Scholarship/ Freeship / Financial Assistance Received by the Students from the College/Alumni/External Agencies",
        "badge": "Attribute 4 - 4.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "reg_no",
            "label": "Reg. No",
            "width": "w-32"
          },
          {
            "key": "name_of_the_student",
            "label": "Name of the Student",
            "width": "w-52"
          },
          {
            "key": "college_alumni_external_agenci",
            "label": "College /Alumni /External Agencies",
            "width": "w-52"
          },
          {
            "key": "name_of_the_agency_with_comple",
            "label": "Name of the Agency with complete address",
            "width": "w-52"
          },
          {
            "key": "mention_name_of_the_scholarshi",
            "label": "Mention Name of the Scholarship",
            "width": "w-52"
          },
          {
            "key": "amount_received_in_rupees",
            "label": "Amount Received in Rupees (₹)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "reg_no": "26UCS101",
            "name_of_the_student": "Arun Kumar",
            "college_alumni_external_agenci": "College",
            "name_of_the_agency_with_comple": "St. Joseph's College (Autonomous), Tiruchirappalli - 620002",
            "mention_name_of_the_scholarshi": "Jesuit Education Scholarship",
            "amount_received_in_rupees": "5000"
          },
          {
            "s_no": "2",
            "reg_no": "26UCS305",
            "name_of_the_student": "David Paul",
            "college_alumni_external_agenci": "External Agencies",
            "name_of_the_agency_with_comple": "ABC Foundation, 25 Anna Salai, Chennai – 600002, Tamil Nadu",
            "mention_name_of_the_scholarshi": "ABC Foundation Scholarship",
            "amount_received_in_rupees": "25000"
          }
        ]
      },
      {
        "key": "4_4_3",
        "sheetName": "4.3",
        "title": "4.3 Funds Received (Grants received from the External Funding Agencies to conduct Courses/Conferences, etc.)",
        "badge": "Attribute 4 - 4.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "title_of_the_programme",
            "label": "Title of the Programme",
            "width": "w-52"
          },
          {
            "key": "date_of_the_event_from_to",
            "label": "Date of the Event (FROM-TO)",
            "width": "w-52"
          },
          {
            "key": "nature_of_the_programme_worksh",
            "label": "Nature of the Programme (Workshop/Seminar/Conference/Courses,etc)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_funding_agency",
            "label": "Name of the Funding Agency",
            "width": "w-52"
          },
          {
            "key": "purpose",
            "label": "Purpose",
            "width": "w-32"
          },
          {
            "key": "date_of_grant",
            "label": "Date of Grant",
            "width": "w-32"
          },
          {
            "key": "amount",
            "label": "Amount (₹)",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "title_of_the_programme": "National Workshop on Emerging Trends in Artificial Intelligence",
            "date_of_the_event_from_to": "15.07.2026 – 16.07.2026",
            "nature_of_the_programme_worksh": "Workshop",
            "name_of_the_funding_agency": "University Grants Commission (UGC), New Delhi",
            "purpose": "Conduct of the Workshop",
            "date_of_grant": "05.07.2026",
            "amount": "75000"
          },
          {
            "s_no": "2",
            "title_of_the_programme": "International Conference on Sustainable Development and Innovation",
            "date_of_the_event_from_to": "10.08.2026 – 12.08.2026",
            "nature_of_the_programme_worksh": "Conference",
            "name_of_the_funding_agency": "Indian Council of Social Science Research (ICSSR), New Delhi",
            "purpose": "Conduct of the Conference",
            "date_of_grant": "25.07.2026",
            "amount": "150000"
          },
          {
            "s_no": "3",
            "title_of_the_programme": "Faculty Development Programme on Data Science",
            "date_of_the_event_from_to": "20.06.2026 – 24.06.2026",
            "nature_of_the_programme_worksh": "Course",
            "name_of_the_funding_agency": "Tamil Nadu State Council for Higher Education, Chennai",
            "purpose": "Faculty Training",
            "date_of_grant": "10.06.2026",
            "amount": "50000"
          }
        ]
      },
      {
        "key": "4_4_4",
        "sheetName": "4.4",
        "title": "4.4  Endowments Established (this academic year)",
        "badge": "Attribute 4 - 4.4",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_endowment",
            "label": "Name of the Endowment",
            "width": "w-52"
          },
          {
            "key": "purpose_of_the_endowment",
            "label": "Purpose of the Endowment",
            "width": "w-52"
          },
          {
            "key": "instituted_by_alumni_others_if",
            "label": "Instituted By (Alumni/Others).If Alumni, mention the Batch and Programme",
            "width": "w-52"
          },
          {
            "key": "instituted_by_with_complete_ad",
            "label": "Instituted By (with complete address)",
            "width": "w-52"
          },
          {
            "key": "date_of_institution_dd_mm_yyyy",
            "label": "Date of Institution DD.MM.YYYY",
            "width": "w-52"
          },
          {
            "key": "amount",
            "label": "Amount (₹)",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_endowment": "Dr. A. Joseph Memorial Endowment",
            "purpose_of_the_endowment": "To provide financial assistance to meritorious students",
            "instituted_by_alumni_others_if": "Alumni - 2023 -2026 - BSc Computer Science",
            "instituted_by_with_complete_ad": "Mr. A. Joseph, 25 Gandhi Road, Chennai – 600034, Tamil Nadu",
            "date_of_institution_dd_mm_yyyy": "15.07.2026",
            "amount": "100000"
          },
          {
            "s_no": "2",
            "name_of_the_endowment": "Dr. B. Thomas Research Endowment",
            "purpose_of_the_endowment": "To support student research projects and research-related activities",
            "instituted_by_alumni_others_if": "Others",
            "instituted_by_with_complete_ad": "Dr. B. Thomas, 18 College Road, Coimbatore – 641018, Tamil Nadu",
            "date_of_institution_dd_mm_yyyy": "05.08.2026",
            "amount": "200000"
          }
        ]
      },
      {
        "key": "4_4_5",
        "sheetName": "4.5",
        "title": "4.5 Details of Endowment Lectures/Workshops conducted (Instituted in the Current or Previous Academic years)",
        "badge": "Attribute 4 - 4.5",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_endowment_lecture_",
            "label": "Name of the Endowment Lecture /Workshop",
            "width": "w-52"
          },
          {
            "key": "title_of_the_talk_workshop",
            "label": "Title of the Talk/Workshop",
            "width": "w-52"
          },
          {
            "key": "resource_person_s_name_designa",
            "label": "Resource Person’s Name, Designation, Affiliation and Complete Address",
            "width": "w-52"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "beneficiaries",
            "label": "Beneficiaries",
            "width": "w-32"
          },
          {
            "key": "no_of_beneficiaries",
            "label": "No. of Beneficiaries",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_endowment_lecture_": "Dr. A. Joseph Memorial Endowment",
            "title_of_the_talk_workshop": "Emerging Trends in Artificial Intelligence and its Applications",
            "resource_person_s_name_designa": "Dr. R. Kumar, Professor, Department of Computer Science, ABC University, 25 University Road, Chennai – 600025, Tamil Nadu",
            "date": "15.07.2026",
            "beneficiaries": "UG & PG Students of Computer Science",
            "no_of_beneficiaries": "125"
          },
          {
            "s_no": "2",
            "name_of_the_endowment_lecture_": "Alumni Excellence Endowment",
            "title_of_the_talk_workshop": "Career Opportunities and Industry Readiness",
            "resource_person_s_name_designa": "Mr. Arun Joseph, Senior Manager, XYZ Technologies Pvt. Ltd., 45 MG Road, Bengaluru – 560001, Karnataka",
            "date": "25.07.2026",
            "beneficiaries": "Final-Year UG Students",
            "no_of_beneficiaries": "180"
          }
        ]
      }
    ]
  },
  {
    "id": "att5",
    "cardNumber": 5,
    "cardTitle": "Attribute V - Teaching-Learning & E-Content",
    "cardCode": "Attribute 5",
    "cardSubtitle": "MoUs Signed, Industry Linkages, Four-Quadrant E-Content Packages & Pedagogical Innovations (5.1 - 5.6)",
    "icon": "laptop",
    "color": "cyan",
    "sheets": [
      {
        "key": "5_5_1",
        "sheetName": "5.1",
        "title": "Attribute V",
        "badge": "Attribute 5 - 5.1",
        "instruction": "Learning and Teaching",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "programme",
            "label": "Programme",
            "width": "w-32"
          },
          {
            "key": "class",
            "label": "Class",
            "width": "w-32"
          },
          {
            "key": "name_of_the_faculty_member",
            "label": "Name of the Faculty Member",
            "width": "w-52"
          },
          {
            "key": "course_code",
            "label": "Course Code",
            "width": "w-32"
          },
          {
            "key": "course_title",
            "label": "Course Title",
            "width": "w-32"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "pedagogical_approach_adopted",
            "label": "Pedagogical approach adopted",
            "width": "w-52"
          },
          {
            "key": "platform_offline_jostel_if_oth",
            "label": "Platform (OFFLINE/JosTEL/if others, mention the name platform)",
            "width": "w-52"
          },
          {
            "key": "semester_odd_even",
            "label": "Semester (ODD/Even)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "programme": "B.Sc. Computer Science",
            "class": "III B.Sc. CS",
            "name_of_the_faculty_member": "Dr. A. Vimal Jerald",
            "course_code": "23UCSCC501",
            "course_title": "Artificial Intelligence",
            "date": "15.07.2026",
            "pedagogical_approach_adopted": "Flipped Classroom and Problem-Based Learning",
            "platform_offline_jostel_if_oth": "JosTEL",
            "semester_odd_even": "ODD"
          }
        ]
      },
      {
        "key": "5_5_2",
        "sheetName": "5.2",
        "title": "5.2 Assessment Practices Employed by the Faculty",
        "badge": "Attribute 5 - 5.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "programme",
            "label": "Programme",
            "width": "w-32"
          },
          {
            "key": "class",
            "label": "Class",
            "width": "w-32"
          },
          {
            "key": "name_of_the_faculty_member",
            "label": "Name of the Faculty Member",
            "width": "w-52"
          },
          {
            "key": "course_code",
            "label": "Course Code",
            "width": "w-32"
          },
          {
            "key": "course_title",
            "label": "Course Title",
            "width": "w-32"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "assessment_component",
            "label": "Assessment Component",
            "width": "w-52"
          },
          {
            "key": "if_part_of_cia_mention_the_com",
            "label": "If part of CIA, Mention the Component and Level",
            "width": "w-52"
          },
          {
            "key": "platform_offline_jostel_if_oth",
            "label": "Platform (OFFLINE/JosTEL/if others, mention the name platform)",
            "width": "w-52"
          },
          {
            "key": "semester_odd_even",
            "label": "Semester (ODD/Even)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "programme": "B.Sc. Computer Science",
            "class": "III B.Sc. CS",
            "name_of_the_faculty_member": "Dr. A. Vimal Jerald",
            "course_code": "UCSC501",
            "course_title": "Artificial Intelligence",
            "date": "15.07.2026",
            "assessment_component": "Quiz / Formative Assessment",
            "if_part_of_cia_mention_the_com": "C2- K4",
            "platform_offline_jostel_if_oth": "JosTEL",
            "semester_odd_even": "ODD"
          },
          {
            "s_no": "2",
            "programme": "B.Com.",
            "class": "II B.Com.",
            "name_of_the_faculty_member": "Dr. R. Lenin",
            "course_code": "UCOC302",
            "course_title": "Financial Accounting",
            "date": "18.07.2026",
            "assessment_component": "Case Study",
            "if_part_of_cia_mention_the_com": "Library - K3",
            "platform_offline_jostel_if_oth": "JosTEL",
            "semester_odd_even": "ODD"
          },
          {
            "s_no": "3",
            "programme": "B.A. English",
            "class": "I B.A. English",
            "name_of_the_faculty_member": "Dr. I. Carol",
            "course_code": "UAEN101",
            "course_title": "Communicative English",
            "date": "20.07.2026",
            "assessment_component": "Assignment",
            "if_part_of_cia_mention_the_com": "-",
            "platform_offline_jostel_if_oth": "OFFLINE",
            "semester_odd_even": "EVEN"
          },
          {
            "s_no": "4",
            "programme": "B.Sc. Physics",
            "class": "II B.Sc. Physics",
            "name_of_the_faculty_member": "Dr. V. Swabna",
            "course_code": "UPHC204",
            "course_title": "Quantum Physics",
            "date": "22.07.2026",
            "assessment_component": "Online Quiz",
            "if_part_of_cia_mention_the_com": "-",
            "platform_offline_jostel_if_oth": "Wayground",
            "semester_odd_even": "EVEN"
          }
        ]
      },
      {
        "key": "5_5_3",
        "sheetName": "5.3",
        "title": "5.3 Remedial Coaching Conducted",
        "badge": "Attribute 5 - 5.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "teaching_methodology",
            "label": "Teaching Methodology",
            "width": "w-52"
          },
          {
            "key": "mention_yes_no",
            "label": "Mention YES/NO",
            "width": "w-32"
          },
          {
            "key": "no_of_staff_using_the_tl_metho",
            "label": "No. of Staff Using the TL Methodology",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1.",
            "teaching_methodology": "Inclusive Remedial Teaching",
            "mention_yes_no": "Yes",
            "no_of_staff_using_the_tl_metho": "8"
          },
          {
            "s_no": "2",
            "teaching_methodology": "Peer assisted Remedial Teaching",
            "mention_yes_no": "Yes",
            "no_of_staff_using_the_tl_metho": "5"
          },
          {
            "s_no": "3",
            "teaching_methodology": "Multi Sensory Remedial Teaching",
            "mention_yes_no": "No",
            "no_of_staff_using_the_tl_metho": "0"
          },
          {
            "s_no": "4",
            "teaching_methodology": "Skill Based Remedial Teaching",
            "mention_yes_no": "Yes",
            "no_of_staff_using_the_tl_metho": "6"
          },
          {
            "s_no": "5",
            "teaching_methodology": "Individualized Teacher Interventions",
            "mention_yes_no": "Yes",
            "no_of_staff_using_the_tl_metho": "4"
          }
        ]
      },
      {
        "key": "5_5_4",
        "sheetName": "5.4",
        "title": "5.4  Support to Fast Learners",
        "badge": "Attribute 5 - 5.4",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_programme",
            "label": "Name of the Programme",
            "width": "w-52"
          },
          {
            "key": "name_of_the_faculty_member_in_",
            "label": "Name of the Faculty Member in-charge",
            "width": "w-52"
          },
          {
            "key": "name_of_the_club_involved_if_a",
            "label": "Name of the Club involved, if any",
            "width": "w-52"
          },
          {
            "key": "details_of_resource_person",
            "label": "Details of Resource Person",
            "width": "w-52"
          },
          {
            "key": "date_from_to_dd_mm_yyyy",
            "label": "Date FROM - TO                 DD.MM.YYYY",
            "width": "w-52"
          },
          {
            "key": "no_of_beneficiaries",
            "label": "No. of Beneficiaries",
            "width": "w-52"
          },
          {
            "key": "strategy_adopted_by_the_depart",
            "label": "Strategy adopted by the Department to identify the fast learners",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_programme": "Advanced Problem-Solving and Competitive Programming",
            "name_of_the_faculty_member_in_": "Dr. Dennis Edward Fernando",
            "name_of_the_club_involved_if_a": "Programming Club",
            "details_of_resource_person": "Mr. Arun Joseph, Senior Software Engineer, ABC Technologies Pvt. Ltd., 45 MG Road, Bengaluru – 560001, Karnataka",
            "date_from_to_dd_mm_yyyy": "01.08.2026 – 05.08.2026",
            "no_of_beneficiaries": "35",
            "strategy_adopted_by_the_depart": "Identified through class performance, programming aptitude, coding activities and performance in departmental assessments"
          },
          {
            "s_no": "2",
            "name_of_the_programme": "Student Research and Innovation Mentoring Programme",
            "name_of_the_faculty_member_in_": "Dr. V. Jude Nirmal",
            "name_of_the_club_involved_if_a": "Innovation Club",
            "details_of_resource_person": "Dr. S. Rajesh, Research Scientist, National Research Institute, Chennai – 600020, Tamil Nadu",
            "date_from_to_dd_mm_yyyy": "10.08.2026 – 14.08.2026",
            "no_of_beneficiaries": "20",
            "strategy_adopted_by_the_depart": "Identified based on academic merit, innovation/project performance, participation in research activities and faculty recommendation"
          }
        ]
      },
      {
        "key": "5_5_5",
        "sheetName": "5.5",
        "title": "5.5 Industry-Academia Collaboration: MoUs / Linkages",
        "badge": "Attribute 5 - 5.5",
        "instruction": "Details of MoU/Linkage",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "nature_i_n",
            "label": "Nature (I/N)",
            "width": "w-32"
          },
          {
            "key": "type_mou_linkage",
            "label": "Type (MoU/Linkage)",
            "width": "w-52"
          },
          {
            "key": "name_and_address_of_the_organi",
            "label": "Name and Address of the Organisation with which MoU/Linkage is Established",
            "width": "w-52"
          },
          {
            "key": "type_of_the_organisation_insti",
            "label": "Type of the Organisation  (Institution/ Industry/ Corporate House, etc.,)",
            "width": "w-52"
          },
          {
            "key": "date_of_establishment_of_mou_l",
            "label": "Date of Establishment of MoU/Linkage",
            "width": "w-52"
          },
          {
            "key": "duration_in_years",
            "label": "Duration in Years",
            "width": "w-52"
          },
          {
            "key": "nature_of_activity_student_exc",
            "label": "Nature of Activity (Student Exchange/Faculty Exchange/Networking and Sharing of Resources/Mentorship Programmes/Research Colloboration/Industry/Community Collaboration/Internship/Placement/Apprenticeship/Others etc.)",
            "width": "w-52"
          },
          {
            "key": "date_of_activity",
            "label": "Date of Activity",
            "width": "w-52"
          },
          {
            "key": "number_of_students_participati",
            "label": "Number of Students  participating in Activities related to MoU/Linkage",
            "width": "w-52"
          },
          {
            "key": "number_of_faculty_participatin",
            "label": "Number of Faculty participating in Activities related to MoU/Linkage",
            "width": "w-52"
          },
          {
            "key": "outcome",
            "label": "Outcome",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "nature_i_n": "N",
            "type_mou_linkage": "MoU",
            "name_and_address_of_the_organi": "ABC Technologies Pvt. Ltd., 25 Anna Salai, Chennai – 600002, Tamil Nadu",
            "type_of_the_organisation_insti": "Industry",
            "date_of_establishment_of_mou_l": "15.07.2026",
            "duration_in_years": "3",
            "nature_of_activity_student_exc": "Internship",
            "date_of_activity": "20.07.2026",
            "number_of_students_participati": "25",
            "number_of_faculty_participatin": "2",
            "outcome": "Internship opportunities and placement support"
          },
          {
            "s_no": "1",
            "nature_i_n": "N",
            "type_mou_linkage": "MoU",
            "name_and_address_of_the_organi": "ABC Technologies Pvt. Ltd., 25 Anna Salai, Chennai – 600002, Tamil Nadu",
            "type_of_the_organisation_insti": "Industry",
            "date_of_establishment_of_mou_l": "15.07.2026",
            "duration_in_years": "3",
            "nature_of_activity_student_exc": "Placement",
            "date_of_activity": "10.09.2026",
            "number_of_students_participati": "30",
            "number_of_faculty_participatin": "2",
            "outcome": "opportunities and placement support"
          },
          {
            "s_no": "2",
            "nature_i_n": "I",
            "type_mou_linkage": "MoU",
            "name_and_address_of_the_organi": "University of Melbourne, Melbourne, Australia",
            "type_of_the_organisation_insti": "Institution",
            "date_of_establishment_of_mou_l": "01.08.2026",
            "duration_in_years": "5",
            "nature_of_activity_student_exc": "Faculty Exchange / Research Collaboration",
            "date_of_activity": "05.08.2026",
            "number_of_students_participati": "10",
            "number_of_faculty_participatin": "3",
            "outcome": "Faculty interaction and collaborative research"
          },
          {
            "s_no": "3",
            "nature_i_n": "N",
            "type_mou_linkage": "Linkage",
            "name_and_address_of_the_organi": "XYZ Industries Ltd., Coimbatore – 641018, Tamil Nadu",
            "type_of_the_organisation_insti": "Corporate House",
            "date_of_establishment_of_mou_l": "10.06.2026",
            "duration_in_years": "2",
            "nature_of_activity_student_exc": "Industry Visit / Skill Development",
            "date_of_activity": "25.07.2026",
            "number_of_students_participati": "45",
            "number_of_faculty_participatin": "2",
            "outcome": "Enhanced industry exposure and practical skills"
          }
        ]
      },
      {
        "key": "5_5_6",
        "sheetName": "5.6",
        "title": "5.6 E-contents (Four Quadrant) created by the Faculty",
        "badge": "Attribute 5 - 5.6",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "programme",
            "label": "Programme",
            "width": "w-32"
          },
          {
            "key": "class",
            "label": "Class",
            "width": "w-32"
          },
          {
            "key": "name_of_the_faculty_member",
            "label": "Name of the Faculty Member",
            "width": "w-52"
          },
          {
            "key": "course_code",
            "label": "Course Code",
            "width": "w-32"
          },
          {
            "key": "course_title",
            "label": "Course Title",
            "width": "w-32"
          },
          {
            "key": "youtube_link",
            "label": "Youtube Link",
            "width": "w-32"
          },
          {
            "key": "semester_odd_even",
            "label": "Semester (ODD/Even)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "programme": "B.Sc. Computer Science",
            "class": "III B.Sc. CS",
            "name_of_the_faculty_member": "Dr. A. Vimal Jerald",
            "course_code": "23UCSCC501",
            "course_title": "Artificial Intelligence",
            "youtube_link": "http://youtu/s5PRxCKSZK0?si=561USSSaAn0OmIIz",
            "semester_odd_even": "ODD"
          }
        ]
      }
    ]
  },
  {
    "id": "att6",
    "cardNumber": 6,
    "cardTitle": "Attribute VI - Extension Activities & Student Support",
    "cardCode": "Attribute 6",
    "cardSubtitle": "Department Associations, Student Clubs, Community Outreach, Extension & Social Projects (6.1 - 6.5)",
    "icon": "heart-handshake",
    "color": "rose",
    "sheets": [
      {
        "key": "6_6_1",
        "sheetName": "6.1",
        "title": "6.1 Departmental Academic and Student Support & Development Activities (other than club activities)",
        "badge": "Attribute 6 - 6.1",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "column_1",
            "label": "Column 1",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "column_1": "6.1 Departmental Academic and Student Support & Development Activities (other than club activities)"
          }
        ]
      },
      {
        "key": "6_6_2",
        "sheetName": "6.2",
        "title": "6.2 Guidance for Competitive Examinations",
        "badge": "Attribute 6 - 6.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_programme",
            "label": "Name of the Programme",
            "width": "w-52"
          },
          {
            "key": "name_of_the_examination_net_se",
            "label": "Name of the Examination (NET, SET, CA, TNPSC, UPSC, JAM, etc.)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_faculty_organising",
            "label": "Name of the Faculty Organising the Activity",
            "width": "w-52"
          },
          {
            "key": "resource_person_s_name_designa",
            "label": "Resource Person’s Name, Designation, Affiliation and Complete Address",
            "width": "w-52"
          },
          {
            "key": "date_dd_mm_yyyy",
            "label": "Date (DD.MM.YYYY)",
            "width": "w-52"
          },
          {
            "key": "no_of_beneficiaries",
            "label": "No. of Beneficiaries",
            "width": "w-52"
          },
          {
            "key": "no_of_students_passing_the_exa",
            "label": "No. of Students passing the Exams",
            "width": "w-52"
          },
          {
            "key": "name_of_the_external_agency_if",
            "label": "Name of the External Agency if any",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_programme": "NET/SET Coaching Programme",
            "name_of_the_examination_net_se": "UGC-NET",
            "name_of_the_faculty_organising": "Dr. A. Vimal Jerald",
            "resource_person_s_name_designa": "Dr. R. Kumar, Assistant Professor, Department of Computer Science, ABC University, Chennai – 600025, Tamil Nadu",
            "date_dd_mm_yyyy": "15.07.2026",
            "no_of_beneficiaries": "60",
            "no_of_students_passing_the_exa": "8",
            "name_of_the_external_agency_if": "ABC Academy, Chennai"
          },
          {
            "s_no": "2",
            "name_of_the_programme": "Competitive Examination Guidance Programme",
            "name_of_the_examination_net_se": "TNPSC Group I & II",
            "name_of_the_faculty_organising": "Dr. R. Lenin",
            "resource_person_s_name_designa": "Mr. S. Rajesh, Civil Services Trainer, Bright Career Academy, 25 Anna Salai, Chennai – 600002, Tamil Nadu",
            "date_dd_mm_yyyy": "20.07.2026",
            "no_of_beneficiaries": "85",
            "no_of_students_passing_the_exa": "12",
            "name_of_the_external_agency_if": "Bright Career Academy, Chennai"
          }
        ]
      },
      {
        "key": "6_6_3",
        "sheetName": "6.3",
        "title": "6.3 Students Pursuing other Degree / Programmes (Offline/ODL/Online/Blended)",
        "badge": "Attribute 6 - 6.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "register_number",
            "label": "Register Number",
            "width": "w-52"
          },
          {
            "key": "name_of_the_student",
            "label": "Name of the Student",
            "width": "w-52"
          },
          {
            "key": "mode_offline_odl_online_blende",
            "label": "Mode  (Offline/ODL/Online/Blended)",
            "width": "w-52"
          },
          {
            "key": "programme_pursuing",
            "label": "Programme Pursuing",
            "width": "w-52"
          },
          {
            "key": "name_address_of_the_institutio",
            "label": "Name & Address of the  Institution",
            "width": "w-52"
          },
          {
            "key": "duration_of_the_programme",
            "label": "Duration of the Programme",
            "width": "w-52"
          },
          {
            "key": "year_of_completion",
            "label": "Year of Completion",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "register_number": "26UCS101",
            "name_of_the_student": "Arun Kumar",
            "mode_offline_odl_online_blende": "Online",
            "programme_pursuing": "B.A. Psychology",
            "name_address_of_the_institutio": "ABC University, 25 University Road, Chennai – 600025, Tamil Nadu",
            "duration_of_the_programme": "3 Years",
            "year_of_completion": "2028"
          },
          {
            "s_no": "2",
            "register_number": "26UCO115",
            "name_of_the_student": "Priya Joseph",
            "mode_offline_odl_online_blende": "ODL",
            "programme_pursuing": "B.Com.",
            "name_address_of_the_institutio": "Tamil Nadu Open University, 577 Anna Salai, Chennai – 600015, Tamil Nadu",
            "duration_of_the_programme": "3 Years",
            "year_of_completion": "2029"
          },
          {
            "s_no": "3",
            "register_number": "26UBA203",
            "name_of_the_student": "Rahul Raj",
            "mode_offline_odl_online_blende": "Offline",
            "programme_pursuing": "Diploma in Digital Marketing",
            "name_address_of_the_institutio": "XYZ Institute of Management, 18 MG Road, Coimbatore – 641018, Tamil Nadu",
            "duration_of_the_programme": "1 Year",
            "year_of_completion": "2027"
          }
        ]
      },
      {
        "key": "6_6_4",
        "sheetName": "6.4",
        "title": "6.4  Activities of various Clubs of the Department",
        "badge": "Attribute 6 - 6.4",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "nature_of_club_technical_cultu",
            "label": "Nature of Club (Technical/Cultural/Domain/Others)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_club",
            "label": "Name of the Club",
            "width": "w-52"
          },
          {
            "key": "nature_of_activity",
            "label": "Nature of Activity",
            "width": "w-52"
          },
          {
            "key": "industry_external_partner_invo",
            "label": "Industry / External Partner Involved",
            "width": "w-52"
          },
          {
            "key": "nature_of_collaboration_role_o",
            "label": "Nature of Collaboration / Role of Industry",
            "width": "w-52"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "no_of_participants_from_other_",
            "label": "No. of Participants from Other Institutions / Departments",
            "width": "w-52"
          },
          {
            "key": "name_of_institutions_departmen",
            "label": "Name of Institutions / Departments Participated",
            "width": "w-52"
          },
          {
            "key": "no_of_participants_from_parent",
            "label": "No. of Participants from Parent Department",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "nature_of_club_technical_cultu": "Technical",
            "name_of_the_club": "Coding Club",
            "nature_of_activity": "Workshop on Generative AI",
            "industry_external_partner_invo": "ABC Technologies Pvt. Ltd., 25 Anna Salai, Chennai – 600002, Tamil Nadu",
            "nature_of_collaboration_role_o": "Industry Expert Training and Mentoring",
            "date": "15.07.2026",
            "no_of_participants_from_other_": "20",
            "name_of_institutions_departmen": "1.) Holy Cross College (Autonomous), Tiruchirappalli 2.) Jamal Mohammed College (Autonomous)",
            "no_of_participants_from_parent": "45"
          },
          {
            "s_no": "2",
            "nature_of_club_technical_cultu": "Cultural",
            "name_of_the_club": "Cultural Club",
            "nature_of_activity": "Traditional Arts and Cultural Heritage Workshop",
            "industry_external_partner_invo": "Tamil Nadu Folk Arts Academy, 15 Cultural Centre Road, Chennai – 600005, Tamil Nadu",
            "nature_of_collaboration_role_o": "Expert Demonstration and Cultural Training",
            "date": "20.07.2026",
            "no_of_participants_from_other_": "30",
            "name_of_institutions_departmen": "1.)Bishop Heber College (Autonomous), Tiruchirappalli 2.) Indira Gandhi College, Tiruchirappalli",
            "no_of_participants_from_parent": "50"
          },
          {
            "s_no": "3",
            "nature_of_club_technical_cultu": "Wellness",
            "name_of_the_club": "Wellness Club",
            "nature_of_activity": "Mental Health and Wellness Awareness Programme",
            "industry_external_partner_invo": "MindCare Wellness Centre, 25 College Road, Tiruchirappalli – 620002, Tamil Nadu",
            "nature_of_collaboration_role_o": "Expert Session and Wellness Awareness Training",
            "date": "25.07.2026",
            "no_of_participants_from_other_": "25",
            "name_of_institutions_departmen": "Department of Commerce, SJC",
            "no_of_participants_from_parent": "80"
          },
          {
            "s_no": "4",
            "nature_of_club_technical_cultu": "Sports",
            "name_of_the_club": "Sports Club",
            "nature_of_activity": "Sports Fitness and Performance Enhancement Camp",
            "industry_external_partner_invo": "Elite Sports Academy, 40 Stadium Road, Tiruchirappalli – 620001, Tamil Nadu",
            "nature_of_collaboration_role_o": "Sports Training, Fitness Assessment and Coaching",
            "date": "01.08.2026",
            "no_of_participants_from_other_": "35",
            "name_of_institutions_departmen": "Department of Physical Education, English, Tamil, SJC",
            "no_of_participants_from_parent": "100"
          },
          {
            "s_no": "5",
            "nature_of_club_technical_cultu": "Gender Equity",
            "name_of_the_club": "Gender Equity Club",
            "nature_of_activity": "Gender Sensitisation and Inclusive Leadership Programme",
            "industry_external_partner_invo": "Centre for Gender Studies, 10 University Road, Chennai – 600025, Tamil Nadu",
            "nature_of_collaboration_role_o": "Expert Training and Gender Sensitisation",
            "date": "08.08.2026",
            "no_of_participants_from_other_": "30",
            "name_of_institutions_departmen": "Department of Social Work and Department of English, SJC",
            "no_of_participants_from_parent": "75"
          }
        ]
      },
      {
        "key": "6_6_5",
        "sheetName": "6.5",
        "title": "6.5 Establishment of Student Chapters of Professional Bodies",
        "badge": "Attribute 6 - 6.5",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No",
            "width": "w-16"
          },
          {
            "key": "reg_number_of_the_student",
            "label": "Reg. Number of the Student",
            "width": "w-52"
          },
          {
            "key": "name_of_the_student",
            "label": "Name of the Student",
            "width": "w-52"
          },
          {
            "key": "details_of_the_professional_bo",
            "label": "Details of the Professional Body",
            "width": "w-52"
          },
          {
            "key": "name_of_the_student_chapter",
            "label": "Name of the Student Chapter",
            "width": "w-52"
          },
          {
            "key": "date_of_establishment",
            "label": "Date of Establishment",
            "width": "w-52"
          },
          {
            "key": "establishment_fee_if_any",
            "label": "Establishment Fee (if any)",
            "width": "w-52"
          },
          {
            "key": "financial_support_from_the_man",
            "label": "Financial Support from the Management (in Rupees)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "reg_number_of_the_student": "26UCS101",
            "name_of_the_student": "Arun Kumar",
            "details_of_the_professional_bo": "Computer Society of India (CSI), Chennai Chapter, Chennai – 600018, Tamil Nadu",
            "name_of_the_student_chapter": "CSI Student Chapter – SJC",
            "date_of_establishment": "15.07.2026",
            "establishment_fee_if_any": "2000",
            "financial_support_from_the_man": "2000"
          },
          {
            "s_no": "2",
            "reg_number_of_the_student": "26UCS115",
            "name_of_the_student": "Priya Joseph",
            "details_of_the_professional_bo": "Indian Society for Technical Education (ISTE), New Delhi – 110016",
            "name_of_the_student_chapter": "ISTE Student Chapter – SJC",
            "date_of_establishment": "20.07.2026",
            "establishment_fee_if_any": "1500",
            "financial_support_from_the_man": "1500"
          },
          {
            "s_no": "3",
            "reg_number_of_the_student": "26UCO203",
            "name_of_the_student": "Rahul Raj",
            "details_of_the_professional_bo": "Indian Commerce Association (ICA), New Delhi – 110001",
            "name_of_the_student_chapter": "ICA Student Chapter – SJC",
            "date_of_establishment": "25.07.2026",
            "establishment_fee_if_any": "1000",
            "financial_support_from_the_man": "Nil"
          }
        ]
      }
    ]
  },
  {
    "id": "att7",
    "cardNumber": 7,
    "cardTitle": "Attribute VII - Financial Support & Management Grants",
    "cardCode": "Attribute 7",
    "cardSubtitle": "Seed Money for Research & Patents, Endowments Established, Financial Assistance for Faculty (7.1 - 7.4)",
    "icon": "coins",
    "color": "orange",
    "sheets": [
      {
        "key": "7_7_1",
        "sheetName": "7.1",
        "title": "Attribute VII",
        "badge": "Attribute 7 - 7.1",
        "instruction": "Management Support",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "title_of_the_course_conference",
            "label": "Title of the Course/Conference",
            "width": "w-52"
          },
          {
            "key": "name_of_the_funding_agency",
            "label": "Name of the Funding Agency",
            "width": "w-52"
          },
          {
            "key": "purpose",
            "label": "Purpose",
            "width": "w-32"
          },
          {
            "key": "amount",
            "label": "Amount (₹)",
            "width": "w-32"
          },
          {
            "key": "no_of_days",
            "label": "No of Days",
            "width": "w-32"
          },
          {
            "key": "period_from_to",
            "label": "Period FROM - TO",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "title_of_the_course_conference": "Faculty Development Programme on Emerging Trends in Artificial Intelligence",
            "name_of_the_funding_agency": "Management, St. Joseph’s College (Autonomous), Tiruchirappalli",
            "purpose": "To conduct Faculty Development Programme and provide training to faculty members",
            "amount": "50000",
            "no_of_days": "3",
            "period_from_to": "15.07.2026 – 17.07.2026"
          },
          {
            "s_no": "2",
            "title_of_the_course_conference": "National Conference on Sustainable Development",
            "name_of_the_funding_agency": "Management, St. Joseph’s College (Autonomous), Tiruchirappalli",
            "purpose": "To organize a National Conference and facilitate academic interaction",
            "amount": "75000",
            "no_of_days": "2",
            "period_from_to": "05.08.2026 – 06.08.2026"
          },
          {
            "s_no": "3",
            "title_of_the_course_conference": "Workshop on Data Analytics and Visualization",
            "name_of_the_funding_agency": "Management, St. Joseph’s College (Autonomous), Tiruchirappalli",
            "purpose": "To provide hands-on training to students and faculty",
            "amount": "30000",
            "no_of_days": "2",
            "period_from_to": "10.08.2026 – 11.08.2026"
          }
        ]
      },
      {
        "key": "7_7_2",
        "sheetName": "7.2",
        "title": "7.2  Seed Money (Received from Management for Patent/Copyright,etc.)",
        "badge": "Attribute 7 - 7.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "amount_in_rupees",
            "label": "Amount in Rupees (₹)",
            "width": "w-52"
          },
          {
            "key": "date",
            "label": "Date",
            "width": "w-32"
          },
          {
            "key": "type_of_intellectual_property_",
            "label": "Type of Intellectual Property (Patent / Copyright / Design, etc.)",
            "width": "w-52"
          },
          {
            "key": "title_of_patent_copyright_desi",
            "label": "Title of Patent / Copyright / Design",
            "width": "w-52"
          },
          {
            "key": "purpose_intended_use_of_seed_m",
            "label": "Purpose / Intended Use of Seed Money",
            "width": "w-52"
          },
          {
            "key": "status",
            "label": "Status",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr. A. Vimal Jerald",
            "amount_in_rupees": "25000",
            "date": "15.07.2026",
            "type_of_intellectual_property_": "Patent – Product",
            "title_of_patent_copyright_desi": "AI-Based Smart Attendance System",
            "purpose_intended_use_of_seed_m": "Patent drafting, documentation and filing expenses",
            "status": "Filed"
          },
          {
            "s_no": "2",
            "name_of_the_staff": "Dr. R. Lenin",
            "amount_in_rupees": "15000",
            "date": "20.07.2026",
            "type_of_intellectual_property_": "Copyright",
            "title_of_patent_copyright_desi": "Digital Learning Resource Management System",
            "purpose_intended_use_of_seed_m": "Copyright registration and documentation",
            "status": "Registered"
          },
          {
            "s_no": "3",
            "name_of_the_staff": "Dr. S. Thulasi Bharathi",
            "amount_in_rupees": "20000",
            "date": "01.08.2026",
            "type_of_intellectual_property_": "Design",
            "title_of_patent_copyright_desi": "Eco-Friendly Educational Product Design",
            "purpose_intended_use_of_seed_m": "Design registration and documentation",
            "status": "Under Process"
          }
        ]
      },
      {
        "key": "7_7_3",
        "sheetName": "7.3",
        "title": "7.3  Seed Money (Received from Management for Research Project)",
        "badge": "Attribute 7 - 7.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "amount_received_from_managemen",
            "label": "Amount Received from Management (₹)",
            "width": "w-52"
          },
          {
            "key": "duration_of_the_project",
            "label": "Duration of the Project",
            "width": "w-52"
          },
          {
            "key": "date_of_grant",
            "label": "Date of Grant",
            "width": "w-32"
          },
          {
            "key": "title_of_the_research_project",
            "label": "Title of the Research Project",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr. S. Thulasi Bharathi",
            "amount_received_from_managemen": "40000",
            "duration_of_the_project": "12 Months",
            "date_of_grant": "01.08.2026",
            "title_of_the_research_project": "Digital Learning Practices and Student Academic Engagement"
          },
          {
            "s_no": "2",
            "name_of_the_staff": "Dr. V. Suganthi",
            "amount_received_from_managemen": "60000",
            "duration_of_the_project": "24 Months",
            "date_of_grant": "05.08.2026",
            "title_of_the_research_project": "Development of a Low-Cost IoT-Based Environmental Monitoring System"
          }
        ]
      },
      {
        "key": "7_7_4",
        "sheetName": "7.4",
        "title": "7.4 Financial Support Received (Financial Support from Management for attending Conference, Seminar, etc.)",
        "badge": "Attribute 7 - 7.4",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "amount_received_from_managemen",
            "label": "Amount Received from Management (₹)",
            "width": "w-52"
          },
          {
            "key": "date_of_financial_support",
            "label": "Date of Financial Support",
            "width": "w-52"
          },
          {
            "key": "purpose",
            "label": "Purpose",
            "width": "w-32"
          },
          {
            "key": "name_address_of_the_organizing",
            "label": "Name & Address of the organizing Institution",
            "width": "w-52"
          },
          {
            "key": "name_of_the_conference_seminar",
            "label": "Name of the Conference / Seminar / Programme",
            "width": "w-52"
          },
          {
            "key": "date_of_event_from_to",
            "label": "Date of Event FROM–TO",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr. A. Vimal Jerald",
            "amount_received_from_managemen": "10000",
            "date_of_financial_support": "15.07.2026",
            "purpose": "To attend National Conference on Artificial Intelligence",
            "name_address_of_the_organizing": "ABC University, Chennai – 600025, Tamil Nadu",
            "name_of_the_conference_seminar": "National Conference on Artificial Intelligence and Emerging Technologies",
            "date_of_event_from_to": "18.07.2026 – 19.07.2026"
          },
          {
            "s_no": "2",
            "name_of_the_staff": "Dr. R. Lenin",
            "amount_received_from_managemen": "7500",
            "date_of_financial_support": "20.07.2026",
            "purpose": "To attend Faculty Development Programme",
            "name_address_of_the_organizing": "XYZ College, Coimbatore – 641018, Tamil Nadu",
            "name_of_the_conference_seminar": "FDP on Research Methodology and Academic Writing",
            "date_of_event_from_to": "25.07.2026 – 29.07.2026"
          },
          {
            "s_no": "3",
            "name_of_the_staff": "Dr. S. Thulasi Bharathi",
            "amount_received_from_managemen": "15000",
            "date_of_financial_support": "01.08.2026",
            "purpose": "To attend International Conference and present research paper",
            "name_address_of_the_organizing": "University of Madras, Chennai – 600005, Tamil Nadu",
            "name_of_the_conference_seminar": "International Conference on Sustainable Development",
            "date_of_event_from_to": "05.08.2026 – 06.08.2026"
          }
        ]
      }
    ]
  },
  {
    "id": "att8",
    "cardNumber": 8,
    "cardTitle": "Attribute VIII - Student Achievements & Progression",
    "cardCode": "Attribute 8",
    "cardSubtitle": "Competitive Examinations Qualified (NET/GATE/CAT/UPSC), Cultural, Sports & Technical Hackathon Awards (8.1 - 8.3)",
    "icon": "trophy",
    "color": "yellow",
    "sheets": [
      {
        "key": "8_8_1",
        "sheetName": "8.1",
        "title": "Attribute VIII",
        "badge": "Attribute 8 - 8.1",
        "instruction": "Student Outcomes",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "register_number",
            "label": "Register Number",
            "width": "w-52"
          },
          {
            "key": "name_of_the_student",
            "label": "Name of the Student",
            "width": "w-52"
          },
          {
            "key": "type_of_competitive_exam_net_s",
            "label": "Type of Competitive Exam (NET/ SET/ GATE /CAT /UPSC/TNPSC/JAM/Others)",
            "width": "w-52"
          },
          {
            "key": "exam_registration_number",
            "label": "Exam Registration Number",
            "width": "w-52"
          },
          {
            "key": "date_of_exam_dd_mm_yyyy",
            "label": "Date of Exam  (DD.MM.YYYY)",
            "width": "w-52"
          },
          {
            "key": "result_status",
            "label": "Result / Status",
            "width": "w-52"
          },
          {
            "key": "score_rank_qualification_detai",
            "label": "Score / Rank / Qualification Details",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "register_number": "26UCS101",
            "name_of_the_student": "Arun Kumar",
            "type_of_competitive_exam_net_s": "GATE",
            "exam_registration_number": "GATE2026CS12345",
            "date_of_exam_dd_mm_yyyy": "15.02.2026",
            "result_status": "Qualified",
            "score_rank_qualification_detai": "AIR 1250"
          },
          {
            "s_no": "2",
            "register_number": "26UCS115",
            "name_of_the_student": "Priya Joseph",
            "type_of_competitive_exam_net_s": "UGC-NET",
            "exam_registration_number": "NET2026COM45678",
            "date_of_exam_dd_mm_yyyy": "10.06.2026",
            "result_status": "Qualified",
            "score_rank_qualification_detai": "NET Qualified"
          },
          {
            "s_no": "3",
            "register_number": "26UBA203",
            "name_of_the_student": "Rahul Raj",
            "type_of_competitive_exam_net_s": "TNPSC Group II",
            "exam_registration_number": "TNPSC2026XXXX",
            "date_of_exam_dd_mm_yyyy": "20.06.2026",
            "result_status": "Appeared",
            "score_rank_qualification_detai": "Awaiting Result"
          },
          {
            "s_no": "4",
            "register_number": "26UEN118",
            "name_of_the_student": "Sneha Mary",
            "type_of_competitive_exam_net_s": "JAM",
            "exam_registration_number": "JAM2026EN56789",
            "date_of_exam_dd_mm_yyyy": "14.02.2026",
            "result_status": "Qualified",
            "score_rank_qualification_detai": "AIR 850"
          }
        ]
      },
      {
        "key": "8_8_2",
        "sheetName": "8.2",
        "title": "8.2 – Students’ Participation and Awards in External Cultural, Sports and Extra-Curricular Events",
        "badge": "Attribute 8 - 8.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "level_international_national_s",
            "label": "Level (International / National / State / University / Regional)",
            "width": "w-52"
          },
          {
            "key": "nature_culturals_sports_events",
            "label": "Nature (culturals/sports events/any other, specify )",
            "width": "w-52"
          },
          {
            "key": "name_of_the_activity",
            "label": "Name of the Activity",
            "width": "w-52"
          },
          {
            "key": "register_number",
            "label": "Register Number",
            "width": "w-52"
          },
          {
            "key": "name_of_the_student",
            "label": "Name of the Student",
            "width": "w-52"
          },
          {
            "key": "name_address_of_the_organising",
            "label": "Name & Address of the Organising Institution",
            "width": "w-52"
          },
          {
            "key": "participation_status_participa",
            "label": "Participation Status (Participated/Position Secured)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_award_position",
            "label": "Name of the Award / Position",
            "width": "w-52"
          },
          {
            "key": "date_of_receipt_of_award",
            "label": "Date of Receipt of Award",
            "width": "w-52"
          },
          {
            "key": "awarding_agency_and_contact_de",
            "label": "Awarding Agency and Contact Details",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "level_international_national_s": "National",
            "nature_culturals_sports_events": "Sports",
            "name_of_the_activity": "Inter-Collegiate Athletics – 100m",
            "register_number": "26UBA101",
            "name_of_the_student": "Arun Kumar",
            "name_address_of_the_organising": "ABC College, Chennai – 600025, Tamil Nadu",
            "participation_status_participa": "Participated",
            "name_of_the_award_position": "—",
            "date_of_receipt_of_award": "—",
            "awarding_agency_and_contact_de": "ABC College, Chennai – 600025, Tamil Nadu"
          },
          {
            "s_no": "2",
            "level_international_national_s": "State",
            "nature_culturals_sports_events": "Sports",
            "name_of_the_activity": "State-Level Badminton Championship",
            "register_number": "26UBC115",
            "name_of_the_student": "Priya Joseph",
            "name_address_of_the_organising": "XYZ College, Coimbatore – 641018, Tamil Nadu",
            "participation_status_participa": "Position Secured",
            "name_of_the_award_position": "Second Prize",
            "date_of_receipt_of_award": "20.07.2026",
            "awarding_agency_and_contact_de": "Tamil Nadu Inter-Collegiate Sports Association, Chennai – 600002, Tamil Nadu"
          },
          {
            "s_no": "4",
            "level_international_national_s": "Regional",
            "nature_culturals_sports_events": "Cultural",
            "name_of_the_activity": "Cultural Dance Competition",
            "register_number": "26UEN118",
            "name_of_the_student": "Sneha Mary",
            "name_address_of_the_organising": "ABC Arts and Science College, Madurai – 625002, Tamil Nadu",
            "participation_status_participa": "Position Secured",
            "name_of_the_award_position": "Best Performance Award",
            "date_of_receipt_of_award": "05.08.2026",
            "awarding_agency_and_contact_de": "ABC Arts and Science College, Madurai – 625002, Tamil Nadu"
          }
        ]
      },
      {
        "key": "8_8_3",
        "sheetName": "8.3",
        "title": "8.3 – Students’ Participation and Awards in External Academic and Co-Curricular Events",
        "badge": "Attribute 8 - 8.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "nature_conference_technical_fe",
            "label": "Nature (Conference/Technical Festivals / Competitions / Hackathons / Workshops)",
            "width": "w-52"
          },
          {
            "key": "programme",
            "label": "Programme",
            "width": "w-32"
          },
          {
            "key": "staff_in_charge",
            "label": "Staff In-charge",
            "width": "w-52"
          },
          {
            "key": "reg_no_of_the_student",
            "label": "Reg. No. of the Student",
            "width": "w-52"
          },
          {
            "key": "name_of_the_student",
            "label": "Name of the Student",
            "width": "w-52"
          },
          {
            "key": "date_from_to",
            "label": "DATE From – To",
            "width": "w-32"
          },
          {
            "key": "name_address_of_the_institutio",
            "label": "Name & Address of the  Institution",
            "width": "w-52"
          },
          {
            "key": "position_secured_if_any",
            "label": "Position Secured  (IF ANY)",
            "width": "w-52"
          },
          {
            "key": "outcome",
            "label": "Outcome",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "nature_conference_technical_fe": "Conference",
            "programme": "International Student Conference on Sustainable Development",
            "staff_in_charge": "Dr. S. Thulasi Bharathi",
            "reg_no_of_the_student": "26UBA118",
            "name_of_the_student": "Sneha Mary",
            "date_from_to": "05.08.2026 – 06.08.2026",
            "name_address_of_the_institutio": "University of Madras, Chennai – 600005, Tamil Nadu",
            "position_secured_if_any": "Best Paper Award",
            "outcome": "Presented research findings and received recognition for the quality of the paper"
          },
          {
            "s_no": "2",
            "nature_conference_technical_fe": "Technical Festival",
            "programme": "Inter-Departmental Poster Presentation",
            "staff_in_charge": "Dr. V. Swabna",
            "reg_no_of_the_student": "26UPH125",
            "name_of_the_student": "David Paul",
            "date_from_to": "10.08.2026 – 10.08.2026",
            "name_address_of_the_institutio": "Department of Electronics, St. Joseph's College (Autonomous), Tiruchirappalli – 620002, Tamil Nadu",
            "position_secured_if_any": "Second Prize",
            "outcome": "Improved scientific communication and presentation skills"
          },
          {
            "s_no": "3",
            "nature_conference_technical_fe": "Workshop",
            "programme": "Hands-on Workshop on Data Analytics",
            "staff_in_charge": "Dr. Dennis Edward Fernando",
            "reg_no_of_the_student": "26UCS203",
            "name_of_the_student": "Rahul Raj",
            "date_from_to": "01.08.2026 – 03.08.2026",
            "name_address_of_the_institutio": "XYZ Institute of Technology, Coimbatore – 641018, Tamil Nadu",
            "position_secured_if_any": "Not Applicable",
            "outcome": "Acquired practical skills in data analysis and visualization"
          }
        ]
      }
    ]
  },
  {
    "id": "att9",
    "cardNumber": 9,
    "cardTitle": "Attribute IX - Research, Publications & IPR",
    "cardCode": "Attribute 9",
    "cardSubtitle": "Ph.D. Guides & Enrolment, Scopus/WoS Papers, Conference Proceedings, Books, Patents & Copyrights (9.1 - 9.13)",
    "icon": "award",
    "color": "violet",
    "sheets": [
      {
        "key": "9_9_1",
        "sheetName": "9.1",
        "title": "Attribute IX",
        "badge": "Attribute 9 - 9.1",
        "instruction": "Research and Innovation Outcomes",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_guide",
            "label": "Name of the Guide",
            "width": "w-52"
          },
          {
            "key": "name_of_the_scholar",
            "label": "Name of the Scholar",
            "width": "w-52"
          },
          {
            "key": "university_ref_no",
            "label": "University Ref. No.",
            "width": "w-52"
          },
          {
            "key": "title_of_the_thesis",
            "label": "Title of the Thesis",
            "width": "w-52"
          },
          {
            "key": "date_of_viva_voce",
            "label": "Date of Viva-Voce",
            "width": "w-52"
          },
          {
            "key": "name_and_place_of_the_universi",
            "label": "Name and Place of the University",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_guide": "Dr A. Rose Venis",
            "name_of_the_scholar": "Raja R",
            "university_ref_no": "32598/Ph.D.K2/Chemistry/Part Time/ October 2015",
            "title_of_the_thesis": "Application of Advanced Oxidation Process",
            "date_of_viva_voce": "06.10.2025",
            "name_and_place_of_the_universi": "Bharathidasan University,               Tiruchirappalli"
          }
        ]
      },
      {
        "key": "9_9_2",
        "sheetName": "9.2",
        "title": "9.2  PhD Thesis Submitted",
        "badge": "Attribute 9 - 9.2",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_guide",
            "label": "Name of the Guide",
            "width": "w-52"
          },
          {
            "key": "name_of_the_scholar",
            "label": "Name of the Scholar",
            "width": "w-52"
          },
          {
            "key": "university_ref_no",
            "label": "University Ref. No.",
            "width": "w-52"
          },
          {
            "key": "title_of_the_thesis",
            "label": "Title of the Thesis",
            "width": "w-52"
          },
          {
            "key": "date_of_submission",
            "label": "Date of Submission",
            "width": "w-52"
          },
          {
            "key": "name_and_place_of_the_universi",
            "label": "Name and Place of the University",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_guide": "Dr. R. Kannan",
            "name_of_the_scholar": "Ms. Priya Joseph",
            "university_ref_no": "PhD/2026/CS/0125",
            "title_of_the_thesis": "Artificial Intelligence-Based Learning Analytics for Higher Education",
            "date_of_submission": "15.07.2026",
            "name_and_place_of_the_universi": "Bharathidasan University, Tiruchirappalli, Tamil Nadu"
          }
        ]
      },
      {
        "key": "9_9_3",
        "sheetName": "9.3",
        "title": "9.3 New Guides",
        "badge": "Attribute 9 - 9.3",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "guideship_reference_number",
            "label": "Guideship Reference Number",
            "width": "w-52"
          },
          {
            "key": "date_of_guideship_granted_comm",
            "label": "Date of Guideship Granted (Communication Date)",
            "width": "w-52"
          },
          {
            "key": "name_and_place_of_the_universi",
            "label": "Name and Place of the University",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. A. Vimal Jerald",
            "guideship_reference_number": "BU/PhD/GUIDE/2026/0125",
            "date_of_guideship_granted_comm": "15.07.2026",
            "name_and_place_of_the_universi": "Bharathidasan University, Tiruchirappalli, Tamil Nadu"
          }
        ]
      },
      {
        "key": "9_9_4",
        "sheetName": "9.4",
        "title": "9.4 PhD Enrolment (New & Existing Scholars)",
        "badge": "Attribute 9 - 9.4",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_guide",
            "label": "Name of the Guide",
            "width": "w-52"
          },
          {
            "key": "name_of_the_co_guide_if_availa",
            "label": "Name of the Co-Guide (if available)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_scholar",
            "label": "Name of the Scholar",
            "width": "w-52"
          },
          {
            "key": "gender",
            "label": "Gender",
            "width": "w-32"
          },
          {
            "key": "jrf_srf",
            "label": "JRF/SRF",
            "width": "w-32"
          },
          {
            "key": "type_ft_pt",
            "label": "Type FT/PT",
            "width": "w-32"
          },
          {
            "key": "college_register_no",
            "label": "College Register No",
            "width": "w-52"
          },
          {
            "key": "university_reference_number_an",
            "label": "University Reference number and date",
            "width": "w-52"
          },
          {
            "key": "title_of_the_thesis_broad_area",
            "label": "Title of the Thesis/Broad Area",
            "width": "w-52"
          },
          {
            "key": "name_place_of_the_university",
            "label": "Name & Place of the University",
            "width": "w-52"
          },
          {
            "key": "new_active_completed_discontin",
            "label": "New/Active / Completed / Discontinued",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_guide": "Dr. R. Lenin",
            "name_of_the_co_guide_if_availa": "",
            "name_of_the_scholar": "Priya Joseph",
            "gender": "Female",
            "jrf_srf": "No Fellowship",
            "type_ft_pt": "PT",
            "college_register_no": "24PHD115",
            "university_reference_number_an": "BU/PhD/2024/0187, 20.08.2024",
            "title_of_the_thesis_broad_area": "Sustainable Business Models for Social Enterprises",
            "name_place_of_the_university": "Bharathidasan University, Tiruchirappalli, Tamil Nadu",
            "new_active_completed_discontin": "Active"
          },
          {
            "s_no": "2",
            "name_of_the_guide": "Dr. A. Aloysius",
            "name_of_the_co_guide_if_availa": "",
            "name_of_the_scholar": "Rahul Raj",
            "gender": "Male",
            "jrf_srf": "SRF",
            "type_ft_pt": "FT",
            "college_register_no": "26PHD203",
            "university_reference_number_an": "BU/PhD/2026/0215, 05.08.2026",
            "title_of_the_thesis_broad_area": "Digital Transformation in Higher Education",
            "name_place_of_the_university": "Bharathidasan University, Tiruchirappalli, Tamil Nadu",
            "new_active_completed_discontin": "New"
          }
        ]
      },
      {
        "key": "9_9_5",
        "sheetName": "9.5",
        "title": "9.5 Consultancy",
        "badge": "Attribute 9 - 9.5",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S. No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "name_of_consultancy_project",
            "label": "Name of Consultancy Project",
            "width": "w-52"
          },
          {
            "key": "client_organisation_agency",
            "label": "Client Organisation / Agency",
            "width": "w-52"
          },
          {
            "key": "date_from_to",
            "label": "Date FROM - TO",
            "width": "w-32"
          },
          {
            "key": "revenue_generated",
            "label": "Revenue Generated (₹)",
            "width": "w-52"
          },
          {
            "key": "no_of_beneficiaries_trainees",
            "label": "No. of Beneficiaries/Trainees",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. A. Vimal Jerald",
            "name_of_consultancy_project": "Development of an AI-Based Student Performance Analytics System",
            "client_organisation_agency": "ABC Technologies Pvt. Ltd., Chennai – 600025, Tamil Nadu",
            "date_from_to": "15.07.2026 – 30.09.2026",
            "revenue_generated": "75000",
            "no_of_beneficiaries_trainees": "25"
          },
          {
            "s_no": "2",
            "name_of_the_faculty": "Dr. R. Lenin",
            "name_of_consultancy_project": "Financial Literacy and Investment Awareness Programme",
            "client_organisation_agency": "XYZ Finance Ltd., Coimbatore – 641018, Tamil Nadu",
            "date_from_to": "20.07.2026 – 25.07.2026",
            "revenue_generated": "40000",
            "no_of_beneficiaries_trainees": "60"
          }
        ]
      },
      {
        "key": "9_9_6",
        "sheetName": "9.6",
        "title": "9.6  Corporate Training",
        "badge": "Attribute 9 - 9.6",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty_corporate_",
            "label": "Name of the Faculty / Corporate Trainer",
            "width": "w-52"
          },
          {
            "key": "title_of_training_programme",
            "label": "Title of Training Programme",
            "width": "w-52"
          },
          {
            "key": "agency_seeking_training_with_c",
            "label": "Agency Seeking Training with Complete Address & Contact Details",
            "width": "w-52"
          },
          {
            "key": "date_from_to_dd_mm_yyyy_dd_mm_",
            "label": "Date FROM – TO (DD.MM.YYYY – DD.MM.YYYY)",
            "width": "w-52"
          },
          {
            "key": "revenue_generated",
            "label": "Revenue Generated (₹)",
            "width": "w-52"
          },
          {
            "key": "no_of_trainees",
            "label": "No. of Trainees",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty_corporate_": "Dr. A. Vimal Jerald",
            "title_of_training_programme": "Corporate Training on Artificial Intelligence and Machine Learning",
            "agency_seeking_training_with_c": "ABC Technologies Pvt. Ltd., Chennai – 600025, Tamil Nadu. Contact: HR Manager, +91-XXXXXXXXXX",
            "date_from_to_dd_mm_yyyy_dd_mm_": "15.07.2026 – 17.07.2026",
            "revenue_generated": "60000",
            "no_of_trainees": "35"
          },
          {
            "s_no": "2",
            "name_of_the_faculty_corporate_": "Dr. R. Lenin",
            "title_of_training_programme": "Training on Financial Analytics and Business Intelligence",
            "agency_seeking_training_with_c": "XYZ Finance Ltd., Coimbatore – 641018, Tamil Nadu. Contact: Training Coordinator, +91-XXXXXXXXXX",
            "date_from_to_dd_mm_yyyy_dd_mm_": "22.07.2026 – 24.07.2026",
            "revenue_generated": "45000",
            "no_of_trainees": "40"
          },
          {
            "s_no": "3",
            "name_of_the_faculty_corporate_": "Dr. S. Thulasi Bharathi",
            "title_of_training_programme": "Corporate Training on Digital Marketing Strategies",
            "agency_seeking_training_with_c": "PQR Solutions Pvt. Ltd., Bengaluru – 560001, Karnataka. Contact: Learning & Development Manager, +91-XXXXXXXXXX",
            "date_from_to_dd_mm_yyyy_dd_mm_": "05.08.2026 – 06.08.2026",
            "revenue_generated": "35000",
            "no_of_trainees": "25"
          }
        ]
      },
      {
        "key": "9_9_7",
        "sheetName": "9.7",
        "title": "9.7 Externally funded Research Projects",
        "badge": "Attribute 9 - 9.7",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_pi_ci_if_applicabl",
            "label": "Name of the PI (CI, if applicable)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_funding_agency",
            "label": "Name of the Funding Agency",
            "width": "w-52"
          },
          {
            "key": "title_of_the_research_project",
            "label": "Title of the Research Project",
            "width": "w-52"
          },
          {
            "key": "type_government_non_government",
            "label": "Type (Government/Non-Government)",
            "width": "w-52"
          },
          {
            "key": "for_non_government_mention_the",
            "label": "For Non-Government,mention the source as IN /CH/BO",
            "width": "w-52"
          },
          {
            "key": "duration_of_the_project",
            "label": "Duration of the Project",
            "width": "w-52"
          },
          {
            "key": "funds_received",
            "label": "Funds Received (₹)",
            "width": "w-52"
          },
          {
            "key": "date_of_award",
            "label": "Date of Award",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_pi_ci_if_applicabl": "Dr. A. Vimal Jerald (Dr. R. Lenin, CI)",
            "name_of_the_funding_agency": "University Grants Commission (UGC)",
            "title_of_the_research_project": "AI-Based Learning Analytics for Early Identification of At-Risk Students",
            "type_government_non_government": "Government",
            "for_non_government_mention_the": "-",
            "duration_of_the_project": "24 Months",
            "funds_received": "1200000",
            "date_of_award": "15.07.2026"
          },
          {
            "s_no": "2",
            "name_of_the_pi_ci_if_applicabl": "Dr. S. Thulasi Bharathi",
            "name_of_the_funding_agency": "Science and Engineering Research Board (SERB)",
            "title_of_the_research_project": "Development of Sustainable Digital Learning Resources for Higher Education",
            "type_government_non_government": "Government",
            "for_non_government_mention_the": "-",
            "duration_of_the_project": "36 Months",
            "funds_received": "1800000",
            "date_of_award": "25.07.2026"
          },
          {
            "s_no": "3",
            "name_of_the_pi_ci_if_applicabl": "Dr. V. Suganthi (Dr. Dennis Edward Fernando, CI)",
            "name_of_the_funding_agency": "ABC Technologies Pvt. Ltd., Chennai",
            "title_of_the_research_project": "IoT-Based Environmental Monitoring and Data Analytics",
            "type_government_non_government": "Non-Government",
            "for_non_government_mention_the": "IN",
            "duration_of_the_project": "18 Months",
            "funds_received": "750000",
            "date_of_award": "05.08.2026"
          }
        ]
      },
      {
        "key": "9_9_8",
        "sheetName": "9.8",
        "title": "9.8  Papers Published in the Journals",
        "badge": "Attribute 9 - 9.8",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No",
            "width": "w-16"
          },
          {
            "key": "name_of_author_s_mention_all_t",
            "label": "Name of Author(s) Mention all the names as it appears in the publication, highlighting the name of the faculty of your department in BOLD letters",
            "width": "w-52"
          },
          {
            "key": "published_in_scopus_web_of_sci",
            "label": "Published in (SCOPUS/WEB OF SCIENCE/OTHERS)",
            "width": "w-52"
          },
          {
            "key": "title_of_the_paper",
            "label": "Title of the Paper",
            "width": "w-52"
          },
          {
            "key": "name_of_the_journal",
            "label": "Name of the Journal",
            "width": "w-52"
          },
          {
            "key": "national_international",
            "label": "National / International",
            "width": "w-52"
          },
          {
            "key": "issn_isbn_no",
            "label": "ISSN/ ISBN No.",
            "width": "w-32"
          },
          {
            "key": "impact_factor",
            "label": "Impact Factor",
            "width": "w-32"
          },
          {
            "key": "h_index",
            "label": "h-index",
            "width": "w-32"
          },
          {
            "key": "no_of_citations_excluding_self",
            "label": "No. of Citations (Excluding Self Citation)",
            "width": "w-52"
          },
          {
            "key": "vol_number_page",
            "label": "Vol ,Number,Page",
            "width": "w-52"
          },
          {
            "key": "month_year",
            "label": "Month &Year",
            "width": "w-32"
          },
          {
            "key": "link_for_the_paper",
            "label": "Link for the paper",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_author_s_mention_all_t": "Dr. A. Vimal Jerald, R. Kumar, S. Joseph",
            "published_in_scopus_web_of_sci": "SCOPUS",
            "title_of_the_paper": "Artificial Intelligence-Based Learning Analytics in Higher Education",
            "name_of_the_journal": "International Journal of Educational Technology",
            "national_international": "International",
            "issn_isbn_no": "2345-6789",
            "impact_factor": "3.2",
            "h_index": "18",
            "no_of_citations_excluding_self": "12",
            "vol_number_page": "Vol. 15, No. 2, pp. 125–138",
            "month_year": "2026-07-01 00:00:00",
            "link_for_the_paper": "https://doi.org/10.xxxx/xxxxx"
          },
          {
            "s_no": "2",
            "name_of_author_s_mention_all_t": "Dr. R. Lenin, P. Raj, M. Kumar",
            "published_in_scopus_web_of_sci": "Web of Science",
            "title_of_the_paper": "Sustainable Business Models for Social Enterprises",
            "name_of_the_journal": "Journal of Sustainable Business Research",
            "national_international": "International",
            "issn_isbn_no": "2456-7890",
            "impact_factor": "2.8",
            "h_index": "15",
            "no_of_citations_excluding_self": "8",
            "vol_number_page": "Vol. 10, No. 3, pp. 45–58",
            "month_year": "2026-08-01 00:00:00",
            "link_for_the_paper": "https://doi.org/10.xxxx/xxxxx"
          },
          {
            "s_no": "3",
            "name_of_author_s_mention_all_t": "Dr. S. Thulasi Bharathi, A. Joseph",
            "published_in_scopus_web_of_sci": "Others – UGC CARE",
            "title_of_the_paper": "Digital Learning Practices and Student Engagement",
            "name_of_the_journal": "Indian Journal of Higher Education Studies",
            "national_international": "National",
            "issn_isbn_no": "2234-5678",
            "impact_factor": "—",
            "h_index": "—",
            "no_of_citations_excluding_self": "3",
            "vol_number_page": "Vol. 8, No. 1, pp. 20–31",
            "month_year": "2026-06-01 00:00:00",
            "link_for_the_paper": "Journal URL"
          }
        ]
      },
      {
        "key": "9_9_9",
        "sheetName": "9.9",
        "title": "9.9 Papers Presented in Conferences",
        "badge": "Attribute 9 - 9.9",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_staff",
            "label": "Name of the Staff",
            "width": "w-52"
          },
          {
            "key": "title_of_the_paper",
            "label": "Title of the Paper",
            "width": "w-52"
          },
          {
            "key": "name_of_the_institution_organi",
            "label": "Name of the Institution / Organising Body",
            "width": "w-52"
          },
          {
            "key": "name_of_the_conference",
            "label": "Name of the Conference",
            "width": "w-52"
          },
          {
            "key": "national_international",
            "label": "National / International",
            "width": "w-52"
          },
          {
            "key": "title_of_the_proceedings_if_pu",
            "label": "Title of the Proceedings, if Published",
            "width": "w-52"
          },
          {
            "key": "title_of_the_book_of_abstracts",
            "label": "Title of the Book of Abstracts, if Published",
            "width": "w-52"
          },
          {
            "key": "volume_issue_page",
            "label": "Volume, Issue & Page",
            "width": "w-52"
          },
          {
            "key": "month_year",
            "label": "Month & Year",
            "width": "w-32"
          },
          {
            "key": "issn_isbn_no",
            "label": "ISSN / ISBN No.",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_staff": "Dr. A. Vimal Jerald",
            "title_of_the_paper": "Artificial Intelligence in Higher Education: Emerging Trends",
            "name_of_the_institution_organi": "National Institute of Technology, Tiruchirappalli – 620015",
            "name_of_the_conference": "National Conference on Emerging Technologies in Education",
            "national_international": "National",
            "title_of_the_proceedings_if_pu": "Proceedings of the National Conference on Emerging Technologies",
            "title_of_the_book_of_abstracts": "Book of Abstracts – NCTE 2026",
            "volume_issue_page": "Vol. 1, pp. 45–52",
            "month_year": "2026-07-01 00:00:00",
            "issn_isbn_no": "978-81-XXXX-XXXX-X"
          },
          {
            "s_no": "2",
            "name_of_the_staff": "Dr. R. Lenin",
            "title_of_the_paper": "Sustainable Business Practices in the Digital Era",
            "name_of_the_institution_organi": "Bharathidasan University, Tiruchirappalli – 620024",
            "name_of_the_conference": "International Conference on Sustainable Business and Innovation",
            "national_international": "International",
            "title_of_the_proceedings_if_pu": "Proceedings of the International Conference on Sustainable Business",
            "title_of_the_book_of_abstracts": "—",
            "volume_issue_page": "pp. 112–119",
            "month_year": "2026-08-01 00:00:00",
            "issn_isbn_no": "978-81-XXXX-XXXX-X"
          },
          {
            "s_no": "3",
            "name_of_the_staff": "Dr. S. Thulasi Bharathi",
            "title_of_the_paper": "Digital Learning and Student Engagement",
            "name_of_the_institution_organi": "St. Joseph’s College (Autonomous), Tiruchirappalli – 620002",
            "name_of_the_conference": "National Seminar on Digital Transformation in Higher Education",
            "national_international": "National",
            "title_of_the_proceedings_if_pu": "—",
            "title_of_the_book_of_abstracts": "Abstract Book – NSDTHE 2026",
            "volume_issue_page": "p. 28",
            "month_year": "2026-08-01 00:00:00",
            "issn_isbn_no": "978-81-XXXX-XXXX-X"
          }
        ]
      },
      {
        "key": "9_9_10",
        "sheetName": "9.10",
        "title": "9.10 Books Published /Books Edited / Chapter Contribution",
        "badge": "Attribute 9 - 9.10",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_author_s",
            "label": "Name of the Author (s)",
            "width": "w-52"
          },
          {
            "key": "published_edited_chapter_contr",
            "label": "Published / Edited / Chapter Contributed",
            "width": "w-52"
          },
          {
            "key": "title_of_the_book",
            "label": "Title of the Book",
            "width": "w-52"
          },
          {
            "key": "if_chapter_contributed_provide",
            "label": "If chapter contributed, provide the Title of the Chapter",
            "width": "w-52"
          },
          {
            "key": "month_and_year_of_publication",
            "label": "Month and Year of Publication",
            "width": "w-52"
          },
          {
            "key": "isbn_no",
            "label": "ISBN No.",
            "width": "w-32"
          },
          {
            "key": "name_place_of_the_publisher",
            "label": "Name & Place  of the Publisher",
            "width": "w-52"
          }
        ],
        "rows": []
      },
      {
        "key": "9_9_11",
        "sheetName": "9.11",
        "title": "9.11 Patents/Copyright/ Trade Mark/ Design Registration/Geographical Indication/ Open Educational Resources",
        "badge": "Attribute 9 - 9.11",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "type_of_ipr_output",
            "label": "Type of IPR / Output",
            "width": "w-52"
          },
          {
            "key": "status_applied_granted_publish",
            "label": "Status (Applied / Granted / Published / Registered)",
            "width": "w-52"
          },
          {
            "key": "title_details_of_the_ipr_publi",
            "label": "Title / Details of the IPR / Publication",
            "width": "w-52"
          },
          {
            "key": "country",
            "label": "Country",
            "width": "w-32"
          },
          {
            "key": "date_of_application_grant_publ",
            "label": "Date of Application / Grant / Publication / Registration",
            "width": "w-52"
          },
          {
            "key": "application_no_ipr_no_certific",
            "label": "Application No. / IPR No. / Certificate No.",
            "width": "w-52"
          },
          {
            "key": "registered_in_the_name_of_sjc_",
            "label": "Registered in the name of \"SJC\" (Yes/No)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_of_the_faculty": "Dr. A. Vimal Jerald",
            "type_of_ipr_output": "Patent",
            "status_applied_granted_publish": "Granted",
            "title_details_of_the_ipr_publi": "AI-Based Smart Attendance and Student Monitoring System",
            "country": "India",
            "date_of_application_grant_publ": "15.07.2026",
            "application_no_ipr_no_certific": "IN202641012345",
            "registered_in_the_name_of_sjc_": "Yes"
          },
          {
            "s_no": "2",
            "name_of_the_faculty": "Dr. R. Lenin",
            "type_of_ipr_output": "Copyright",
            "status_applied_granted_publish": "Registered",
            "title_details_of_the_ipr_publi": "Digital Learning Resource Management System",
            "country": "India",
            "date_of_application_grant_publ": "22.07.2026",
            "application_no_ipr_no_certific": "L-12345/2026",
            "registered_in_the_name_of_sjc_": "No"
          },
          {
            "s_no": "3",
            "name_of_the_faculty": "Dr. S. Thulasi Bharathi",
            "type_of_ipr_output": "Design Registration",
            "status_applied_granted_publish": "Registered",
            "title_details_of_the_ipr_publi": "Eco-Friendly Modular Educational Product Design",
            "country": "India",
            "date_of_application_grant_publ": "05.08.2026",
            "application_no_ipr_no_certific": "345678-001",
            "registered_in_the_name_of_sjc_": "No"
          },
          {
            "s_no": "4",
            "name_of_the_faculty": "Dr. V. Suganthi",
            "type_of_ipr_output": "Trademark",
            "status_applied_granted_publish": "Applied",
            "title_details_of_the_ipr_publi": "EduTech Analytics",
            "country": "India",
            "date_of_application_grant_publ": "10.08.2026",
            "application_no_ipr_no_certific": "TM2026123456",
            "registered_in_the_name_of_sjc_": "Yes"
          },
          {
            "s_no": "5",
            "name_of_the_faculty": "Dr. Dennis Edward Fernando",
            "type_of_ipr_output": "Patent",
            "status_applied_granted_publish": "Applied",
            "title_details_of_the_ipr_publi": "IoT-Based Environmental Monitoring Device",
            "country": "USA",
            "date_of_application_grant_publ": "01.08.2026",
            "application_no_ipr_no_certific": "US2026XXXXXX",
            "registered_in_the_name_of_sjc_": "No"
          }
        ]
      },
      {
        "key": "9_9_12",
        "sheetName": "9.12",
        "title": "9.12 Collaboration with national/international institutions of higher ranking /industries with focus",
        "badge": "Attribute 9 - 9.12",
        "instruction": "Details of Collaboration",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "institution_industry",
            "label": "Institution/Industry",
            "width": "w-52"
          },
          {
            "key": "name_of_the_collaborating_agen",
            "label": "Name of the Collaborating Agency with Contact Details",
            "width": "w-52"
          },
          {
            "key": "purpose_of_collaboration_inter",
            "label": "Purpose of Collaboration ( Interdisciplinary Research/Inter-University National/International Faculty /Community-based Research/Technology Transfer /Any other research collborations)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_faculty",
            "label": "Name of the Faculty",
            "width": "w-52"
          },
          {
            "key": "year_of_collaboration",
            "label": "Year of Collaboration",
            "width": "w-52"
          },
          {
            "key": "duration_of_collaboration",
            "label": "Duration of Collaboration",
            "width": "w-52"
          },
          {
            "key": "nature_of_the_activity",
            "label": "Nature of the Activity",
            "width": "w-52"
          },
          {
            "key": "date_of_activity",
            "label": "Date of Activity",
            "width": "w-52"
          },
          {
            "key": "no_of_beneficiaries_from_the_d",
            "label": "No. of Beneficiaries from the Department",
            "width": "w-52"
          },
          {
            "key": "no_of_beneficiaries_from_the_c",
            "label": "No. of Beneficiaries from the collaborating Institution/Industry",
            "width": "w-52"
          },
          {
            "key": "outcome",
            "label": "Outcome",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "institution_industry": "Institution",
            "name_of_the_collaborating_agen": "National Institute of Technology, Tiruchirappalli – 620015, Tamil Nadu",
            "purpose_of_collaboration_inter": "Interdisciplinary Research",
            "name_of_the_faculty": "Dr. A. Vimal Jerald",
            "year_of_collaboration": "2026",
            "duration_of_collaboration": "2 Years",
            "nature_of_the_activity": "Joint Research Project on AI and Data Analytics",
            "date_of_activity": "15.07.2026 – 30.09.2026",
            "no_of_beneficiaries_from_the_d": "12",
            "no_of_beneficiaries_from_the_c": "8",
            "outcome": "Joint research work initiated and research paper preparation undertaken"
          },
          {
            "s_no": "2",
            "institution_industry": "Industry",
            "name_of_the_collaborating_agen": "ABC Technologies Pvt. Ltd., Chennai – 600025, Tamil Nadu",
            "purpose_of_collaboration_inter": "Technology Transfer",
            "name_of_the_faculty": "Dr. R. Lenin",
            "year_of_collaboration": "2026",
            "duration_of_collaboration": "3 Years",
            "nature_of_the_activity": "Development of Industry-Oriented Software Solution",
            "date_of_activity": "20.07.2026 – 25.08.2026",
            "no_of_beneficiaries_from_the_d": "25",
            "no_of_beneficiaries_from_the_c": "15",
            "outcome": "Prototype developed and technical knowledge transferred"
          },
          {
            "s_no": "3",
            "institution_industry": "Institution",
            "name_of_the_collaborating_agen": "University of Oxford, Oxford, United Kingdom",
            "purpose_of_collaboration_inter": "International Faculty / Research Collaboration",
            "name_of_the_faculty": "Dr. S. Thulasi Bharathi",
            "year_of_collaboration": "2026",
            "duration_of_collaboration": "1 Year",
            "nature_of_the_activity": "Joint Research and Faculty Knowledge Exchange",
            "date_of_activity": "05.08.2026 – 06.08.2026",
            "no_of_beneficiaries_from_the_d": "10",
            "no_of_beneficiaries_from_the_c": "6",
            "outcome": "Research collaboration established and knowledge shared"
          },
          {
            "s_no": "4",
            "institution_industry": "Industry",
            "name_of_the_collaborating_agen": "XYZ Industries Ltd., Coimbatore – 641018, Tamil Nadu",
            "purpose_of_collaboration_inter": "Industry-Academia Research Collaboration",
            "name_of_the_faculty": "Dr. V. Suganthi",
            "year_of_collaboration": "2026",
            "duration_of_collaboration": "2 Years",
            "nature_of_the_activity": "Industry-sponsored Research and Student Interaction",
            "date_of_activity": "10.08.2026",
            "no_of_beneficiaries_from_the_d": "40",
            "no_of_beneficiaries_from_the_c": "20",
            "outcome": "Industry problem identified for collaborative research"
          }
        ]
      },
      {
        "key": "9_9_13",
        "sheetName": "9.13",
        "title": "9. 9.13",
        "badge": "Attribute 9 - 9.13",
        "instruction": "",
        "type": "table",
        "columns": [
          {
            "key": "9_13_incubation_and_start_up_t",
            "label": "9.13 Incubation and Start-up through Technology Business Incubator (TBI)",
            "width": "w-52"
          },
          {
            "key": "field_2",
            "label": "Field 2",
            "width": "w-32"
          },
          {
            "key": "field_3",
            "label": "Field 3",
            "width": "w-32"
          },
          {
            "key": "field_4",
            "label": "Field 4",
            "width": "w-32"
          },
          {
            "key": "name_of_the_tbi_incubation_cen",
            "label": "Name of the TBI / Incubation Centre in SJC: St. Joseph's Start-up Center (JSC)",
            "width": "w-52"
          }
        ],
        "rows": [
          {
            "9_13_incubation_and_start_up_t": "S.No.",
            "field_2": "Name of the Incubated Start-up / Venture",
            "field_3": "Nature / Type of Start-up",
            "field_4": "Mentor Category (Alumni/Entrepreneur/Faculty/Researchers/Industry professionals/Local Community Personal)",
            "name_of_the_tbi_incubation_cen": "Name of the Mentor with Designation and complete details"
          },
          {
            "9_13_incubation_and_start_up_t": "1",
            "field_2": "FrontierWox Tech Pvt Ltd",
            "field_3": "Software / Digital Services",
            "field_4": "Alumni",
            "name_of_the_tbi_incubation_cen": "Mr. Ajay James, CEO, FrontierWox Tech Pvt Ltd, 63 B/5,Gokul Nagar, Vallioor, Tirunelveli - 627117"
          },
          {
            "9_13_incubation_and_start_up_t": "2",
            "field_2": "GreenTech Innovations",
            "field_3": "Clean Technology / IoT",
            "field_4": "Faculty Mentor",
            "name_of_the_tbi_incubation_cen": "Dr. R. Lenin"
          }
        ]
      }
    ]
  },
  {
    "id": "att10",
    "cardNumber": 10,
    "cardTitle": "Attribute X - Institutional Values & Best Practices",
    "cardCode": "Attribute 10",
    "cardSubtitle": "Corporate Social Responsibility (CSR), Environmental Sustainability, Paperless CIA & Institutional Best Practices",
    "icon": "leaf",
    "color": "green",
    "sheets": [
      {
        "key": "10_attribute_x",
        "sheetName": "Attribute X",
        "title": "Attribute X",
        "badge": "Attribute 10 - Attribute X",
        "instruction": "Sustainability (Green initiatives) – Outcomes",
        "type": "table",
        "columns": [
          {
            "key": "s_no",
            "label": "S.No.",
            "width": "w-16"
          },
          {
            "key": "name_and_nature_of_the_activit",
            "label": "Name and Nature of the Activity",
            "width": "w-52"
          },
          {
            "key": "type_government_ngo_industry_r",
            "label": "Type (Government/NGO/Industry/Recognized Body)",
            "width": "w-52"
          },
          {
            "key": "collaborating_agency",
            "label": "Collaborating Agency",
            "width": "w-52"
          },
          {
            "key": "whether_part_of_csr_activities",
            "label": "Whether Part of CSR Activities of the Industry (YES/NO)",
            "width": "w-52"
          },
          {
            "key": "name_of_the_scheme_csr_initiat",
            "label": "Name of the Scheme / CSR Initiative, if any",
            "width": "w-52"
          },
          {
            "key": "sustainability_goal_sdg",
            "label": "Sustainability Goal / SDG",
            "width": "w-52"
          },
          {
            "key": "place_of_activity_full_address",
            "label": "Place of Activity – Full Address",
            "width": "w-52"
          },
          {
            "key": "no_of_students_participating",
            "label": "No. of Students Participating",
            "width": "w-52"
          },
          {
            "key": "details_of_beneficiaries",
            "label": "Details of Beneficiaries",
            "width": "w-52"
          },
          {
            "key": "date_from_to",
            "label": "Date FROM–TO",
            "width": "w-32"
          }
        ],
        "rows": [
          {
            "s_no": "1",
            "name_and_nature_of_the_activit": "Tree Plantation and Environmental Awareness Programme",
            "type_government_ngo_industry_r": "Industry",
            "collaborating_agency": "ABC Industries Pvt. Ltd.",
            "whether_part_of_csr_activities": "YES",
            "name_of_the_scheme_csr_initiat": "Green Campus Initiative",
            "sustainability_goal_sdg": "SDG 13 – Climate Action; SDG 15 – Life on Land",
            "place_of_activity_full_address": "Government Higher Secondary School, Tiruchirappalli – 6200XX",
            "no_of_students_participating": "35",
            "details_of_beneficiaries": "150 School Students and 10 Teachers",
            "date_from_to": "15.07.2026"
          },
          {
            "s_no": "2",
            "name_and_nature_of_the_activit": "Plastic Waste Collection and Awareness Campaign",
            "type_government_ngo_industry_r": "NGO",
            "collaborating_agency": "XYZ Foundation",
            "whether_part_of_csr_activities": "NO",
            "name_of_the_scheme_csr_initiat": "—",
            "sustainability_goal_sdg": "SDG 12 – Responsible Consumption and Production; SDG 14 – Life Below Water",
            "place_of_activity_full_address": "[Full Address], Tiruchirappalli – 6200XX",
            "no_of_students_participating": "50",
            "details_of_beneficiaries": "300 Local Residents",
            "date_from_to": "22.07.2026"
          },
          {
            "s_no": "3",
            "name_and_nature_of_the_activit": "E-Waste Collection and Awareness Programme",
            "type_government_ngo_industry_r": "Industry",
            "collaborating_agency": "ABC Technologies Pvt. Ltd.",
            "whether_part_of_csr_activities": "YES",
            "name_of_the_scheme_csr_initiat": "E-Waste Management Drive",
            "sustainability_goal_sdg": "SDG 12 – Responsible Consumption and Production",
            "place_of_activity_full_address": "St. Joseph’s College (Autonomous), Tiruchirappalli – 620002",
            "no_of_students_participating": "75",
            "details_of_beneficiaries": "500 Students and Staff",
            "date_from_to": "05.08.2026"
          }
        ]
      }
    ]
  }
];
