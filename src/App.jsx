import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./styles/App.css";
import { Loading } from "./Loading";
import { Menu } from "./Pages/Home";
import { About } from "./Pages/About";
import { Projects } from "./Pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const [showMenu, setShowMenu] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowMenu(true);
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // });

  return (
    <>
      {/* <AnimatePresence mode="wait">
        {showMenu ? (
          <motion.div key="main-menu">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<div>contact</div>} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        ) : (
          <Loading />
        )}
      </AnimatePresence> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<div>contact</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
