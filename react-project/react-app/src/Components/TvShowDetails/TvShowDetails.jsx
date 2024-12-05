import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TVShowDetails.css'; // Add your own styles

const TVShowDetails = () => {
  const { id } = useParams(); // Get the TV show ID from the URL
  const [tvShow, setTvShow] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tv-show/${id}`);
        setTvShow(response.data.tv_show);
        setTrailer(response.data.trailer); // Assuming API returns a trailer key in `response.data.trailer`
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch TV show details');
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="tv-show-details-container">
        <div className="loading-spinner">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tv-show-details-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!tvShow) {
    return (
      <div className="tv-show-details-container">
        <div className="no-details-message">No TV Show details available.</div>
      </div>
    );
  }

  // Trailer Modal Component
  const TrailerModal = () => {
    if (!trailer) return null;

    return (
      <div className="trailer-modal">
        <div className="trailer-modal-content">
          <button className="trailer-close-btn" onClick={() => setShowTrailer(false)}>
            ×
          </button>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="TV Show Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  return (
    <div className="tv-show-details-container">
      {/* Add trailer modal styles */}
      <style>
        {`
          .trailer-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .trailer-modal-content {
            position: relative;
            width: 80%;
            max-width: 1000px;
            background: #000;
            padding: 20px;
            border-radius: 10px;
          }

          .trailer-close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        `}
      </style>

      {/* TV Show Background */}
      <div
        className="tv-show-background"
        style={{
          backgroundImage: `url(${imageBaseUrl}${tvShow.backdrop_path})`,
        }}
      />

      <div className="tv-show-details-wrapper">
        {/* Poster Section */}
        <div className="tv-show-poster-section">
          <img
            src={
              tvShow.poster_path
                ? `${imageBaseUrl}${tvShow.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={tvShow.name}
            className="tv-show-poster"
          />

          <div className="tv-show-actions">
            <button
              className="btn btn-watch"
              onClick={() => setShowTrailer(true)}
              style={{ display: trailer ? 'block' : 'none' }}
            >
              ▶ Watch Trailer
            </button>
            <button className="btn btn-watchlist">+ Add to Watchlist</button>
          </div>
        </div>

        {/* TV Show Details Content */}
        <div className="tv-show-details-content">
          <h1 className="tv-show-title">{tvShow.name}</h1>

          <div className="tv-show-meta">
            <div className="tv-show-meta-item">★ {tvShow.vote_average.toFixed(1)}/10</div>
            <div className="tv-show-meta-item">🕒 {tvShow.episode_run_time[0]} mins</div>
            <div className="tv-show-meta-item">📅 {tvShow.first_air_date}</div>
          </div>

          <div className="tv-show-overview">
            <h2 className="tv-show-overview-title">Overview</h2>
            <p>{tvShow.overview}</p>
          </div>

          <div className="tv-show-genres">
            {tvShow.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="tv-show-additional-info">
            <div className="additional-info-section">
              <h3 className="additional-info-title">Production</h3>
              <ul>
                {tvShow.production_companies.slice(0, 3).map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>

            <div className="additional-info-section">
              <h3 className="additional-info-title">Details</h3>
              <ul>
                <li>
                  <strong>Original Title:</strong> {tvShow.original_name}
                </li>
                <li>
                  <strong>Language:</strong> {tvShow.original_language.toUpperCase()}
                </li>
                <li>
                  <strong>Status:</strong> {tvShow.status}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && <TrailerModal />}
    </div>
  );
};

export default TVShowDetails;
