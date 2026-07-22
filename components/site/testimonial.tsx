import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";

export function Testimonial() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <span
            className="mx-auto block font-display text-[5rem] leading-none text-accent-500/50"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="mt-2 text-h2 font-display text-ink-900 text-balance">
            Booking a car with Nii Plants &amp; Car Rentals is reasonably quick
            and straight forward. I particularly enjoyed the professionalism
            of the driver.
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-8 bg-accent-500" aria-hidden="true" />
            <p className="text-sm text-ink-500">
              Gershon Navada · Client, Nii Plants and Car Rentals
            </p>
            <span className="inline-block h-px w-8 bg-accent-500" aria-hidden="true" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
