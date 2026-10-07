import Navbar from "../../components/Navbar/Navbar";

import "./Videos.css";

function Videos() {
  return (
    <div className="videos-page">
      <Navbar />

      <main>

        {/* HERO */}
        <section className="videos-hero">
          <div className="container">
            <p className="videos-hero-label">
              RK WELDING VIDEOS
            </p>

            <h1>
              See Our Work
              <br />
              <span>In Action.</span>
            </h1>

            <p className="videos-hero-description">
              Watch real welding and fabrication works
              completed by RK Welding in and around
              Konijerla.
            </p>
          </div>
        </section>


        {/* VIDEOS */}
        <section className="videos-section">
          <div className="container">

            <div className="videos-heading">
              <p>OUR WORK IN ACTION</p>

              <h2>
                Real Works.
                <br />
                Real Videos.
              </h2>

              <span>
                Explore some of the welding and fabrication
                works completed by RK Welding.
              </span>
            </div>


            <div className="videos-grid">

              {/* IRON STAIRCASE */}
              <div className="video-card">

                <div className="video-wrapper">
                  <video
                    controls
                    preload="metadata"
                    poster="/images/gates/gate-1.jpg"
                  >
                    <source
                      src="/images/videos/iron-staircase.mp4"
                      type="video/mp4"
                    />

                    Your browser does not support
                    the video tag.
                  </video>
                </div>

                <div className="video-card-content">

                  <p className="video-card-category">
                    FABRICATION WORK
                  </p>

                  <h3>
                    Iron Staircase
                  </h3>

                  <p>
                    A strong and practical iron staircase
                    fabrication work completed by RK Welding.
                  </p>

                  <a
                    href="https://wa.me/917036903065?text=Hi%20RK%20Welding%2C%20I%20saw%20your%20Iron%20Staircase%20work%20and%20I%20am%20interested%20in%20a%20similar%20work."
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enquire About This Work →
                  </a>

                </div>

              </div>


              {/* SHOP ROLLING SHUTTER */}
              <div className="video-card">

                <div className="video-wrapper">
                  <video
                    controls
                    preload="metadata"
                    poster="/images/portable-cabins/shop-cabin-1.jpg"
                  >
                    <source
                      src="/images/videos/shop-rolling-shutter.mp4"
                      type="video/mp4"
                    />

                    Your browser does not support
                    the video tag.
                  </video>
                </div>

                <div className="video-card-content">

                  <p className="video-card-category">
                    FABRICATION WORK
                  </p>

                  <h3>
                    Shop Rolling Shutter
                  </h3>

                  <p>
                    A practical shop rolling shutter
                    fabrication work completed by RK Welding.
                  </p>

                  <a
                    href="https://wa.me/917036903065?text=Hi%20RK%20Welding%2C%20I%20saw%20your%20Shop%20Rolling%20Shutter%20work%20and%20I%20am%20interested%20in%20a%20similar%20work."
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enquire About This Work →
                  </a>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* VIDEO TYPES */}
        <section className="video-types">
          <div className="container">

            <div className="video-types-heading">
              <p>MORE TO COME</p>

              <h2>
                More RK Welding
                <span> Works.</span>
              </h2>
            </div>

            <div className="video-types-grid">

              <div className="video-type">
                <span>01</span>
                <h3>Gate Fabrication</h3>
                <p>
                  Watch our gate fabrication and
                  installation works.
                </p>
              </div>

              <div className="video-type">
                <span>02</span>
                <h3>Shed Works</h3>
                <p>
                  Real shed fabrication and
                  structural welding works.
                </p>
              </div>

              <div className="video-type">
                <span>03</span>
                <h3>Custom Fabrication</h3>
                <p>
                  Custom welding works based on
                  customer requirements.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* CTA */}
        <section className="videos-cta">
          <div className="container">

            <p>LIKE WHAT YOU SEE?</p>

            <h2>
              Have a Welding
              <span> Requirement?</span>
            </h2>

            <p>
              Show us the work you like and contact
              RK Welding to discuss your requirement.
            </p>

            <div className="videos-cta-buttons">

              <a
                href="tel:+917036903065"
                className="videos-call-button"
              >
                Call RK Welding
              </a>

              <a
                href="https://wa.me/917036903065"
                target="_blank"
                rel="noreferrer"
                className="videos-whatsapp-button"
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

export default Videos;