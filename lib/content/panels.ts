export type FinishId =
  | 'real-stone-finish'
  | 'stone-effect-finish'
  | 'water-in-sand-finish'
  | 'natural-ultrathin-stone'

export interface PanelFinish {
  id: FinishId
  label: string
  summary: string
  swatch: { base: string; flecks: string[] }
}

export const panelFinishes: PanelFinish[] = [
  {
    id: 'real-stone-finish',
    label: 'Real-Stone Finish',
    summary: 'Speckled mineral surface with a granite-like grain.',
    swatch: {
      base: '#c9c4b6',
      flecks: ['#e9e5d6', '#8a8575', '#b7ae82', '#46463f'],
    },
  },
  {
    id: 'stone-effect-finish',
    label: 'Stone-Effect Finish',
    summary: 'Layered stone-look palette in muted green, olive and grey.',
    swatch: {
      base: '#a9a99a',
      flecks: ['#c9c9b8', '#7b7d68', '#b4a95b', '#3d4038'],
    },
  },
  {
    id: 'water-in-sand-finish',
    label: 'Water-in-Sand Finish',
    summary: 'Fine, sand-like texture available in soft blue, green and ochre tones.',
    swatch: {
      base: '#c6d3cf',
      flecks: ['#e8eeeb', '#8aa38b', '#9fb2ba', '#5f6d68'],
    },
  },
  {
    id: 'natural-ultrathin-stone',
    label: 'Natural Ultrathin Stone',
    summary: 'Thin natural stone surface in dark, warm and cool granite tones.',
    swatch: {
      base: '#6f6254',
      flecks: ['#c8aa72', '#2f2923', '#a88b6b', '#d6cdbd'],
    },
  },
]

export type CoreId = 'eps' | 'heps' | 'xps' | 'pu' | 'rock-wool' | 'composite'

export interface InsulationCore {
  id: CoreId
  label: string
  description: string
  fireClass: 'B1' | 'A1'
  /** Illustrative swatch for the 3D model only. */
  color: string
}

export const insulationCores: InsulationCore[] = [
  { id: 'eps', label: 'EPS', description: 'Expanded polystyrene insulation core.', fireClass: 'B1', color: '#f1eee6' },
  { id: 'heps', label: 'HEPS', description: 'HEPS insulation core.', fireClass: 'B1', color: '#c9ccce' },
  { id: 'xps', label: 'XPS', description: 'Extruded polystyrene insulation core.', fireClass: 'B1', color: '#b5d3d6' },
  { id: 'pu', label: 'PU', description: 'Polyurethane insulation core.', fireClass: 'B1', color: '#e7cb86' },
  { id: 'rock-wool', label: 'Rock wool', description: 'Rock wool insulation core.', fireClass: 'A1', color: '#b2a987' },
  { id: 'composite', label: 'Composite insulation board', description: 'Composite insulation board core.', fireClass: 'A1', color: '#d3b48e' },
]

export const structuralLayer = {
  label: 'Calcium-silicate board',
  description: 'The structural layer that carries the finish and bonds to the insulation core.',
}
