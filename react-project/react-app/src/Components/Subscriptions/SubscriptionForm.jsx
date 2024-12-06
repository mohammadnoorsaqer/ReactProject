import React, { useState } from "react";
import axios from "axios";

const SubscriptionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    plan_name: "",
    price: "",
    started_at: "",
    expires_at: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/subscriptions", formData)
      .then(() => {
        alert("Subscription added!");
        onSuccess(); // Trigger re-fetch of subscriptions
      })
      .catch((err) => {
        alert("Failed to add subscription");
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="user_id"
        placeholder="User ID"
        value={formData.user_id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="plan_name"
        placeholder="Plan Name"
        value={formData.plan_name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="date"
        name="started_at"
        value={formData.started_at}
        onChange={handleChange}
      />
      <input
        type="date"
        name="expires_at"
        value={formData.expires_at}
        onChange={handleChange}
      />
      <button type="submit">Add Subscription</button>
    </form>
  );
};

export default SubscriptionForm;
