const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-4 border-top shadow-sm mt-5">
      <div className="container">
        <div className="row">

          {/* Logo and About */}
          <div className="col-md-4 mb-3">
            <h5 className="text-primary">URL Shortener</h5>
            <p>Simplify your long URLs with one click and manage your links with ease.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h5>Connect With Us</h5>
            <a href="#" className="text-primary  me-3"><i className="bi bi-facebook fs-2"></i></a>
            <a href="#" className="text-info me-3"><i className="bi bi-twitter fs-2"></i></a>
            <a href="#" className="text-secondary me-3"><i className="bi bi-github fs-2"></i></a>
            <a href="#" className="text-dark"><i className="bi bi-envelope fs-2"></i></a>
          </div>

        </div>
        <hr />
        <p className="text-center mb-0 pb-1">&copy; {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
        <p className="text-center mt-0 mb-0 pb-3">Developed By: <a href="https://github.com/Gyasuddin0786?tab=repositories"><b>Gyasuddin Ansari</b></a></p>
      </div>
    </footer>
  );
};

export default Footer;
