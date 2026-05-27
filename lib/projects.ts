export type Project = {
  slug: string;
  name: string;
  description: string;
  status: string;
  stack: string[];
  site: string;
  github: string;
  details: string;
};

export const projects: Project[] = [
  {
    slug: "openmodels",
    name: "OpenModels",
    description: "A catalog interface for browsing practical AI models.",
    status: "Online",
    stack: ["Next.js", "TypeScript", "Search"],
    site: "#",
    github: "#",
    details: "Model cards, filters, and tiny decisions that make research feel usable.",
  },
  {
    slug: "onebit",
    name: "OneBit",
    description: "Minimal product experiments with a strong systems taste.",
    status: "Prototype",
    stack: ["React", "Tailwind", "Edge"],
    site: "#",
    github: "#",
    details: "Small, fast, and opinionated tools for getting from idea to shipped interface.",
  },
  {
    slug: "titanbase",
    name: "TitanBase",
    description: "A structured workspace for technical knowledge and decisions.",
    status: "Private beta",
    stack: ["Postgres", "Next.js", "Workers"],
    site: "#",
    github: "#",
    details: "Built around traceable notes, resilient search, and calm operational workflows.",
  },
  {
    slug: "aria-code",
    name: "Aria Code",
    description: "A code companion focused on clear engineering flow.",
    status: "In progress",
    stack: ["TypeScript", "LLM APIs", "DX"],
    site: "#",
    github: "#",
    details: "A playful technical interface for turning vague software intent into concrete changes.",
  },
];
