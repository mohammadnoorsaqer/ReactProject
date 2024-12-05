import "./MainSection.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const MainSection = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);  // New state for TV shows
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingShows, setLoadingShows] = useState(true);
  const [errorMovies, setErrorMovies] = useState(null); // Error state for movies
  const [errorShows, setErrorShows] = useState(null); // Error state for shows

  useEffect(() => {
    // Fetch movies data from the Laravel API
    axios.get('http://localhost:8000/api/movies')
      .then(response => {
        setMovies(response.data);
        setLoadingMovies(false);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
        setErrorMovies(error.response?.data?.error || 'Failed to fetch movies');
        setLoadingMovies(false);
      });

    // Fetch TV shows data from the Laravel API
    axios.get('http://localhost:8000/api/shows')
      .then(response => {
        setShows(response.data);
        setLoadingShows(false);
      })
      .catch(error => {
        console.error('There was an error fetching the shows!', error);
        setErrorShows(error.response?.data?.error || 'Failed to fetch TV shows');
        setLoadingShows(false);
      });
  }, []);

  const renderCover = (item, isMovie = true) => {
    // Image path will be based on the public folder in React
    const imageUrl = item.image_url
      ? `${item.image_url}` // Directly access image from /public/images/
      : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image

    return (
      <div key={item.id} className="cover-item">
        {/* Link to Item Details page */}
        <Link to={`/${isMovie ? 'movie' : 'show'}/${item.id}`}>
          <img 
            src={imageUrl} 
            alt={item.title || "No Title"} // Fallback for missing title
            className="cover-image"
          />
          <div className="cover-overlay">
            <div className="cover-title">{item.title || 'Untitled'}</div>
            <h3 className="cover-subtitle">{item.release_date || 'Release Date Unknown'}</h3>
          </div>
        </Link>

        {/* Video URL - Display a link or button */}
        {item.video_url && (
          <div className="video-link">
            <a href={item.video_url} target="_blank" rel="noopener noreferrer">
              <button className="watch-video-button">Watch Video</button>
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="main-content">
      {/* Movies Section */}
      <section className="categories">
        <h4>Movies</h4>
        <div className="content-wrapper">
          {loadingMovies ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading movies...</p>
            </div>
          ) : errorMovies ? (
            <div className="error-message">
              <p>{errorMovies}</p>
            </div>
          ) : (
            <div className="content-section">
              <h3>Movies</h3>
              <div className="cover-container">
                {movies.length > 0 ? (
                  movies.map((movie) => renderCover(movie, true))
                ) : (
                  <p>No movies available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TV Shows Section */}
      <section className="categories">
        <h4>TV Shows</h4>
        <div className="content-wrapper">
          {loadingShows ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading TV shows...</p>
            </div>
          ) : errorShows ? (
            <div className="error-message">
              <p>{errorShows}</p>
            </div>
          ) : (
            <div className="content-section">
              <h3>TV Shows</h3>
              <div className="cover-container">
                {shows.length > 0 ? (
                  shows.map((show) => renderCover(show, false))
                ) : (
                  <p>No TV shows available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MainSection;
