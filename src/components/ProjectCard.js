import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <Link to="/project/business-startup" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="proj-imgbx">
          <img src={imgUrl} alt={title} />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};
