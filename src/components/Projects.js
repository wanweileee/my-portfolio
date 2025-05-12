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
      tags: [
        { label: "Next.Js", color: "#8854d0", textColor: "#fff" },
        { label: "FastAPI", color: "#00b894", textColor: "#fff" },
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "Traffic Accident Hotspot Prediction",
      description: "Design & Development",
      imgUrl: TAP,
      tags: [
        { label: "Pytorch", color: "#ff9f43", textColor: "#fff" }
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "SaveSmart",
      description: "Design & Development",
      imgUrl: SaveSmart,
       tags: [
        { label: "Flask", color: "#8854d0", textColor: "#fff" },
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "Sentiment Analysis",
      description: "Design & Development",
      imgUrl: projImg1,
      tags: [
        { label: "Web Scrapping", color: "#8854d0", textColor: "#fff" },
        { label: "HuggingFace", color: "#ffde21", textColor: "#fff" },
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "Bank Account Application",
      description: "Design & Development",
      imgUrl: bank,
      tags: [
        { label: "Ruby on Rails", color: "#ff2c2c", textColor: "#fff" },
      ],
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
    },
    {
      title: "Product Design",
      description: "Design & Development",
      imgUrl: Mosquito,
      links: [
        { label: "🌐 Website", url: "https://yourlink.com" }
      ]
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
                <p>Each project reflects my hands-on experience, problem-solving approach, and commitment to building thoughtful, user-centric solutions , driven by lack of sleep.</p>
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