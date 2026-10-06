import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import WorkCard from "../../components/WorkCard/WorkCard";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <Hero />


        {/* ================= INTRO ================= */}

        <section className="home-intro">

          <div className="container">

            <p>
              RK WELDING
            </p>

            <h2>
              Built Strong.
              <br />
              Designed for You.
            </h2>

            <p>
              Explore our welding and fabrication work,
              discover designs you like and contact RK Welding
              to discuss your requirements.
            </p>

          </div>

        </section>


        {/* ================= CONTACT CTA ================= */}

        <section className="home-contact">

          <div className="container home-contact-container">

            <div className="home-contact-content">

              <p className="home-contact-label">
                HAVE A REQUIREMENT?
              </p>

              <h2>
                Let's Build Something Strong.
              </h2>

              <p>
                Contact RK Welding to discuss your
                welding and fabrication requirements.
              </p>

            </div>


            <div className="home-contact-buttons">

              {/* CALL */}

              <a
                href="tel:+917036903065"
                className="home-call-button"
              >
                📞 Call Now
              </a>


              {/* WHATSAPP */}

              <a
                href="https://wa.me/917036903065"
                target="_blank"
                rel="noopener noreferrer"
                className="home-whatsapp-button"
              >
                💬 WhatsApp
              </a>

            </div>

          </div>

        </section>


        {/* ================= TEAM ================= */}

        <section className="team-section">

          <div className="container team-container">

            <div className="team-image">

              <img
                src="/images/team/rk-welding-team.jpg"
                alt="RK Welding team"
              />

            </div>


            <div className="team-content">

              <p className="team-label">
                THE PEOPLE BEHIND RK WELDING
              </p>

              <h2>
                Built by Hands.
                <br />
                Driven by Experience.
              </h2>

              <p>
                RK Welding is a local welding and fabrication
                business focused on strong workmanship, clean
                finishing and practical designs for every
                customer requirement.
              </p>

              <p>
                From gates and grills to fabrication and welding
                works, we focus on delivering work that is built
                to last.
              </p>

              <a
                href="/about"
                className="team-button"
              >
                Know More About Us
              </a>

            </div>

          </div>

        </section>


        {/* ================= SERVICES ================= */}

        <section className="services-preview">

          <div className="container">

            <SectionTitle
              label="WHAT WE DO"
              title="Welding & Fabrication Services"
              description="Practical welding and fabrication solutions for homes, farms, businesses and custom requirements."
            />


            <div className="services-grid">

              <ServiceCard
                number="01"
                title="Main Gates"
                description="Strong and practical MS gates with clean finishing and custom designs."
              />

              <ServiceCard
                number="02"
                title="Window Grills"
                description="Durable window grills designed for safety, strength and a clean look."
              />

              <ServiceCard
                number="03"
                title="MS Sheds"
                description="Fabrication and welding works for sheds and covered spaces."
              />

              <ServiceCard
                number="04"
                title="Custom Fabrication"
                description="Custom welding and fabrication works based on customer requirements."
              />

              <ServiceCard
                number="05"
                title="Furniture Works"
                description="Strong MS-based furniture and custom fabrication works."
              />

              <ServiceCard
                number="06"
                title="Tractor & Trailer Works"
                description="Welding and fabrication support for tractor and trailer-related works."
              />

            </div>

          </div>

        </section>


        {/* ================= FEATURED WORKS ================= */}

        <section className="featured-works">

          <div className="container">

            <SectionTitle
              label="OUR WORK"
              title="Featured Gate Works"
              description="Explore some of the gate fabrication works by RK Welding."
            />


            <div className="featured-works-grid">

              <WorkCard
                image="/images/gates/gate-1.jpg"
                title="Main Gate"
                category="Gate Works"
                workId="RW-G001"
              />

            </div>


            <div className="featured-works-button">

              <a href="/works">
                View All Works
              </a>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;