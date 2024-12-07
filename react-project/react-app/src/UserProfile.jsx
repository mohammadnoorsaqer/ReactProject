import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch a single user (replace the ID with a dynamic value as needed)
        axios.get('http://localhost:8000/api/users/1')
            .then((response) => setUser(response.data))
            .catch((error) => console.error('Error fetching user:', error));
    }, []);

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-white">
                <div className="card-header text-center">
                    <h1>Welcome, {user.name}</h1>
                    
                    <p className="text-muted">Your Netflix Dashboard</p>
                </div>
                <div className="card-body text-center">
                <img
  src={`http://localhost:8000${user.avatar}`} // تأكد من أن المسار يبدأ بـ "http://localhost:8000"
  alt={`${user.name}'s Avatar`}
  className="rounded-circle mb-4"
  style={{ width: '150px', height: '150px', border: '3px solid #e50914' }}
/>


                    <h2>{user.name}</h2>
                <p>{user.email}</p>
                    <p className="text-muted">{user.email}</p>
                    
                </div>

                <div className="card-footer d-flex flex-column gap-3">
                    <Link to="/profile/edit" className="btn btn-secondary btn-lg">Edit Profile</Link>
                    <Link to="/profile/update-picture" className="btn btn-outline-danger btn-lg">Update Picture</Link> {/* Button to update picture */}
                    <Link to="/" className="btn btn-outline-light btn-lg">Log Out</Link> {/* Button to update picture */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
