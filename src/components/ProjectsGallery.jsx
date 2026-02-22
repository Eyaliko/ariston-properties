import { useState, useEffect, useRef } from "react";
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

function BeforeAfterSlider({ beforeImg, afterImg, name }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);

  function getPercent(clientX) {
    const rect = containerRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none"
      onMouseMove={(e) => setPos(getPercent(e.clientX))}
      onMouseLeave={() => setPos(50)}
      onTouchMove={(e) => { e.preventDefault(); setPos(getPercent(e.touches[0].clientX)); }}
    >
      {/* After image — full base layer */}
      <img src={afterImg} alt={`${name} after`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      {/* Before image — clipped to left of divider */}
      <img
        src={beforeImg}
        alt={`${name} before`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        loading="lazy"
      />

      {/* Divider line + handle */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-md pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-500 text-sm font-bold">
          ⇔
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/40 text-white text-xs font-semibold">Before</span>
      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#C9A96E]/90 text-white text-xs font-semibold">After</span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="reveal bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <BeforeAfterSlider
          beforeImg={project.beforeImg}
          afterImg={project.afterImg}
          name={project.name}
        />
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
