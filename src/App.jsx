import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Education from "./pages/Education";
import ParlonsEn from "./pages/ParlonsEn";
import Forum from "./pages/Forum";
import Depistage from "./pages/Depistage";
import Error404 from "./pages/Error404";
import Warning from "./pages/Warning";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [subjects, setSubjects] = useState();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Warning" element={<Warning />} />
        <Route path="/Education" element={<Education />} />
        <Route
          path="/Parlons_en"
          element={<ParlonsEn subjects={subjects} setSubjects={setSubjects} />}
        />
        <Route path="/Parlons_en/:id" element={<Forum subjects={subjects} />} />
        <Route path="/Depistage" element={<Depistage />} />
        <Route path="/ERROR404" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
