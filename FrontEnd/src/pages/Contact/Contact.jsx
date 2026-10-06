import Navbar from "../../components/Navbar/Navbar";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <Navbar />

      <main>

        {/* =========================
            HERO
        ========================= */}

        <section className="contact-hero">

          <div className="container">

            <p className="contact-hero-label">
              GET IN TOUCH
            </p>

            <h1>
              Let's Talk About
              <br />
              <span>Your Project.</span>
            </h1>

            <p className="contact-hero-description">
              Have a gate, grill, shed or fabrication requirement?
              Contact RK Welding and discuss your requirement with us.
            </p>

          </div>

        </section>


        {/* =========================
            CONTACT OPTIONS
        ========================= */}

        <section className="contact-options">

          <div className="container">

            <div className="contact-heading">

              <p>
                CONTACT RK WELDING
              </p>

              <h2>
                We're Ready
                <span> To Help.</span>
              </h2>

              <p className="contact-heading-description">
                Choose the easiest way to reach us.
                You can call, WhatsApp or visit our location.
              </p>

            </div>


            <div className="contact-cards">

              {/* CALL */}

              <div className="contact-card">

                <div className="contact-card-icon">
                  📞
                </div>

                <p className="contact-card-label">
                  CALL US
                </p>

                <h3>
                  Talk to RK Welding
                </h3>

                <p>
                  Call us directly to discuss your
                  welding or fabrication requirement.
                </p>

                <a
                  href="tel:+917036903065"
                  className="contact-card-button"
                >
                  Call Now →
                </a>

              </div>


              {/* WHATSAPP */}

              <div className="contact-card">

                <div className="contact-card-icon">
                  💬
                </div>

                <p className="contact-card-label">
                  WHATSAPP
                </p>

                <h3>
                  Chat With Us
                </h3>

                <p>
                  Send us your design, photo or
                  requirement directly on WhatsApp.
                </p>

                <a
                  href="https://wa.me/917036903065?text=Hi%20RK%20Welding%2C%20I%20have%20a%20welding%20or%20fabrication%20requirement."
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card-button whatsapp"
                >
                  WhatsApp Us →
                </a>

              </div>


              {/* LOCATION */}

              <div className="contact-card">

                <div className="contact-card-icon">
                  📍
                </div>

                <p className="contact-card-label">
                  VISIT US
                </p>

                <h3>
                  RK Welding
                </h3>

                <p>
                  Konijerla, Khammam,
                  Telangana, India.
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=RK+Welding+Konijerla+Khammam"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card-button"
                >
                  Get Directions →
                </a>

              </div>


              {/* WORKING HOURS */}

              <div className="contact-card">

                <div className="contact-card-icon">
                  🕒
                </div>

                <p className="contact-card-label">
                  WORKING HOURS
                </p>

                <h3>
                  Business Hours
                </h3>

                <p>
                  Monday – Sunday
                  <br />
                  9:00 AM – 7:00 PM
                </p>

                <a
                  href="tel:+917036903065"
                  className="contact-card-button"
                >
                  Contact Us →
                </a>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            LOCATION
        ========================= */}

        <section className="contact-location">

          <div className="container">

            <div className="location-layout">

              <div className="location-content">

                <p className="location-label">
                  OUR LOCATION
                </p>

                <h2>
                  Visit
                  <span> RK Welding.</span>
                </h2>

                <p>
                  Our welding and fabrication works are
                  based in Konijerla, Khammam, Telangana.
                  Visit us to discuss your requirement
                  and design ideas.
                </p>


                <div className="location-details">

                  <div className="location-detail">

                    <span>
                      Business
                    </span>

                    <strong>
                      RK Welding
                    </strong>

                  </div>


                  <div className="location-detail">

                    <span>
                      Location
                    </span>

                    <strong>
                      Konijerla, Khammam
                    </strong>

                  </div>


                  <div className="location-detail">

                    <span>
                      State
                    </span>

                    <strong>
                      Telangana, India
                    </strong>

                  </div>

                </div>


                <a
                  href="https://www.google.com/maps/search/?api=1&query=RK+Welding+Konijerla+Khammam"
                  target="_blank"
                  rel="noreferrer"
                  className="location-button"
                >
                  Open in Google Maps →
                </a>

              </div>


              <div className="location-map">

                <iframe
                  title="RK Welding Location"
                  src="https://www.google.com/maps?q=Konijerla,+Khammam,+Telangana&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            PERSON BEHIND RK WELDING
        ========================= */}

        <section className="contact-owner">

          <div className="container">

            <div className="owner-layout">

              <div className="owner-image">

                <img
                  src="/images/team/rk-welding-owner.jpg"
                  alt="RK Welding owner"
                />

              </div>


              <div className="owner-content">

                <p className="owner-label">
                  THE PERSON BEHIND RK WELDING
                </p>

                <h2>
                  Built by Hands.
                  <br />
                  <span>Driven by Work.</span>
                </h2>

                <h3>
                  Bandaru Ramakrishna
                </h3>

                <p className="owner-role">
                  Welding & Fabrication
                </p>

                <p className="owner-description">
                  RK Welding is a local welding and fabrication
                  business focused on strong workmanship, practical
                  designs and clean finishing.
                </p>

                <p className="owner-description">
                  From gates and grills to sheds, fabrication and
                  custom welding works, our focus is on building
                  work that is strong, useful and made to last.
                </p>

                <div className="owner-buttons">

                  <a
                    href="tel:+917036903065"
                    className="owner-call-button"
                  >
                    Call RK Welding
                  </a>

                  <a
                    href="https://wa.me/917036903065"
                    target="_blank"
                    rel="noreferrer"
                    className="owner-whatsapp-button"
                  >
                    WhatsApp
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            WHAT CAN WE HELP WITH
        ========================= */}

        <section className="contact-services">

          <div className="container">

            <div className="contact-services-heading">

              <p>
                WHAT CAN WE HELP WITH?
              </p>

              <h2>
                Tell Us What
                <span> You Need.</span>
              </h2>

              <span>
                Contact us for welding and fabrication
                requirements such as:
              </span>

            </div>


            <div className="contact-services-grid">

              <div className="contact-service-item">

                <span>
                  01
                </span>

                <h3>
                  Main Gates
                </h3>

                <p>
                  Strong and custom-designed
                  MS main gates.
                </p>

              </div>


              <div className="contact-service-item">

                <span>
                  02
                </span>

                <h3>
                  Window Grills
                </h3>

                <p>
                  Durable grills designed
                  for safety and strength.
                </p>

              </div>


              <div className="contact-service-item">

                <span>
                  03
                </span>

                <h3>
                  MS Sheds
                </h3>

                <p>
                  Practical shed structures
                  and fabrication works.
                </p>

              </div>


              <div className="contact-service-item">

                <span>
                  04
                </span>

                <h3>
                  Portable Cabins
                </h3>

                <p>
                  Custom fabricated portable
                  shops and cabins.
                </p>

              </div>


              <div className="contact-service-item">

                <span>
                  05
                </span>

                <h3>
                  Furniture Works
                </h3>

                <p>
                  Strong MS furniture and
                  custom metal works.
                </p>

              </div>


              <div className="contact-service-item">

                <span>
                  06
                </span>

                <h3>
                  Custom Fabrication
                </h3>

                <p>
                  Custom welding works based
                  on your requirements.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            DESIGN ENQUIRY
        ========================= */}

        <section className="design-enquiry">

          <div className="container">

            <div className="design-enquiry-box">

              <p>
                HAVE A DESIGN IN MIND?
              </p>

              <h2>
                Send Us a Photo.
                <br />
                <span>Let's Build It.</span>
              </h2>

              <p className="design-enquiry-description">
                If you have a gate design, grill design,
                shed idea or any other fabrication reference,
                simply send us the photo on WhatsApp.
              </p>

              <div className="design-enquiry-buttons">

                <a
                  href="https://wa.me/917036903065?text=Hi%20RK%20Welding%2C%20I%20have%20a%20design%20or%20fabrication%20requirement.%20I%20would%20like%20to%20discuss%20it."
                  target="_blank"
                  rel="noreferrer"
                  className="design-whatsapp-button"
                >
                  Send on WhatsApp
                </a>

                <a
                  href="tel:+917036903065"
                  className="design-call-button"
                >
                  Call RK Welding
                </a>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            FINAL CTA
        ========================= */}

        <section className="contact-final-cta">

          <div className="container">

            <p>
              RK WELDING • KONIJERLA
            </p>

            <h2>
              Built Strong.
              <span> Built for You.</span>
            </h2>

            <p>
              Let's discuss your next welding
              or fabrication requirement.
            </p>

            <div className="contact-final-buttons">

              <a
                href="tel:+917036903065"
                className="final-call-button"
              >
                Call Now
              </a>

              <a
                href="https://wa.me/917036903065"
                target="_blank"
                rel="noreferrer"
                className="final-whatsapp-button"
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

export default Contact;