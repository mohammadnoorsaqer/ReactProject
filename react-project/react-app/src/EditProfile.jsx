import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = ({ userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // تحميل البيانات عند بداية تحميل المكون
    useEffect(() => {
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

    // تحديث البيانات في الفورم
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // إرسال البيانات إلى الخادم
    const handleSubmit = async (e) => {
        e.preventDefault(); // منع إرسال النموذج بشكل تقليدي
    
        // التحقق من وجود كلمة مرور جديدة
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setSuccessMessage('');
            return;
        }
    
        // التحقق من أن كلمة المرور الجديدة تحتوي على 8 أحرف على الأقل
        if (formData.newPassword && formData.newPassword.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            setSuccessMessage('');
            return;
        }
    
        const formDataToSend = {
            name: formData.name,
            email: formData.email,
            password: formData.newPassword || undefined, // إرسال كلمة المرور الجديدة إذا كانت موجودة
        };
    
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${userId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // إذا كان التحديث ناجحًا
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
        } catch (error) {
            // إذا كان هناك خطأ أثناء إرسال البيانات
            console.error('Error response:', error.response);
            setErrorMessage(error.response?.data?.message || 'Failed to update profile. Please try again.');
            setSuccessMessage('');
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="text-center text-white">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="p-4 bg-dark text-white rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* إضافة حقول كلمة المرور */}
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                
                <button type="submit" className="btn btn-danger w-100">Update Profile</button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default EditProfile;
