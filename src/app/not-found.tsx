import Link from "next/link";

export default function NotFound() {
  return (
    <section className="ol-section ol-dark ol-hero">
      <div className="ol-container ol-container--narrow">
        <p className="ol-eyebrow">Not found</p>
        <h1 className="ol-hero-title">This page is not on the map.</h1>
        <p className="ol-lead">The Olynixx site is small on purpose. Start from home, or tell us who you are.</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href="/">
            Home
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/contact">
            Contact
          </Link>
        </p>
      </div>
    </section>
  );
}
