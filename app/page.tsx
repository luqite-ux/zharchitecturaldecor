import { HeroCarousel } from '@/components/home/hero-carousel'
import { ProductSystems } from '@/components/home/product-systems'
import { MaterialExplorer } from '@/components/home/material-explorer'
import { Applications } from '@/components/home/applications'
import { ManufacturingBand } from '@/components/home/manufacturing-band'
import { ProjectsStack } from '@/components/home/projects-stack'
import { DeliveryProcess } from '@/components/home/delivery-process'
import { PanelOptions } from '@/components/home/panel-options'
import { FaqSection } from '@/components/home/faq-section'
import { RfqSection } from '@/components/home/rfq-section'
import { Section, SectionHeading } from '@/components/site/section'
import { getSiteContent, siteContentMetadata } from '@/lib/site-content/site-content'
import { heroSlides, type HeroSlide } from '@/lib/content/hero'

export async function generateMetadata() {
  return siteContentMetadata('/', 'en')
}

function localized(value: unknown, fallback: string) {
  if (typeof value === 'string' && value.trim()) return value
  if (value && typeof value === 'object' && 'en' in value && typeof value.en === 'string' && value.en.trim()) return value.en
  return fallback
}

function heroFromSnapshot(
  values: Record<string, unknown> | undefined,
  styles: Record<string, { fontFamily?: string; fontWeight?: number; fontSizeDesktop?: number; fontSizeMobile?: number }> | undefined,
): HeroSlide[] {
  const rows = Array.isArray(values?.slides) ? values.slides : []
  return heroSlides.map((slide, index) => {
    const row = rows[index]
    if (!row || typeof row !== 'object') return slide
    const item = row as Record<string, unknown>
    return {
      ...slide,
      role: localized(item.role, slide.role),
      title: localized(item.title, slide.title),
      body: localized(item.body, slide.body),
      primary: { ...slide.primary, label: localized(item.primary_label, slide.primary.label) },
      secondary: { ...slide.secondary, label: localized(item.secondary_label, slide.secondary.label) },
      typography: styles?.[`slides.${String(item.id ?? slide.id)}.title`],
    }
  })
}

export default async function HomePage() {
  const snapshot = await getSiteContent('en')
  const home = snapshot?.pages.find(page => page.path === '/')
  const hero = home?.modules.find(module => module.type === 'hero')
  const slides = heroFromSnapshot(hero?.values, hero?.styles)
  return (
    <div {...(snapshot ? { 'data-hq-content-version': snapshot.version } : {})}>
      <Section sectionId="home-hero" labelledBy="home-hero-title" className="!py-0">
        <h1 id="home-hero-title" className="sr-only">
          Anhui Zhenghui Decorative Materials: architectural decorative elements, insulated decorative panels and custom design objects
        </h1>
        <HeroCarousel slides={slides} />
      </Section>

      <ProductSystems />

      <Section sectionId="home-material-explorer" labelledBy="explorer-title">
        <div className="container-wide">
          <SectionHeading
            id="explorer-title"
            eyebrow="Material explorer"
            title="Open an insulated panel layer by layer"
            lead="Pick a finish and an insulation core, then explode the cross-section to see how the panel is built."
          />
          <div className="mt-12">
            <MaterialExplorer />
          </div>
        </div>
      </Section>

      <Applications />
      <ManufacturingBand />
      <ProjectsStack />
      <DeliveryProcess />
      <PanelOptions />
      <FaqSection />
      <RfqSection />
    </div>
  )
}
