import { feedbackMedia } from '@/lib/content/customer-feedback-media'

export type ProductGroupId =
  | 'uhpc-curtain-wall'
  | 'decorative-mouldings'
  | 'grc-components'
  | 'grg-forms'
  | 'craft-ornaments'

export interface ProductImage {
  src: string
  alt: string
  /** `contain` shows the complete subject; `cover` is used only for photographic scenes. */
  fit: 'contain' | 'cover'
  focal?: string
  /** `white` images are blended into the card tone so no picture frame appears. */
  background: 'white' | 'photo'
}

export interface Product {
  slug: string
  name: string
  groupId: ProductGroupId
  summary: string
  description: string
  highlights: string[]
  confirmWithUs: string[]
  capacity?: { label: string; value: number; unit: string }
  image: ProductImage
  /** Customer-approved crop used only on listing cards; detail galleries keep the source fit. */
  cardFit?: 'contain' | 'cover'
  cardFocal?: string
  gallery?: ProductImage[]
}

export interface ProductGroup {
  id: ProductGroupId
  name: string
  summary: string
  anchor: string
}

export const productGroups: ProductGroup[] = [
  { id: 'uhpc-curtain-wall', name: 'UHPC Curtain Wall', summary: 'Product details are being confirmed.', anchor: 'uhpc-curtain-wall' },
  {
    id: 'decorative-mouldings', name: 'Decorative Mouldings', summary: 'Profiles and decorative lines for architectural detailing.', anchor: 'decorative-mouldings',
  },
  { id: 'grc-components', name: 'GRC Components', summary: 'Cast architectural components for exterior detailing.', anchor: 'grc-components' },
  { id: 'grg-forms', name: 'GRG Forms', summary: 'Formed components for interior detailing.', anchor: 'grg-forms' },
  {
    id: 'craft-ornaments', name: 'Craft Ornaments', summary: 'Decorative objects developed from design references.', anchor: 'craft-ornaments',
  },
]

// Names confirmed in the customer's 2026-11-23 revision sheet. Product media
// and specifications for these entries have not been supplied yet.
export const pendingProductTypes: Partial<Record<ProductGroupId, string[]>> = {
  'decorative-mouldings': [
    'Foamed Ceramic Decorative Lines',
    'Homogeneous Board Decorative Lines',
    'Fluorocarbon Board Decorative Lines',
  ],
  'craft-ornaments': [
    'GRG Craft Ornaments',
    'Fiberglass Reinforced Plastic Craft Ornaments',
  ],
}

const numberedGallery = (folder: string, count: number, alt: string): ProductImage[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/images/source/products/${folder}/${index + 1}.jpg`,
    alt: `${alt} — source image ${index + 1}`,
    fit: 'contain',
    background: 'white',
  }))

const withoutImages = (images: ProductImage[], positions: number[]) =>
  images.filter((_, index) => !positions.includes(index + 1))

export const products: Product[] = [
  {
    slug: 'eps-decorative-mouldings',
    name: 'EPS Decorative Mouldings',
    groupId: 'decorative-mouldings',
    summary: 'Profiled EPS mouldings for cornices, bands and facade lines.',
    description:
      'EPS decorative mouldings are cut and shaped into repeatable profiles for cornices, belt courses and facade lines. Profile depth, projection and length are defined by your drawings, so the same shape language can run across a full elevation.',
    highlights: [
      'Linear profiles from simple bands to stepped cornices',
      'Cut from drawings using in-house engraving machines',
      'Suited to repeated runs along facade lines',
    ],
    confirmWithUs: [
      'Profile drawing or reference',
      'Length and quantity in metres',
      'Surface finish and coating',
      'Project location',
    ],
    capacity: { label: 'EPS monthly capacity', value: 20000, unit: 'm' },
    image: {
      src: '/images/products/eps-mouldings.jpg',
      alt: 'Eight grey EPS moulding profiles arranged in two columns, from simple bands to stepped cornices',
      fit: 'contain',
      background: 'white',
    },
    gallery: [
      ...withoutImages(numberedGallery('eps', 9, 'EPS decorative moulding'), [2, 4, 8]),
      { src: feedbackMedia.decorativeMouldings, alt: 'Customer supplied EPS decorative profiles', fit: 'contain', background: 'white' },
    ],
  },
  {
    slug: 'grc-architectural-elements',
    name: 'GRC Architectural Decorative Elements',
    groupId: 'grc-components',
    summary: 'Glass-fibre reinforced concrete elements such as window surrounds and ornament.',
    description:
      'GRC elements are moulded for exterior detailing: window and door surrounds, arches, cornices and ornamental features. Each element is developed from your elevation drawings so that profile, scale and joint positions work together on the building.',
    highlights: [
      'Window surrounds, arches, cornices and ornament',
      'Moulded to project-specific profiles',
      'Produced on dedicated GRC and UHPC lines',
    ],
    confirmWithUs: [
      'Elevation or detail drawings',
      'Element dimensions and quantity',
      'Colour and surface treatment',
      'Installation interface',
    ],
    capacity: { label: 'GRC / UHPC monthly capacity', value: 12000, unit: 'm²' },
    image: {
      src: '/images/source/products/grc/2.jpg',
      alt: 'Customer supplied GRC decorative components',
      fit: 'contain',
      background: 'white',
    },
    gallery: withoutImages(numberedGallery('grc', 16, 'GRC architectural decorative element'), [1]),
  },
  {
    slug: 'grg-interior-elements',
    name: 'GRG Interior Decorative Elements',
    groupId: 'grg-forms',
    summary: 'Glass-fibre reinforced gypsum components for interior detailing.',
    description:
      'GRG interior elements include columns, pedestals, relief panels and ornamental features for lobbies, halls and public interiors. Relief patterns and base profiles are developed from your design reference.',
    highlights: [
      'Columns, pedestals and relief panels',
      'Detailed relief ornament',
      'Developed from your interior design reference',
    ],
    confirmWithUs: [
      'Design reference or drawings',
      'Element dimensions and quantity',
      'Interior finish requirements',
      'Installation method',
    ],
    capacity: { label: 'GRG monthly capacity', value: 5000, unit: 'm²' },
    image: {
      src: '/images/source/products/grg/2.jpg',
      alt: 'Customer supplied GRG interior decorative elements',
      fit: 'contain',
      background: 'photo',
    },
    cardFit: 'cover',
    cardFocal: '50% 52%',
    gallery: [
      ...withoutImages(numberedGallery('grg', 12, 'GRG interior decorative element'), [1, 12]),
      { src: feedbackMedia.grgRelief, alt: 'Customer supplied GRG relief panel', fit: 'contain', background: 'photo' },
      { src: feedbackMedia.grgForms, alt: 'Customer supplied GRG formed components', fit: 'contain', background: 'photo' },
    ],
  },
  {
    slug: 'cement-texture-design-objects',
    name: 'Cement-Texture Design Objects',
    groupId: 'craft-ornaments',
    summary: 'Cement-textured objects, from desk pieces to sculptural forms.',
    description:
      'Cement-texture design objects show how form and surface can be developed beyond building elements: sculptural busts, trays, organisers and abstract pieces in white and grey cement tones. 3D printers and engraving machines support form development.',
    highlights: [
      'White and grey cement tones',
      'Sculptural and functional forms',
      'Form development supported by 3D printing and engraving',
    ],
    confirmWithUs: [
      'Design reference or 3D file note',
      'Object dimensions and quantity',
      'Colour and surface texture',
      'Project location',
    ],
    image: {
      src: '/images/products/cement-texture-design-objects.jpg',
      alt: 'White and grey cement design objects on a desk, including busts, trays and desk organisers',
      fit: 'contain',
      background: 'photo',
    },
    cardFit: 'cover',
    cardFocal: '50% 50%',
    gallery: numberedGallery('cement-design', 2, 'Cement-texture design object'),
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByGroup(groupId: ProductGroupId) {
  return products.filter((p) => p.groupId === groupId)
}

export function getGroup(id: ProductGroupId) {
  return productGroups.find((g) => g.id === id)!
}
