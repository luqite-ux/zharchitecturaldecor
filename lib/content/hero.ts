export interface HeroSlide {
  id: string
  role: string
  title: string
  body: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  image: {
    src: string
    alt: string
    focalMobile: string
    focalTablet: string
    focalDesktop: string
  }
  copySide: 'left' | 'right'
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'surfaces',
    role: 'Surfaces',
    title: 'Shape Distinctive Architectural Surfaces',
    body: 'Explore architectural decorative elements, insulated decorative panels and custom design objects, grouped by how they are specified.',
    primary: { label: 'Explore products', href: '/products' },
    secondary: { label: 'Request a quote', href: '/contact' },
    image: {
      src: '/images/banners/hero-surfaces.jpg',
      alt: 'Installers fitting curved pale concrete facade forms and gold trim onto a blue glazed building',
      focalMobile: '30% 50%',
      focalTablet: '28% 50%',
      focalDesktop: '22% 40%',
    },
    copySide: 'left',
  },
  {
    id: 'custom-components',
    role: 'Custom components',
    title: 'From Design Intent to Custom Components',
    body: 'Share drawings and sketches. Our in-house moulding, engraving and 3D printing capability turns them into producible components.',
    primary: { label: 'See manufacturing', href: '/manufacturing' },
    secondary: { label: 'Request a quote', href: '/contact' },
    image: {
      src: '/images/banners/hero-custom-components.jpg',
      alt: 'Project team reviewing drawings in front of a classical facade with gold ornament and a modern blue volume',
      focalMobile: '88% 50%',
      focalTablet: '82% 50%',
      focalDesktop: '85% 50%',
    },
    copySide: 'right',
  },
  {
    id: 'applications',
    role: 'Applications',
    title: 'Materials for Facades, Interiors and Public Space',
    body: 'Review how Zhenghui material families are used across residential and public building projects.',
    primary: { label: 'View projects', href: '/projects' },
    secondary: { label: 'Request a quote', href: '/contact' },
    image: {
      src: '/images/banners/hero-public-space.jpg',
      alt: 'Modern blue and gold industrial building with glazing beside open water at dusk',
      focalMobile: '82% 50%',
      focalTablet: '78% 50%',
      focalDesktop: '85% 50%',
    },
    copySide: 'left',
  },
]
