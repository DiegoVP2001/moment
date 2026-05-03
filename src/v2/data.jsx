// ============ DATA V2 ============
const WA_NUM = '56998928078';
const WA_PRETTY = '+56 9 9892 8078';

function waLink(serviceTitle, itemName) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Me gustaría saber la disponibilidad para agendar ${itemName} de ${serviceTitle}.`)}`;
}
function waGeneralLink(serviceTitle) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Me gustaría más información sobre ${serviceTitle}.`)}`;
}
function waBuyLink(productName) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Me interesa comprar ${productName}. ¿Tienen disponibilidad?`)}`;
}

const BRAND = {
  name: 'Moment',
  tagline: 'Piensa en tu bienestar',
  phone: WA_PRETTY,
  email: 'momentcentrodeportivo@gmail.com',
  address: 'Calle Cortes 41, Isla de Maipo',
  region: 'Región Metropolitana',
  instagram: 'moment.csd',
  instagramUrl: 'https://www.instagram.com/moment.csd/',
  hours: [
    ['Lun — Vie', '07:00 — 22:00'],
    ['Sábado',    '09:00 — 18:00'],
    ['Domingo',   '10:00 — 14:00'],
  ]
};

const SERVICES = [
  {
    id: 'kine', n: '01',
    title: 'Kinesiología Deportiva',
    icon: 'assets/icon-kinesiology.png',
    desc: 'Evaluación, rehabilitación y optimización del movimiento para deportistas y personas activas.',
    cta: 'Agendar evaluación',
    accent: 'teal',
    detail: 'Diagnóstico funcional, tratamiento manual y ejercicios específicos para recuperar lesiones y mejorar el rendimiento. Los packs incluyen seguimiento progresivo y reevaluaciones intermedias.',
    items: [
      { k: 'Evaluación inicial', v: '$35.000' },
      { k: 'Reevaluación',       v: '$20.000' },
      { k: 'Sesión individual',  v: '$30.000' },
      { k: 'Pack 5 sesiones',    v: '$140.000' },
      { k: 'Pack 8 sesiones',    v: '$215.000' },
      { k: 'Pack 10 sesiones',   v: '$260.000' },
    ],
  },
  {
    id: 'psico', n: '02',
    title: 'Psicología Deportiva',
    icon: 'assets/icon-psychology.png',
    desc: 'Programas personalizados para rendimiento mental, manejo de presión y foco competitivo.',
    cta: 'Definir objetivos',
    accent: 'blue',
    detail: 'Manejo de ansiedad competitiva, concentración, visualización y recuperación post-competencia. El Programa Base cubre fundamentos; Pro y Alto Rendimiento suman sesiones y acompañamiento.',
    items: [
      { k: 'Evaluación inicial',  v: '$20.000' },
      { k: 'Sesión individual',   v: '$30.000' },
      { k: 'Programa Base',       v: '$110.500' },
      { k: 'Programa Pro',        v: '$180.000' },
      { k: 'Alto Rendimiento',    v: '$270.000' },
    ],
  },
  {
    id: 'train', n: '03',
    title: 'Entrenamiento & Recovery',
    icon: 'assets/icon-training.png',
    desc: 'Planes de entrenamiento personalizado, masoterapia, compresión y evaluación VO2.',
    cta: 'Ver planes',
    accent: 'ink',
    detail: 'Planes mensuales con rutina personalizada según objetivo y frecuencia. Complementa con masoterapia, compresión para recovery y evaluación VO2.',
    items: [
      { k: 'Plan 1 — 2 ses/sem',  v: '$90.000' },
      { k: 'Plan 2 — 3 ses/sem',  v: '$130.000' },
      { k: 'Plan 3 — ilimitado',  v: '$170.000' },
      { k: 'Masoterapia',         v: '$28.000' },
      { k: 'Compresión',          v: '$15.000' },
      { k: 'Evaluación VO2',      v: '$45.000' },
    ],
  },
  {
    id: 'climb', n: '04',
    title: 'Escalada · Climbing Wall',
    icon: 'assets/icon-climbing.png',
    desc: 'Pases, clases grupales y bautizos de escalada en nuestro muro dedicado.',
    cta: 'Reservar sesión',
    accent: 'pink',
    detail: 'Muro indoor con rutas renovadas periódicamente. Pase diario libre; mensuales/semestrales/anuales con acceso ilimitado. Clases incluyen arnés, instructor y técnicas de seguridad.',
    items: [
      { k: 'Pase diario',        v: '$8.000' },
      { k: 'Mensual',            v: '$38.000' },
      { k: 'Semestral',          v: '$180.000' },
      { k: 'Anual',              v: '$320.000' },
      { k: 'Clase grupal',       v: '$12.000' },
      { k: 'Bautizo escalada',   v: '$15.000' },
    ],
  },
];

const TEAM = [
  {
    name: 'Karinna Araneda', role: 'Kinesióloga Deportiva',
    bio: 'Amplia experiencia en rehabilitación y optimización del rendimiento atlético.',
    photo: 'assets/team-karinna.jpg',
    linkedin: 'https://www.linkedin.com/in/karinnaaraneda/',
  },
  {
    name: 'Jairo Pinto', role: 'Psicólogo Deportivo',
    bio: 'Experto en diseño de programas personalizados para el rendimiento psicológico.',
    photo: 'assets/team-jairo.jpg',
    linkedin: 'https://www.linkedin.com/in/jairopintosepulveda/',
  },
  {
    name: 'Miguel', role: 'Nutricionista Deportivo',
    bio: 'Planes alimenticios que potencian la salud y el rendimiento de atletas.',
    photo: 'assets/team-miguel.png',
    linkedin: null,
  },
];

const CAROUSEL_ITEMS = [
  { type: 'image', src: 'assets/img_carrusel_1.jpeg', label: 'Muro de escalada' },
  { type: 'image', src: 'assets/img_carrusel_2.jpeg', label: 'Inauguración Moment' },
  { type: 'video', src: 'assets/video_carrusel_1.mp4', label: 'Sesión de entrenamiento' },
  { type: 'image', src: 'assets/img_carrusel_1.jpeg', label: 'Zona boulder' },
  { type: 'image', src: 'assets/img_carrusel_2.jpeg', label: 'Comunidad Moment' },
  { type: 'video', src: 'assets/video_carrusel_1.mp4', label: 'Recovery en acción' },
];

const MEDIOS = [
  {
    source: 'Islita TV', title: 'Inauguración MOMENT',
    youtubeId: 'zjuSQSz3h2s',
    thumb: 'https://img.youtube.com/vi/zjuSQSz3h2s/hqdefault.jpg',
  },
  {
    source: 'Radio Origen', title: 'Entrevista MOMENT',
    youtubeId: 'RGQ14zBu2TA',
    thumb: 'https://img.youtube.com/vi/RGQ14zBu2TA/hqdefault.jpg',
  },
];

const SHOP = [
  { name: 'Bolsa de Magnesio', price: '$20.000', desc: 'Bolsa premium para escalada y calistenia.' },
  { name: 'Magnesio suelto', price: '$2.000', desc: 'Magnesio en polvo para grip máximo.' },
  { name: 'Grips', price: '$6.000', desc: 'Protección para manos en barra y muro.' },
  { name: 'Creatina 300g', price: '$15.000', desc: 'Monohidrato de creatina para rendimiento.' },
  { name: 'Botella deportiva 750ml', price: '$8.000', desc: 'Botella reutilizable con logo Moment.' },
  { name: 'Toalla microfibra', price: '$5.000', desc: 'Secado rápido, compacta y liviana.' },
];

const EVENTS = [
  { date: '2026-05-10', time: '10:00', title: 'Competencia Boulder Open', desc: 'Categorías principiante a avanzado. Inscripciones abiertas.', tag: 'Escalada' },
  { date: '2026-05-17', time: '09:00', title: 'Taller de Respiración & Foco', desc: 'Con Jairo Pinto. Técnicas de concentración para competidores.', tag: 'Psicología' },
  { date: '2026-05-24', time: '11:00', title: 'Clase Abierta de Escalada', desc: 'Sesión gratuita para nuevos. Incluye arnés e instructor.', tag: 'Escalada' },
  { date: '2026-06-07', time: '08:00', title: 'Evaluación VO2 Grupal', desc: 'Cupos limitados. Mide tu capacidad aeróbica.', tag: 'Entreno' },
];

const JOBS = [
  { title: 'Kinesiólogo/a Deportivo/a', type: 'Part-time', desc: 'Buscamos kinesiólogo/a con experiencia en rehabilitación deportiva para atender pacientes y diseñar planes de recuperación.' },
  { title: 'Profesor/a de Calistenia', type: 'Part-time', desc: 'Instructor/a de calistenia con conocimiento en progresiones de fuerza y planificación de clases grupales.' },
];

Object.assign(window, {
  BRAND, SERVICES, TEAM, CAROUSEL_ITEMS, MEDIOS, SHOP, EVENTS, JOBS,
  WA_NUM, WA_PRETTY, waLink, waGeneralLink, waBuyLink
});
