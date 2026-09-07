/* =========================================================
   Modelo de contenido del sitio.
   En este prototipo el contenido editable se guarda en
   localStorage (clave "vc_content"). En producción esto
   debería vivir en una base de datos / backend real.
   ========================================================= */
const CONTENT_KEY = "vc_content";

const DEFAULT_CONTENT = {
  heroEyebrow: "Asesoría migratoria",
  heroTitleLine1: "Tu Visa,",
  heroTitleLine2: "nuestro propósito",
  heroSub: "Te asesoramos en todo el proceso para que obtengas tu visa con seguridad, confianza y las mejores oportunidades.",
  heroCta1: "¡Inscríbete con nosotros!",
  heroCta2: "Contáctanos",
  heroImageUrl: "assets/hero-illustration.svg",
  avatarImageUrl: "assets/avatar-illustration.svg",
  introText: "Sabemos que cada sueño tiene un destino. Por eso, te brindamos un acompañamiento personalizado, con asesoría experta y un proceso claro, para que des el primer paso hacia tu futuro en el extranjero.",
  whatsappNumber: "573001234567",
  whatsappMessage: "Hola, quiero información sobre asesoría de visa a Colombia",
  instagramUrl: "https://instagram.com/tuempresa",
  emailAddress: "contacto@tuempresa.com",
  siteLabel: "Mi Sitio Web", siteUrl: "https://tuempresa.com",
  blogLabel: "Mi Blog", blogUrl: "https://tuempresa.com/blog",
  youtubeLabel: "YouTube", youtubeUrl: "https://youtube.com/@tuempresa",
  services: [
    { title: "Visa de Trabajo", text: "Preparamos tu solicitud si ya tienes una oferta laboral en Colombia o vienes a prestar servicios." },
    { title: "Visa de Inversión", text: "Te guiamos si vas a invertir en el país y necesitas acreditarlo ante Migración Colombia." },
    { title: "Visa de Estudiante", text: "Trámite completo para quienes vienen a estudiar en instituciones colombianas." },
    { title: "Residencia (Visa R)", text: "Evaluamos si cumples los tiempos y requisitos para solicitar tu residencia." }
  ],
  whyTitle: "Por qué asesorarte con nosotros",
  whyText: "Cada solicitud rechazada cuesta tiempo, dinero y, muchas veces, una segunda oportunidad. Revisamos tu documentación antes de radicarla, corregimos lo que pueda generar un rechazo y te representamos durante todo el proceso ante Cancillería y Migración Colombia.",
  stat1Num: "500+", stat1Label: "Casos asesorados",
  stat2Num: "92%", stat2Label: "Visas aprobadas",
  stat3Num: "8", stat3Label: "Años de experiencia",
  stat4Num: "24/7", stat4Label: "Acompañamiento",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  testimonials: [
    { name: "Laura M.", role: "Visa de trabajo aprobada", quote: "Me explicaron cada documento que necesitaba y la respuesta llegó en menos de un mes." },
    { name: "Carlos R.", role: "Residencia aprobada", quote: "Sin su asesoría hubiera cometido errores que retrasan el proceso meses." },
    { name: "Ana P.", role: "Visa de estudiante aprobada", quote: "Atención cercana de principio a fin, siempre respondieron mis dudas rápido." }
  ],
  ctaFinalTitle: "¿Listo para empezar tu proceso?",
  ctaFinalText: "Inscríbete y agenda tu primera valoración de caso sin costo."
};

function getContent(){
  try{
    const raw = localStorage.getItem(CONTENT_KEY);
    if(!raw) return structuredClone(DEFAULT_CONTENT);
    const saved = JSON.parse(raw);
    return Object.assign(structuredClone(DEFAULT_CONTENT), saved);
  }catch(e){
    console.error("No se pudo leer el contenido guardado, usando valores por defecto.", e);
    return structuredClone(DEFAULT_CONTENT);
  }
}

function saveContent(content){
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
}

function resetContent(){
  localStorage.removeItem(CONTENT_KEY);
}
