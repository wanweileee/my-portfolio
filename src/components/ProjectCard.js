import { Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

export const ProjectCard = ({ title, imgUrl, tags = [], links = [] }) => {
  return (
    <Col size={12} sm={6} md={4} className="mb-4">
      <div className="proj-imgbx" style={{
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
      }}>
       <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
        <img
          src={imgUrl}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
        </div>


        <div style={{ padding: "16px" }}>
          <h5 style={{ fontWeight: 600 }}>{title}</h5>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "12px 0" }}>
            {tags.map((tag, index) => (
              <span key={index} style={{
                fontSize: "12px",
                backgroundColor: tag.color || "#e0e0e0",
                color: tag.textColor || "#333",
                padding: "4px 10px",
                borderRadius: "12px"
              }}>
                {tag.label}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "14px" }}>
            {links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#5c67f2", display: "flex", alignItems: "center", gap: "4px" }}>
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Col>
  );
};


