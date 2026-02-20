import { useState, useEffect } from "react";
import { useScrollReveal, useScrollRevealGroup } from "../hooks/useScrollReveal";

const projects = [
  {
    id: 1,
    name: "Kypseli Residence",
    location: "Kypseli, Athens",
    status: "In Progress",
    beforeImg: "/images/projects/kypseli-before.jpg",
    afterImg:  "/images/projects/kypseli-after.jpg",
    description: "New-build residential development in the heart of Kypseli — 2-bedroom apartments delivered fully furnished and tenanted.",
  },
  {
    id: 2,
    name: "Egaleo Residence",
    location: "Egaleo, Athens",
    status: "Completed",
    beforeImg: "/images/projects/egaleo-before.jpg",
    afterImg:  "/images/projects/egaleo-after.jpeg",
    description: "Ground-up development in Egaleo; open-plan layouts, full MEP installation, and show-home finish throughout.",
  },
  {
    id: 3,
    name: "Kolonaki Residence",
    location: "Kolonaki, Athens",
    status: "In Progress",
    beforeImg: "/images/projects/kolonaki-before.jpg",
    afterImg:  "/images/projects/kolonaki-after.jpg",
    description: "Premium new-build in Kolonaki — top-floor units with private terraces and luxury specification from slab to handover.",
  },
  {
    id: 4,
    name: "Ilioupoli Residence",
    location: "Ilioupoli, Athens",
    status: "Completed",
    beforeImg: "/images/projects/ilioupoli-before.jpg",
    afterImg:  "/images/projects/ilioupoli-after.jpeg",
    description: "Residential development in the sought-after southern suburb of Ilioupoli — spacious units with modern interiors, delivered fully managed and income-ready.",
  },
  {
    id: 5,
    name: "Victoria Residence",
    location: "Victoria, Athens",
    status: "Completed",
    beforeImg: "/images/projects/victoria-before.jpg",
    afterImg:  "/images/projects/victoria-after.jpeg",
    description: "Central Athens development near Victoria Square — contemporary apartments in a high-demand rental corridor, with strong occupancy from day one.",
  },
  {
    id: 6,
    name: "Gyzi Residence",
    location: "Gyzi, Athens",
    status: "In Progress",
    beforeImg: "/images/projects/gyzi-before.jpg",
    afterImg:  "/images/projects/gyzi-after.jpg",
    description: "Boutique residential building in the vibrant Gyzi neighbourhood — premium specification units targeting professionals and digital nomads.",
  },
  {
    id: 7,
    name: "Zografou Residence",
    location: "Zografou, Athens",
    status: "In Progress",
    beforeImg: "/images/projects/zografou-before.jpg",
    afterImg:  "/images/projects/zografou-after.jpeg",
    description: "Purpose-built residential development in Zografou, adjacent to the University of Athens campus — high tenant demand underpins consistent year-round occupancy.",
  },
  {
    id: 8,
    name: "Glyfada Residence",
    location: "Glyfada, Athens",
    status: "Completed",
    beforeImg: "/images/projects/glyfada-before.jpg",
    afterImg:  "/images/projects/glyfada-after.jpeg",
    description: "Upscale coastal development in Glyfada — premium finishes, sea-proximity lifestyle appeal, and strong short-let and long-let demand from an affluent tenant base.",
  },
  {
    id: 9,
    name: "Crete Residence",
    location: "Heraklion, Crete",
    status: "In Progress",
    beforeImg: "/images/projects/crete-before.jpg",
    afterImg:  "/images/projects/crete-after.png",
    description: "Excellent Group's first island development — a landmark residential project in Heraklion capitalising on Crete's booming tourism economy and year-round rental demand.",
  },
];

function StatusPill({ status }) {
  const isCompleted = status === "Completed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isCompleted
          ? "bg-green-900/40 text-green-400 border border-green-700/50"
          : "bg-amber-900/40 text-amber-400 border border-amber-700/50"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isCompleted ? "bg-green-400" : "bg-amber-400"
        }`}
      />
      {status}
    </span>
  );
}

function ProjectCard({ project }) {
  const [isAfter, setIsAfter] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [currentSrc, setCurrentSrc] = useState(project.afterImg);

  function handleToggle(showAfter) {
    if (showAfter === isAfter) return;
    setOpacity(0);
    setTimeout(() => {
      setIsAfter(showAfter);
      setCurrentSrc(showAfter ? project.afterImg : project.beforeImg);
      setOpacity(1);
    }, 150);
  }

  return (
    <article className="reveal bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={currentSrc}
          alt={`${project.name} — ${isAfter ? "after" : "before"} construction`}
          className="w-full h-full object-cover"
          style={{ opacity, transition: "opacity 0.3s ease" }}
          loading="lazy"
        />
        {/* Before / After toggle overlay */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <button
            onClick={() => handleToggle(false)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              !isAfter
                ? "bg-[#C9A96E] text-white shadow-md"
                : "bg-white/80 text-gray-700 hover:bg-white"
            }`}
          >
            Before
          </button>
          <button
            onClick={() => handleToggle(true)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              isAfter
                ? "bg-[#C9A96E] text-white shadow-md"
                : "bg-white/80 text-gray-700 hover:bg-white"
            }`}
          >
            After
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-gray-900 text-lg leading-snug">{project.name}</h3>
            <p className="text-gray-400 text-sm mt-0.5">{project.location}</p>
          </div>
          <StatusPill status={project.status} />
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mt-1">{project.description}</p>
      </div>
    </article>
  );
}

export default function ProjectsGallery() {
  const titleRef = useScrollReveal({ threshold: 0.2 });
  const gridRef = useScrollRevealGroup({ threshold: 0.1 });

  return (
    <section id="projects-gallery" className="bg-white py-24">
      <div className="section-container">
        {/* Section header */}
        <div
          ref={titleRef}
          className="reveal mb-14 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            Projects in the Field.
          </h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-5" />
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real developments, real results. See the residential projects we build and deliver across Athens and beyond.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* More projects CTA */}
        <div className="text-center mt-14">
          <a href="#guide" className="btn-gold">
            More Projects
          </a>
        </div>
      </div>
    </section>
  );
}
