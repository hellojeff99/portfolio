import React from "react";
import {Route, HashRouter as Router, Routes} from "react-router-dom";
import {Resume} from "./pages/resume/Resume.tsx";
// import { Home } from "./pages/home/Home.tsx";
import { NotFound } from "./pages/notFound/NotFound.tsx";
// import { CoverLetter } from "./pages/coverletter/CoverLetter.tsx";
import {NavBar} from "./components/NavBar.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/resume" element={<Resume />} />
        {/*<Route path="/coverletter" element={<CoverLetter />} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
