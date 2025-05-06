// components/BusinessStartup.js
import projImg1 from "../assets/project-img1.png";

export const BusinessStartup = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Business Startup</h2>
      <p>This is a dedicated project page for the Business Startup project.</p>
      <img
        src={projImg1}
        alt="Business Startup"
        style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
      />
    </div>
  );
};
