import { Container } from "@/components/site/container";

/** Skeleton state while the newsroom fetches fresh articles. */
export default function NewsroomLoading() {
  return (
    <>
      <section className="bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700">
        <Container className="pb-12 pt-32 md:pb-20 md:pt-44">
          <div className="h-4 w-28 animate-pulse rounded bg-paper-0/20" />
          <div className="mt-5 h-10 w-full max-w-xl animate-pulse rounded bg-paper-0/20" />
          <div className="mt-4 h-5 w-full max-w-md animate-pulse rounded bg-paper-0/10" />
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-12 h-64 w-full animate-pulse rounded-lg border border-line-200 bg-paper-50" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-md border border-line-200">
                <div className="aspect-[8/5] animate-pulse bg-paper-50" />
                <div className="p-6">
                  <div className="h-3 w-24 animate-pulse rounded bg-paper-50" />
                  <div className="mt-3 h-5 w-full animate-pulse rounded bg-paper-50" />
                  <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-paper-50" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
