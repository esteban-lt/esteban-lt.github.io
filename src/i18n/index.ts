import es from '../../cv.es.json'
import en from '../../cv.en.json'

export type Lang = 'es' | 'en'

export const defaultLang: Lang = 'es'

export const locales: Record<Lang, { intl: string; og: string }> = {
  es: { intl: 'es-MX', og: 'es_MX' },
  en: { intl: 'en-US', og: 'en_US' },
}

const cvs = { es, en } as unknown as Record<Lang, typeof es>

export const getCV = (lang: Lang) => cvs[lang]

export const getOtherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es')

export const getPath = (lang: Lang) => (lang === defaultLang ? '/' : `/${lang}/`)

const esUi = {
  title: 'Esteban Ledezma – ISC | Desarrollador de Software',
  siteName: 'Portafolio de Esteban Ledezma',
  description:
    'Portafolio de Esteban Ledezma, desarrollador de software en Chihuahua. APIs con Node.js y NestJS, interfaces con React y Next.js, IoT y pipelines de CI/CD.',
  about: 'Sobre mí',
  experience: 'Experiencia',
  projects: 'Proyectos',
  education: 'Educación',
  certificates: 'Certificados',
  skills: 'Habilidades',
  present: 'Actualidad',
  summary: 'Resumen:',
  responsibilities: 'Responsabilidades:',
  showMore: 'Mostrar más',
  showLess: 'Mostrar menos',
  contact: 'Contacto:',
  technologiesUsed: 'Tecnologías utilizadas',
  toggleDark: 'Alternar modo oscuro',
  themeSelect: 'Tema de color',
  switchLang: 'EN – Cambiar a inglés',
  switchLangCode: 'EN',
  viewCV: 'Ver CV',
  viewCVLabel: 'Ver CV en PDF (se abre en una pestaña nueva)',
  cvFile: '/cv/Esteban_Ledezma_CV_ES.pdf',
  view: (name: string) => `Ver ${name}`,
  viewOnGithub: (name: string) => `Ver ${name} en GitHub`,
  opensInNewTab: (name: string) => `${name} (se abre en una pestaña nueva)`,
}

const enUi: typeof esUi = {
  title: 'Esteban Ledezma – Software Developer',
  siteName: "Esteban Ledezma's Portfolio",
  description:
    'Portfolio of Esteban Ledezma, software developer in Chihuahua, Mexico. APIs with Node.js and NestJS, interfaces with React and Next.js, IoT and CI/CD pipelines.',
  about: 'About me',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  certificates: 'Certificates',
  skills: 'Skills',
  present: 'Present',
  summary: 'Summary:',
  responsibilities: 'Responsibilities:',
  showMore: 'Show more',
  showLess: 'Show less',
  contact: 'Contact:',
  technologiesUsed: 'Technologies used',
  toggleDark: 'Toggle dark mode',
  themeSelect: 'Color theme',
  switchLang: 'ES – Switch to Spanish',
  switchLangCode: 'ES',
  viewCV: 'View CV',
  viewCVLabel: 'View CV as PDF (opens in a new tab)',
  cvFile: '/cv/Esteban_Ledezma_CV_EN.pdf',
  view: (name: string) => `View ${name}`,
  viewOnGithub: (name: string) => `View ${name} on GitHub`,
  opensInNewTab: (name: string) => `${name} (opens in a new tab)`,
}

const ui: Record<Lang, typeof esUi> = { es: esUi, en: enUi }

export const useTranslations = (lang: Lang) => ui[lang]
