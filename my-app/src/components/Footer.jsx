import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="logo-primary">AUTO</span>
              <span className="logo-dot">.</span>
            </h3>
            <p className="footer-description">
              Votre partenaire premium pour l'achat de voitures neuves en Tunisie.
              Excellence, innovation et service personnalisé.
            </p>
            <div className="social-links">
              <button className="social-link" aria-label="Facebook" onClick={() => alert('Page Facebook')}>
                <span className="social-icon">fc</span>
              </button>
              <button className="social-link" aria-label="LinkedIn" onClick={() => alert('Page LinkedIn')}>
                <span className="social-icon">in</span>
              </button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Accueil</Link></li>
              <li><Link to="/catalogue" className="footer-link">Collection</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-details">
                  <div className="contact-label">Adresse</div>
                  <div className="contact-value">Avenue Habib Bourguiba, 1001 Tunis</div>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <div className="contact-label">Téléphone</div>
                  <div className="contact-value">71 234 567</div>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div className="contact-details">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">contact@automarket.tn</div>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div className="contact-details">
                  <div className="contact-label">Horaires</div>
                  <div className="contact-value">Lun-Ven: 8h-18h | Sam: 9h-13h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} AUTO. Tous droits réservés.
            </p>
            
            <div className="footer-links-bottom">
              <button className="footer-link-small" onClick={() => alert('Mentions légales')}>
                Mentions légales
              </button>
              <button className="footer-link-small" onClick={() => alert('Politique de confidentialité')}>
                Confidentialité
              </button>
              <button className="footer-link-small" onClick={() => alert('Conditions générales')}>
                CGU
              </button>
            </div>
            
            <button className="back-to-top" onClick={scrollToTop} aria-label="Retour en haut">
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;