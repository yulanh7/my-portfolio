// ── Personal info ─────────────────────────────────────────

export const personal = {
  name: "Rachel (Yulan) Huang",
  title: "Front-End Developer",
  titles: [
    "Front-End Developer",
    "React & Next.js Specialist",
    "UI/UX Focused Engineer",
    "WordPress Expert",
  ],
  subtitle: "React & Next.js · TypeScript · 5+ Years",
  subtitleNote: "with Front-End project experience",
  location: "Canberra, Australia",
  status: "Open to work",
  bio: "Front-end developer with 5+ years building and maintaining WordPress and React/Next.js applications. Track record of owning projects end-to-end — from architecture to deployment — and translating technical decisions for non-technical teams.",
  email: "yulanh.tech@gmail.com",
  linkedin: "https://linkedin.com/in/yulan-huang",
  github: "https://github.com/yulanh7",
};

// ── Education ─────────────────────────────────────────────

export const education = {
  degree: "Master of Information Technology",
  school: "University of Technology Sydney",
  period: "2016 – 2018",
};

// ── Skills ────────────────────────────────────────────────

export const skills = [
  { label: "React", size: "large" },
  { label: "Next.js", size: "large" },
  { label: "TypeScript", size: "large" },
  { label: "JavaScript", size: "medium" },
  { label: "HTML5 · CSS/SCSS", size: "medium" },
  { label: "Redux Toolkit", size: "medium" },
  { label: "Node.js", size: "medium" },
  { label: "REST APIs", size: "small" },
  { label: "WordPress", size: "medium" },
  { label: "PHP", size: "small" },
  { label: "WooCommerce", size: "small" },
  { label: "MySQL", size: "small" },
  { label: "MongoDB", size: "medium" },
  { label: "Docker", size: "medium" },
  { label: "Jest", size: "small" },
  { label: "AWS", size: "medium" },
  { label: "CI/CD", size: "small" },
  { label: "Figma", size: "small" },
  { label: "PM2 · Ubuntu", size: "small" },
  { label: "Git", size: "small" },
];

// ── Projects ──────────────────────────────────────────────

export const projects = [
  {
    title: "JobFlow AI",
    badge: "Personal Project",
    description:
      "AI-powered career alignment tool. Upload a resume and job description to get an instant match score, skill gap analysis, and a tailored cover letter. Built with Gemini API.",
    tech: ["Next.js 15", "TypeScript", "Gemini API", "Tailwind CSS", "Vercel"],
    images: ["/images/jobFlowAI.png"],
    link: "https://jobflow-ai-teal.vercel.app/",
  },
  {
    title: "4C Info Platform",
    badge: "4Data IT",
    description:
      "Internal platform for Canberra Chinese Christian Church — members can browse and subscribe to fellowship groups, watch sermon videos, and manage their profile. Built with Next.js and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    images: ["/images/4cInfo-desktop.png", "/images/4cInfo-mobile.png"],
    link: "https://canberra-ccc.info/",
  },
  {
    title: "Online Ordering System",
    badge: "Link POS",
    description:
      "Online ordering platform for 100+ retail clients with real-time menu, cart, and checkout. Includes a React Native POS app for in-store ordering and payments.",
    tech: ["Next.js", "Material UI", "React Native", "REST API"],
    images: ["/images/linkeats-desktop.png", "/images/linkeats-mobile.png"],
    link: "https://order.linkaumall.com/storemenu/68b7344c-2df7-474c-8bc9-38655d67fc41",
  },
  {
    title: "Link Business Portal",
    badge: "Link POS",
    description:
      "Merchant management dashboard for product, order, and promotion management. Built for 100+ retail clients across Australia.",
    tech: ["React", "Ant Design", "Node.js", "REST API"],
    images: ["/images/linkpost.png"],
    link: null,
  },
  {
    title: "Business Waste Training",
    badge: "4Data IT",
    description:
      "Online interactive recycling training platform for the ACT Government Sustainable Business Program. Includes video modules, quizzes, and completion tracking for 140+ organisations.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    images: ["/images/businesswastecbr.png"],
    link: "https://businesswastecbr.com.au/",
  },
  {
    title: "4C Church Website",
    badge: "WordPress",
    description:
      "Bilingual church website (English/Chinese) with custom WordPress theme, sermon archive, fellowship groups, and event management for Canberra Chinese Christian Church.",
    tech: ["WordPress", "PHP", "CSS", "MySQL"],
    images: ["/images/4cOrg-desktop.png"],
    link: "https://canberra-ccc.org/",
  },
];

// ── Experience ────────────────────────────────────────────

export const experience = [
  {
    period: "Jan 2026 – Mar 2026",
    title: "Website Coordinator (Contract)",
    company: "Early Childhood Australia",
    location: "Canberra, ACT",
    bullets: [
      "Migrated 390+ WooCommerce products and 300+ blog posts, maintaining data integrity and URL structure to preserve SEO rankings.",
      "Applied custom CSS and layout adjustments to align the new site with brand standards.",
      "Ran quality assurance across content, internal links, and structured data before go-live.",
    ],
  },
  {
    period: "Dec 2022 – May 2024",
    title: "Web Developer",
    company: "4Data IT Pty Ltd",
    location: "Canberra, ACT",
    bullets: [
      "Built a training platform with Next.js, TypeScript, and Redux Toolkit for 140+ client organisations.",
      "Developed REST APIs with Node.js/Express and MongoDB; implemented JWT authentication.",
      "Built and maintained custom WordPress themes and plugins across 20+ sites.",
      "Wrote Jest and React Testing Library test suite; achieved 80%+ coverage on critical paths.",
      "Deployed applications on Ubuntu using Docker and PM2.",
      "Worked directly with non-technical leadership to explain build decisions.",
    ],
  },
  {
    period: "Oct 2019 – Mar 2022",
    title: "Front-End Developer",
    company: "Link POS Ltd",
    location: "Sydney, NSW",
    bullets: [
      "Built online ordering system with Next.js and Material UI for 100+ retail clients.",
      "Developed React/Ant Design merchant dashboard for product, order, and promotion management.",
      "Built React Native POS app for in-store ordering and payments.",
      "Collaborated with backend team on REST API design and frontend integration.",
    ],
  },
  {
    period: "2018 – 2019",
    title: "Web Developer",
    company: "Various Clients",
    location: "Sydney, NSW",
    bullets: [
      "Delivered React and WordPress websites for local businesses across retail and services.",
    ],
  },
];
