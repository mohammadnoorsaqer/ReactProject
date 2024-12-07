import "./MainSection.css";
import './SearchBar.css'; // New search bar styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const MainSection = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingShows, setLoadingShows] = useState(true);
  const [errorMovies, setErrorMovies] = useState(null);
  const [errorShows, setErrorShows] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('movies');
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  useEffect(() => {
    // Fetch movies data from the Laravel API with optional search term
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          params: { search: searchTerm } // Send the search term as a query parameter
        });
        setMovies(response.data);
        setLoadingMovies(false);
      } catch (error) {
        setErrorMovies(error.response?.data?.error || 'Failed to fetch movies');
        setLoadingMovies(false);
      }
    };

    // Fetch TV shows data from the Laravel API with optional search term
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/shows', {
          params: { search: searchTerm } // Send the search term as a query parameter
        });
        setShows(response.data);
        setLoadingShows(false);
      } catch (error) {
        setErrorShows(error.response?.data?.error || 'Failed to fetch TV shows');
        setLoadingShows(false);
      }
    };

    fetchMovies(); // Fetch movies whenever the search term changes
    fetchShows(); // Fetch shows whenever the search term changes
  }, [searchTerm]); // Trigger useEffect when the search term changes

  const renderCover = (item, isMovie = true) => {
    const imageUrl = item.image_url
      ? `${item.image_url}` 
      : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
      <div key={item.id} className="cover-item">
        <Link to={`/${isMovie ? 'movie' : 'show'}/${item.id}`}>
          <img 
            src={imageUrl} 
            alt={item.title || "No Title"} 
            className="cover-image"
          />
          <div className="cover-overlay">
            <div className="cover-title">{item.title || 'Untitled'}</div>
            <h3 className="cover-subtitle">{item.release_date || 'Release Date Unknown'}</h3>
          </div>
        </Link>

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term
  };

  return (
    <main className="main-content">
      <section className="categories">
        <div className="category-buttons">
          <button 
            className={`category-button ${selectedCategory === 'movies' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('movies')}
          >
            Movies
          </button>
          <button 
            className={`category-button ${selectedCategory === 'shows' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('shows')}
          >
            TV Shows
          </button>
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search movies and TV shows..."
            value={searchTerm}
            onChange={handleSearchChange} // Handle search input change
          />
        </div>

        <div className="content-wrapper">
          {selectedCategory === 'movies' ? (
            <div className="content-section">
              <h3>Movies</h3>
              <div className="cover-container">
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
                  movies.length > 0 ? (
                    movies.map((movie) => renderCover(movie, true))
                  ) : (
                    <p>No movies available.</p>
                  )
                )}
              </div>
            </div>
          ) : selectedCategory === 'shows' ? (
            <div className="content-section">
              <h3>TV Shows</h3>
              <div className="cover-container">
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
                  shows.length > 0 ? (
                    shows.map((show) => renderCover(show, false))
                  ) : (
                    <p>No TV shows available.</p>
                  )
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default MainSection;
