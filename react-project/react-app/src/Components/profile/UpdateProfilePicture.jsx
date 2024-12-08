import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const UpdateProfilePicture = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        // Retrieve data from localStorage
        const currentUserData = localStorage.getItem('currentUser');
        const userToken = localStorage.getItem('token');

        if (currentUserData) {
            const currentUser = JSON.parse(currentUserData);
            setUserId(currentUser.id);
        }

        if (userToken) {
            setToken(userToken);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/users/${userId}/avatar`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Pass the token for authentication
                    },
                }
            );
            // Use SweetAlert2 for success
            Swal.fire({
                title: 'Success!',
                text: 'Profile picture updated successfully!',
                icon: 'success',
                confirmButtonText: 'Okay',
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating profile picture:', error);
            // Use SweetAlert2 for error
            Swal.fire({
                title: 'Oops!',
                text: 'Failed to update profile picture. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <div className="container mt-4">
            <h3>Update Profile Picture</h3>
            {userId && token ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {preview && (
                        <div className="mb-3">
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Upload
                    </button>
                </form>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UpdateProfilePicture;
