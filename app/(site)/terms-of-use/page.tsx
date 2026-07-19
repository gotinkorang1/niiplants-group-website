import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Niiplants Group website.",
};

/*
 * Baseline terms for an informational corporate site. Have counsel review
 * before launch — see docs/05-pages.md ("not to be drafted speculatively").
 */
export default function TermsOfUsePage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" lede="Last updated 18 July 2026" />

      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10 text-ink-700">
            <div>
              <h2 className="text-h3 font-display text-ink-900">Acceptance of these terms</h2>
              <p className="mt-3">
                By using this website, you accept these terms of use. The site
                is operated by Niiplants Group and provides information about
                the group and its companies.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Use of the site</h2>
              <p className="mt-3">
                You may browse this site and use its contact facilities for
                legitimate enquiries. You may not misuse the site — including
                attempting to disrupt it, submitting false or unlawful
                content, or harvesting information from it.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Information, not offer</h2>
              <p className="mt-3">
                Content on this site is provided for general information. It
                does not constitute a contractual offer. Bookings, orders, and
                service agreements are made with the relevant group company
                under that company&apos;s own terms.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Links to company websites</h2>
              <p className="mt-3">
                This site links to websites operated by individual group
                companies. Those sites carry their own terms and policies,
                which apply when you use them.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Intellectual property</h2>
              <p className="mt-3">
                The names, logos, text, and imagery on this site belong to
                Niiplants Group or its companies and may not be reproduced
                without permission, except for fair personal or journalistic
                use.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Liability</h2>
              <p className="mt-3">
                We work to keep the information on this site accurate and the
                site available, but we provide it &quot;as is&quot; and accept
                no liability for loss arising from reliance on it, to the
                extent permitted by Ghanaian law.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Governing law</h2>
              <p className="mt-3">
                These terms are governed by the laws of the Republic of Ghana,
                and the courts of Ghana have jurisdiction over any dispute
                arising from them.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
