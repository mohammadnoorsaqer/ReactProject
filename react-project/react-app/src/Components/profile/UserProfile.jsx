import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // To handle redirection after logout

    useEffect(() => {
        const currentUserData = localStorage.getItem('currentUser');
        const userToken = localStorage.getItem('token');

        if (currentUserData) {
            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.id;

            axios
                .get(`http://localhost:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                .then((response) => setUser(response.data))
                .catch((error) => console.error('Error fetching user:', error));
        } else {
            console.error('No user data found in local storage');
        }
    }, []);

    const logout = () => {
        // Clear user data from local storage
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");

        // Remove Authorization header from axios
        delete axios.defaults.headers["Authorization"];

        // Redirect the user to the login page
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <>
            <div className="animated-background">
                <span>🎥</span>
                <span>🍿</span>
                <span>🎬</span>
                <span>🎞️</span>
                <span>📽️</span>
                <span>🎟️</span>
                <span>⭐</span>
                <span>🎭</span>
                <span>🎥</span> 
                <span>🍿</span>
                <span>🎬</span>
                <span>🎞️</span>
                <span>📽️</span>
                <span>🎟️</span> 
                <span>⭐</span>
                <span>🎭</span>
            </div>
            <div className="profile-container">
                <div className="profile-header">
                    <img 
                        src={`http://localhost:8000${user.avatar}`} 
                        alt={`${user.name}'s Avatar`} 
                        className="profile-avatar" 
                    />
                </div>
    
                <div className="text-center">
                    <h2 className="profile-name">{user.name}</h2>
                    <p className="profile-email">{user.email}</p>
                </div>
    
                <div className="profile-actions">
                    <Link 
                        to={`/profile/${user.id}/edit`} 
                        className="btn btn-outline"
                    >
                        Edit Profile
                    </Link>
                    <Link 
                        to={`/profile/${user.id}/update-picture`} 
                        className="btn btn-outline"
                    >
                        Update Picture
                    </Link>
                    <button 
                        onClick={logout} 
                        className="btn btn-logout"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
