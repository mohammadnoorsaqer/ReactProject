import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TvShowDetails.css";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shows details:", error);
        setError(error.response?.data?.error || "Failed to load show details.");
        setLoading(false);
      });
  }, [id]);

  // Generate a gradient background dynamically
  const generateDynamicBackground = () => {
    const colors = [
      'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
      'linear-gradient(135deg, #000428, #004e92)',
      'linear-gradient(135deg, #3494e6, #ec6ead)',
      'linear-gradient(135deg, #41295a, #2F0743)',
      'linear-gradient(135deg, #0F2027, #203A43, #2c5364)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
          background: show.background_image 
            ? `url(${show.background_image})` 
            : generateDynamicBackground(),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <img
          className="show-poster"
          src={show.image_url || "https://via.placeholder.com/350x525?text=No+Image"}
          alt={show.title || "No Title"}
        />
        <div className="show-info">
          <h1 className="show-title">{show.title || "Untitled"}</h1>
          
          <div className="show-details-meta">
            <span>{show.release_date || "TBA"}</span>
            <span>•</span>
            <span>{show.genre || "Unknown Genre"}</span>
            {show.rating && (
              <span className="show-rating">{show.rating}/10</span>
            )}
          </div>

          <p className="show-description">
            {show.description || "No description available."}
          </p>

          <div className="show-action-buttons">
            <button className="btn-play">
              <i className="play-icon">▶</i> Play
            </button>
            <button className="btn-more-info">More Info</button>
            <button className="btn-watchlist">+ Watchlist</button>
          </div>
        </div>
      </div>

      {show.video_url && (
        <div className="show-video-section" style={{ marginBottom: '50px' }}>
          <iframe
            src={show.video_url.replace("watch?v=", "embed/")}
            title="Trailer"
            className="show-trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;