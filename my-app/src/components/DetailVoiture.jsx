import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import voituresData from '../data/voitures';

function DetailVoiture() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voiture, setVoiture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [envoiReussi, setEnvoiReussi] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Fonction pour obtenir les images spécifiques à chaque modèle
  const getCarImages = (voiture) => {
    if (!voiture) return [];
    
    const imageMap = {
      // ========== CupraLeon ==========
      "Cupra Leon": [
        voiture.image,
        "https://galerie.automobile.tn/max/2025/02/cupra-leon-1.4-tsi-90804.webp",
        "https://galerie.automobile.tn/min/2025/03/cupra-leon-1.4-tsi-sport-91724.webp",
        "https://galerie.automobile.tn/min/2025/02/cupra-leon-1.4-tsi-90802.webp"
      ],
      // ========== PEUGEOT ==========
      "Peugeot 208 GT": [
        voiture.image,
        "https://www.largus.fr/images/styles/max_1300x1300/public/images/2019-peugeot-208-gt-line-11.jpg?itok=AsNaaDL9",
        "https://www.wizicar.com/wp-content/uploads/2020/01/interieur-peugeot-208-gt-line-3-1024x474.jpg",
        "https://s3-eu-west-1.amazonaws.com/staticeu.izmocars.com/toolkit/commonassets/2024/24peugeot/24peugeote208evgthb2fb/24peugeote208evgthb2fb_animations/colorpix/fr/400x300/peugeot_24e208evgthb2fb_teintem%C3%A9tallis%C3%A9egrisartense.webp"
      ],
      
      // ========== HYUNDAI ==========
      "Hyundai Tucson Hybrid": [
        voiture.image,
        "https://galerie.automobile.tn/min/2025/07/hyundai-tucson-hybride-1.6-l-t-gdi-2wd-top-grade-bva-6-95276.webp",
        "https://galerie.automobile.tn/min/2025/07/hyundai-tucson-hybride-1.6-l-t-gdi-2wd-top-grade-bva-6-95268.webp",
        "https://galerie.automobile.tn/min/2025/07/hyundai-tucson-hybride-1.6-l-t-gdi-2wd-top-grade-bva-6-95265.webp"
      ],
      
      // ========== KIA ==========
      "Kia Sportage GT-Line": [
        voiture.image,
        "https://galerie.automobile.tn/max/2023/09/kia-sportage-hybride-1.6-l-t-gdi-4x4-gt-line-77184.webp",
        "https://galerie.automobile.tn/max/2023/09/kia-sportage-hybride-1.6-l-t-gdi-4x4-gt-line-77179.webp",
        "https://galerie.automobile.tn/min/2023/09/kia-sportage-hybride-1.6-l-t-gdi-4x4-gt-line-77187.webp"
      ],
      
      // ========== TOYOTA ==========
      "Toyota Corolla Hybrid": [
        voiture.image,
        "https://toyota.com.tn/wp-content/uploads/2019/09/toyota-corolla-sedan-2019-gallery-12-full_tcm-11-1559735-min-800x600.jpg",
        "https://img.sm360.ca/ir/w640h390c/images/newcar/ca/2025/toyota/corolla-cross-hybride/se/suv/interiorColors/2025_toyota_corolla-cross-hybride_se_tissu-noir_001.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA__58iMUD56cjZhjl49sZTiy7OZ3zdrs9hg&s"
      ],
      
      // ========== MERCEDES ==========
      "Mercedes Classe A 250e": [
        voiture.image,
        "https://www.mercedes-benz.fr/content/dam/hq/passengercars/cars/a-class/hatchback-w177-fl-pi/overview/teaser/11-2024/images/mercedes-benz-a-class-w177-teaser-interior-3302x1858-11-2024.jpg/1740020653144.jpg?im=Crop,rect=(0,0,3302,1858);Resize=(1280,720)",
        "https://www.infomotori.com/content/uploads/2023/12/Mercedes-A-250-e-Vibes-12.jpg",
        "https://www.mercedes-benz.fr/content/dam/hq/passengercars/cars/a-class/hatchback-w177-fl-pi/overview/plug-in-hybrid/11-2024/images/mercedes-benz-a-class-w177-plug-in-hybrid-stage-3840x3840-11-2024.jpg/1740020653883.jpg?im=Crop,rect=(1378,1241,2489,1399);Resize=(1280,719)"
      ],
      
      // ========== BMW ==========
      "BMW Série 1 118i": [
        voiture.image,
        "https://galerie.automobile.tn/min/2025/04/bmw-serie-1-118i-pack-m-pro-92968.webp",
        "https://galerie.automobile.tn/min/2025/04/bmw-serie-1-118i-pack-m-pro-92965.webp",
        "https://galerie.automobile.tn/min/2025/04/bmw-serie-1-118i-pack-m-pro-92980.webp"
      ],
      
      // ========== VOLKSWAGEN ==========
      "Volkswagen Virtus": [
        voiture.image,
        "https://galerie.automobile.tn/max/2023/03/volkswagen-virtus-1.0-l-tsi-confortline-72932.webp",
        "https://galerie.automobile.tn/min/2023/03/volkswagen-virtus-1.0-l-tsi-confortline-72931.webp",
        "https://galerie.automobile.tn/min/2023/03/volkswagen-virtus-1.0-l-tsi-confortline-72759.webp"
      ],
      
      // ========== CITROËN ==========
      "Citroën C4 Shine": [
        voiture.image,
        "https://galerie.automobile.tn/max/2025/11/citroen-c4-x-1.2-l-max-eat8-100464.webp",
        "https://galerie.automobile.tn/min/2025/11/citroen-c4-x-1.2-l-max-eat8-100437.webp",
        "https://galerie.automobile.tn/min/2025/11/citroen-c4-x-1.2-l-max-eat8-100469.webp"
      ],
      
      // ========== DACIA ==========
      "Dacia Sandero Stepway Extreme": [
        voiture.image,
        "https://www.dacia.tn/CountriesData/Tunisia/images/cars/SanderoBJIph12020/Overview/dacia-sandero-bji-ph1-006_ig_w400_h225.jpg",
        "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/bji-sandero-stepway/sandero-stepway-bji-ph1/edito-2560-x-1440/dacia-sandero-stepway-bji-ph1-extreme-006.jpg.ximg.xsmall.jpg/e159b73cf0.jpg",
        "https://adf-automobiles.com/wp-content/uploads/2025/08/Dacia-Sandero-Stepway-202552.jpg"
      ],
      
      // ========== SEAT ==========
      "Seat Arona FR": [
        voiture.image,
        "https://galerie.automobile.tn/max/2022/01/seat-arona-1.0-tsi-fr-62622.webp",
        "https://galerie.automobile.tn/max/2022/01/seat-arona-1.0-tsi-fr-62621.webp",
        "https://galerie.automobile.tn/max/2022/01/seat-arona-1.0-tsi-fr-62615.webp"
      ],
      
      // ========== FIAT ==========
      "Fiat 500e La Prima": [
        voiture.image,
        "https://img.itautomotive.fr/image/?apikey=808e17022092975cb19595ec956baeb8&url=https://cdn.bymycar.eu/fr-bo/assets/images/vehicles/vn/1009112/686cd18b87c29.png&h=1200&output=webp&q=75&output=webp",
        "https://img.itautomotive.fr/image/?apikey=808e17022092975cb19595ec956baeb8&url=https://cdn.bymycar.eu/fr-bo/assets/images/vehicles/vn/1009112/686cd18b8a72e.png&h=1200&output=webp&q=75&output=webp",
        "https://img.itautomotive.fr/image/?apikey=808e17022092975cb19595ec956baeb8&url=https://cdn.bymycar.eu/fr-bo/assets/images/vehicles/vn/1009112/686cd18b86231.png&h=1200&output=webp&q=75&output=webp"
      ]
    };
    
    const key = `${voiture.marque} ${voiture.modele}`;
    
    // Retourne les images spécifiques si elles existent, sinon retourne [voiture.image]
    return imageMap[key] || [voiture.image];
  };

  const chargerVoiture = async (voitureId) => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const voitureTrouvee = voituresData.find(v => v.id === Number(voitureId));
      
      if (!voitureTrouvee) {
        throw new Error("Voiture non trouvée");
      }
      
      setVoiture(voitureTrouvee);
      
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message || "Une erreur est survenue lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      chargerVoiture(id);
    }
  }, [id]);

  const contacterVendeur = async () => {
    try {
      if (!contactMessage.trim()) {
        throw new Error("Veuillez écrire un message");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEnvoiReussi(true);
      setContactMessage('');
      
      setTimeout(() => setEnvoiReussi(false), 5000);
      
    } catch (err) {
      console.error("Erreur d'envoi:", err);
      alert(`Erreur: ${err.message}`);
    }
  };

  // Images complètes pour la galerie (4 images par modèle)
  const allImages = voiture ? getCarImages(voiture) : [];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Chargement des détails...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Erreur</h3>
        <p className="error-message">{error}</p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Retour
          </button>
          <button onClick={() => navigate('/catalogue')} className="btn btn-primary">
            Voir la collection
          </button>
        </div>
      </div>
    );
  }

  if (!voiture) {
    return (
      <div className="container">
        <div className="not-found-modern">
          <h2>Voiture non trouvée</h2>
          <p>La voiture que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link to="/catalogue" className="btn btn-primary">
            Explorer la collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page-modern">
      {/* Breadcrumb */}
      <div className="breadcrumb-modern">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Accueil</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/catalogue" className="breadcrumb-link">Collection</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{voiture.marque} {voiture.modele}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="detail-content-modern">
          {/* Image Gallery */}
          <div className="detail-gallery">
            <div className="main-image">
              <img 
                src={allImages[currentImage]} 
                alt={`${voiture.marque} ${voiture.modele}`}
                className="gallery-main-img"
              />
              <div className="image-badges-modern">
                <span className="badge-modern badge-new-modern">NEUVE</span>
                <span className="badge-modern badge-year-modern">{voiture.annee}</span>
              </div>
            </div>
            
            <div className="thumbnail-grid">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${currentImage === index ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img src={img} alt={`Vue ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Détails principaux */}
          <div className="detail-main">
            <header className="detail-header-modern">
              <h1 className="detail-title-modern">
                {voiture.marque} <span className="model-highlight">{voiture.modele}</span>
              </h1>
              <div className="detail-price-modern">
                <span className="price-amount">{voiture.prix.toLocaleString()} DT</span>
                <span className="price-tax">TTC</span>
              </div>
            </header>

            <div className="detail-specs-modern">
              <div className="specs-grid"> 
                <div className="spec-card-modern">
                  <div className="spec-icon-modern">⛽</div>
                  <div className="spec-content">
                    <div className="spec-label-modern">Carburant</div>
                    <div className="spec-value-modern">{voiture.carburant}</div>
                  </div>
                </div>
                
                <div className="spec-card-modern">
                  <div className="spec-icon-modern">⚙️</div>
                  <div className="spec-content">
                    <div className="spec-label-modern">Transmission</div>
                    <div className="spec-value-modern">{voiture.transmission}</div>
                  </div>
                </div>
                
                <div className="spec-card-modern">
                  <div className="spec-icon-modern">🛡️</div>
                  <div className="spec-content">
                    <div className="spec-label-modern">Garantie</div>
                    <div className="spec-value-modern">{voiture.garantie}</div>
                  </div>
                </div>
                
                <div className="spec-card-modern">
                  <div className="spec-icon-modern">📍</div>
                  <div className="spec-content">
                    <div className="spec-label-modern">Localisation</div>
                    <div className="spec-value-modern">{voiture.localisation}</div>
                  </div>
                </div>
                
                <div className="spec-card-modern">
                  <div className="spec-icon-modern">🏢</div>
                  <div className="spec-content">
                    <div className="spec-label-modern">Concessionnaire</div>
                    <div className="spec-value-modern">{voiture.concessionnaire}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className="features-section-modern">
              <h3 className="section-title-small">Caractéristiques</h3>
              <div className="features-tags">
                {voiture.caracteristiques.map((caract, index) => (
                  <span key={index} className="feature-tag">
                    {caract}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h3 className="section-title-small">Description</h3>
              <div className="description-content">
                <p>{voiture.description}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="detail-actions-modern">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => window.open(`tel:${voiture.telephone}`, '_blank')}
              >
                <span className="btn-icon">📞</span>
                <span>Appeler maintenant</span>
              </button>
              
              <Link to="/contact" className="btn btn-secondary btn-large">
                <span className="btn-icon">✉️</span>
                <span>Demander un essai</span>
              </Link>
              
              <button className="btn btn-outline btn-large">
                <span className="btn-icon">❤️</span>
                <span>Ajouter aux favoris</span>
              </button>
            </div>
          </div>

          {/* Sidebar - Contact & Info */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Contacter le vendeur</h3>
              
              {envoiReussi && (
                <div className="success-message-modern">
                  <span className="success-icon">✓</span>
                  <div className="success-content">
                    <strong>Message envoyé !</strong>
                    <p>Le vendeur vous contactera sous peu.</p>
                  </div>
                </div>
              )}
              
              <div className="vendeur-info-modern">
                <div className="vendeur-item">
                  <span className="vendeur-icon">👤</span>
                  <div className="vendeur-details">
                    <div className="vendeur-label">Vendeur</div>
                    <div className="vendeur-value">{voiture.concessionnaire}</div>
                  </div>
                </div>
                
                <div className="vendeur-item">
                  <span className="vendeur-icon">📍</span>
                  <div className="vendeur-details">
                    <div className="vendeur-label">Adresse</div>
                    <div className="vendeur-value">{voiture.localisation}</div>
                  </div>
                </div>
                
                <div className="vendeur-item">
                  <span className="vendeur-icon">📞</span>
                  <div className="vendeur-details">
                    <div className="vendeur-label">Téléphone</div>
                    <div className="vendeur-value">{voiture.telephone}</div>
                  </div>
                </div>
              </div>
              
              <div className="contact-form-sidebar">
                <div className="form-group-sidebar">
                  <label htmlFor="message">Votre message</label>
                  <textarea
                    id="message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Bonjour, je suis intéressé par cette voiture. Pourriez-vous me donner plus d'informations sur..."
                    rows="5"
                    className="form-textarea-sidebar"
                  />
                </div>
                
                <button 
                  onClick={contacterVendeur} 
                  className="btn btn-primary btn-full"
                  disabled={!contactMessage.trim()}
                >
                  <span className="btn-icon">✈️</span>
                  <span>Envoyer message</span>
                </button>
              </div>
            </div>
            
            {/* Infos supplémentaires */}
            <div className="info-card-modern">
              <h4 className="info-title">Informations importantes</h4>
              <ul className="info-list">
                <li> Voiture neuve garantie</li>
                <li> Contrôle technique inclus</li>
                <li> Livraison disponible</li>
                <li> Financement possible</li>
                <li> Essai gratuit</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default DetailVoiture;