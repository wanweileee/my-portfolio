import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import projImg1 from "../assets/project-img1.png";
import SaveSmart from "../assets/savesmart.png";
import Mosquito from "../assets/mosquito.png";
import TAP from "../assets/tap.png";
import CC from "../assets/cc.png";
import bank from "../assets/bank.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: "AI Training Simulator",
      description: "Advanced AI simulation platform with real-time training capabilities and interactive learning modules.",
      imgUrl: CC,
      category: "ai",
      tags: [
        { label: "Next.js", color: "#FFC5D3", textColor: "#2E2E2E" },
        { label: "FastAPI", color: "#F8B9C4", textColor: "#2E2E2E" },
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "Traffic Accident Hotspot Prediction",
      description: "Deep learning model to predict traffic accident hotspots using historical data and real-time analytics.",
      imgUrl: TAP,
      category: "ml",
      tags: [
        { label: "PyTorch", color: "#FFC5D3", textColor: "#2E2E2E" }
      ],
      links: [
        { label: "📂 GitHub", url: "https://github.com/wanweileee/traffic-accidents.git" }
      ]
    },
    {
      title: "SaveSmart",
      description: "Personal finance management application with smart budgeting features and expense tracking.",
      imgUrl: SaveSmart,
      category: "web",
      tags: [
        { label: "React", color: "#F8B9C4", textColor: "#2E2E2E" },
        { label: "Computer Vision", color: "#F8B9C4", textColor: "#2E2E2E" },
      ],
      links: [
        { label: "🌐 Website", url: "https://wanweileee.github.io/savesmart" }
      ]
    },
    {
      title: "Sentiment Analysis ",
      description: "Sentiment analysis tool with web scraping and advanced NLP processing.",
      imgUrl: projImg1,
      category: "ai",
      tags: [
        { label: "Web Scraping", color: "#FFC5D3", textColor: "#2E2E2E" },
        { label: "HuggingFace", color: "#F8B9C4", textColor: "#2E2E2E" },
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "Bank Account Application",
      description: "Comprehensive banking application",
      imgUrl: bank,
      category: "web",
      tags: [
        { label: "Ruby on Rails", color: "#FFC5D3", textColor: "#2E2E2E" },
      ],
      links: [
        { label: "🌐 Website", url: "https://sites.google.com/view/next-gen-ai/home" }
      ]
    },
    {
      title: "Mosquito Killer Robot",
      description: "Mosquito robot with smart monitoring",
      imgUrl: Mosquito,
      category: "design",
      links: [
        { label: "🎨 Design", url: "https://www.canva.com/design/DAGpHbnb2Yo/6SnoPQcdLuiiG7W4okd9WQ/view?utm_content=DAGpHbnb2Yo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb02cc5571f" }
      ]
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: '🎯' },
    { id: 'ai', label: 'AI & ML', icon: '🤖' },
    { id: 'web', label: 'Web Apps', icon: '💻' },
    { id: 'design', label: 'Design', icon: '🎨' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section className="projects-section" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <div className="projects-header">
                    <h2 className="projects-title">Featured Projects</h2>
                    <p className="projects-subtitle">
                      Explore my latest work in AI, web development, and product design. 
                      Each project represents a unique challenge and innovative solution.
                    </p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="projects-filter">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                        onClick={() => setFilter(category.id)}
                      >
                        <span className="filter-icon">{category.icon}</span>
                        {category.label}
                      </button>
                    ))}
                  </div>

                  {/* Projects Grid */}
                  <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                      <div 
                        key={index}
                        className="project-item"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <EnhancedProjectCard {...project} />
                      </div>
                    ))}
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Enhanced Project Card Component
const EnhancedProjectCard = ({ title, description, imgUrl, tags = [], links = [] }) => {
  return (
    <div className="enhanced-project-card">
      <div className="project-image-container">
        <img src={imgUrl} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-links">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="project-tag"
                style={{
                  backgroundColor: tag.color,
                  color: tag.textColor
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};