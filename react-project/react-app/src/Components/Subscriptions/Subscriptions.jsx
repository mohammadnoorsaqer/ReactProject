import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Subscriptions.css';

const Subscriptions = () => {
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const [subscriptionType, setSubscriptionType] = useState('');

  // Fetch subscription status when the component mounts
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      // Check if the subscription is stored in localStorage
      const storedIsSubscribed = localStorage.getItem('isSubscribed');
      const storedSubscriptionType = localStorage.getItem('subscriptionType');
      
      if (storedIsSubscribed === 'true') {
        setIsSubscribed(true);
        setSubscriptionType(storedSubscriptionType);
      } else {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/check-subscription');
          if (response.data.isSubscribed) {
            setIsSubscribed(true);
            setSubscriptionType(response.data.subscriptionType);
            localStorage.setItem('isSubscribed', true); // Save to localStorage
            localStorage.setItem('subscriptionType', response.data.subscriptionType); // Save to localStorage
          }
        } catch (error) {
          console.error('Error fetching subscription status:', error);
        }
      }
    };

    fetchSubscriptionStatus();
  }, []);

  // Subscribe to a plan
  const bookSubscription = async (type, price) => {
    if (isSubscribed) {
      Swal.fire({
        icon: 'info',
        title: 'You are already subscribed!',
        text: `You are already subscribed to the ${subscriptionType} plan.`,
      });
      return;
    }

    Swal.fire({
      title: `Confirm ${type} Subscription`,
      html: `
        <div class="payment-form">
          <input type="text" id="cardName" class="swal2-input" placeholder="Cardholder Name">
          <input type="text" id="cardNumber" class="swal2-input" placeholder="Card Number">
          <div class="card-details">
            <input type="text" id="expiry" class="swal2-input" placeholder="MM/YY">
            <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
          </div>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const cardName = document.getElementById('cardName').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardName || !cardNumber || !expiry || !cvv) {
          Swal.showValidationMessage('Please fill all payment details');
          return false;
        }

        if (!validateCardNumber(cardNumber)) {
          Swal.showValidationMessage('Invalid card number');
          return false;
        }

        if (!validateExpiry(expiry)) {
          Swal.showValidationMessage('Invalid expiration date');
          return false;
        }

        if (!validateCVV(cvv)) {
          Swal.showValidationMessage('Invalid CVV');
          return false;
        }

        return { cardName, cardNumber, expiry, cvv };
      },
      showCancelButton: true,
      confirmButtonText: 'Subscribe',
      customClass: {
        popup: 'payment-popup',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const startedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const expiresAt = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 19).replace('T', ' ');

        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api/subscribe',
            {
              plan_name: type,
              price: price,
              started_at: startedAt,
              expires_at: expiresAt,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          // Update subscription state and save it to localStorage
          setIsSubscribed(true); // Set subscription status to true
          setSubscriptionType(type); // Set the current subscription type
          localStorage.setItem('isSubscribed', true); // Save to localStorage
          localStorage.setItem('subscriptionType', type); // Save to localStorage

          Swal.fire({
            icon: 'success',
            title: 'Subscription Successful!',
            text: `${type} plan activated for $${price}/month`,
            confirmButtonText: 'Great!',
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Subscription Failed',
            text: error.response?.data?.message || 'Something went wrong',
          });
        }
      }
    });
  };

  // Cancel Subscription
  const cancelSubscription = async () => {
    const confirmed = await Swal.fire({
      title: 'Cancel Subscription',
      text: `Are you sure you want to cancel your ${subscriptionType} plan?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No, Keep It',
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/cancel-subscription',
          {
            plan_name: subscriptionType,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Update subscription state and clear localStorage
        setIsSubscribed(false); // Set subscription status to false
        setSubscriptionType(''); // Clear the subscription type
        localStorage.removeItem('isSubscribed'); // Remove from localStorage
        localStorage.removeItem('subscriptionType'); // Remove from localStorage

        Swal.fire({
          icon: 'success',
          title: 'Subscription Canceled',
          text: `Your ${subscriptionType} plan has been successfully canceled.`,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Cancellation Failed',
          text: error.response?.data?.message || 'Something went wrong',
        });
      }
    }
  };

  // Validate card number using Luhn Algorithm
  const validateCardNumber = (number) => {
    const regex = /^[0-9]{13,19}$/;
    if (!regex.test(number)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  // Validate expiration date MM/YY
  const validateExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!regex.test(expiry)) return false;
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentMonth = new Date().getMonth() + 1;
    return parseInt(year) >= parseInt(currentYear) && (parseInt(year) > parseInt(currentYear) || parseInt(month) >= currentMonth);
  };

  // Validate CVV
  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
  };

  return (
    <div className="subscriptions-container">
      <div className="subscriptions-header">
        <h1>Choose Your Streaming Plan</h1>
        <p>Customize your entertainment experience</p>
      </div>
      
      <div className="subscription-plans">
        <div className="subscription-card basic">
          <div className="plan-header">
            <h2>Basic</h2>
            <span className="price">$9.99 / month</span>
          </div>
          <div className="plan-features">
            <ul>
              <li>✓ Limited Ads</li>
              <li>✓ HD Streaming (720p)</li>
              <li>✓ Base Catalog Access</li>
              <li>✓ 2 Simultaneous Streams</li>
              <li>✓ Local Channels</li>
              <li>✓ Basic Customer Support</li>
              <li>✗ 4K Content</li>
              <li>✗ Exclusive Originals</li>
              <li>✗ Offline Downloads</li>
            </ul>
          </div>
          <button 
            className={`btn ${isSubscribed && subscriptionType === 'Basic' ? 'disabled' : ''}`}
            onClick={() => bookSubscription('Basic', 9.99)}
            disabled={isSubscribed && subscriptionType === 'Basic'}
          >
            {isSubscribed && subscriptionType === 'Basic' ? 'Already Subscribed' : 'Subscribe Now'}
          </button>
        </div>
        
        <div className="subscription-card premium">
          <div className="plan-header">
            <h2>Premium</h2>
            <span className="price">$19.99 / month</span>
          </div>
          <div className="plan-features">
            <ul>
              <li>✓ No Ads</li>
              <li>✓ 4K Streaming</li>
              <li>✓ Full Catalog Access</li>
              <li>✓ 4 Simultaneous Streams</li>
              <li>✓ Exclusive Originals</li>
              <li>✓ Offline Downloads</li>
              <li>✓ Priority Customer Support</li>
            </ul>
          </div>
          <button
            className={`btn ${isSubscribed && subscriptionType === 'Premium' ? 'disabled' : ''}`}
            onClick={() => bookSubscription('Premium', 19.99)}
            disabled={isSubscribed && subscriptionType === 'Premium'}
          >
            {isSubscribed && subscriptionType === 'Premium' ? 'Already Subscribed' : 'Subscribe Now'}
          </button>
        </div>
      </div>

      {isSubscribed && (
        <div className="subscription-status">
          <p>You are currently subscribed to the {subscriptionType} plan.</p>
          <button className="cancel-btn" onClick={cancelSubscription}>
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
