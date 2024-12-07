import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to add movie to watchlist
  const addToWatchlist = (movieId) => {
    const token = localStorage.getItem("auth_token"); // Assuming you store the token in localStorage
  
    if (!token) {
      alert("Please login to add movies to your watchlist.");
      return;
    }
  
    axios
      .post(
        'http://localhost:8000/api/watchlist', 
        { movie_id: movieId },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the headers
          }
        }
      )
      .then((response) => {
        alert("Added to Watchlist!");
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
        alert("Failed to add to watchlist.");
      });
  };
  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setError(error.response?.data?.error || "Failed to load movie details.");
        setLoading(false);
      });
  }, [id]);

  // Generate a gradient background dynamically
  const generateDynamicBackground = () => {
    const colors = [
      "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
      "linear-gradient(135deg, #000428, #004e92)",
      "linear-gradient(135deg, #3494e6, #ec6ead)",
      "linear-gradient(135deg, #41295a, #2F0743)",
      "linear-gradient(135deg, #0F2027, #203A43, #2c5364)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="movie-details-error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="movie-details-error">No movie found.</div>;
  }

  return (
    <div className="movie-details-container">
      <div
        className="movie-details-header"
        style={{
          background: movie.background_image
            ? `url(${movie.background_image})`
            : generateDynamicBackground(),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          className="movie-poster"
          src={movie.image_url || "https://via.placeholder.com/350x525?text=No+Image"}
          alt={movie.title || "No Title"}
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title || "Untitled"}</h1>

          <div className="movie-details-meta">
            <span>{movie.release_date || "TBA"}</span>
            <span>•</span>
            <span>{movie.genre || "Unknown Genre"}</span>
            {movie.rating && <span className="movie-rating">{movie.rating}/10</span>}
          </div>

          <p className="movie-description">{movie.description || "No description available."}</p>

          <div className="movie-action-buttons">
            <button className="btn-play">
              <i className="play-icon">▶</i> Play
            </button>
            <button className="btn-more-info">More Info</button>
            <button className="btn-watchlist" onClick={() => addToWatchlist(movie.id)}>
              + Watchlist
            </button>
          </div>
        </div>
      </div>

      {movie.video_url && (
        <div className="movie-video-section" style={{ marginBottom: "50px" }}>
          <iframe
            src={movie.video_url.replace("watch?v=", "embed/")}
            title="Trailer"
            className="movie-trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
