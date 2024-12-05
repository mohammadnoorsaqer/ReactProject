import "./MainSection.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const MainSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for better error handling
  const imageBaseUrl = '';

  useEffect(() => {
    // Fetch movies data from the Laravel API
    axios.get('http://localhost:8000/api/movies')
      .then(response => {
        // Assuming the response contains the movie data in a `data` field
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError(error.response?.data?.error || 'Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const renderCover = (movie) => {
    const imageUrl = movie.image_url
      ? `${imageBaseUrl}${movie.image_url}` // Assuming the backend provides the image URL
      : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image

    return (
      <div key={movie.id} className="cover-item">
        {/* Link to MovieDetails page */}
        <Link to={`/movie/${movie.id}`}>
          <img 
            src={imageUrl} 
            alt={movie.title || "No Title"} // Fallback for missing title
            className="cover-image"
          />
          <div className="cover-overlay">
            <div className="cover-title">{movie.title || 'Untitled'}</div>
            <h3 className="cover-subtitle">{movie.release_date || 'Release Date Unknown'}</h3>
          </div>
        </Link>

        {/* Video URL - Display a link or button */}
        {movie.video_url && (
          <div className="video-link">
            <a href={movie.video_url} target="_blank" rel="noopener noreferrer">
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
                {movies.length > 0 ? (
                  movies.map((movie) => renderCover(movie))
                ) : (
                  <p>No movies available.</p> // Handle empty movie list
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
