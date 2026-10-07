import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">

            <a href="/" className="footer-logo">
              RK <span>WELDING</span>
            </a>

            <p>
              Professional welding and fabrication works
              in and around Konijerla, Khammam.
            </p>

            <div className="footer-location">
              📍 Konijerla, Khammam, Telangana
            </div>

          </div>


          {/* QUICK LINKS */}
          <div className="footer-column">

            <h3>Quick Links</h3>

            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/works">Our Work</a>
            <a href="/about">About Us</a>
            <a href="/videos">Videos</a>
            <a href="/contact">Contact</a>

          </div>


          {/* SERVICES */}
          <div className="footer-column">

            <h3>Our Services</h3>

            <a href="/services">Main Gates</a>
            <a href="/services">Window Grills</a>
            <a href="/services">MS Sheds</a>
            <a href="/services">Custom Fabrication</a>
            <a href="/services">Furniture Works</a>
            <a href="/services">Tractor & Trailer Works</a>

          </div>


          {/* CONTACT */}
          <div className="footer-column footer-contact">

            <h3>Contact Us</h3>

            <a href="tel:+917036903065">
              📞 Call RK Welding
            </a>

            <a
              href="https://wa.me/917036903065"
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>

            <a href="/contact">
              📍 Visit Our Location
            </a>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} RK Welding.
            All Rights Reserved.
          </p>

          <p>
            Welding & Fabrication Works • Konijerla
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;