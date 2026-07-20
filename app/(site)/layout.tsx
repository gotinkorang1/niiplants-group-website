import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

/**
 * Site chrome — header, footer, skip link. The (site) route group keeps
 * this off standalone routes like /studio, which render full-screen.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper-0"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
