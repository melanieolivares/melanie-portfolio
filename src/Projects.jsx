import { Link } from "react-router-dom";
import useSound from "use-sound";
import boopSfx from "../src/assets/click-21156.mp3";
import homeIcon from "../src/assets/icons8-home (1).svg";

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
        <Link
          to={`/`}
          className="text-white pl-24 font-medium text-xl cursor-pointer"
          onClick={() => play()}
        >
          melanie olivares
        </Link>
        <div className="text-white pr-24 font-medium text-xl">projects</div>
      </nav>
      <footer>
        <Link
          to={`/`}
          className="flex text-white pl-24 text-xl fixed bottom-10 cursor-pointer transition-colors duration-300 ease-in-out hover:text-white/75"
          onClick={() => play()}
        >
          <img
            src={homeIcon}
            className=" transition-colors duration-300 ease-in-out hover:text-white/75 mr-2"
          />
          menu
        </Link>
      </footer>
    </>
  );
};
