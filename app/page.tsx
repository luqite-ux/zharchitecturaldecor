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

export default function HomePage() {
  return (
    <>
      <Section sectionId="home-hero" labelledBy="home-hero-title" className="!py-0">
        <h1 id="home-hero-title" className="sr-only">
          Anhui Zhenghui Decorative Materials: architectural decorative elements, insulated decorative panels and custom design objects
        </h1>
        <HeroCarousel />
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
    </>
  )
}
