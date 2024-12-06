import React, { useState } from 'react';
import './Subscriptions.css';

const Subscriptions = () => {
  const [error, setError] = useState("");

  const isLoggedIn = !!localStorage.getItem("authToken");

  const bookSubscription = (subscriptionType) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    alert(`Booking ${subscriptionType} subscription...`);
  };

  const renderFeatures = (features, hasFeature) => {
    const totalFeatures = 10; // Ensure consistent number of list items
    return Array.from({ length: totalFeatures }, (_, index) => {
      if (index < features.length) {
        return features[index];
      }
      return hasFeature ? '✓ Additional Benefit' : '✗ Not Available';
    });
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
              {renderFeatures([
                '✓ Limited Ads',
                '✓ HD Streaming',
                '✓ Base Catalog Access',
                '✓ 2 Simultaneous Streams',
                '✓ Local Channels'
              ], true).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <button 
            className="subscribe-btn" 
            onClick={() => bookSubscription("Basic")}
          >
            Get Basic Plan
          </button>
        </div>

        <div className="subscription-card premium">
          <div className="plan-header">
            <h2>Premium</h2>
            <span className="price">$19.99 / month</span>
            <div className="best-value">Best Value</div>
          </div>
          <div className="plan-features">
            <ul>
              {renderFeatures([
                '✓ No Ads',
                '✓ 4K UHD Streaming',
                '✓ Full Catalog Access',
                '✓ 4 Simultaneous Streams',
                '✓ Local & Sports Channels',
                '✓ Exclusive Originals',
                '✓ Offline Downloads'
              ], true).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <button 
            className="subscribe-btn" 
            onClick={() => bookSubscription("Premium")}
          >
            Get Premium Plan
          </button>
        </div>

        <div className="subscription-card ultimate">
          <div className="plan-header">
            <h2>Ultimate</h2>
            <span className="price">$29.99 / month</span>
            <div className="best-value">Top Tier</div>
          </div>
          <div className="plan-features">
            <ul>
              {renderFeatures([
                '✓ Completely Ad-Free',
                '✓ 8K Ultra Streaming',
                '✓ Ultimate Catalog Access',
                '✓ Unlimited Streams',
                '✓ All Channels Included',
                '✓ Max Exclusive Content',
                '✓ Offline Downloads',
                '✓ Global Content Library',
                '✓ Priority Customer Support'
              ], true).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <button 
            className="subscribe-btn" 
            onClick={() => bookSubscription("Ultimate")}
          >
            Get Ultimate Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;