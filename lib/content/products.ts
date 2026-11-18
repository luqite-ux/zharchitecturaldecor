export type ProductGroupId =
  | 'architectural-decorative-elements'
  | 'insulated-decorative-panels'
  | 'custom-design-objects'

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
  {
    id: 'architectural-decorative-elements',
    name: 'Architectural Decorative Elements',
    summary:
      'Profiled mouldings, window surrounds and ornamental components for exterior and interior detailing.',
    anchor: 'architectural-decorative-elements',
  },
  {
    id: 'insulated-decorative-panels',
    name: 'Insulated Decorative Panels',
    summary:
      'Finished panels built from a decorative surface, a calcium-silicate structural layer and a selectable insulation core.',
    anchor: 'insulated-decorative-panels',
  },
  {
    id: 'custom-design-objects',
    name: 'Custom Design Objects',
    summary:
      'Cement-textured objects developed from your design intent.',
    anchor: 'custom-design-objects',
  },
]

const panelConfirm = [
  'Insulation core option',
  'Panel dimensions and joint layout',
  'Colour and finish selection',
  'Quantity and project location',
]

const numberedGallery = (folder: string, count: number, alt: string): ProductImage[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/images/source/products/${folder}/${index + 1}.jpg`,
    alt: `${alt} — source image ${index + 1}`,
    fit: 'contain',
    background: 'white',
  }))

export const products: Product[] = [
  {
    slug: 'eps-decorative-mouldings',
    name: 'EPS Decorative Mouldings',
    groupId: 'architectural-decorative-elements',
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
    gallery: numberedGallery('eps', 9, 'EPS decorative moulding'),
  },
  {
    slug: 'grc-architectural-elements',
    name: 'GRC Architectural Decorative Elements',
    groupId: 'architectural-decorative-elements',
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
      src: '/images/products/grc-window-surrounds.jpg',
      alt: 'Line drawings of six decorative window surround designs with arched and rectangular openings',
      fit: 'contain',
      background: 'white',
    },
    gallery: numberedGallery('grc', 16, 'GRC architectural decorative element'),
  },
  {
    slug: 'grg-interior-elements',
    name: 'GRG Interior Decorative Elements',
    groupId: 'architectural-decorative-elements',
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
      src: '/images/products/grg-ornamental-pedestals.jpg',
      alt: 'Row of cream-coloured ornamental pedestals with carved floral relief panels and stepped bases',
      fit: 'contain',
      background: 'photo',
    },
    cardFit: 'cover',
    cardFocal: '50% 52%',
    gallery: numberedGallery('grg', 12, 'GRG interior decorative element'),
  },
  {
    slug: 'real-stone-insulated-panel',
    name: 'Real-Stone Finish',
    groupId: 'insulated-decorative-panels',
    summary: 'Insulated panel with a speckled real-stone surface.',
    description:
      'A real-stone finish applied to a calcium-silicate structural layer, bonded to your choice of insulation core. The speckled mineral surface is shown in several colourways, with the panel cross-section visible in the reference image.',
    highlights: [
      'Finish on a calcium-silicate structural layer',
      'Six insulation core variants',
      'Several colourways available',
    ],
    confirmWithUs: panelConfirm,
    image: {
      src: '/images/panels/real-stone-finish.jpg',
      alt: 'Three speckled stone-finish colour samples beside a cut-away insulated panel with brackets',
      fit: 'contain',
      background: 'white',
    },
    gallery: [{ src: '/images/source/products/panels/真石漆保温装饰板外墙外保温装饰系统.jpg', alt: 'Real-stone finish insulated decorative panel system', fit: 'contain', background: 'white' }],
  },
  {
    slug: 'stone-effect-insulated-panel',
    name: 'Stone-Effect Finish',
    groupId: 'insulated-decorative-panels',
    summary: 'Insulated panel with a stone-effect surface in muted tones.',
    description:
      'A stone-effect finish on a calcium-silicate structural layer, paired with a selectable insulation core. Colourways range across grey, olive and green speckle tones.',
    highlights: [
      'Stone-look surface with layered speckle',
      'Calcium-silicate structural layer',
      'Six insulation core variants',
    ],
    confirmWithUs: panelConfirm,
    image: {
      src: '/images/panels/stone-effect-finish.jpg',
      alt: 'Three grey and olive stone-effect colour samples beside a cut-away insulated panel with purple brackets',
      fit: 'contain',
      background: 'white',
    },
    gallery: [{ src: '/images/source/products/panels/仿石涂料保温装饰板外墙外保温装饰系统.jpg', alt: 'Stone-effect finish insulated decorative panel system', fit: 'contain', background: 'white' }],
  },
  {
    slug: 'water-in-sand-insulated-panel',
    name: 'Water-in-Sand Finish',
    groupId: 'insulated-decorative-panels',
    summary: 'Insulated panel with a fine, sand-like water-in-sand surface.',
    description:
      'A water-in-sand finish with a fine, even texture, shown in soft blue, green and ochre tones. It sits on a calcium-silicate structural layer over your selected insulation core.',
    highlights: [
      'Fine, even sand-like texture',
      'Soft blue, green and ochre colourways',
      'Six insulation core variants',
    ],
    confirmWithUs: panelConfirm,
    image: {
      src: '/images/panels/water-in-sand-finish.jpg',
      alt: 'Three pale blue, green and ochre sand-textured colour samples beside a cut-away insulated panel',
      fit: 'contain',
      background: 'white',
    },
    gallery: [{ src: '/images/source/products/panels/水包沙保温装饰板外墙外保温装饰系统.jpg', alt: 'Water-in-sand finish insulated decorative panel system', fit: 'contain', background: 'white' }],
  },
  {
    slug: 'ultrathin-stone-insulated-panel',
    name: 'Natural Ultrathin Stone',
    groupId: 'insulated-decorative-panels',
    summary: 'Insulated panel faced with natural ultrathin stone.',
    description:
      'A natural ultrathin stone surface in dark, warm and cool granite tones, supported by a calcium-silicate structural layer and your selected insulation core.',
    highlights: [
      'Natural stone surface in granite tones',
      'Calcium-silicate structural layer',
      'Six insulation core variants',
    ],
    confirmWithUs: panelConfirm,
    image: {
      src: '/images/panels/natural-ultrathin-stone.jpg',
      alt: 'Four blue, brown and gold granite colour samples beside a dark cut-away insulated panel',
      fit: 'contain',
      background: 'white',
    },
    gallery: [{ src: '/images/source/products/panels/天然超薄石材保温装饰板外墙外保温装饰系统.jpg', alt: 'Natural ultrathin stone insulated decorative panel system', fit: 'contain', background: 'white' }],
  },
  {
    slug: 'cement-texture-design-objects',
    name: 'Cement-Texture Design Objects',
    groupId: 'custom-design-objects',
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
