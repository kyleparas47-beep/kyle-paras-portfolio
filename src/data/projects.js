// Each project gets a card on the home page and its own case study page at /projects/<slug>.
//
// Required: slug, title, tags, problem, approach, outcome.
// Optional (hidden when empty):
//   status                        — e.g. "In progress"; shows a badge on the card and case study
//   summary                       — one-line intro under the case study title (also its link-preview text)
//   year, role, team, stack[]     — shown in the case study header
//   links.github, links.live      — buttons on the card and case study
//   cover { src, thumb, alt, caption, width, height, fit, position, bg }
//                                 — image in /public/projects/; thumb = tighter crop for the card;
//                                   fit "contain" shows it whole on bg
//   features[]                    — what the system does
//   contributions[]               — what you personally built
//   process[] { title, body }     — step-by-step write-up of how it works / how you built it
//   results[]                     — concrete outcomes, ideally with numbers
//   learnings[]                   — what you'd do differently / took away
//   gallery[] { src, alt, caption }
//   charts[] { title, caption, data[{label, value}], max, decimals, highlight, reference{label, value} }
export const projects = [
  {
    slug: "behavioralgraph-gnn-thesis",
    title: "BehavioralGraph: GNN Diabetes-Risk Classification",
    status: "Defended · final revisions",
    summary:
      "Undergraduate thesis testing whether a Graph Neural Network that links similar Filipino respondents can classify diabetes risk better than traditional machine-learning models, using national DOST-FNRI health survey data.",
    tags: ["Research", "AI / ML", "Python"],
    year: "2026",
    role: "Co-researcher · data, modeling, evaluation & writing",
    team: "Team of 2 · BS Computer Science thesis, NU Laguna",
    stack: ["Python", "PyTorch", "PyTorch Geometric", "scikit-learn", "pandas", "NumPy", "SciPy", "Matplotlib", "Google Colab"],
    links: { github: "", live: "" },
    cover: {
      src: "/projects/behavioralgraph-gnn-thesis.webp",
      alt: "Network graph of 53 survey respondents as dots colored by diabetes risk level, linked to their most similar respondents",
      caption: "A real sample of the training graph (k = 5): 53 respondents and 98 links. Only 43% of links join people in the same risk category (41% across the whole graph), which is why the graph added little.",
      width: 1600,
      height: 994,
      fit: "contain",
      bg: "#ffffff",
    },
    problem:
      "Most diabetes-risk models judge each person in isolation, ignoring that people with similar health and lifestyle profiles may share risk. Graph-based learning on Philippine health data had barely been explored.",
    approach:
      "Built a k-nearest-neighbor similarity graph linking respondents with similar behavioral, body-measurement, clinical and demographic profiles, then trained a Graph Convolutional Network on it and compared it with seven traditional models and an edge-free control.",
    outcome:
      "The GCN learned real patterns (AUC 0.713, well above chance) and matched the traditional models statistically, but the graph itself added no predictive value. The study explains why, which is the kind of honest, evidence-based result research needs.",
    features: [
      "Classifies Filipino adults into Low, Moderate and High diabetes risk, based on fasting blood sugar categories",
      "Uses 10 non-lab features: blood pressure, smoking, alcohol use, physical activity, BMI, waist circumference, waist-to-hip ratio, age and sex",
      "Represents each respondent as a node, linked to the most similar respondents in a kNN behavioral-health similarity graph",
      "Two-layer Graph Convolutional Network with a skip connection, trained with PyTorch Geometric",
      "Benchmarked against Logistic Regression, Decision Tree, Random Forest, SVM, KNN, Gradient Boosting, a Multilayer Perceptron and an edge-free control",
      "Validated by two physicians, who rated every evaluation area at or above the acceptance threshold (overall mean 3.53 / 4)",
    ],
    contributions: [
      "Merged and cleaned the DOST-FNRI National Nutrition Survey data: 114,465 records narrowed to 57,422 eligible adults, with feature mapping and missing-value handling",
      "Built the kNN similarity graph and developed, trained and tuned the GCN (graph size, architecture, optimizers, hyperparameter grid search)",
      "Ran the evaluation: baselines, repeated cross-validation, McNemar and paired statistical tests, feature ablations and subgroup analysis",
      "Co-wrote all five chapters and defended the thesis",
    ],
    process: [
      {
        title: "Prepare the data",
        body: "Merged national survey datasets, mapped variables to model features, handled missing and implausible values, and split the data by household so related people never appear in both training and test sets.",
      },
      {
        title: "Build the graph",
        body: "Linked each respondent to their most similar respondents with k-nearest neighbors, testing several neighborhood sizes and measuring how often linked people share the same risk level.",
      },
      {
        title: "Train the GCN",
        body: "Trained a two-layer Graph Convolutional Network, tuned it with cross-validation, and added a skip connection after diagnostics showed each person's own features were being diluted by their neighbors'.",
      },
      {
        title: "Test it fairly",
        body: "Compared against seven traditional models and the same network without edges, using held-out data, formal statistical tests, ablations and physician review.",
      },
    ],
    results: [
      "GCN held-out macro-F1 0.438, accuracy 0.524, AUC 0.713, against a chance level of about 0.33",
      "Statistically comparable to Gradient Boosting, the top model (macro-F1 0.446), and to the edge-free control, showing the graph's edges added no information beyond each person's own features",
      "Age, waist-to-hip ratio and systolic blood pressure were the strongest predictors, while self-reported lifestyle habits contributed little",
      "Physician validation passed in all six areas (mean 3.53 / 4)",
    ],
    // Values: thesis Chapter 4–5 (final models); RF importance from the notebook's saved outputs.
    charts: [
      {
        title: "Held-out test macro-F1 by model",
        caption:
          "All nine models land within 0.03 of each other and well above chance. The GCN is statistically tied with the best models, but not ahead of them.",
        valueLabel: "Macro-F1",
        max: 0.5,
        decimals: 3,
        highlight: "BehavioralGraph GCN",
        reference: { label: "Chance (0.333)", value: 0.333 },
        data: [
          { label: "Gradient Boosting", value: 0.446 },
          { label: "Logistic Regression", value: 0.44 },
          { label: "Multilayer Perceptron", value: 0.44 },
          { label: "Random Forest", value: 0.44 },
          { label: "Edge-free control", value: 0.439 },
          { label: "Support Vector Machine", value: 0.439 },
          { label: "BehavioralGraph GCN", value: 0.438 },
          { label: "Decision Tree", value: 0.435 },
          { label: "K-Nearest Neighbors", value: 0.419 },
        ],
      },
      {
        title: "Which features mattered most",
        caption:
          "Random Forest feature importance. Age, central body fat and blood pressure carry most of the signal; self-reported lifestyle habits add little.",
        valueLabel: "Importance",
        max: 0.25,
        decimals: 3,
        data: [
          { label: "Age", value: 0.244 },
          { label: "Waist-to-hip ratio", value: 0.207 },
          { label: "Waist circumference", value: 0.151 },
          { label: "Systolic blood pressure", value: 0.122 },
          { label: "BMI", value: 0.105 },
          { label: "Diastolic blood pressure", value: 0.08 },
          { label: "Alcohol use", value: 0.031 },
          { label: "Smoking", value: 0.028 },
          { label: "Sex", value: 0.019 },
          { label: "Physical activity", value: 0.013 },
        ],
      },
    ],
    learnings: [
      "A graph only helps when its links carry information the features don't already have. Linking people by their own features made the edges largely redundant.",
      "Setting success criteria in advance and testing against an edge-free control kept the conclusions honest, even when the result wasn't the one we expected.",
    ],
    gallery: [],
  },
  {
    slug: "askcampus-nlp-chatbot",
    title: "AskCampus: NLP Student Chatbot",
    summary:
      "A machine-learning chatbot that answers student questions about fees, enrollment, the library, dormitory and more, understanding natural phrasing instead of relying on hard-coded rules.",
    tags: ["AI / ML", "Python", "UX"],
    year: "2026",
    role: "ML / NLP model · Chat UI design",
    team: "Team of 2",
    stack: ["Python", "scikit-learn", "NLTK", "Flask", "Jupyter", "pandas", "JavaScript", "HTML / CSS"],
    links: { github: "https://github.com/GerardLui/AskCampus-Chatbot", live: "" },
    cover: {
      src: "/projects/askcampus-nlp-chatbot.webp",
      thumb: "/projects/askcampus-nlp-chatbot-card.webp",
      alt: "AskCampus chat window answering a library question, then asking which program before giving a Computer Science fee breakdown",
      caption: "A multi-turn conversation: the bot asks which program, then remembers the fee topic when the student just replies “cs”. Each answer shows its predicted intent and confidence.",
      width: 1600,
      height: 869,
    },
    problem:
      "Students ask the same questions about fees, enrollment and campus services over and over, and rule-based chatbots break as soon as a question is phrased differently.",
    approach:
      "Trained an intent classifier on a curated dataset of real student questions, then wrapped it in a conversational layer and a chat interface that talks to the actual trained model.",
    outcome:
      "A working chatbot covering 38 intents across the CS, IT and IS programs, reaching 76.8% accuracy and about 76% F1 on held-out test data.",
    features: [
      "Understands free-form questions using a TF-IDF + Linear SVM intent classifier",
      "NLP preprocessing: tokenization, lowercasing, punctuation removal and lemmatization",
      "Confidence threshold so it says “I'm not sure” instead of guessing",
      "Multi-turn context: fee questions stay on topic across messages (“what about CS?”)",
      "Typo-tolerant course matching, so “compute4r science” still resolves",
      "Short, natural follow-ups after answering admission, scholarship, dormitory and document questions",
      "Live chat demo served by a Flask API running the exact model that was evaluated",
    ],
    contributions: [
      "Built and cleaned the training dataset: 38 intents and ~409 example questions scoped to the CS, IT and IS programs",
      "Developed the NLP pipeline and trained the classifier, comparing Naive Bayes against Linear SVM",
      "Evaluated the model with accuracy, precision, recall, F1, a confusion matrix, k-fold cross-validation and error analysis",
      "Designed the chat interface, including the connection-status indicator",
    ],
    process: [
      {
        title: "Curate the data",
        body: "Wrote intents with many real phrasings each, and replaced placeholder or irrelevant answers with accurate campus information.",
      },
      {
        title: "Train and compare",
        body: "Preprocessed text with NLTK, vectorized it with TF-IDF, and compared Naive Bayes with Linear SVM. The SVM performed best.",
      },
      {
        title: "Evaluate honestly",
        body: "Measured on a held-out 80/20 split plus k-fold cross-validation, then studied the confusion matrix to find which intents get mixed up.",
      },
      {
        title: "Ship the same model",
        body: "Exported the final model with joblib so the Flask API and chat UI use the exact model that was evaluated, with no separate copy.",
      },
    ],
    results: [
      "76.8% accuracy, ~82% precision and ~76% F1 on a held-out test set across 38 intents",
      "Chose a smaller, clean dataset over a larger noisy one that scored higher (~88%) but gave worse answers",
    ],
    learnings: [
      "More training data can't fix typos for a TF-IDF model, because it only sees exact words. Typos need a separate fuzzy-matching layer.",
    ],
    gallery: [],
  },
  {
    slug: "nu-laguna-eregistrar-system",
    title: "NU Laguna e-Registrar System",
    summary:
      "An online registrar where NU Laguna students and alumni request official documents, pay through GCash or Maya, and track each request until release.",
    tags: ["Full-Stack", "Backend", "Payments"],
    year: "2026",
    role: "Backend developer · system workflow · UI finalization",
    team: "Team of 7",
    stack: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "JWT", "PayMongo", "Nodemailer", "PDFKit"],
    links: { github: "https://github.com/monsimonsi/NU-Laguna-eRegistrar-System", live: "" },
    cover: {
      src: "/projects/nu-laguna-eregistrar-system.webp",
      alt: "NU Laguna e-Registrar login page with a campus photo, role selector, email and password fields, and an alumni registration button",
      caption: "Sign-in with role selection (student, alumni or registrar), plus self-registration for alumni.",
      width: 1600,
      height: 900,
    },
    problem:
      "Requesting a transcript or certificate meant going to the registrar in person, with no way to pay online or see where a request stood.",
    approach:
      "Designed the request-to-release workflow and built the backend behind it: role-based accounts, alumni verification, document requests with tracking numbers, and sandbox e-wallet payments.",
    outcome:
      "Students and alumni can request 11 document types, pay online, and follow each request from payment to release, while registrar staff manage everything from one dashboard.",
    features: [
      "Role-based login for students, alumni and registrar staff, secured with JWT and hashed passwords",
      "Alumni self-registration that stays “Pending Verification” until the registrar approves it",
      "Online requests for 11 document types (TOR, COR, Good Moral, Copy of Grades, SF10 and more) with duplicate-request checks",
      "Request tracking with a unique tracking number: Waiting for Payment → Pending → Processing → Ready / Out for Delivery → Released",
      "GCash and Maya payments through the PayMongo sandbox, with in-app mock checkouts when no keys are configured",
      "PDF payment receipts and AI-assisted email notifications with status updates and pickup suggestions",
      "Admin dashboard with request metrics, document pricing, document types, alumni verification and activity logs",
    ],
    contributions: [
      "Mapped the full system workflow for students, alumni and registrar staff, from sign-up to document release",
      "Built alumni registration, protected (role-checked) API routes, request tracking numbers and the admin dashboard metrics",
      "Built the payment backend: PayMongo checkout plus mock GCash/Maya e-wallet APIs for development",
      "Wired the React frontend to the Express API and built the payment, payment-return and receipt pages",
      "Helped finalize the UI design across the student and admin screens",
    ],
    process: [
      {
        title: "Workflow first",
        body: "Wrote out the student and alumni journeys step by step (register, verify, request, pay, process, notify, release) so every screen and endpoint mapped to a real step.",
      },
      {
        title: "Data model and access control",
        body: "Modelled users, alumni verifications, document requests, prices, payments and notifications in MongoDB, and put role checks on every protected route.",
      },
      {
        title: "Payments that work without real money",
        body: "Integrated PayMongo's sandbox for GCash and Maya, and added mock checkout APIs so the whole flow can be demoed and tested without payment keys.",
      },
      {
        title: "Connecting it all",
        body: "Wired the React pages to the API, then tightened the status flow so a request always moves forward from payment to release.",
      },
    ],
    results: [],
    learnings: [],
    gallery: [],
  },
  {
    slug: "class-efficiency-scheduling-system",
    title: "Class Efficiency Scheduling System",
    summary:
      "A scheduler that turns a school's courses, rooms and sections into a conflict-checked class timetable automatically, viewable by section, by room, or as a master grid.",
    tags: ["Full-Stack", "Algorithms", "UX"],
    year: "2025",
    role: "Team lead · Full-stack developer · UI design",
    team: "Team of 5",
    stack: ["React", "Vite", "Node.js", "Express", "MySQL", "Axios", "SheetJS (xlsx)"],
    links: { github: "https://github.com/kyleparas47-beep/Class-Efficieny-Scheduling-System", live: "" },
    cover: {
      src: "/projects/class-efficiency-scheduling-system.webp",
      alt: "Scheduling system Courses page with a form to add a course and a section for importing courses from an Excel file",
      caption: "The Courses page: add courses one at a time, or bulk-import them from the Excel template.",
      width: 1600,
      height: 784,
      position: "left top",
    },
    problem:
      "Manual class scheduling was slow and error-prone, with no clear way to spot conflicts.",
    approach:
      "Mapped the existing workflow, then built clear navigation and structured data flow across frontend and backend.",
    outcome:
      "A working system that replaced manual steps with a smoother, more efficient experience.",
    features: [
      "Course, room and section management for BSCS, BSIS and BSIT across year levels 1–4",
      "Bulk course import from Excel with validation (program, year, type, term) and a downloadable template",
      "One-click schedule generation that assigns each class a room, day pattern and time slot",
      "Matches room type to class type: lecture, laboratory, or combined lecture + lab",
      "Conflict report that lists every class that couldn't be placed, with its section, term and reason",
      "Three schedule views (by section, by room, master grid), all grouped by term, with Excel export",
    ],
    contributions: [
      "Led the team of 5 and coordinated the work across frontend and backend",
      "Built features on both ends: the React interface and the Express + MySQL API",
      "Worked on the scheduling logic: term-based grouping and priority sorting to cut conflicts",
      "Assisted with and finalized the UI design",
    ],
    process: [
      {
        title: "Schedule each term on its own",
        body: "Courses are split into Term 1, 2 and 3, and each term starts with fresh room availability, so classes from different terms never compete for the same slot.",
      },
      {
        title: "Place the hardest classes first",
        body: "Courses are sorted by program, term, year level and name, and lecture + lab courses go first because they need both kinds of room.",
      },
      {
        title: "Fit into real day patterns",
        body: "Each class is placed on a two-day pattern (Mon–Wed, Tue–Thu, and so on) in a free room of the right type, while room occupancy is tracked as the schedule fills.",
      },
    ],
    results: [
      "Term-based scheduling cut conflicts by roughly 80–90% compared with scheduling all courses at once (from 200+ conflicts on a 146-course load, per the team's testing)",
    ],
    learnings: [],
    gallery: [],
  },
  {
    slug: "event-calendar-system",
    title: "NUEvents: Event Calendar System",
    summary:
      "A campus event calendar for NU Laguna where students register for events and get a QR ticket, and admins scan those tickets to record attendance.",
    tags: ["Full-Stack", "UX"],
    year: "2025",
    role: "Team lead · Full-stack developer · UI design",
    team: "Team of 5",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "QRCode.js", "html5-qrcode"],
    links: { github: "https://github.com/kyleparas47-beep/Event-Calendar-System", live: "" },
    cover: {
      src: "/projects/event-calendar-system.webp",
      alt: "NUEvents landing page titled Event Calendar, National University Laguna, with campus event photos",
      caption: "The NUEvents landing page, the entry point to the student and admin calendars.",
      width: 654,
      height: 409,
    },
    problem: "Tracking events across multiple users led to conflicts and poor visibility.",
    approach:
      "Designed a clearer UI structure and navigation, backed by a responsive calendar system.",
    outcome:
      "Reduced scheduling conflicts and made event info easier to manage across users.",
    features: [
      "Separate student and admin portals, each with a dashboard, calendar and profile",
      "Sign-up restricted to official NU Laguna emails, with the student or admin role assigned from the email domain",
      "Password reset with a 6-digit emailed code that expires after 15 minutes",
      "Admins create, edit and delete events with type, schedule, location and capacity, and keep the university calendar up to date",
      "Students browse the calendar, see event details and register in a few clicks",
      "Every registration produces a ticket with a unique number and QR code",
      "Admins scan QR tickets with the device camera to verify them and mark attendance",
    ],
    contributions: [
      "Led the team of 5 and coordinated the work across frontend and backend",
      "Built features on both ends: PHP pages and API endpoints, and the JavaScript calendar interface",
      "Assisted with and finalized the UI design for the student and admin portals",
    ],
    process: [],
    results: [],
    learnings: [],
    gallery: [],
  },
];

export const findProject = (slug) => projects.find((p) => p.slug === slug);

// Smaller projects listed as single rows under the main cards. No case study page.
// Fields: title, description, role, year, stack[], links { github, live } (all but title optional).
export const otherProjects = [
  {
    title: "Jamie's Curse",
    description: "A horror game built in Scratch as a final project.",
    role: "Character design and the game's overall visual design",
    year: "2025",
    stack: ["Scratch"],
  },
  {
    title: "NU Sports Club: Athletes Record System",
    description:
      "A database-driven system for managing sports club athlete records, categorizing athletes by their attributes, tracking membership status, and giving administrators real-time insight into athlete profiles.",
    role: "Frontend developer",
    year: "2025",
    stack: ["HTML", "CSS"],
  },
  {
    title: "Enchanted Arrow Strike",
    description:
      "A Scratch action game: play as a warrior shooting arrows at three trolls to free a gem from its cage, with lives, enemy health, a countdown, instructions and win/lose screens.",
    role: "Character design and helped code the game",
    year: "2025",
    stack: ["Scratch"],
  },
];
