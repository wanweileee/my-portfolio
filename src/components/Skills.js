import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop:           { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet:            { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile:            { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const skills = [
    { title: "Web Development", desc: "Frontend & Backend" },
    { title: "Automation", desc: "No/Low Code PLatforms (Zapier/Make)" },
    { title: "RAG", desc: "Retrival-Arugmented Generation" },
    { title: "AI/ML Model Dev", desc: "NLP, CV, Transformers" },
  ];

  const education = [
    {
      title: "Singapore University of Technology and Design",
      desc: "Design & Artificial Intelligence",
    },
  ];

  const experience = [
    {
      title: "AI Automation Engineer — CyberG7",
      desc: "Automate Business Process and Marketing",
    },
     {
      title: "AI Engineer — TiltGuard",
      desc: "Develop AI solutions",
    },

  ];

  const renderCards = (items) =>
    items.map((item, index) => (
      <div key={index} className="item-card">
        <h5>{item.title}</h5>
        <p>{item.desc}</p>
      </div>
    ));

  return (
    <section className="skill mt-5" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wow zoomIn">
              <h2>Skills</h2>
              <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
                {renderCards(skills)}
              </Carousel>

              <h2 style={{ marginTop: "60px" }}>Education</h2>
              <Carousel responsive={responsive}>
                {renderCards(education)}
              </Carousel>

              <h2 style={{ marginTop: "60px" }}>Experience</h2>
              <Carousel responsive={responsive}>
                {renderCards(experience)}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
