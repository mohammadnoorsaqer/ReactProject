// Watchlist.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/watchlist")
      .then((response) => {
        setWatchlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  }, []);

  return (
    <div className="watchlist-container">
      <h1>Your Watchlist</h1>
      <ul>
        {watchlist.map((item) => (
          <li key={item.id}>
            <h3>{item.movie.title}</h3>
            <p>{item.movie.description}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
