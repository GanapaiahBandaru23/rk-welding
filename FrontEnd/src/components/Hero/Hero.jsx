import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content container">

        <p className="hero-location">
          KONIJERLA • KHAMMAM
        </p>

        <h1>
          Welding That Looks
          <span> Strong.</span>
        </h1>

        <p className="hero-description">
          Professional welding and fabrication works,
          built with strength, precision and clean finishing.
        </p>

        <div className="hero-buttons">
          <a href="/works" className="hero-primary-button">
            View Our Work
          </a>

          <a href="tel:+917036903065" className="hero-secondary-button">
            Call RK Welding
          </a>
        </div>

      </div>

    </section>
  );
}

export default Hero;