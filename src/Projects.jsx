import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSound from "use-sound";
import boopSfx from "../src/assets/click-21156.mp3";
import homeIcon from "../src/assets/icons8-home (1).svg";
import { TITLE_ID } from "./framerlayoutids";

const projectData = [
  {
    name: "",
    url: "",
    path: "",
    desc: "",
    imgsrc: "",
  },
];

projectData.map((project) => {
  //   return <ProjectPreview key={project.name} project={project} />;
});

export const Projects = () => {
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <>
      <nav className="flex justify-between mt-10">
        <motion.div layout={true} layoutId={TITLE_ID}>
          <Link
            to={`/`}
            className="text-white pl-24 font-medium text-xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-white/80"
            onClick={() => play()}
          >
            melanie olivares
          </Link>
        </motion.div>
        <div className="text-white pr-24 font-medium text-xl">projects</div>
      </nav>
      <footer>
        <Link
          to={`/`}
          className="flex text-white pl-24 text-xl fixed bottom-10 cursor-pointer transition-colors duration-300 ease-in-out hover:text-white/80"
          onClick={() => play()}
        >
          <img
            src={homeIcon}
            className=" transition-colors duration-300 ease-in-out hover:text-white/80 mr-2"
          />
          menu
        </Link>
      </footer>
    </>
  );
};
