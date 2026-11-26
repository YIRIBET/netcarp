import { useEffect, useRef, useState } from "react";
import { getAsset, projects } from "./data/projects.js";

const heroSlides = [
  {
    image: getAsset("arena.jfif"),
    title: "Construimos espacios que sostienen el México de hoy.",
    text: "Diseño, construcción y acabados de alto nivel desde 2002."
  },
  {
    image: getAsset("parque-Cuervos.jpeg"),
    title: "Infraestructura con precisión técnica y visión nacional.",
    text: "Planta, obra civil y sistemas especializados para proyectos de alto impacto."
  }
];

const subcategories = {
  Acabados: ["Comercial", "Hotelería", "Corporativo", "Residencial", "Educación", "Museografía", "Salud", "Restaurantes"],
  Construcción: ["Naves Industriales", "Pavimentación de Vialidades", "Infraestructura Municipal", "Parque Fotovoltaico"]
};

const services = [
  ["Acabados arquitectónicos", "Interiores y exteriores con control integral de detalle, materiales y acabados."],
  ["Diseño, edificación y obra civil", "Planeación arquitectónica, construcción estructural y ejecución integral de proyectos."],
  ["Infraestructura y vialidades", "Obras municipales, pavimentación, drenaje y redes."],
  ["Mantenimiento industrial", "Mantenimiento de cubiertas, HVAC, drenaje y sistemas eléctricos."]
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="navbar" id="top">
      <a className="brand" href="#top" aria-label="NETCARP inicio">
        <img src={getAsset("Netcarp-logo.png")} alt="NETCARP" />
      </a>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Navegación principal">
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
        <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
        <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
        <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
      </nav>
      <a className="nav-cta" href="#contacto">Cotizar proyecto <span>↗</span></a>
      <button className="menu-button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>
        <span /><span />
      </button>
    </header>
  );
}

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  const slide = heroSlides[heroIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex(value => (value + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-label="NETCARP proyectos destacados">
      <div className="hero-media" style={{ backgroundImage: `url("${slide.image}")` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>{slide.title}</h1>
        <p>{slide.text}</p>
        <a className="primary-button" href="#proyectos">Ver portafolio <span>↗</span></a>
      </div>
      <div className="hero-controls">
        <button onClick={() => setHeroIndex(value => (value - 1 + heroSlides.length) % heroSlides.length)} aria-label="Diapositiva anterior">←</button>
        <div className="slide-count"><b>{String(heroIndex + 1).padStart(2, "0")}</b><span /><i>02</i></div>
        <button onClick={() => setHeroIndex(value => (value + 1) % heroSlides.length)} aria-label="Siguiente diapositiva">→</button>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <section className="intro section" id="nosotros">
        <div className="intro-grid">
          <div className="intro-heading">
            <h2>Más de 20 años construyendo con precisión.</h2>
          </div>
          <div className="intro-copy">
            <p>Somos una empresa orgullosamente mexicana dedicada a realizar proyectos de diseño arquitectónico y construcción. Desde que iniciamos operaciones en 2002, nos hemos enfocado en atender las necesidades específicas de nuestros clientes para proporcionar la mejor solución técnica, estética y funcional.</p>
            <p>Contamos con una planta de 600 m², con área equipada, maquinaria de vanguardia, recursos humanos calificados, así como productos que están hechos con los mejores materiales. También contamos con proyectos realizados a lo largo de toda la República Mexicana.</p>
            <p>Hoy somos una empresa con altos estándares de calidad e innovación que está en constante crecimiento y estamos a la vanguardia para ofrecer productos de excelencia.</p>
          </div>
        </div>
        <div className="metrics">
          <div><strong>2002</strong><span>Desde</span></div>
          <div><strong>600 m²</strong><span>Planta equipada</span></div>
          <div><strong>Nacional</strong><span>Cobertura</span></div>
        </div>
        <div className="people-grid">
          <figure><img src={getAsset("equipoNetcarp.jfif")} alt="Equipo NETCARP" loading="lazy" /><figcaption>Operación real en campo</figcaption></figure>
          <figure><img src={getAsset("EquipoSeguridad.jpeg")} alt="Equipo de seguridad NETCARP" loading="lazy" /><figcaption> Equipo de seguridad</figcaption></figure>
        </div>
      </section>
      <section className="principles">
        <div><span>Misión</span><p>Ofrecer servicios de diseño y construcción de alta calidad que cumplan con las necesidades y expectativas de nuestros clientes.</p></div>
        <div><span>Visión</span><p>Ser una empresa en expansión, productiva y rentable, con compromiso de calidad y servicio, cuidando a nuestro capital humano y utilizando materia prima ecológica y sostenible.</p></div>
      </section>
    </>
  );
}

function Services() {
  return (
    <section className="services section" id="servicios">
      <div className="services-head"><h2>Del criterio de diseño<br />a la ejecución en obra.</h2></div>
      <div className="services-grid">
        {services.map(([ title, description]) => (
          <article key={title}>
            <h3>{title}</h3><p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectDrawer({ project, onClose, onExpand }) {
  useEffect(() => {
    if (!project) return undefined;

    const handleKey = event => {
      if (event.key === "Escape" && !document.querySelector(".lightbox")) onClose();
    };
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal open" role="dialog" aria-modal="true" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="drawer">
        <div className="drawer-head">
          <span>Caso de estudio / {project.subcategory}</span>
          <button className="drawer-close" aria-label="Cerrar" onClick={onClose}>×</button>
        </div>
        <button className="drawer-main expand-button" type="button" onClick={() => onExpand(project.main, project.title)} aria-label={`Expandir ${project.title}`}>
          <img src={project.main} alt={project.title} />
          <span>Ampliar imagen ↗</span>
        </button>
        <div className="drawer-info">
          <div>
            <div className="drawer-data"><span>{project.division}</span><span>{project.location}</span></div>
            <h2>{project.title}</h2>
          </div>
          <p>{project.description}</p>
        </div>
        <div className="drawer-gallery">
          {project.gallery.map((image, index) => (
            <button
              className="expand-button gallery-expand"
              type="button"
              key={image}
              onClick={() => onExpand(image, `${project.title} — vista ${index + 1}`)}
              aria-label={`Expandir ${project.title}, vista ${index + 1}`}
            >
              <img src={image} alt={`${project.title} — vista ${index + 1}`} loading="lazy" />
              <span>Ampliar ↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const coverageStates = {
  "Ciudad de México": [
    { title: "Oficinas centrales y planta de 600 m²", detail: "Iztapalapa" },
    { title: "Arena Ciudad de México", detail: "Acabados · Comercial", project: "Arena Ciudad de México" },
    { title: "3M Santa Fe", detail: "Acabados · Corporativo", project: "3M Santa Fe" },
    { title: "EGADE Business School — Tec de Monterrey Campus Santa Fe", detail: "Acabados · Educación", project: "EGADE Business School" },
    { title: "Museo Soumaya Plaza Loreto", detail: "Acabados · Museografía", project: "Museo Soumaya Plaza Loreto" },
    { title: "Museo de la Ciudad de México", detail: "Acabados · Museografía", project: "Museo de la Ciudad de México" },
    { title: "Obras UNAM / MUAC y edificación residencial", detail: "Colonia Del Valle" }
  ],
  "Estado de México": [
    { title: "FEMSA Pilares — Toluca", detail: "Construcción · Naves industriales / Obra civil", project: "Naves Industriales Toluca" },
    { title: "Capilla Universidad Anáhuac — Interlomas", detail: "Acabados · Educación", project: "Capilla Universidad Anáhuac Interlomas" },
    { title: "Infraestructura municipal y cubiertas Arcotecho", detail: "Preparatorias Oficiales 92 y 96 · CBTA 35 · Primaria Jesús Reyes Heroles", project: "Infraestructura Municipal y Educativa" },
    { title: "Pavimentación de vialidades", detail: "Calle Norte 11 · Calle Norte 20 y otras vías", project: "Rehabilitación de Vialidades" }
  ],
  "Nuevo León": [
    { title: "Fiesta Americana Monterrey — Live Aqua", detail: "Acabados · Hotelería", project: "Fiesta Americana Monterrey · Live Aqua" },
    { title: "Hospital San José Monterrey — TecSalud", detail: "Acabados · Salud", project: "Hospital San José Monterrey" },
    { title: "Casa Sorteo TEC Monterrey 179", detail: "Acabados · Residencial", project: "Casa Sorteo TEC 179" }
  ],
  "Jalisco": [
    { title: "Hotel Marriott AC Guadalajara", detail: "Acabados · Hotelería", project: "Hotel Marriott AC Guadalajara" },
    { title: "Casa Sorteo TEC Guadalajara 181", detail: "Acabados · Residencial", project: "Casa Sorteo TEC 181" }
  ],
  "San Luis Potosí": [
    { title: "Fiesta Americana San Luis Potosí", detail: "Acabados · Hotelería", project: "Fiesta Americana San Luis Potosí" }
  ],
  "Aguascalientes": [
    { title: "Parque Fotovoltaico Los Cuervos", detail: "Construcción · Energía e infraestructura", project: "Parque Fotovoltaico Los Cuervos" },
    { title: "Subestación de potencia y subestación elevadora", detail: "Infraestructura eléctrica", project: "Parque Fotovoltaico Los Cuervos" }
  ]
};

const mexicoStates = [
  { id: "Baja California", name: "Baja California", points: "38,48 118,34 125,85 93,104 51,91" },
  { id: "Baja California Sur", name: "Baja California Sur", points: "112,145 142,130 154,190 137,246 116,226 105,180" },
  { id: "Sonora", name: "Sonora", points: "120,82 200,74 219,132 184,176 142,130 125,85" },
  { id: "Chihuahua", name: "Chihuahua", points: "200,74 294,91 286,170 219,132" },
  { id: "Coahuila", name: "Coahuila", points: "294,91 370,112 366,176 286,170" },
  { id: "Sinaloa", name: "Sinaloa", points: "184,176 219,132 286,170 257,218 204,210" },
  { id: "Durango", name: "Durango", points: "219,132 286,170 257,218 204,210" },
  { id: "Nuevo León", name: "Nuevo León", points: "366,176 408,178 416,218 366,226 338,198" },
  { id: "Tamaulipas", name: "Tamaulipas", points: "408,178 452,184 464,244 416,218" },
  { id: "Zacatecas", name: "Zacatecas", points: "257,218 286,170 338,198 332,252 278,254" },
  { id: "Aguascalientes", name: "Aguascalientes", points: "278,254 332,252 326,278 286,282" },
  { id: "Nayarit", name: "Nayarit", points: "204,210 257,218 278,254 248,286 208,272" },
  { id: "San Luis Potosí", name: "San Luis Potosí", points: "332,252 366,226 416,218 398,278 326,278" },
  { id: "Jalisco", name: "Jalisco", points: "248,286 278,254 326,278 316,332 264,326" },
  { id: "Guanajuato", name: "Guanajuato", points: "326,278 398,278 380,322 316,332" },
  { id: "Querétaro", name: "Querétaro", points: "398,278 416,218 438,270 420,310 380,322" },
  { id: "Hidalgo", name: "Hidalgo", points: "420,310 438,270 464,244 476,302 432,326" },
  { id: "Estado de México", name: "Estado de México", points: "380,322 420,310 432,326 408,348 372,342" },
  { id: "Ciudad de México", name: "Ciudad de México", points: "408,348 432,326 444,342 426,356" },
  { id: "Tlaxcala", name: "Tlaxcala", points: "432,326 476,302 488,326 444,342" },
  { id: "Puebla", name: "Puebla", points: "444,342 488,326 518,348 468,378 426,356" },
  { id: "Morelos", name: "Morelos", points: "408,348 426,356 468,378 438,390 394,374" },
  { id: "Veracruz", name: "Veracruz", points: "476,302 464,244 510,266 518,348 488,326" },
  { id: "Colima", name: "Colima", points: "264,326 316,332 300,352 272,350" },
  { id: "Michoacán", name: "Michoacán", points: "300,352 316,332 380,322 372,342 394,374 350,394 300,378" },
  { id: "Guerrero", name: "Guerrero", points: "394,374 438,390 468,378 474,420 400,420 350,394" },
  { id: "Oaxaca", name: "Oaxaca", points: "468,378 518,348 548,382 528,420 474,420" },
  { id: "Chiapas", name: "Chiapas", points: "528,420 548,382 578,398 566,452 508,452" },
  { id: "Tabasco", name: "Tabasco", points: "518,348 548,382 528,420 508,452 488,408" },
  { id: "Campeche", name: "Campeche", points: "548,382 578,398 566,452 608,420 602,376" },
  { id: "Yucatán", name: "Yucatán", points: "602,376 608,420 628,380 620,314 576,308" },
  { id: "Quintana Roo", name: "Quintana Roo", points: "628,380 608,420 602,376 620,314" }
];

function NationalCoverageMap({ selectedState, onSelectState, onOpenProject }) {
  const activeStateNames = Object.keys(coverageStates);
  const activeState = selectedState ? coverageStates[selectedState] : null;

  return (
    <div className="coverage-layout" key="coverage-map">
      <div className="coverage-map-wrap">
        <svg className="mexico-map" viewBox="0 0 660 500" role="img" aria-label="Mapa de cobertura de NETCARP en México">
          {mexicoStates.map(state => {
            const active = activeStateNames.includes(state.name);
            const selected = selectedState === state.name;
            return (
              <polygon
                key={state.id}
                points={state.points}
                className={`mexico-state ${active ? "active" : ""} ${selected ? "selected" : ""}`}
                onMouseEnter={active ? () => onSelectState(state.name) : undefined}
                onClick={active ? () => onSelectState(state.name) : undefined}
                role={active ? "button" : undefined}
                tabIndex={active ? 0 : undefined}
                onKeyDown={active ? event => {
                  if (event.key === "Enter" || event.key === " ") onSelectState(state.name);
                } : undefined}
              >
                <title>{state.name}{active ? " — Presencia NETCARP" : ""}</title>
              </polygon>
            );
          })}
          {activeStateNames.map(name => {
            const labelPositions = {
              "Ciudad de México": [418, 350],
              "Estado de México": [392, 332],
              "Nuevo León": [382, 204],
              "Jalisco": [296, 300],
              "San Luis Potosí": [366, 260],
              "Aguascalientes": [304, 268]
            };
            const [x, y] = labelPositions[name];
            return (
              <g key={name} className="state-marker" transform={`translate(${x} ${y})`} onClick={() => onSelectState(name)}>
                <circle r="5" />
                <circle r="10" className="marker-ring" />
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="coverage-panel" aria-live="polite">
        {!activeState ? (
          <>
            
            <h3>Presencia activa<br />desde 2002.</h3>
            <p>NETCARP desarrolla proyectos de diseño, acabados, construcción e infraestructura en distintas entidades de la República Mexicana.</p>
            <div className="active-states">
              {activeStateNames.map(name => (
                <button type="button" key={name} onClick={() => onSelectState(name)}>
                  <span>{String(activeStateNames.indexOf(name) + 1).padStart(2, "0")}</span>{name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="coverage-kicker">Cobertura / Estado activo</span>
            <h3>{selectedState}</h3>
            <p>{activeState.length} líneas de obra registradas.</p>
            <div className="coverage-project-list">
              {activeState.map(item => (
                <button
                  type="button"
                  key={`${item.title}-${item.detail}`}
                  className={item.project ? "is-project" : ""}
                  onClick={() => item.project && onOpenProject(item.project)}
                  disabled={!item.project}
                >
                  <span>{item.detail}</span>
                  <strong>{item.title}</strong>
                  {item.project && <b aria-hidden="true">↗</b>}
                </button>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Projects() {
  const [division, setDivision] = useState("Todos");
  const [subcategory, setSubcategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (!expandedImage) return undefined;
    const handleKey = event => {
      if (event.key === "Escape") setExpandedImage(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [expandedImage]);

  const filteredProjects = projects.filter(project => {
    const matchesDivision = division === "Todos" || project.division === division;
    const matchesSubcategory = subcategory === "Todos" || project.subcategory === subcategory;
    return matchesDivision && matchesSubcategory;
  });

  const selectDivision = value => {
    setDivision(value);
    setSubcategory("Todos");
  };

  const isMap = division === "Cobertura Nacional";

  return (
    <section className="projects section" id="proyectos">
      <div className="projects-head">
        <div><h2>Obra y diseño<br />en México.</h2></div>
      </div>
      <div className="filter-level-one" role="group" aria-label="División principal">
        {["Todos", "Acabados", "Construcción", "Cobertura Nacional"].map(value => (
          <button
            key={value}
            className={(value === "Cobertura Nacional" ? division === "Cobertura Nacional" : division === value) ? "active" : ""}
            onClick={() => selectDivision(value === "Cobertura Nacional" ? "Cobertura Nacional" : value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="filter-level-two" aria-label="Subcategorías">
        {!isMap && division !== "Todos" && subcategories[division]?.map(value => (
          <button key={value} className={subcategory === value ? "active" : ""} onClick={() => setSubcategory(value)}>{value}</button>
        ))}
      </div>
      {isMap ? (
        <NationalCoverageMap
          selectedState={selectedState}
          onSelectState={setSelectedState}
          onOpenProject={projectTitle => {
            const project = projects.find(item =>
              item.title === projectTitle ||
              projectTitle.includes(item.title) ||
              item.title.includes(projectTitle)
            );
            if (project) setSelectedProject(project);
          }}
        />
      ) : (
        <div className="project-grid" key={`${division}-${subcategory}`}>
          {filteredProjects.map((project, index) => (
            <article
              className="project-card"
              key={project.title}
              tabIndex="0"
              role="button"
              aria-label={`Abrir caso de estudio ${project.title}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") setSelectedProject(project);
              }}
            >
              <div className="project-image">
                <img src={project.main} alt={project.title} loading={index < 3 ? "eager" : "lazy"} />
              </div>
              <div className="project-meta">
                <h3>{project.title}</h3>
                <span>{project.location}</span>
              </div>
            </article>
          ))}
        </div>
      )}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onExpand={(src, alt) => setExpandedImage({ src, alt })}
      />
      {expandedImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={expandedImage.alt}
          onMouseDown={event => {
            if (event.target === event.currentTarget) setExpandedImage(null);
          }}
        >
          <button className="lightbox-close" type="button" aria-label="Cerrar imagen" onClick={() => setExpandedImage(null)}>×</button>
          <img src={expandedImage.src} alt={expandedImage.alt} />
        </div>
      )}
    </section>
  );
}

const commercialRelations = [
  { name: "ARENA Ciudad de México", style: "arena", image: "marcas/arena-cdmx.png" },
  { name: "SHERATON María Isabel", style: "sheraton", image: "marcas/sheraton.png" },
  { name: "UNAM", sub: "Universidad Nacional Autónoma de México", style: "unam", image: "marcas/unam.png" },
  { name: "Universidad Anáhuac", style: "anahuac", image: "marcas/Anahuac.png" },
  { name: "Alsea", style: "alsea", image: "marcas/alsea.png" },
  { name: "Tecnológico de Monterrey", style: "tec", image: "marcas/TEC-Monterrey.png" },
  { name: "Museo Soumaya", style: "soumaya", image: "marcas/Museo-Soumaya.png" },
  { name: "CIRSA México", style: "cirsa", image: "marcas/cirsa.png" },
  { name: "Prodiel", style: "prodiel", image: "marcas/prodiel.png" },
  { name: "Fiesta Americana Hotels & Resorts", style: "fiesta", image: "marcas/fiestaAmericana-logo.png" },
  { name: "EGADE Business School", style: "egade", image: "marcas/egade-logo.png" },
  { name: "TecSalud — Hospital San José", style: "tecsalud", image: "marcas/Tec-Salud.png" },
  { name: "MUAC", sub: "Museo Universitario Arte Contemporáneo", style: "muac", image: "marcas/muaqc.png" },
  { name: "CASINO LIFE", sub: "", style: "casino", image: "marcas/CasinoLife.png" },
  { name: "BayWa r.e.", sub: "", style: "baywa", image: "marcas/BayWa.png" },
  { name: "SORTEO TEC", sub: "", style: "sorteo", image: "marcas/sorteoTec.png" },
  { name: "SIESA", sub: "", style: "siesa", image: "marcas/osiesa .png" },
  { name: "FIBRA HOTEL", sub: "MX", style: "fibra", image: "marcas/fibraHotel.png" }
];

function CommercialRelations() {
  return (
    <section className="relations section" aria-labelledby="relations-title">
      <div className="relations-carousel">
        <h2 id="relations-title" className="relations-title">Relaciones comerciales.</h2>
        <div className="relations-grid" aria-label="Empresas e instituciones relacionadas">
          <div className="relations-track">
            {[...commercialRelations, ...commercialRelations].map(({ name, sub, style, image }, index) => (
              <div className="relation-mark" key={`${name}-${index}`} aria-hidden={index >= commercialRelations.length}>
                {image ? (
                  <img className="relation-logo" src={getAsset(image)} alt={index < commercialRelations.length ? name : ""} loading="lazy" />
                ) : (
                  <div className={`relation-wordmark relation-${style}`} aria-label={name}>
                    <strong>{name}</strong>
                    {sub && <span>{sub}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const submitQuote = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Solicitud de cotización — ${data.get("type")}`);
    const body = encodeURIComponent([
      `Nombre: ${data.get("name")}`,
      `Empresa: ${data.get("company") || "No indicada"}`,
      `Teléfono: ${data.get("phone")}`,
      `Correo: ${data.get("email")}`,
      `Tipo de proyecto: ${data.get("type")}`,
      "",
      "Descripción:",
      data.get("description")
    ].join("\n"));
    window.location.href = `mailto:compras.netcarp@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact section" id="contacto">
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="kicker">Nueva colaboración</p>
          <h2>Hablemos de<br />tu proyecto.</h2>
          <div className="contact-details">
            <p><span>Dirección</span>Calle Amacuzac #20 Int. 5<br />Col. El Retoño, Iztapalapa, CDMX C.P. 09440</p>
            <p><span>Teléfonos</span><a href="tel:+525583744001">55 8374 4001</a><br /><a href="https://wa.me/525514523328">55 1452 3328 · WhatsApp</a></p>
            <p><span>Correos</span><a href="mailto:compras.netcarp@gmail.com">compras.netcarp@gmail.com</a><br /><a href="mailto:netcarp@icloud.com">netcarp@icloud.com</a></p>
            <p><span>Horario</span>Lun–Vie 09:00–18:00<br />Sábado 09:00–13:00</p>
          </div>
        </div>
        <form className="quote-form" onSubmit={submitQuote}>
          <label>Nombre<input name="name" required /></label>
          <label>Empresa<input name="company" /></label>
          <label>Teléfono<input name="phone" type="tel" required /></label>
          <label>Correo<input name="email" type="email" required /></label>
          <label>Tipo de proyecto
            <select name="type" required>
              <option value="">Seleccionar</option>
              <option>Acabados</option>
              <option>Construcción</option>
              <option>Mantenimiento</option>
            </select>
          </label>
          <label className="full">Descripción<textarea name="description" rows="4" required /></label>
          <button className="primary-button full" type="submit">Enviar solicitud <span>↗</span></button>
        </form>
      </div>
      <div className="map">
        <iframe title="Mapa NETCARP" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Calle+Amacuzac+20,+El+Retono,+Iztapalapa,+CDMX&output=embed" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand"><img src={getAsset("Netcarp-logo.png")} alt="NETCARP" /></div>
      <p>Inter+Carp S.A. de C.V.</p>
      <div className="socials">
        <a href="#" aria-label="Facebook">Facebook</a>
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="TikTok">TikTok</a>
      </div>
      <a className="back-top" href="#top">Volver arriba ↑</a>
    </footer>
  );
}

function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("compras.netcarp@gmail.com");
    } catch {
      const input = document.createElement("textarea");
      input.value = "compras.netcarp@gmail.com";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const submitQuickContact = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Solicitud de cotización — NETCARP");
    const body = encodeURIComponent([
      `Nombre: ${data.get("name")}`,
      `Empresa: ${data.get("company") || "No indicada"}`,
      `Teléfono: ${data.get("phone")}`,
      `Correo: ${data.get("email")}`,
      `Tipo de proyecto: ${data.get("type")}`,
      "",
      "Descripción:",
      data.get("description")
    ].join("\n"));
    setSent(true);
    event.currentTarget.reset();
    window.location.href = `mailto:compras.netcarp@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="floating-contact">
      {open && (
        <aside className="quick-contact-panel" aria-label="Contacto directo NETCARP">
          <div className="quick-contact-header">
            <div>
              <span>Contacto directo</span>
              <strong>NETCARP</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar contacto">×</button>
          </div>
          <form className="quick-contact-form" onSubmit={submitQuickContact}>
            <label>
              Nombre
              <input name="name" required />
            </label>
            <label>
              Empresa
              <input name="company" />
            </label>
            <label>
              Teléfono
              <input name="phone" type="tel" required />
            </label>
            <label>
              Correo
              <input name="email" type="email" required />
            </label>
            <label>
              Tipo de proyecto
              <select name="type" required>
                <option value="">Seleccionar</option>
                <option>Acabados</option>
                <option>Construcción</option>
                <option>Mantenimiento</option>
              </select>
            </label>
            <label>
              Descripción
              <textarea name="description" rows="3" required />
            </label>
            <button className="quick-contact-submit" type="submit">Enviar mensaje <span>↗</span></button>
            {sent && <p className="quick-contact-confirmation" role="status">Solicitud preparada para enviar.</p>}
          </form>
          <div className="quick-contact-footer">
            <a href="mailto:compras.netcarp@gmail.com">compras.netcarp@gmail.com</a>
            <button type="button" onClick={copyEmail}>{copied ? "¡Copiado!" : "Copiar"}</button>
          </div>
        </aside>
      )}
      <button
        className={`floating-contact-button ${open ? "open" : ""}`}
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-label={open ? "Cerrar contacto por correo" : "Enviar correo"}
      >
        <span className="mail-icon" aria-hidden="true">✉</span>
        <span className="floating-contact-label">Enviar correo</span>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <CommercialRelations />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
