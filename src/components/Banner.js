import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/kuromi.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Product Manager", "AI Engineer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about') || document.getElementById('experience');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="banner" id="home">
      <Container fluid className="h-100">
        <Row className="align-items-center justify-content-center h-100">
          <Col xs={12} md={6} xl={7} className="text-content">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1 className="main-heading">{`Hi! I'm Wan Wei`}</h1>
                  <h1 className="rotating-text">
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='["Product Manager", "AI Engineer"]'>
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p className="intro-text">
                    Passionate about creating innovative AI solutions and building products that make a difference. 
                    Welcome to my digital portfolio where technology meets creativity.
                  </p>
                  <div className="cta-buttons">
                    <a href="/Resume.pdf" download className="btn-primary">
                      Download My Resume
                    </a>
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5} className="image-content">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <div className="image-wrapper">
                    <img src={headerImg} alt="Header Img" className="hero-image" />
                    <div className="image-decoration"></div>
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={scrollToNextSection}>
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  )
}