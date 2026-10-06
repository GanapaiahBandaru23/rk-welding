import Navbar from "../../components/Navbar/Navbar";

import "./Experience.css";

function Experience() {
  return (
    <div className="experience-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="experience-hero">
          <div className="container">

            <p className="experience-hero-label">
              OUR EXPERIENCE
            </p>

            <h1>
              Practical Work.
              <br />
              <span>Real Experience.</span>
            </h1>

            <p className="experience-hero-description">
              Every project gives us an opportunity to improve
              our fabrication, finishing and understanding of
              customer requirements.
            </p>

          </div>
        </section>


        {/* ================= INTRO ================= */}

        <section className="experience-intro">

          <div className="container experience-intro-grid">

            <div className="experience-intro-content">

              <p className="experience-label">
                HOW WE WORK
              </p>

              <h2>
                Experience Comes
                <br />
                From the Work.
              </h2>

              <p>
                Welding and fabrication require practical
                understanding, accurate measurements and
                attention to finishing.
              </p>

              <p>
                At RK Welding, we focus on understanding the
                customer's requirement and converting the idea
                into a strong and practical finished work.
              </p>

            </div>

            <div className="experience-highlight">

              <div className="experience-highlight-card">
                <span>01</span>
                <h3>Understand</h3>
                <p>
                  Understand the customer's requirement,
                  design and measurements.
                </p>
              </div>

              <div className="experience-highlight-card">
                <span>02</span>
                <h3>Fabricate</h3>
                <p>
                  Convert the requirement into properly
                  fabricated welding work.
                </p>
              </div>

              <div className="experience-highlight-card">
                <span>03</span>
                <h3>Finish</h3>
                <p>
                  Focus on clean finishing and practical
                  usability of the final work.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= WORK AREAS ================= */}

        <section className="experience-areas">

          <div className="container">

            <div className="experience-heading">

              <p>
                AREAS OF WORK
              </p>

              <h2>
                What We Have
                <br />
                Experience With
              </h2>

            </div>


            <div className="experience-grid">

              <div className="experience-card">
                <span>01</span>
                <h3>Main Gates</h3>
                <p>
                  Custom gate fabrication with practical
                  designs, strong structure and clean finishing.
                </p>
              </div>

              <div className="experience-card">
                <span>02</span>
                <h3>Window Grills</h3>
                <p>
                  Fabrication of window grills focused on
                  safety, strength and appearance.
                </p>
              </div>

              <div className="experience-card">
                <span>03</span>
                <h3>MS Sheds</h3>
                <p>
                  Welding and fabrication work for sheds and
                  covered spaces.
                </p>
              </div>

              <div className="experience-card">
                <span>04</span>
                <h3>Furniture Works</h3>
                <p>
                  Practical MS furniture and custom metal
                  fabrication works.
                </p>
              </div>

              <div className="experience-card">
                <span>05</span>
                <h3>Tractor & Trailer Works</h3>
                <p>
                  Welding and fabrication support for
                  agricultural and tractor-related works.
                </p>
              </div>

              <div className="experience-card">
                <span>06</span>
                <h3>Custom Fabrication</h3>
                <p>
                  Custom welding works based on specific
                  customer requirements and measurements.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= PROCESS ================= */}

        <section className="experience-process">

          <div className="container">

            <div className="experience-process-heading">

              <p>
                FROM IDEA TO FINISHED WORK
              </p>

              <h2>
                Practical Experience
                <br />
                at Every Step
              </h2>

            </div>


            <div className="experience-process-list">

              <div className="experience-process-item">
                <span>01</span>

                <div>
                  <h3>Requirement</h3>
                  <p>
                    Understand what the customer wants to
                    build and how it will be used.
                  </p>
                </div>
              </div>


              <div className="experience-process-item">
                <span>02</span>

                <div>
                  <h3>Measurement</h3>
                  <p>
                    Take the required measurements and
                    understand the available space.
                  </p>
                </div>
              </div>


              <div className="experience-process-item">
                <span>03</span>

                <div>
                  <h3>Fabrication</h3>
                  <p>
                    Cut, prepare, weld and assemble the
                    required components.
                  </p>
                </div>
              </div>


              <div className="experience-process-item">
                <span>04</span>

                <div>
                  <h3>Finishing</h3>
                  <p>
                    Complete the finishing and prepare the
                    work for installation or use.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="experience-cta">

          <div className="container">

            <p>
              HAVE A REQUIREMENT?
            </p>

            <h2>
              Let's Discuss Your
              <span> Work.</span>
            </h2>

            <p>
              Tell us what you want to build and discuss your
              design, measurements and fabrication requirements
              with RK Welding.
            </p>

            <div className="experience-cta-buttons">

              <a
                href="tel:+919999999999"
                className="experience-call-button"
              >
                Call RK Welding
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="experience-whatsapp-button"
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

export default Experience;