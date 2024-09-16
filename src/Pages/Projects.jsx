import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSound from "use-sound";
import boopSfx from "../assets/click-21156.mp3";
import { TITLE_ID } from "../framerlayoutids";
import ProjectPreview from "../Components/ProjectPreview";

const projectData = [
  {
    name: "ShopSmart",
    github: "https://github.com/melanieolivares/ShopSmart",
    websiteurl: "https://www.shopsmart.dev/login",
    imgsrc: "../assets/shopSmartShort-ezgif.com-speed.gif",
  },
];

export const Projects = () => {
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <div className="h-screen flex flex-col">
      <nav className="flex justify-between pt-10">
        <motion.div layout={true} layoutId={TITLE_ID}>
          <Link
            to={`/`}
            className="text-white pl-24 font-medium text-xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-text/80"
            onClick={() => play()}
          >
            melanie olivares
          </Link>
        </motion.div>
        <div className="text-text pr-24 font-medium text-xl">projects</div>
      </nav>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {projectData.map((project) => (
          <ProjectPreview
            name={project.name}
            websiteurl={project.websiteurl}
            github={project.github}
            imgsrc={project.imgsrc}
          />
        ))}
      </div>
      <footer>
        <Link
          to={`/`}
          className="flex text-text pl-24 text-xl fixed bottom-10 cursor-pointer transition-colors duration-300 ease-in-out hover:text-white/80"
          onClick={() => play()}
        >
          <svg
            className="transition-colors duration-300 ease-in-out text-text w-8 hover:text-text/75"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
      </footer>
    </div>
  );
};
