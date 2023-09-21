import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

import "./App.css";
import { Loading } from "./Loading";
import { Menu } from "./Menu";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenu(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {showMenu ? (
          <motion.div key="main-menu">
            <Menu isHovered={isHovered} setIsHovered={setIsHovered} />
          </motion.div>
        ) : (
          <Loading />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
