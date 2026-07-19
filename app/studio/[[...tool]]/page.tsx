import type { Metadata } from "next";

import { Studio } from "./studio";

export const metadata: Metadata = {
  title: "Newsroom Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

/** Private editing studio — editors sign in with their Sanity account. */
export default function StudioPage() {
  return <Studio />;
}
