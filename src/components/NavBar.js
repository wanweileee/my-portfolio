import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import navIcon1 from '../assets/nav-icon1.svg';
import navIcon2 from '../assets/nav-icon2.svg';
import { HashLink } from 'react-router-hash-link';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Container>
        <Navbar.Brand href="#home">
          {/* You can add a logo here if you want */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={HashLink}
              smooth
              to="#home"
              className={`nav-link navbar-link ${activeLink === 'home' ? "active" : ""}`}
              onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="#skills"
              className={`nav-link navbar-link ${activeLink === 'skills' ? "active" : ""}`}
              onClick={() => onUpdateActiveLink('skills')}
            >
              About Me
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="#projects"
              className={`nav-link navbar-link ${activeLink === 'projects' ? "active" : ""}`}
              onClick={() => onUpdateActiveLink('projects')}
            >
              Projects
            </Nav.Link>
          </Nav>

          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/leewanwei" target="_blank" rel="noopener noreferrer">
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a href="https://github.com/wanweileee" target="_blank" rel="noopener noreferrer">
                <img src={navIcon2} alt="GitHub" />
              </a>
            </div>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
