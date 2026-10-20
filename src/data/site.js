// Personal details and links used across the site. Leave a social `url` empty to hide it.
export const site = {
  name: "Kyle Justine Paras",
  title: "Kyle Justine Paras — Portfolio",
  description:
    "4th-year Computer Science student in Laguna, PH. Full-stack web systems, UX/UI, and on-page SEO. Open to internships.",
  email: "kyleparas47@gmail.com",
  phone: { display: "0960 250 3201", tel: "+639602503201" },
  location: "Calamba, Laguna, PH",
  resume: "/resume.pdf",
  // Hero photo in /public. A square cut-out (WebP or PNG with transparency), around 600px, works best; it's hidden if the file is missing.
  photo: { src: "/profile.webp", alt: "Portrait of Kyle Justine Paras" },
  socials: [
    { label: "GitHub", url: "https://github.com/kyleparas47-beep" },
    { label: "LinkedIn", url: "" },
  ],
};

export const roles = ["UX/UI Designer", "Full-Stack Developer", "Problem Solver"];

export const navItems = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "projects", label: "work" },
  { id: "skills", label: "skills" },
  { id: "background", label: "background" },
  { id: "contact", label: "contact" },
];

// The stats bar under the hero. Keep these factual — recruiters check.
export const highlights = [
  { value: "3", label: "Full-stack systems built" },
  { value: "2", label: "Teams led as project lead" },
  { value: "3.5", label: "GPA · Dean's List" },
  { value: "4th", label: "Year, BS Computer Science" },
];

// "Tools & technologies" panel; group names are shown as small headings.
export const tools = [
  { group: "Frontend", items: ["React", "JavaScript", "HTML", "CSS", "Vite"] },
  { group: "Backend", items: ["Node.js", "Express", "PHP", "Python", "Java"] },
  { group: "Data", items: ["MySQL", "MongoDB", "SQL"] },
  { group: "Workflow", items: ["Git", "GitHub", "VS Code"] },
];

export const process = [
  { title: "Discover", body: "Learn who uses the system and what's slowing them down." },
  { title: "Map", body: "Walk through each user journey and the data behind it." },
  { title: "Design", body: "Lay out clear navigation and screens around those journeys." },
  { title: "Build", body: "Develop the frontend and backend together, end to end." },
  { title: "Refine", body: "Test with real flows, fix the rough edges, finalize the UI." },
];

export const stats = [
  { k: "Program", v: "BS Computer Science" },
  { k: "Year", v: "4th Year" },
  { k: "School", v: "National University — Laguna" },
  { k: "GPA", v: "3.5" },
  { k: "Focus", v: "UX/UI · Full-Stack" },
];
