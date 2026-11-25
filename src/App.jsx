import { useEffect, useState } from "react";
import { getAsset, projects } from "./data/projects.js";

const heroSlides = [
  {
    image: getAsset("arena.jpeg"),
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
  ["Edificación y obra civil", "Construcción estructural y ejecución de proyectos a escala."],
  ["Infraestructura y vialidades", "Obras municipales, pavimentación, drenaje y redes."],
  ["Diseño arquitectónico", "Planeación, desarrollo técnico y coordinación especializada."],
  ["Mantenimiento industrial", "Cubiertas, HVAC, drenaje y sistemas eléctricos."]
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
          <figure><img src={getAsset("EquipoSeguridad.jpeg")} alt="Equipo de seguridad NETCARP" loading="lazy" /><figcaption>Seguridad y cumplimiento</figcaption></figure>
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

function Projects() {
  const [division, setDivision] = useState("Todos");
  const [subcategory, setSubcategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

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

  return (
    <section className="projects section" id="proyectos">
      <div className="projects-head">
        <div><h2>Obra y diseño<br />en México.</h2></div>
      </div>
      <div className="filter-level-one" role="group" aria-label="División principal">
        {["Todos", "Acabados", "Construcción"].map(value => (
          <button key={value} className={division === value ? "active" : ""} onClick={() => selectDivision(value)}>{value}</button>
        ))}
      </div>
      {division !== "Todos" && (
        <div className="filter-level-two" aria-label="Subcategorías">
          {subcategories[division].map(value => (
            <button key={value} className={subcategory === value ? "active" : ""} onClick={() => setSubcategory(value)}>{value}</button>
          ))}
        </div>
      )}
      <div className="project-grid mb-8">
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

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
