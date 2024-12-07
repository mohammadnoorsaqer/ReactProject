import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfilePicture = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file)); // عرض الصورة قبل الرفع
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
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            alert('Profile picture updated successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert('Failed to update profile picture.');
        }
    };

    return (
        <div className="container mt-4">
            <h3>Update Profile Picture</h3>
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
        </div>
    );
};

export default UpdateProfilePicture;
