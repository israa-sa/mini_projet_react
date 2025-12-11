import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import voituresData from '../data/voitures';

function ListeDeVoitures() {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtres, setFiltres] = useState({
    prixMax: 250000,
    marque: '',
    carburant: '',
  });
  const [viewMode, setViewMode] = useState('grid');

  const chargerVoitures = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setVoitures(voituresData);
      
    } catch (err) {
      setError("Impossible de charger les voitures. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerVoitures();
  }, []);

  const handleFiltreChange = (name, value) => {
    setFiltres(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const voituresFiltrees = voitures.filter(voiture => {
    return (
      voiture.prix <= filtres.prixMax &&
      (filtres.marque === '' || voiture.marque === filtres.marque) &&
      (filtres.carburant === '' || voiture.carburant === filtres.carburant)
    );
  });

  const marquesUniques = [...new Set(voitures.map(v => v.marque))];
  const carburantsUniques = [...new Set(voitures.map(v => v.carburant))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Chargement de la collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Erreur de chargement</h3>
        <p className="error-message">{error}</p>
        <button 
          onClick={chargerVoitures}
          className="btn btn-primary"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="catalogue-modern">
      {/* En-tête catalogue */}
      <div className="catalogue-header-modern">
        <div className="container">
          <h1 className="catalogue-title-modern">
            Notre <span className="highlight">Collection</span>
          </h1>
          <p className="catalogue-subtitle-modern">
            Découvrez notre sélection exclusive de voitures neuves 2024
          </p>
        </div>
      </div>

      <div className="catalogue-content-modern">
        <div className="container">
          <div className="catalogue-toolbar">
            <div className="toolbar-left">
              <div className="results-count">
                <span className="count-number">{voituresFiltrees.length}</span>
                <span className="count-label">voitures trouvées</span>
              </div>
            </div>
          </div>

          <div className="catalogue-grid-modern">
            {/* Filtres */}
            <aside className="filters-sidebar-modern">
              <div className="filters-card">
                <h3 className="filters-title">
                  <span className="filter-icon">🔍</span> Filtres
                </h3>
                
                <div className="filter-group-modern">
                  <label className="filter-label-modern">
                    <span>Prix maximum</span>
                    <span className="price-value">{filtres.prixMax.toLocaleString()} DT</span>
                  </label>
                  <input 
                    type="range" 
                    min="50000"
                    max="450000"
                    step="5000"
                    value={filtres.prixMax}
                    onChange={(e) => handleFiltreChange('prixMax', Number(e.target.value))}
                    className="range-slider-modern"
                  />
                  <div className="range-labels">
                    <span>50 000 DT</span>
                    <span>450 000 DT</span>
                  </div>
                </div>

                <div className="filter-group-modern">
                  <label className="filter-label-modern">Marque</label>
                  <div className="select-wrapper">
                    <select 
                      value={filtres.marque}
                      onChange={(e) => handleFiltreChange('marque', e.target.value)}
                      className="filter-select-modern"
                    >
                      <option value="">Toutes les marques</option>
                      {marquesUniques.map(marque => (
                        <option key={marque} value={marque}>{marque}</option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                </div>

                <div className="filter-group-modern">
                  <label className="filter-label-modern">Carburant</label>
                  <div className="filter-buttons">
                    <button 
                      className={`filter-btn ${filtres.carburant === '' ? 'active' : ''}`}
                      onClick={() => handleFiltreChange('carburant', '')}
                    >
                      Tous
                    </button>
                    {carburantsUniques.map(carburant => (
                      <button
                        key={carburant}
                        className={`filter-btn ${filtres.carburant === carburant ? 'active' : ''}`}
                        onClick={() => handleFiltreChange('carburant', carburant)}
                      >
                        {carburant}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filters-actions">
                  <button 
                    onClick={() => setFiltres({ prixMax: 250000, marque: '', carburant: '' })}
                    className="btn btn-secondary btn-small"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </aside>

            {/* Liste des voitures */}
            <div className={`voitures-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
              {voituresFiltrees.length > 0 ? (
                voituresFiltrees.map(voiture => (
                  <div key={voiture.id} className="voiture-card-modern">
                    <div className="voiture-image-modern">
                      <img 
                        src={voiture.image} 
                        alt={`${voiture.marque} ${voiture.modele}`}
                        className="voiture-img"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x300/1e293b/ffffff?text=${voiture.marque}+${voiture.modele}`;
                        }}
                      />
                      <div className="image-badges">
                        <span className="badge badge-new">NEUVE</span>
                        <span className="badge badge-year">{voiture.annee}</span>
                      </div>
                      <div className="image-overlay">
                        <Link 
                          to={`/voiture/${voiture.id}`}
                          className="quick-view-btn"
                        >
                          Voir détails
                        </Link>
                      </div>
                    </div>

                    <div className="voiture-content-modern">
                      <div className="voiture-header-modern">
                        <h3 className="voiture-title">
                          {voiture.marque} <span className="model-name">{voiture.modele}</span>
                        </h3>
                        <div className="voiture-price-modern">
                          {voiture.prix.toLocaleString()} DT
                        </div>
                      </div>

                      <div className="voiture-specs-modern">
                        <div className="spec-item">
                          <span className="spec-icon">⛽</span>
                          <span className="spec-label">{voiture.carburant}</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-icon">📍</span>
                          <span className="spec-label">{voiture.localisation}</span>
                        </div>
                      </div>

                      <p className="voiture-description-modern">
                        {voiture.description.substring(0, 100)}...
                      </p>

                      <div className="voiture-actions-modern">
                        <Link 
                          to={`/voiture/${voiture.id}`}
                          className="btn btn-primary btn-full"
                        >
                          <span className="btn-icon">👁️</span>
                          <span>Voir détails</span>
                        </Link>
                        <button 
                          className="btn btn-secondary btn-icon"
                          onClick={() => window.open(`tel:${voiture.telephone}`, '_blank')}
                          title={`Appeler: ${voiture.telephone}`}
                        >
                          <span className="btn-icon">📞</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results-modern">
                  <div className="no-results-icon">🔍</div>
                  <h3 className="no-results-title">Aucune voiture trouvée</h3>
                  <p className="no-results-message">
                    Essayez d'ajuster vos filtres pour voir plus de résultats
                  </p>
                  <button 
                    onClick={() => setFiltres({ prixMax: 250000, marque: '', carburant: '' })}
                    className="btn btn-primary"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeDeVoitures;