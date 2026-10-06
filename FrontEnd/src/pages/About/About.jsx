import Navbar from "../../components/Navbar/Navbar";

import "./About.css";

function About() {
  return (
    <div className="about-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="about-hero">

          <div className="container">

            <p className="about-hero-label">
              ABOUT RK WELDING
            </p>

            <h1>
              Strong Work.
              <br />
              <span>Practical Designs.</span>
            </h1>

            <p className="about-hero-description">
              RK Welding is a local welding and fabrication
              business based in Konijerla, focused on practical
              designs, strong workmanship and clean finishing.
            </p>

          </div>

        </section>


        {/* ================= ABOUT CONTENT ================= */}

        <section className="about-main">

          <div className="container about-main-grid">

            {/* IMAGE */}

            <div className="about-image">

              <img
                src="/images/team/rk-welding-team.jpg"
                alt="RK Welding team"
              />

            </div>


            {/* CONTENT */}

            <div className="about-content">

              <p className="about-label">
                WHO WE ARE
              </p>

              <h2>
                Built with Skill.
                <br />
                Built to Last.
              </h2>

              <p>
                RK Welding provides welding and fabrication
                services for customers in Konijerla and nearby
                areas.
              </p>

              <p>
                Our work includes gates, grills, sheds,
                furniture, tractor and trailer works and other
                custom fabrication requirements.
              </p>

              <p>
                Every project starts with understanding the
                customer's requirement, measurements and design.
                We then focus on fabrication, finishing and
                installation.
              </p>

            </div>

          </div>

        </section>


        {/* ================= WHAT WE FOCUS ON ================= */}

        <section className="about-focus">

          <div className="container">

            <div className="about-focus-heading">

              <p>
                OUR APPROACH
              </p>

              <h2>
                What We Focus On
              </h2>

            </div>


            <div className="about-focus-grid">

              <div className="focus-card">

                <span>
                  01
                </span>

                <h3>
                  Strength
                </h3>

                <p>
                  Welding and fabrication work designed with
                  durability and practical use in mind.
                </p>

              </div>


              <div className="focus-card">

                <span>
                  02
                </span>

                <h3>
                  Clean Finishing
                </h3>

                <p>
                  We focus on proper fabrication and finishing
                  so the final work looks clean and professional.
                </p>

              </div>


              <div className="focus-card">

                <span>
                  03
                </span>

                <h3>
                  Customer Requirement
                </h3>

                <p>
                  Designs and dimensions can be discussed based
                  on the customer's actual requirement.
                </p>

              </div>


              <div className="focus-card">

                <span>
                  04
                </span>

                <h3>
                  Practical Design
                </h3>

                <p>
                  Our goal is to create useful designs that are
                  suitable for everyday requirements.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="about-cta">

          <div className="container">

            <p>
              WORK WITH RK WELDING
            </p>

            <h2>
              Have a Welding
              <span> Requirement?</span>
            </h2>

            <p>
              Contact us to discuss your design, measurements
              and fabrication requirements.
            </p>

            <div className="about-cta-buttons">

              <a
                href="tel:+919999999999"
                className="about-call-button"
              >
                Call RK Welding
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="about-whatsapp-button"
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

export default About;