import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        setWatchlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  }, [token]);

  const handleRemoveFromWatchlist = (movieId) => {
    Swal.fire({
      title: 'Remove from Watchlist?',
      text: 'Are you sure you want to delete this movie?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00ff41',
      cancelButtonColor: '#121212',
      confirmButtonText: 'Delete',
      background: '#121212',
      color: '#00ff41',
      borderColor: '#00ff41',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8000/api/watchlist/${movieId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            // Remove the movie from the watchlist locally
            setWatchlist(watchlist.filter((movie) => movie.id !== movieId));

            Swal.fire({
              title: 'Deleted!',
              text: 'Movie removed from your watchlist.',
              icon: 'success',
              confirmButtonColor: '#00ff41',
              background: '#121212',
              color: '#00ff41',
            });
          }
        } catch (error) {
          console.error("Error removing from watchlist:", error);
          Swal.fire({
            title: 'Error!',
            text: 'Could not remove movie.',
            icon: 'error',
            confirmButtonColor: '#00ff41',
            background: '#121212',
            color: '#00ff41',
          });
        }
      }
    });
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#00ff41',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'monospace'
    }}>
      <h1 style={{
        textAlign: 'center', 
        fontSize: '3rem', 
        marginBottom: '40px'
      }}>
        CYBER WATCHLIST
      </h1>

      {watchlist.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {watchlist.map((item) => {
            const imageUrl = item.movie.image_url || "https://via.placeholder.com/250x400"; // Fallback image URL
            return (
              <div 
                key={item.id} 
                style={{
                  backgroundColor: '#1E1E1E',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '2px solid #00ff41',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div 
                  style={{
                    height: '400px',
                    backgroundImage: `url(${imageUrl})`, // Use fallback image if missing
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <button 
                    onClick={() => handleRemoveFromWatchlist(item.id)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      backgroundColor: 'rgba(0,255,65,0.2)',
                      color: '#00ff41',
                      border: '2px solid #00ff41',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#1E1E1E'
                }}>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    fontSize: '1.5rem',
                    color: '#00ff41'
                  }}>
                    {item.movie.title}
                  </h3>
                  <p style={{
                    margin: '0 0 15px 0',
                    color: '#00ff41',
                    opacity: 0.7
                  }}>
                    {item.movie.description.length > 120 
                      ? item.movie.description.substring(0, 120) + '...' 
                      : item.movie.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#00ff41',
                    opacity: 0.8
                  }}>
                    <span>{item.movie.genre || "UNKNOWN"}</span>
                    <span>🌟 {item.movie.rating || "N/A"}/10</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          color: '#00ff41',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '2rem' }}>
            WATCHLIST PROTOCOL: EMPTY
          </p>
          <p>INITIATE MOVIE ACQUISITION</p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
