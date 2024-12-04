import "./MainSection.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainSection = () => {
  const [movies, setMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [huluOriginals, setHuluOriginals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for better error handling
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    // Fetch data from the Laravel API
    Promise.all([
      axios.get('http://localhost:8000/api/movies'),
      axios.get('http://localhost:8000/api/popular-tv'),
      axios.get('http://localhost:8000/api/trending-tv'),
      axios.get('http://localhost:8000/api/hulu-originals'),
    ])
    .then(([moviesResponse, popularTvResponse, trendingTvResponse, huluOriginalsResponse]) => {
      if (moviesResponse.data.movies) {
        setMovies(moviesResponse.data.movies);
      }
      if (popularTvResponse.data.tv_shows) {
        setPopularTv(popularTvResponse.data.tv_shows);
      }
      if (trendingTvResponse.data.tv_shows) {
        setTrendingTv(trendingTvResponse.data.tv_shows);
      }
      if (huluOriginalsResponse.data.tv_shows) {
        setHuluOriginals(huluOriginalsResponse.data.tv_shows);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error('There was an error fetching the data!', error);
      setError(error.response?.data?.error || 'Failed to fetch data');
      setLoading(false);
    });
  }, []);

  const renderCover = (item) => {
    const imageUrl = item.poster_path
      ? `${imageBaseUrl}${item.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image

    return (
      <div key={item.id} className="cover-item">
        <img 
          src={imageUrl} 
          alt={item.title || item.name} 
          className="cover-image"
        />
        <div className="cover-overlay">
          <div className="cover-title">{item.title || item.name}</div>
          <h3 className="cover-subtitle">{item.original_title || item.original_name}</h3>
        </div>
      </div>
    );
  };

  return (
    <main className="main-content">
      {/* Movies Section */}
      <section className="categories">
        <h4>Movies</h4>
        <div className="content-wrapper">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p> {/* Display error message if there is an error */}
            </div>
          ) : (
            <div className="content-section">
              <h3>Movies</h3>
              <div className="cover-container">
                {movies.map((movie) => renderCover(movie))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular TV Shows Section */}
      <section className="categories">
        <h4>Popular TV Shows</h4>
        <div className="content-wrapper">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            <div className="content-section">
              <h3>Popular TV Shows</h3>
              <div className="cover-container">
                {popularTv.map((show) => renderCover(show))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trending TV Shows Section */}
      <section className="categories">
        <h4>Trending TV Shows</h4>
        <div className="content-wrapper">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            <div className="content-section">
              <h3>Trending TV Shows</h3>
              <div className="cover-container">
                {trendingTv.map((show) => renderCover(show))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hulu Originals Section */}
      <section className="categories">
        <h4>Hulu Originals</h4>
        <div className="content-wrapper">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            <div className="content-section">
              <h3>Hulu Originals</h3>
              <div className="cover-container">
                {huluOriginals.map((show) => renderCover(show))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MainSection;
