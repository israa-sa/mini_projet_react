import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ListeDeVoitures from './components/ListeDeVoitures';
import DetailVoiture from './components/DetailVoiture';
import './App.css';

function App() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Merci ! Vous êtes inscrit avec: ${email}`);
      setEmail('');
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        
        <main className="main-content">
          <Routes>
            {/* Page d'accueil MODERNE */}
            <Route path="/" element={
              <div className="modern-home">
                {/* Hero Section - Fullscreen */}
                <section className="modern-hero">
                  <div className="hero-overlay">
                    <div className="container">
                      <div className="hero-content-modern">
                        <h1 className="hero-title-modern">
                          <span className="hero-gradient">L'avenir</span> de la mobilité
                          <br />
                          commence ici
                        </h1>
                        <p className="hero-subtitle-modern">
                          Découvrez les véhicules les plus innovants de 2024
                          avec une expérience d'achat repensée
                        </p>
                        
                        <div className="hero-cta">
                          <a href="/catalogue" className="cta-button-primary">
                            Explorer la collection
                            <span className="arrow">→</span>
                          </a>
                          <a href="/contact" className="cta-button-secondary">
                            Prendre rendez-vous
                          </a>
                        </div>
                        
                        <div className="scroll-indicator">
                          <div className="mouse">
                            <div className="wheel"></div>
                          </div>
                          <span>Scroll</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                  <div className="container">
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-number" data-count="50">+100</div>
                        <div className="stat-label">Modèles disponibles</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number" data-count="100">+100</div>
                        <div className="stat-label">Clients satisfaits</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number" data-count="24">24/24</div>
                        <div className="stat-label">Heures de service</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number" data-count="5">+2</div>
                        <div className="stat-label">Années de garantie</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                  <div className="container">
                    <div className="section-header-modern">
                      <h2 className="section-title-modern">
                        Une expérience <span className="highlight">unique</span>
                      </h2>
                      <p className="section-subtitle-modern">
                        Redéfinissons ensemble votre façon d'acheter une voiture
                      </p>
                    </div>
                    
                    <div className="features-grid">

                      
                      <div className="feature-card-modern">
                        <div className="feature-icon-modern">🤝</div>
                        <h3>Conseiller dédié</h3>
                        <p>Un expert vous accompagne tout au long de votre projet</p>
                      </div>
                      
                      <div className="feature-card-modern">
                        <div className="feature-icon-modern">🚀</div>
                        <h3>Livraison express</h3>
                        <p>Recevez votre véhicule en moins de 72h partout en Tunisie</p>
                      </div>
                      
                      <div className="feature-card-modern">
                        <div className="feature-icon-modern">🔄</div>
                        <h3>Échange facilité</h3>
                        <p>Changez de véhicule tous les 2 ans sans frais cachés</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section-modern">
                  <div className="container">
                    <div className="cta-content">
                      <h2 className="cta-title">
                        Prêt à vivre <span className="cta-highlight">l'expérience</span> ?
                      </h2>
                      <p className="cta-text">
                        Réservez votre essai gratuit dès maintenant
                      </p>
                      <a href="/contact" className="cta-button-large">
                        <span className="button-text">Réserver un essai</span>
                        <span className="button-icon">🎯</span>
                      </a>
                    </div>
                  </div>
                </section>

                {/* Newsletter */}
                <section className="newsletter-section">
                  <div className="container">
                    <div className="newsletter-card">
                      <h3>Restez informé</h3>
                      <p>Recevez en avant-première nos nouvelles arrivées et offres exclusives</p>
                      <form onSubmit={handleNewsletter} className="newsletter-form">
                        <div className="input-group">
                          <input
                            type="email"
                            placeholder="Votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <button type="submit">
                            <span>S'inscrire</span>
                            <span className="send-icon">✈️</span>
                          </button>
                        </div>
                        <p className="privacy-note">
                          En vous inscrivant, vous acceptez notre politique de confidentialité
                        </p>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            } />

            {/* Page catalogue */}
            <Route path="/catalogue" element={
              <div className="container">
                <ListeDeVoitures />
              </div>
            } />

            {/* Page détail voiture */}
            <Route path="/voiture/:id" element={
              <div className="container">
                <DetailVoiture />
              </div>
            } />

            {/* Page contact */}
            <Route path="/contact" element={
              <div className="container">
                <div className="contact-page-modern">
                  <div className="contact-header">
                    <h1>Contact</h1>
                    <p>Discutons de votre projet automobile</p>
                  </div>
                  
                  <div className="contact-grid">
                    <div className="contact-info-modern">
                      <div className="info-card">
                        <h3>📞 Téléphone</h3>
                        <p>71 234 567</p>
                        <p>Lun-Ven: 8h-18h</p>
                      </div>
                      
                      <div className="info-card">
                        <h3>📍 Adresse</h3>
                        <p>Avenue Habib Bourguiba</p>
                        <p>1001 Tunis, Tunisie</p>
                      </div>
                      
                      <div className="info-card">
                        <h3>✉️ Email</h3>
                        <p>contact@automarket.tn</p>
                        <p>Réponse sous 24h</p>
                      </div>
                      
                      <div className="info-card">
                        <h3>⏰ Rendez-vous</h3>
                        <p>Sur rendez-vous uniquement</p>
                        <p>Disponible 7j/7</p>
                      </div>
                    </div>
                    
                    <div className="contact-form-modern">
                      <form>
                        <div className="form-group-modern">
                          <label>Nom complet *</label>
                          <input type="text" placeholder="Votre nom" required />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group-modern">
                            <label>Email *</label>
                            <input type="email" placeholder="email@exemple.com" required />
                          </div>
                          
                          <div className="form-group-modern">
                            <label>Téléphone</label>
                            <input type="tel" placeholder="+216 XX XXX XXX" />
                          </div>
                        </div>
                        
                        <div className="form-group-modern">
                          <label>Sujet *</label>
                          <select required>
                            <option value="">Choisir un sujet</option>
                            <option value="essai">Demande d'essai</option>
                            <option value="info">Information produit</option>
                            <option value="financement">Financement</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                        
                        <div className="form-group-modern">
                          <label>Message *</label>
                          <textarea rows="5" placeholder="Votre message..." required></textarea>
                        </div>
                        
                        <button type="submit" className="submit-button">
                          <span>Envoyer le message</span>
                          <span className="submit-icon">🚀</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;