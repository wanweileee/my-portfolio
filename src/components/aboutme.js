import React from 'react';
import profileImage from '../assets/profile.jpg'; // replace with your image path

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="about-me-image">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="about-me-text">
        <p>I'm Wan Wei!</p>
        <p>I’m an aspiring AI Engineer</p>
      </div>
    </div>
  );
}

export default AboutMe;
