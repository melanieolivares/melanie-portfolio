import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sparkles from "../Components/Sparkles";
import useSound from "use-sound";
import boopSfx from "../assets/click-21156.mp3";
import { TITLE_ID } from "../framerlayoutids";
import melanie from "../assets/melaniesitting.png";
import chikis from "../assets/chikisdrawing.png";

export const About = () => {
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <div className="h-screen">
      <nav className="flex justify-between pt-10">
        <motion.div layout={true} layoutId={TITLE_ID}>
          <Link
            to={`/`}
            className="text-text pl-24 font-medium text-xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-white/80"
            onClick={() => play()}
          >
            melanie olivares
          </Link>
        </motion.div>
        <div className="text-text pr-24 font-medium text-xl">about</div>
      </nav>
      <div className="flex flex-col place-items-center justify-center pt-48">
        <h1 className="text-text font-semibold text-4xl w-6/12 pb-12 mx-auto max-sm:text-3xl max-sm:w-7/12">
          Hi, I&#39;m{" "}
          <Sparkles>
            <span className="text-accent/75">Melanie</span>.
          </Sparkles>
        </h1>

        <p className="text-text font-light text-2xl w-6/12 leading-10 max-auto text-text/80 mx-auto max-md:text-lg max-sm:w-7/12 max-sm:text-base">
          I’m a CSS enjoyer having fun with creating websites. Good ol’ media
          queries (...mmm, I might be using Tailwind). I love experimenting with
          and learning about new tech. Also, I really like running and watching
          cooking competitions!
        </p>
        <div className="flex">
          <img
            src={melanie}
            alt="Melanie Sitting"
            className="absolute bottom-24 right-60 w-32 max-lg:w-28 max-md:w-24 max-sm:w-20 max-sm:right-48 max-sm:bottom-44"
          />
          <img
            src={chikis}
            alt="Melanie's dog Chikis"
            className="absolute bottom-24 right-96 w-28 max-lg:w-24 max-md:w-24 max-sm:w-20 max-sm:right-72 max-sm:bottom-44"
          />
        </div>
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
