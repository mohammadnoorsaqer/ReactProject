import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./TvShowDetails.css";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);

  // Function to add show to watchlist
  const addToWatchlist = (showId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add shows to your watchlist.",
      });
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/watchlist",
        { show_id: showId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Added to Watchlist!",
          text: `${show.title} has been added to your watchlist.`,
        });
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to add",
          text: "There was an issue adding the show to your watchlist. Please try again.",
        });
      });
  };

  // Open trailer popup
  const openTrailerPopup = () => {
    if (show.video_url) {
      setShowTrailerPopup(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "No Trailer Available",
        text: "Sorry, no trailer is available for this show.",
      });
    }
  };

  // Close trailer popup
  const closeTrailerPopup = () => {
    setShowTrailerPopup(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
        setError(error.response?.data?.error || "Failed to load show details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="show-details-loading">
        <div className="spinner"></div>
        <p>Loading show details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="show-details-error">Error: {error}</div>;
  }

  if (!show) {
    return <div className="show-details-error">No show found.</div>;
  }

  return (
    <div className="show-details-container">
      <div
        className="show-details-header"
        style={{
          backgroundImage: `url(${show.background_image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="show-details-content">
          <div className="show-poster-container">
            <img
              className="show-poster"
              src={
                show.image_url ||
                "https://via.placeholder.com/350x525?text=No+Image"
              }
              alt={show.title || "No Title"}
            />
          </div>

          <div className="show-info-container">
            <div className="show-info">
              <h1 className="show-title">{show.title || "Untitled"}</h1>

              <div className="show-details-meta">
              <>
  <span className="text-white">{show.release_date || "TBA"}</span>
  <span className="text-white"> • </span>
  <span className="text-white">
    {show.genres && show.genres.length > 0
      ? show.genres.map((genre, index) => (
          <span key={genre.id} className="text-white">
            {genre.name}
            {index < show.genres.length - 1 && ", "}
          </span>
        ))
      : ""}
  </span>
</>

  {show.rating && <span className="show-rating">{show.rating}/10</span>}
</div>

              

              <p className="show-description">
                {show.description || "No description available."}
              </p>

              <div className="show-action-buttons">
                <button className="btn-play" onClick={openTrailerPopup}>
                  <i className="play-icon">▶</i> Play
                </button>
                <button
                  className="btn-watchlist"
                  onClick={() => addToWatchlist(show.id)}
                >
                  + Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Popup */}
      {showTrailerPopup && (
        <div className="trailer-popup">
          <div className="trailer-popup-content">
            <button className="trailer-close-btn" onClick={closeTrailerPopup}>
              &times;
            </button>
            <iframe
              src={show.video_url}
              title="Trailer"
              className="trailer-popup-iframe"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
