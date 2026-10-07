import Navbar from "../../components/Navbar/Navbar";

import "./HowWeWork.css";

function HowWeWork() {
  return (
    <div className="how-we-work-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="how-hero">

          <div className="container">

            <p className="how-hero-label">
              HOW WE WORK
            </p>

            <h1>
              From Idea
              <br />
              <span>to Finished Work.</span>
            </h1>

            <p className="how-hero-description">
              A simple and practical process to understand your
              requirement, plan the work and complete the
              fabrication with proper finishing.
            </p>

          </div>

        </section>


        {/* ================= PROCESS ================= */}

        <section className="how-process">

          <div className="container">

            <div className="how-heading">

              <p>
                OUR PROCESS
              </p>

              <h2>
                How We Build
              </h2>

              <span>
                Every project starts with understanding what the
                customer needs and ends with a finished,
                practical welding work.
              </span>

            </div>


            <div className="how-process-list">

              {/* STEP 01 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  01
                </div>

                <div className="how-step-content">

                  <p>
                    STEP ONE
                  </p>

                  <h3>
                    Customer Requirement
                  </h3>

                  <span>
                    We first understand what the customer wants
                    to build, how the work will be used and what
                    type of design is required.
                  </span>

                </div>

              </div>


              {/* STEP 02 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  02
                </div>

                <div className="how-step-content">

                  <p>
                    STEP TWO
                  </p>

                  <h3>
                    Design Selection
                  </h3>

                  <span>
                    Customers can show a design they like or
                    discuss a suitable design based on their
                    requirement.
                  </span>

                </div>

              </div>


              {/* STEP 03 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  03
                </div>

                <div className="how-step-content">

                  <p>
                    STEP THREE
                  </p>

                  <h3>
                    Measurement
                  </h3>

                  <span>
                    Required measurements are taken to understand
                    the available space and prepare the work
                    correctly.
                  </span>

                </div>

              </div>


              {/* STEP 04 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  04
                </div>

                <div className="how-step-content">

                  <p>
                    STEP FOUR
                  </p>

                  <h3>
                    Material Selection
                  </h3>

                  <span>
                    Suitable materials and sizes are discussed
                    according to the design, strength and
                    practical requirement.
                  </span>

                </div>

              </div>


              {/* STEP 05 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  05
                </div>

                <div className="how-step-content">

                  <p>
                    STEP FIVE
                  </p>

                  <h3>
                    Quotation
                  </h3>

                  <span>
                    The work requirements are discussed and the
                    expected cost is explained before fabrication
                    begins.
                  </span>

                </div>

              </div>


              {/* STEP 06 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  06
                </div>

                <div className="how-step-content">

                  <p>
                    STEP SIX
                  </p>

                  <h3>
                    Fabrication
                  </h3>

                  <span>
                    Cutting, preparation, welding and assembly
                    are completed according to the agreed
                    requirement.
                  </span>

                </div>

              </div>


              {/* STEP 07 */}

              <div className="how-process-item">

                <div className="how-step-number">
                  07
                </div>

                <div className="how-step-content">

                  <p>
                    STEP SEVEN
                  </p>

                  <h3>
                    Installation
                  </h3>

                  <span>
                    After fabrication and finishing, the completed
                    work is installed at the required location
                    when installation is part of the work.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= WHY PROCESS ================= */}

        <section className="how-benefits">

          <div className="container">

            <div className="how-benefits-heading">

              <p>
                WHY THIS PROCESS
              </p>

              <h2>
                Simple.
                <br />
                Clear. Practical.
              </h2>

            </div>


            <div className="how-benefits-grid">

              <div className="how-benefit-card">

                <span>
                  01
                </span>

                <h3>
                  Clear Requirement
                </h3>

                <p>
                  Understanding the requirement first helps
                  avoid unnecessary confusion during the work.
                </p>

              </div>


              <div className="how-benefit-card">

                <span>
                  02
                </span>

                <h3>
                  Better Planning
                </h3>

                <p>
                  Measurements and design discussions help plan
                  the fabrication properly.
                </p>

              </div>


              <div className="how-benefit-card">

                <span>
                  03
                </span>

                <h3>
                  Practical Work
                </h3>

                <p>
                  The focus remains on strength, usability and
                  suitable finishing.
                </p>

              </div>


              <div className="how-benefit-card">

                <span>
                  04
                </span>

                <h3>
                  Better Communication
                </h3>

                <p>
                  Customers can discuss their requirements
                  directly with RK Welding.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="how-cta">

          <div className="container">

            <p>
              READY TO START?
            </p>

            <h2>
              Tell Us What You
              <span> Want to Build.</span>
            </h2>

            <p>
              Share your design or requirement with RK Welding
              and let's discuss the work.
            </p>

            <div className="how-cta-buttons">

              <a
                href="tel:+917036903065"
                className="how-call-button"
              >
                Call RK Welding
              </a>

              <a
                href="https://wa.me/7036903065"
                target="_blank"
                rel="noreferrer"
                className="how-whatsapp-button"
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

export default HowWeWork;