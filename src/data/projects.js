const assetModules = import.meta.glob("../assets/*.{jpeg,jpg,jfif,png}", {
  eager: true,
  query: "?url",
  import: "default"
});

export function getAsset(fileName) {
  return assetModules[`../assets/${fileName}`] || "";
}

const rawProjects = [
  { title: "Arena Ciudad de México", division: "Acabados", subcategory: "Comercial", location: "Ciudad de México", main: "arena.jpeg", gallery: ["arena-1.jpeg","arena-2.jpeg","arena-3.jfif"], description: "Ejecutivo integral de acabados arquitectónicos en uno de los recintos de espectáculos de mayor escala de la ciudad." },
  { title: "Casino Life", division: "Acabados", subcategory: "Comercial", location: "Estado de México", main: "casino-life.jpeg", gallery: ["casino-1.jfif","casino-2.jfif","casino-3.jfif"], description: "Desarrollo de interiores y acabados comerciales con criterios técnicos de durabilidad, detalle y operación continua." },
  { title: "Fiesta Americana San Luis Potosí", division: "Acabados", subcategory: "Hotelería", location: "San Luis Potosí", main: "FiestaAmericana.jpeg", gallery: ["FiestaAmericana.jpeg","FA-1.jpeg","FA-2.jpeg","FA-3.jpeg"], description: "Acabados hoteleros ejecutados bajo estándares de hospitalidad, precisión constructiva y entrega puntual." },
  { title: "Fiesta Americana Monterrey · Live Aqua", division: "Acabados", subcategory: "Hotelería", location: "Monterrey, Nuevo León", main: "FistaAmericanaAQUA.jfif", gallery: ["Aqua-1.jfif","aqua-2.jfif","aqua-3.jpeg"], description: "Soluciones arquitectónicas y acabados especializados para espacios hoteleros de alto nivel." },
  { title: "Hotel Marriott AC Guadalajara", division: "Acabados", subcategory: "Hotelería", location: "Guadalajara, Jalisco", main: "AC_Hotel.jpeg", gallery: ["ac-1.jpeg","ac-2.jpeg","ac-3.jpeg"], description: "Intervención integral de acabados y soluciones interiores para hospitalidad urbana." },
  { title: "3M Santa Fe", division: "Acabados", subcategory: "Corporativo", location: "CDMX", main: "3M.jpeg", gallery: ["3m-1.jpeg","3m-2.jpeg","3m-3.jpeg"], description: "Espacios corporativos ejecutados con acabados técnicos, coordinación de instalaciones y control de calidad." },
  { title: "Citizen", division: "Acabados", subcategory: "Corporativo", location: "Ciudad de México", main: "citizen.jpeg", gallery: ["citizen-1.jfif","citizen-2.jpeg","citizen-3.jpeg"], description: "Proyecto corporativo orientado a eficiencia operativa, detalle arquitectónico y acabados premium." },
  { title: "Casa Sorteo TEC 181", division: "Acabados", subcategory: "Residencial", location: "Guadalajara, Jalisco", main: "casa181.jfif", gallery: ["casa181-1.jfif","casa181-2.jfif","casa181-3.jfif"], description: "Edificación residencial con acabados personalizados y atención meticulosa a cada espacio habitable." },
  { title: "Casa Sorteo TEC 179", division: "Acabados", subcategory: "Residencial", location: "Monterrey, Nuevo León", main: "casa179.jfif", gallery: ["casa179-1.jfif","casa179-2.jfif","casa179-3.jfif"], description: "Residencia de diseño contemporáneo con ejecución integral de arquitectura y acabados." },
  { title: "EGADE Business School", division: "Acabados", subcategory: "Educación", location: "Campus Santa Fe, CDMX", main: "egade.jpeg", gallery: ["egade-1.jpeg","egade-2.jpeg","egade-3.jpeg"], description: "Adecuación académica y corporativa con soluciones durables para espacios de enseñanza y colaboración." },
  { title: "Capilla Universidad Anáhuac Interlomas", division: "Acabados", subcategory: "Educación", location: "Huixquilucan, Estado de México", main: "capilla-Anahuac.jpeg", gallery: ["cap-A-1.jpeg","cap-A-2.jfif","cap-A-3.jfif"], description: "Espacio educativo institucional que combina precisión geométrica, acústica y acabados especializados." },
  { title: "Museo Soumaya Plaza Loreto", division: "Acabados", subcategory: "Museografía", location: "Ciudad de México", main: "Soumaya.jpeg", gallery: ["soumaya-1.jfif","soumaya-2.jfif","soumaya-3.jfif"], description: "Intervención museográfica enfocada en exhibición, tránsito controlado y calidad de acabados." },
  { title: "Museo de la Ciudad de México", division: "Acabados", subcategory: "Museografía", location: "Centro Histórico, CDMX", main: "museo-cdmx.jpg", gallery: ["M-cdmx-1.jpeg","M-cdmx-2.jpeg","M-cdmx-3.jpeg"], description: "Conservación y adecuación de espacios museísticos con control técnico de detalles arquitectónicos." },
  { title: "Hospital San José Monterrey", division: "Acabados", subcategory: "Salud", location: "Monterrey, Nuevo León", main: "Hospital-sanJose.jpeg", gallery: ["H-sJ-1.jfif","H-sJ-2.jpeg","H-sJ-3.jfif"], description: "Acabados y adecuaciones hospitalarias ejecutados para operación segura y exigencias higiénicas." },
  { title: "Sonora Grill", division: "Acabados", subcategory: "Restaurantes", location: "Ciudad de México", main: "SonoraGrill.jpeg", gallery: ["SonoraG-1.jpeg","SonoraG-2.jpeg","SonoraG-3.jpeg"], description: "Proyecto gastronómico con acabados cálidos, instalaciones coordinadas y enfoque en experiencia de usuario." },
  { title: "Plaza MAQ", division: "Acabados", subcategory: "Restaurantes", location: "Ciudad de México", main: "PlazaMAQ.jpeg", gallery: ["MAQ-1.jpeg","MAQ-2.jpeg","MAQ-3.jpeg"], description: "Adecuación comercial y restaurantera con ejecución integral de carpintería, superficies y arquitectura interior." },
  { title: "Naves Industriales Toluca", division: "Construcción", subcategory: "Naves Industriales", location: "Toluca, Estado de México", main: "navesIndustriales.jpeg", gallery: ["navesIndustriales-1.jpeg","navesIndustriales-2.jpeg","navesIndustriales-3.jpeg","navesIndustriales-4.jpeg","navesIndustriales-5.jpeg"], description: "Construcción y desarrollo de infraestructura industrial con control estructural, seguridad y eficiencia operativa." },
  { title: "Rehabilitación de Vialidades", division: "Construcción", subcategory: "Pavimentación de Vialidades", location: "República Mexicana", main: "pavimentacionVialidades.jpeg", gallery: ["pavimentacionVialidades-1.jpeg","pavimentacionVialidades-3.jfif","PavimentacionVialidades-4.jfif"], description: "Rehabilitación y pavimentación de concreto hidráulico y asfáltico con preparación de superficie y drenaje." },
  { title: "Infraestructura Municipal y Educativa", division: "Construcción", subcategory: "Infraestructura Municipal", location: "República Mexicana", main: "InfrestructuraMunicipal.jpeg", gallery: ["InfrestructuraMunicipal-2.jpeg","InfrestructuraMunicipal-3.jpeg","InfrestructuraMunicipal-4.jpeg","InfrestructuraMunicipal-5.jfif","InfrestructuraMunicipal-6.jfif"], description: "Cubiertas Arcotecho, ampliaciones e infraestructura pública ejecutada para uso institucional." },
  { title: "Parque Fotovoltaico Los Cuervos", division: "Construcción", subcategory: "Parque Fotovoltaico", location: "Aguascalientes", main: "parque-Cuervos.jpeg", gallery: ["Elevadora.jpeg","Elevadora-1.jpeg","Elevadora-2.jpeg","Elevadora-3.jpeg","Elevadora-4.jpeg","Elevadora-5.jpeg","Elevadora-6.jpeg","potencia.jpeg","potencia-1.jpeg","potencia-3.jpeg","Potencia-2.jpeg","Potencia-4.jpeg","Potencia-5.jpeg"], description: "Obra de infraestructura energética, subestaciones elevadoras y sistemas de potencia para generación fotovoltaica." }
];

export const projects = rawProjects.map(project => ({
  ...project,
  main: getAsset(project.main),
  gallery: project.gallery.map(getAsset)
}));
