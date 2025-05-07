import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/project-img1.png";
import SaveSmart from "../assets/savesmart.png";
import Mosquito from "../assets/mosquito.png";
import TAP from "../assets/tap.png";
import CC from "../assets/cc.png";
import bank from "../assets/bank.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "AI Training Simulator",
      description: "Design & Development",
      imgUrl: CC,
    },
    {
      title: "Traffic Accident Hotspot Prediction",
      description: "Design & Development",
      imgUrl: TAP,
    },
    {
      title: "SaveSmart",
      description: "Design & Development",
      imgUrl: SaveSmart,
    },
    {
      title: "Sentiment Analysis",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Bank Account Application",
      description: "Design & Development",
      imgUrl: bank,
    },
    {
      title: "Product Design",
      description: "Design & Development",
      imgUrl: Mosquito,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* <img className="background-image-right" src={colorSharp2}></img> */}
    </section>
  )
}