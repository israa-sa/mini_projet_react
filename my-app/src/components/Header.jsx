import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="modern-header">
      <div className="container">
        <div className="header-content-modern">
          <div className="logo-modern">
            <Link to="/" className="logo-link">
              <span className="logo-text">AUTO</span>
              <span className="logo-dot">.</span>
            </Link>
          </div>
          
          <nav className={`nav-modern ${menuOpen ? 'mobile-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link-modern ${isActive('/')}`}
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </Link>
            
            <Link 
              to="/catalogue" 
              className={`nav-link-modern ${isActive('/catalogue')}`}
              onClick={() => setMenuOpen(false)}
            >
              Collection
            </Link>
            
            <Link 
              to="/contact" 
              className={`nav-link-modern ${isActive('/contact')}`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
        
          </nav>
          
          <div className="desktop-contact">
            <a href="tel:+21671234567" className="header-phone">
              <span className="phone-icon">📞</span>
              <span>71 234 567</span>
            </a>
          </div>
          
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;