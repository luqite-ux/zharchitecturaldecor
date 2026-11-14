import { deliverySteps } from '@/lib/content/company'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

export function DeliveryProcess() {
  return (
    <Section sectionId="home-delivery-process" labelledBy="process-title" className="group/section">
      <div className="container-wide">
        <SectionHeading
          id="process-title"
          eyebrow="Delivery process"
          title="From brief to delivery coordination"
          lead="A clear sequence that keeps drawings, samples and production aligned."
        />
        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-5 hidden h-px bg-border lg:block"
          >
            <div className="h-full origin-left scale-x-0 bg-terracotta transition-transform duration-[1600ms] ease-out group-data-[inview=true]/section:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none" />
          </div>
          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
            {deliverySteps.map((step, i) => (
              <Reveal as="li" key={step.title} index={i} className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-terracotta bg-ivory font-serif text-lg text-terracotta">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
