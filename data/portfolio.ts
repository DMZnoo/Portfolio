export type Project = {
  id: string;
  title: string;
  href?: string;
  images?: {
    src: string;
    alt: string;
  }[];
  client: string;
  role: string;
  blurb: string;
  tech: string[];
  year: string;
  highlight: string;
};

export type Experience = {
  id: string;
  date: string;
  role: string;
  company: string;
  href: string;
  description: string;
  technologies: string[];
  accent: "cyan" | "violet" | "emerald";
  projects: Project[];
  image?: {
    src: string;
    alt: string;
  };
};

export const profile = {
  name: "Jinwoo Lee",
  title: "Full Stack Engineer",
  tagline:
    "I am an all-around generalist with a passion for creating exceptional digital experience.",
  bio: [
    "Full stack engineer with 5+ years of experience shipping production web apps across many sectors spanning Creative/Advertising Agency, Web3 Startup, Travel Agencies, and Technology Consulting.",
    "With diverse work background, I have been fortunate enough to build and ship wide range of applications in React/Next.js, Framer Motion, ThreeJS, and Mapbox/deck.gl.",
    "Currently at McCann NZ, I have been delivering fun and interactive campaigns for many big brands like McDonald's NZ, Škoda NZ, and Volkswagen NZ.",
  ],
  nowWorking: {
    label: "Currently building",
    tag: "McCann NZ · Live",
    text: "Fantasy Herd — a fantasy-football themed game for Meadow Fresh with league flows, mobile scan features, and prize campaign tooling.",
  },
  links: {
    github: "https://github.com/DMZnoo",
    linkedin: "https://www.linkedin.com/in/jinwoo-lee-00991085/",
    instagram: "https://instagram.com/dmznoo",
    resume: "/resume.pdf",
  },
};

export const experiences: Experience[] = [
  {
    id: "mccann",
    date: "Jan. 2025 — Present",
    role: "Front End Engineer",
    company: "McCann NZ",
    href: "https://mccann.co.nz/",
    description:
      "Developing high-profile interactive campaigns for national brands. Work spans Framer Motion/ThreeJS animations, Mapbox/deck.gl, and mobile webview development with native bridges.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Framer Motion",
      "Three.js",
      "Mapbox",
      "StoryBook",
      "Playwright",
    ],
    accent: "cyan",
    projects: [
      {
        id: "fantasy-herd",
        title: "Fantasy Herd",
        client: "Meadow Fresh",
        role: "Main Contributor",
        blurb:
          "Co-authored a five-month fantasy-football themed game with league flows, cow selection, mobile scan/barcode features, notification persistence, caching, and performance tuning for a national prize campaign.",
        tech: ["Next.js 16", "React 19", "Zustand", "Playwright", "AWS"],
        year: "2025",
        highlight: "5-month campaign · national prize draw",
        href: "https://www.fantasyherd.co.nz/",
        images: [
          {
            src: "/projects/fantasy-herd/fantasyherd.png",
            alt: "Fantasy Herd campaign screen",
          },
          {
            src: "/projects/fantasy-herd/cow-cards.avif",
            alt: "Fantasy Herd cow cards",
          },
          {
            src: "/projects/fantasy-herd/herd-editing.jpg",
            alt: "Fantasy Herd editing screen",
          },
        ],
      },
      {
        id: "word-of-day",
        title: "Word of the Day",
        client: "Škoda NZ",
        role: "Author & Main Contributor",
        blurb:
          "Built a 90-day daily word-puzzle promotion with cinematic intro animation, custom letter-slot input, responsive 5–9+ character layouts, and robust attempt/status handling.",
        tech: ["Next.js 16", "React 19", "Motion", "Zustand", "Orval", "Zod"],
        year: "2025",
        highlight: "90-day promo · cinematic intro",
        href: "https://skodacodes.skoda.co.nz/",
        images: [
          {
            src: "/projects/skoda/skoda-codes-game.jpg",
            alt: "Skoda Codes game screen",
          },
          {
            src: "/projects/skoda/skoda-mobile.png",
            alt: "Skoda Codes mobile screen",
          },
        ],
      },
      {
        id: "vw-buzz",
        title: "VW-Buzz Interactive Experience",
        client: "Volkswagen NZ",
        role: "Author & Main Contributor",
        blurb:
          "Developed an interactive map and 3D promotional experience with animated map overlays, camera transitions, geospatial calculations, and pointer-driven metaball visuals.",
        tech: ["React", "Mapbox", "deck.gl", "Three.js", "R3F", "GLSL"],
        year: "2024",
        highlight: "WebGL · metaball shaders",
        images: [
          {
            src: "/projects/vw/intro.png",
            alt: "VW-Buzz interactive intro screen",
          },
        ],
      },
      {
        id: "mcd-platform",
        title: "McDonald's NZ Web App Platform",
        client: "McDonald's NZ",
        role: "Author & Main Contributor",
        blurb:
          "Built and maintained a webview platform powering promotional mini-experiences, loyalty redemption, voucher scanning, native bridge integrations, shared UI, and end-to-end tests.",
        tech: [
          "Next.js 16",
          "React 19",
          "Framer Motion",
          "Orval",
          "Swagger",
          "Playwright",
        ],
        year: "2024",
        highlight: "Native bridges · loyalty · e2e",
        images: [
          {
            src: "/projects/mccas/friends.png",
            alt: "McDonald's friends campaign screen",
          },
          {
            src: "/projects/mccas/merch.png",
            alt: "McDonald's merch campaign screen",
          },
          {
            src: "/projects/mccas/perfect-pour.png",
            alt: "McDonald's perfect pour campaign screen",
          },
        ],
      },
    ],
  },
  {
    id: "mobility-labs",
    date: "Aug. 2024 — Jan. 2025",
    role: "Front End Engineer",
    company: "Mobility Labs",
    href: "https://mobility-labs.com/",
    description:
      "Developed an in-house geospatial visualisation tool, vista.gl, that processes GeoJSON datasets to create configurable, shareable maps for transport modellers and planners across New Zealand.",
    technologies: ["React", "TypeScript", "GeoJSON", "Mapbox", "deck.gl"],
    accent: "emerald",
    projects: [
      {
        id: "vista-gl",
        title: "vista.gl",
        client: "Mobility Labs",
        role: "Full Stack Engineer",
        blurb:
          "Developed an in-house geospatial visualisation tool that turns GeoJSON datasets into configurable, shareable maps for transport modellers and planners.",
        tech: ["React", "TypeScript", "GeoJSON", "Mapbox", "deck.gl"],
        year: "2024",
        highlight: "Geospatial viz · transport planning",
      },
    ],
  },
  {
    id: "ion",
    date: "03.2023 — 03.2024",
    role: "Full Stack Engineer",
    company: "Ion Protocol",
    href: "https://ionprotocol.io/",
    image: { src: "/ion.png", alt: "Ion Protocol" },
    description:
      "Built Ion's first launch of LST Lending platform and implemented various LST assets. Worked closely with a solidity engineer, designer, and CTO to ship a best-practice solution under tight deadline and budget.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Go",
      "AWS",
    ],
    accent: "violet",
    projects: [
      {
        id: "ion-lst",
        title: "Ion LST Lending Platform",
        client: "Ion Protocol",
        role: "Full Stack Engineer",
        blurb:
          "Built lending and borrowing UI for LST assets, wallet and contract integrations, local blockchain testing environments, and Go-based proof-of-reserve accounting oracles.",
        tech: ["Next.js", "Viem", "Go", "AWS Lambda", "PostgreSQL", "Tenderly"],
        year: "2023",
        highlight: "DeFi · PoR oracle · wallet integrations",
      },
    ],
  },
  {
    id: "serko",
    date: "01.2023 — 07.2023",
    role: "Front End Engineer",
    company: "Serko",
    href: "https://www.serko.com/",
    description:
      "Collaborated with engineers to develop the v1 design token system, enhancing the integration between Figma and Storybook to streamline design and development workflows.",
    technologies: ["React", "TypeScript", "Figma", "Storybook"],
    accent: "cyan",
    projects: [],
  },
  {
    id: "datacom",
    date: "11.2021 — 12.2022",
    role: "Full Stack Engineer",
    company: "Datacom",
    href: "https://datacom.com/",
    description:
      "Led the POC development of an in-house data visualisation application for Heliase. Collaborated with IAG to develop APIs for automating insurance pricing in New Zealand, enhancing functionality and efficiency using SpringBoot.",
    technologies: [
      "React",
      "Three.js",
      "D3.js",
      "TypeScript",
      "SpringBoot",
      "AWS",
    ],
    accent: "emerald",
    projects: [],
  },
  {
    id: "clearhead",
    date: "11.2020 — 11.2021",
    role: "Front-End Engineer",
    company: "Clearhead",
    href: "https://www.myclearhead.com/",
    description:
      "Implemented the initial suite of front-end unit tests to enhance code reliability and a blue-green deployment script in Terraform for the DevOps pipeline. Created a comprehensive component library for the Chatbot using Next.js and Tailwind.",
    technologies: ["Next.js", "TypeScript", "Terraform", "Storybook"],
    accent: "cyan",
    projects: [],
  },
  {
    id: "orion",
    date: "10.2019 — 03.2020",
    role: "Software Engineer Intern",
    company: "Orion Health",
    href: "https://orionhealth.com/nz/",
    description:
      "Contributed to the release of the version 2 developer portal using VanillaJS and CSS, enhancing the platform's usability and design for improved developer engagement and resource accessibility.",
    technologies: ["TypeScript", "Gulp", "Node.js"],
    accent: "cyan",
    projects: [],
  },
];
