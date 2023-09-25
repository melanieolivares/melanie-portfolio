import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sparkles from "./Sparkles";
import useSound from "use-sound";
import boopSfx from "../src/assets/click-21156.mp3";
import homeIcon from "../src/assets/icons8-home (1).svg";
import { TITLE_ID } from "./framerlayoutids";

export const About = () => {
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <div className="h-screen">
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
        <div className="text-white pr-24 font-medium text-xl">about</div>
      </nav>
      <div className="flex flex-col place-items-center h-screen justify-center pb-80">
        <h1 className="text-white font-semibold text-4xl w-6/12 mb-12">
          Hi, I&#39;m{" "}
          <Sparkles>
            <span className="text-[#3993DD]">Melanie</span>
          </Sparkles>
          .
        </h1>

        <p className="text-white font-light text-2xl w-6/12 leading-10 max-w-prose text-white/80">
          I’m a CSS enjoyer having fun with creating websites. Good ol’ media
          queries. (Yes, I’m using Tailwind...)
        </p>

        <div className="flex">
          <img
            src="../src/assets/melaniesitting.png"
            alt="Melanie Sitting"
            className="fixed bottom-24 right-60"
          />
          <img
            src="../src/assets/chikisdrawing.png"
            alt="Melanie's dog Chikis"
            className="absolute bottom-24 right-96 w-28"
          />
        </div>
      </div>
      <footer>
        <Link
          to={`/`}
          className="flex text-white pl-24 text-xl fixed bottom-10 cursor-pointer transition-colors duration-300 ease-in-out hover:text-white/80"
          onClick={() => play()}
        >
          <img
            src={homeIcon}
            className=" transition-colors duration-300 ease-in-out hover:text-white/75 mr-2"
          />
          menu
        </Link>
      </footer>
    </div>
  );
};
