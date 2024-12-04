import "./MainSection.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainSection = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [huluOriginals, setHuluOriginals] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    axios
      .get('/api/movies')
      .then((response) => {
        setMovies(response.data.movies);
        setTvShows(response.data.tv_shows);
        setHuluOriginals(response.data.hulu_originals);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error.response);
        setLoading(false);
      });
  }, []);

  const renderCover = (item) => {
    const imageUrl = item.poster_path
      ? `${imageBaseUrl}${item.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'; // Provide a placeholder image URL

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
      {/* Sub Header Section */}
      <section className="sub-header">
        <div className="sub-header-content">
          <img
            src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/logos.png?raw=true"
            alt="Hulu"
            className="hulu-logo"
          />
          <div className="header-text">
            <h4>Bundle with any Hulu plan & save</h4>
            <h3>Get Hulu, Disney+, and ESPN+.</h3>
            <a href="#" className="details-link">Details</a>
          </div>
        </div>
        <div className="header-actions">
          <a href="#" className="btn-get-bundle">Get Bundle</a>
          <a href="#" className="terms-link">Terms apply</a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h4>Included in all plans</h4>
        <div className="categories-title">All the TV You Love</div>
        <div className="categories-description">
          Stream full seasons of exclusive series, current-season episodes, hit
          movies, Hulu Originals, kids shows, and more.
        </div>

        <div className="content-wrapper">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {/* Movies Section */}
              <div className="content-section">
                <h3>Movies</h3>
                <div className="cover-container">
                  {movies.map(renderCover)}
                </div>
              </div>

              {/* TV Shows Section */}
              <div className="content-section">
                <h3>TV Shows</h3>
                <div className="cover-container">
                  {tvShows.map(renderCover)}
                </div>
              </div>

              {/* Hulu Originals Section */}
              <div className="content-section">
                <h3>Hulu Originals</h3>
                <div className="cover-container">
                  {huluOriginals.map(renderCover)}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default MainSection;