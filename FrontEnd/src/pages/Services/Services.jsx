import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

import "./Services.css";

function Services() {
  return (
    <div className="services-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="services-hero">

          <div className="container">

            <p className="services-hero-label">
              WHAT WE DO
            </p>

            <h1>
              Welding & <span>Fabrication</span>
              <br />
              Services
            </h1>

            <p className="services-hero-description">
              Strong, practical and custom welding solutions
              for homes, farms, businesses and other requirements
              in and around Konijerla.
            </p>

          </div>

        </section>


        {/* ================= SERVICES ================= */}

        <section className="all-services">

          <div className="container">

            <div className="services-heading">

              <p>
                OUR SERVICES
              </p>

              <h2>
                What We Build
              </h2>

              <span>
                From everyday welding works to custom fabrication,
                we focus on strength, durability and clean finishing.
              </span>

            </div>


            <div className="all-services-grid">

              <ServiceCard
                number="01"
                title="Main Gates"
                description="Strong and practical MS main gates with custom designs, proper finishing and durable fabrication."
              />

              <ServiceCard
                number="02"
                title="Window Grills"
                description="Durable window grills designed for safety, strength and a clean appearance."
              />

              <ServiceCard
                number="03"
                title="MS Sheds"
                description="Fabrication and welding works for sheds, covered spaces and other structural requirements."
              />

              <ServiceCard
                number="04"
                title="Custom Fabrication"
                description="Custom welding and fabrication works based on customer measurements and requirements."
              />

              <ServiceCard
                number="05"
                title="Furniture Works"
                description="Strong MS furniture and custom metal fabrication works for practical everyday use."
              />

              <ServiceCard
                number="06"
                title="Tractor & Trailer Works"
                description="Welding and fabrication support for tractor, trailer and agricultural equipment-related works."
              />

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="services-cta">

          <div className="container">

            <p>
              HAVE A REQUIREMENT?
            </p>

            <h2>
              Let's Build Something
              <span> Strong.</span>
            </h2>

            <p>
              Tell us what you need. We can discuss the design,
              measurements, material and fabrication requirements.
            </p>

            <div className="services-cta-buttons">

              <a
                href="tel:+917036903065"
                className="services-call-button"
              >
                Call RK Welding
              </a>

              <a
                href="https://wa.me/7036903065"
                target="_blank"
                rel="noreferrer"
                className="services-whatsapp-button"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Services;