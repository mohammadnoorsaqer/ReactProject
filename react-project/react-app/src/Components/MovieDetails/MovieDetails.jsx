import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./MovieDetails.css";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../NavBar/NavBar.jsx";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);

  // Function to add movie to watchlist with SweetAlert
  const addToWatchlist = (movieId, isPremium = false) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add movies to your watchlist.",
      });
      return;
    }

    // Adjust the data to send the right movie type (regular or premium)
    const data = isPremium ? { premium_movie_id: movieId } : { movie_id: movieId };

    axios
      .post("http://localhost:8000/api/watchlist", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Added to Watchlist!",
          text: `${movie.title} has been added to your watchlist.`,
        });
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to add",
          text: "There was an issue adding the movie to your watchlist. Please try again.",
        });
      });
  };

  // Open trailer popup
  const openTrailerPopup = () => {
    if (movie.video_url) {
      setShowTrailerPopup(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "No Trailer Available",
        text: "Sorry, no trailer is available for this movie.",
      });
    }
  };

  // Close trailer popup
  const closeTrailerPopup = () => {
    setShowTrailerPopup(false);
  };

  useEffect(() => {
    // Fetching regular movie details first
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        // If fetching regular movie details fails, try fetching premium movie details
        axios
          .get(`http://localhost:8000/api/premium-movies/${id}`)
          .then((response) => {
            setMovie(response.data);
            setLoading(false);
            // Flag this movie as premium if it's found in the premium-movies endpoint
            setMovie((prevMovie) => ({ ...prevMovie, isPremium: true }));
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error);
            setError(error.response?.data?.error || "Failed to load movie details.");
            setLoading(false);
          });
      });
  }, [id]);

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
      <Navbar />
      <div
        className="movie-details-header"
        style={{
          backgroundImage: `url(${movie.background_image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="movie-details-content">
          <div className="movie-poster-container">
            <img
              className="movie-poster"
              src={movie.image_url || "https://via.placeholder.com/350x525?text=No+Image"}
              alt={movie.title || "No Title"}
            />
          </div>

          <div className="movie-info-container">
            <div className="movie-info">
              <h1 className="movie-title">{movie.title || "Untitled"}</h1>

              <>
  <span>{movie.release_date || "TBA"}</span>
  <span> • </span>
  <span>
    {movie.genres && movie.genres.length > 0
      ? movie.genres.map((genre, index) => (
          <span key={genre.id}>
            {genre.name}
            {index < movie.genres.length - 1 && ", "}
          </span>
        ))
      : ""}
  </span>
</>

              <p className="movie-description">{movie.description || "No description available."}</p>

              <div className="movie-action-buttons">
                <button className="btn-play" onClick={openTrailerPopup}>
                  <i className="play-icon">▶</i> Play
                </button>
                <button className="btn-watchlist" onClick={() => addToWatchlist(movie.id, movie.isPremium)}>
                  + Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Popup */}
      {showTrailerPopup && movie.video_url && (
        <div className="trailer-popup">
          <div className="trailer-popup-content">
            <button className="trailer-close-btn" onClick={closeTrailerPopup}>
              &times;
            </button>
            <iframe
              src={movie.video_url.replace("watch?v=", "embed/")}
              title="Trailer"
              className="trailer-popup-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MovieDetails;
