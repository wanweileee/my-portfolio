import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { BusinessStartup } from "./components/BusinessStartup"; // ← import new page

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Skills />
                <Projects />
              </>
            }
          />
          <Route path="/project/business-startup" element={<BusinessStartup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
