import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col justify-center px-5 py-32 md:px-10">
      <p className="overline-label">404 / No signal</p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
        This page never <em className="italic-signal">shipped</em>.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The URL is wrong, or the thing it pointed at was retired. Either way,
        there&apos;s plenty that does exist.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/work" className="btn-signal">
          The work <span className="arrow">→</span>
        </Link>
        <Link href="/" className="btn-ghost">
          Home
        </Link>
      </div>
    </section>
  );
}
