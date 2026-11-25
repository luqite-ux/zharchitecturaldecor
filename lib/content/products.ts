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
  { id: 'uhpc-curtain-wall', name: 'UHPC Curtain Wall', summary: 'Custom facade panels developed from project drawings.', anchor: 'uhpc-curtain-wall' },
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
    slug: 'uhpc-custom-components',
    name: 'UHPC Curtain Wall Panels',
    groupId: 'uhpc-curtain-wall',
    summary: 'Custom UHPC facade panels developed from architectural drawings.',
    description: 'UHPC curtain wall panels are project-specific facade components made from ultra-high performance concrete. Panel geometry, dimensions, surface finish and connection details are reviewed against the project drawings before production.',
    highlights: [
      'Panel geometry developed from project drawings',
      'Surface texture and finish reviewed for each project',
      'Dimensions and connection details confirmed during technical review',
    ],
    confirmWithUs: [
      'Facade drawings and design reference',
      'Panel dimensions and quantities',
      'Surface finish and colour requirements',
      'Connection and installation interface',
    ],
    image: { src: feedbackMedia.uhpc, alt: 'Customer supplied formed UHPC facade component', fit: 'contain', background: 'photo' },
    gallery: [
      { src: feedbackMedia.uhpc, alt: 'Customer supplied formed UHPC facade component', fit: 'contain', background: 'photo' },
      ...feedbackMedia.uhpcGallery.map((src, index) => ({ src, alt: `Customer supplied UHPC component photo ${index + 2}`, fit: 'contain' as const, background: 'photo' as const })),
    ],
  },
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
      { src: feedbackMedia.epsProfile, alt: 'Customer supplied EPS decorative profiles', fit: 'contain', background: 'white' },
      { src: feedbackMedia.epsFacade, alt: 'Customer supplied facade with decorative line detail', fit: 'cover', background: 'photo' },
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
      ...feedbackMedia.grgWorkbook.map((src, index) => ({ src, alt: `Customer supplied GRG formed detail ${index + 1}`, fit: 'contain' as const, background: 'photo' as const })),
    ],
  },
  {
    slug: 'cement-texture-design-objects',
    name: 'Cement Craft Ornaments',
    groupId: 'craft-ornaments',
    summary: 'Customer supplied cement-texture objects and outdoor planters.',
    description:
      'The supplied craft collection includes sculptural objects for interior display and large planters shown in outdoor and workshop photos. Final shape, dimensions and surface finish are confirmed against the design reference for each order.',
    highlights: [
      'Sculptural objects and functional planters in the supplied collection',
      'Indoor display and outdoor landscape references',
      'Shape and finish reviewed against the customer design reference',
    ],
    confirmWithUs: [
      'Design reference or 3D file note',
      'Object dimensions and quantity',
      'Colour and surface texture',
      'Project location',
    ],
    image: {
      src: feedbackMedia.craftObjects,
      alt: 'Customer supplied sculptural craft ornament',
      fit: 'cover',
      background: 'photo',
    },
    cardFit: 'contain',
    gallery: [
      { src: feedbackMedia.craftObjects, alt: 'Customer supplied sculptural craft ornament', fit: 'cover', background: 'photo' },
      { src: feedbackMedia.craftPlantersOutdoor, alt: 'Customer supplied outdoor planter application photo', fit: 'cover', background: 'photo' },
      { src: feedbackMedia.craftPlantersWorkshop, alt: 'Customer supplied planters in the workshop', fit: 'cover', background: 'photo' },
    ],
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
