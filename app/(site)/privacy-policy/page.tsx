import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nii Plants Group collects, uses, and protects personal information.",
};

/*
 * Baseline policy covering what this site actually does (contact form +
 * basic analytics-free hosting). Have counsel review before launch —
 * see docs/05-pages.md ("not to be drafted speculatively").
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" lede="Last updated 18 July 2026" />

      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10 text-ink-700">
            <div>
              <h2 className="text-h3 font-display text-ink-900">Who we are</h2>
              <p className="mt-3">
                Nii Plants Group (&quot;we&quot;, &quot;us&quot;) is a
                diversified Ghanaian business group headquartered in Accra,
                Ghana. This policy explains how this website handles personal
                information.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Information we collect</h2>
              <p className="mt-3">
                When you submit our contact form, we collect the details you
                provide: your name, email address, phone number (if given),
                the company your enquiry concerns, and your message. We do not
                require you to create an account, and this site does not sell
                anything directly.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">How we use it</h2>
              <p className="mt-3">
                We use the information you submit solely to respond to your
                enquiry and route it to the relevant company within the group.
                We do not sell personal information, and we do not use your
                contact details for marketing unless you ask us to.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Third-party websites</h2>
              <p className="mt-3">
                Several of our companies operate their own websites (for
                example, for bookings and orders). Links to those sites are
                clearly marked, and each site has its own privacy practices —
                this policy covers only this group website.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Data retention and security</h2>
              <p className="mt-3">
                Enquiry emails are retained only as long as needed to handle
                your request and any follow-up. We take reasonable technical
                and organisational measures to protect the information you
                send us.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Your rights</h2>
              <p className="mt-3">
                You may request access to, correction of, or deletion of the
                personal information you have submitted to us, in line with
                Ghana&apos;s Data Protection Act, 2012 (Act 843). To do so,
                contact us through the details on our contact page.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-display text-ink-900">Changes to this policy</h2>
              <p className="mt-3">
                If we change this policy, we will update this page and revise
                the &quot;last updated&quot; date above.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
