import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('education');

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop:           { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    tablet:            { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile:            { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const education = [
    {
      title: "Singapore University of Technology and Design",
      desc: "Design & Artificial Intelligence",
      year: "2021 - 2026",
      icon: "🎓",    },
  ];

  const experience = [
    {
      title: "AI Automation Engineer Intern",
      company: "CyberG7",
      desc: "Automate Business Process and Marketing",
      year: "2024",
      icon: "🤖",    },
    {
      title: "AI Engineer",
      company: "TiltGuard",
      desc: "Startup",
      year: "Present",
      icon: "🚀",
    },
    {
      title: "AI Engineer Intern",
      company: "FPT SOFTWARE",
      desc: "AutoInspectAI with Hyundai Kefico",
      year: "Present",
      icon: "👁️",    },
  ];

  const skills = [
    { name: "Python", level: 100, icon: "🐍" },
    { name: "React", level: 85, icon: "⚛️" },
    { name: "Machine Learning", level: 88, icon: "🧠" },
    { name: "PyTorch", level: 82, icon: "🔥" },
    { name: "JavaScript", level: 80, icon: "💛" },
    { name: "Computer Vision", level: 85, icon: "👁️" },
    { name: "Retrieval-Augmented Generation", level: 85, icon: "📚" },
    { name: "Web Development", level: 85, icon: "🌐" },
  ];

  const renderEducationCards = (items) =>
    items.map((item, index) => (
      <div key={index} className="experience-card education-card">
        <div className="card-icon">{item.icon}</div>
        <div className="card-content">
          <div className="card-year">{item.year}</div>
          <h3 className="card-title">{item.title}</h3>
          <p className="card-desc">{item.desc}</p>
          <p className="card-details">{item.details}</p>
        </div>
      </div>
    ));

  const renderExperienceCards = (items) =>
    items.map((item, index) => (
      <div key={index} className="experience-card">
        <div className="card-icon">{item.icon}</div>
        <div className="card-content">
          <div className="card-year">{item.year}</div>
          <h3 className="card-title">{item.title}</h3>
          <div className="card-company">{item.company}</div>
          <p className="card-desc">{item.desc}</p>
          <p className="card-details">{item.details}</p>
        </div>
      </div>
    ));

const renderSkillBars = () =>
  skills.map((skill, index) => (
    <div key={index} className="skill-item">
      <div className="skill-header">
        <span className="skill-icon">{skill.icon}</span>
        <span className="skill-name">{skill.name}</span>
      </div>
    </div>
  ));

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Explore my educational background, professional experience, and technical expertise
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <span className="tab-icon">🎓</span>
            Education
          </button>
          <button 
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <span className="tab-icon">💼</span>
            Experience
          </button>
          <button 
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <span className="tab-icon">⚡</span>
            Skills
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === 'education' && (
            <div className="content-section">
              <div className="cards-container">
                {renderEducationCards(education)}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="content-section">
              <div className="cards-container">
                {renderExperienceCards(experience)}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="content-section skills-grid">
              <div className="skills-list">
                {renderSkillBars()}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};