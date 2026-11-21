export const companyFacts = {
  founded: 2018,
  siteArea: { value: 25600, unit: 'm²' },
  factoryArea: { value: 18000, unit: 'm²' },
} as const

export const equipment = [
  { label: 'Air compressors', count: 2 },
  { label: 'Mixers', count: 4 },
  { label: 'Spraying machines', count: 5 },
  { label: 'Cutting machines', count: 4 },
  { label: 'Mesh laminating machines', count: 2 },
  { label: 'Mortar coating machines', count: 9 },
  { label: 'Engraving machines', count: 3 },
  { label: '3D printers', count: 2 },
] as const

export const monthlyCapacity = [
  {
    id: 'grc-uhpc',
    label: 'GRC / UHPC',
    value: 12000,
    unit: 'm²',
    note: 'Monthly capacity',
  },
  {
    id: 'grg',
    label: 'GRG',
    value: 5000,
    unit: 'm²',
    note: 'Monthly capacity',
  },
  {
    id: 'eps',
    label: 'EPS',
    value: 20000,
    unit: 'm',
    note: 'Monthly capacity',
  },
] as const

export const deliverySteps = [
  {
    title: 'Send your brief',
    body: 'Share drawings, sketches or a product direction with the project location, dimensions and quantity.',
  },
  {
    title: 'Specification review',
    body: 'We review the material family, finish, geometry and detailing against your drawings.',
  },
  {
    title: 'Sample and finish alignment',
    body: 'Finish, profile and form choices are aligned with your design team before production planning.',
  },
  {
    title: 'Production',
    body: 'Components are made on in-house lines for moulding, spraying, coating, cutting and engraving.',
  },
  {
    title: 'Packing and delivery coordination',
    body: 'Packing and dispatch are coordinated with your site programme and logistics contact.',
  },
] as const

export const faqs = [
  {
    q: 'What should I include in a quotation request?',
    a: 'Product interest, project location, dimensions or specifications, quantity and any drawings or file references. The more of these you share, the faster we can review your request. Pricing is project-specific and is provided through the quotation process.',
  },
  {
    q: 'Can you produce custom components from drawings?',
    a: 'Yes. Custom components such as GRC, GRG, EPS and UHPC elements can be developed from your drawings. Engraving machines and 3D printers support profile and form development.',
  },
] as const
