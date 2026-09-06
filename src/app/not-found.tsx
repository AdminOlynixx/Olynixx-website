import Link from "next/link";

export default function NotFound() {
  return (
    <section className="ol-section ol-dark ol-hero">
      <div className="ol-container ol-container--narrow">
        <p className="ol-eyebrow">Not found</p>
        <h1 className="ol-hero-title">This page is not on the map.</h1>
        <p className="ol-lead">
          The Olynixx site is small on purpose. Four doors. One engine. Start where you belong.
        </p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href="/corporates">
            Corporates
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/gyms">
            Gyms & Spas
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/individuals">
            Individuals
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/praxis">
            Certification
          </Link>
        </p>
      </div>
    </section>
  );
}
