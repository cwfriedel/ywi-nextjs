export type PartnerLogo = { src: string; alt: string; href?: string }

export type Project = {
  slug: string;
  title: string;
  hero?: string;
  summary: string;
  acres?: string;
  partners?: string[];
  partnersLogos?: PartnerLogo[];
  milestones?: string[];
  mapImage?: string;
  mapAspect?: string; // e.g., '11 / 8.5' (Letter landscape) or '14 / 8.5' (Legal landscape)
  gallery?: string[];
  externalUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "inimim-forest",
    title: "‘Inimim Forest Restoration Project",
    hero: "/images/inimim.jpg",
    summary:
      "YWI’s flagship collaboration with BLM to restore historical forest structure and resilient function on Nevada County's San Juan Ridge.",
    acres: "1,219 acres across BLM-managed parcels on the San Juan Ridge.",
    partners: ["Yuba Watershed Institute", "BLM", "Community partners"],
    partnersLogos: [
      { src: "/images/partners/ywi.png", alt: "Yuba Watershed Institute", href: "https://yubawatershedinstitute.org" },
      { src: "/images/partners/blm.png", alt: "Bureau of Land Management",   href: "https://www.blm.gov/office/mother-lode-field-office" },
      { src: "/images/partners/snc.png",    alt: "Sierra Nevada Conservancy",       href: "https://sierranevada.ca.gov" },
      { src: "/images/partners/calfire.png",alt: "CAL FIRE",                         href: "https://www.fire.ca.gov" }
    ],
    milestones: [
      "Collaborative planning spanning multiple decades",
      "Phased implementation and monitoring",
      "Ongoing stewardship & community engagement"
    ],
    mapImage: "/images/inimim-map.jpg",
    gallery: ["/images/community.jpg"],
    externalUrl: "https://yubawatershedinstitute.org/inimim-forest/"
  },
  {
    slug: "south-yuba-rim",
    title: "South Yuba Rim Hazardous Fuels Reduction Project",
    hero: "/images/yuba-hero.jpg",
    summary:
      "A multi-phase, landscape-scale fuel reduction effort on the south rim of the South Yuba River canyon to reduce wildfire risk, improve evacuation routes, and build ecological resilience.",
    acres: "Phase 1 planning across ~6,900 acres; Phase 2 implementation of ~800 acres; additional ~1,800 acres BLM planning.",
    partners: ["Yuba Watershed Institute", "Nevada County OES", "FEMA", "Cal OES", "BLM", "Sierra Nevada Conservancy", "CAL FIRE", "Local Firewise communities"],
    partnersLogos: [
      { src: "/images/partners/ywi.png",    alt: "Yuba Watershed Institute",        href: "https://yubawatershedinstitute.org" },
      { src: "/images/partners/oes.png",    alt: "Nevada County OES",               href: "https://www.nevadacountyca.gov" },
      { src: "/images/partners/fema.png",   alt: "FEMA",                             href: "https://www.fema.gov" },
      { src: "/images/partners/caloes.png", alt: "California Office of Emergency Services", href: "https://www.caloes.ca.gov" },
      { src: "/images/partners/blm.png",    alt: "Bureau of Land Management",       href: "https://www.blm.gov/office/mother-lode-field-office" },
      { src: "/images/partners/snc.png",    alt: "Sierra Nevada Conservancy",       href: "https://sierranevada.ca.gov" },
      { src: "/images/partners/calfire.png",alt: "CAL FIRE",                         href: "https://www.fire.ca.gov" }
    ],
    mapImage: "/images/syr-map.jpg",
    mapAspect: "14 / 8.5", // LEGAL landscape
    gallery: ["/images/yuba-hero.jpg"],
    externalUrl: "https://www.nevadacountyca.gov/3806/South-Yuba-Rim-Hazardous-Fuels-Reduction"
  }, 
 {
    slug: "little-deer-creek",
    title: "Little Deer Creek Landscape Resilience Project",
    hero: "/images/river.jpg",
    summary:
      "Restoring resilient forest structure and protecting homes, recreation, and water infrastructure in the Little Deer Creek watershed just east of downtown Nevada City.",
    acres: "TBD (confirm acreage) — planning/implementation area in the Little Deer Creek watershed near Nevada City.",
    partners: ["Yuba Watershed Institute", "Sierra Streams Institute", "BLM", "City of Nevada City", "Nevada Irrigation District", "Community partners"],
    partnersLogos: [
      { src: "/images/partners/ywi.png",  alt: "Yuba Watershed Institute", href: "https://yubawatershedinstitute.org" },
      { src: "/images/partners/blm.png",  alt: "Bureau of Land Management", href: "https://www.blm.gov/office/mother-lode-field-office" },
      { src: "/images/partners/snc.png",    alt: "Sierra Nevada Conservancy",       href: "https://sierranevada.ca.gov" },
      { src: "/images/partners/ssi.png",  alt: "Sierra Streams Institute", href: "https://sierrastreams.org" },
      { src: "/images/partners/bylt.png",  alt: "Bear Yuba Land Trust",        href: "https://www.bylt.org" }
    ],
    milestones: [
      "Planning & environmental review completed/underway (confirm years)",
      "Initial treatments started (confirm year & scope)",
      "Ongoing maintenance and monitoring"
    ],
    mapImage: "/images/ldc-map.jpg",
    mapAspect: "14 / 8.5", // LEGAL landscape
    gallery: ["/images/river.jpg"],
    externalUrl: "https://yubawatershedinstitute.org/little-deer-creek/"
  },  
{
    slug: "round-mountain",
    title: "Round Mountain Landscape Resilience Project",
    hero: "/images/rm-hero.jpg",
    summary:
      "Improving forest health and wildfire resilience on private and federal lands between Nevada City and the South Yuba River canyon.",
    acres: "TBD (confirm) — landscape-scale planning & implementation footprint in the Round Mountain area.",
    partners: ["Yuba Watershed Institute", "BLM", "Bear Yuba Land Trust", "Private landowners", "Community partners"],
    partnersLogos: [
      { src: "/images/partners/ywi.png",   alt: "Yuba Watershed Institute",    href: "https://yubawatershedinstitute.org" },
      { src: "/images/partners/blm.png",   alt: "Bureau of Land Management",   href: "https://www.blm.gov/office/mother-lode-field-office" },
      { src: "/images/partners/bylt.png",  alt: "Bear Yuba Land Trust",        href: "https://www.bylt.org" },
      { src: "/images/partners/snc.png",    alt: "Sierra Nevada Conservancy",       href: "https://sierranevada.ca.gov" }
    ],
    mapImage: "/images/rm-map.jpg",
    gallery: ["/images/fuels.jpg"],
    externalUrl: "https://yubawatershedinstitute.org/projects/"
  }
];

export function allProjects(): Project[] { return projects; }

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}