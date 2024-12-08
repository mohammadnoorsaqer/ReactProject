import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams
import Swal from 'sweetalert2';  // Import SweetAlert2

const EditProfile = () => {
    const { userId } = useParams(); // Get the userId from the URL using useParams
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        // Fetch the user data using the userId
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((response) => {
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    newPassword: '',
                    confirmPassword: '',
                });
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check password validation
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match!',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            return;
        }

        if (formData.newPassword && formData.newPassword.length < 8) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must be at least 8 characters long.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            return;
        }

        const formDataToSend = {
            name: formData.name,
            email: formData.email,
            password: formData.newPassword || undefined,
        };

        try {
            const response = await axios.put(`http://localhost:8000/api/users/${userId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Profile updated successfully!',
                icon: 'success',
                confirmButtonText: 'Great!',
            });
        } catch (error) {
            console.error('Error response:', error.response);
            Swal.fire({
                title: 'Oops!',
                text: error.response?.data?.message || 'Failed to update profile. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

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
                    <h2>Edit Profile</h2>
                </div>
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
