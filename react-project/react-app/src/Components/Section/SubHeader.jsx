import React from 'react'; // Import React
import './Section.css'; // Assuming the CSS file is named App.css

const SubHeader = () => {
  return (
    <section className="sub-header">
      <img
        src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/logos.png?raw=true"
        alt="Bundle logos"
      />
      <div>
        <h4>Bundle with any Hulu plan & save</h4>
        <h3>Get Movix, Disney+, and ESPN+.</h3>
      </div>
    </section>
  );
};

export default SubHeader; // Export the component
