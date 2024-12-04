import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/movies/${id}`);
        setMovie(response.data.movie);
        setTrailer(response.data.trailer); // Assuming API returns trailer key in `response.data.trailer`
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'white',
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'red',
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'white',
          }}
        >
          No movie details available.
        </div>
      </div>
    );
  }

  // Trailer Modal Component
  const TrailerModal = () => {
    if (!trailer) return null;

    return (
      <div className="trailer-modal">
        <div className="trailer-modal-content">
          <button
            className="trailer-close-btn"
            onClick={() => setShowTrailer(false)}
          >
            ×
          </button>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  return (
    <div className="movie-details-container">
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

      {/* Movie Background */}
      <div
        className="movie-background"
        style={{
          backgroundImage: `url(${imageBaseUrl}${movie.backdrop_path})`,
        }}
      />

      <div className="movie-details-wrapper">
        {/* Poster Section */}
        <div className="movie-poster-section">
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className="movie-poster"
          />

          <div className="movie-actions">
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

        {/* Movie Details Content */}
        <div className="movie-details-content">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="movie-meta">
            <div className="movie-meta-item">★ {movie.vote_average.toFixed(1)}/10</div>
            <div className="movie-meta-item">🕒 {movie.runtime} mins</div>
            <div className="movie-meta-item">📅 {movie.release_date}</div>
          </div>

          <div className="movie-overview">
            <h2 className="movie-overview-title">Overview</h2>
            <p>{movie.overview}</p>
          </div>

          <div className="movie-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="movie-additional-info">
            <div className="additional-info-section">
              <h3 className="additional-info-title">Production</h3>
              <ul>
                {movie.production_companies.slice(0, 3).map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>

            <div className="additional-info-section">
              <h3 className="additional-info-title">Details</h3>
              <ul>
                <li>
                  <strong>Original Title:</strong> {movie.original_title}
                </li>
                <li>
                  <strong>Language:</strong> {movie.original_language.toUpperCase()}
                </li>
                <li>
                  <strong>Status:</strong> {movie.status}
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

export default MovieDetails;
