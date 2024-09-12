import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Holidays } from "../Holidays";
import useSound from "use-sound";
import boopSfx from "../assets/click-21156.mp3";
import * as FramerConstants from "../framerlayoutids";
import Footer from "../Components/HomeFooter";

const links = [
  {
    name: "about",
    layoutId: FramerConstants.ABOUT_ID,
  },
  {
    name: "projects",
    layoutId: null,
  },
  {
    name: "contact",
    layoutId: null,
  },
];

export const Menu = () => {
  const [lastHoverIndex, setLastHoverIndex] = useState(0);
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <>
      <Holidays />
      <div>
        <div className="text-white h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center">
            <motion.h1
              className="text-8xl font-bold w-fit max-md:text-6xl max-sm:text-4xl"
              layout={true}
              layoutId={FramerConstants.TITLE_ID}
            >
              melanie olivares
            </motion.h1>{" "}
            <h2 className="text-4xl text-accent/75 font-bold w-fit max-md:text-3xl max-sm:text-2xl">
              full-stack web developer
            </h2>
            <div>
              <div className="pt-20">
                <div className="pb-4 text-2xl">Hi, I'm Mel.</div>
                <div>
                  {" "}
                  I’m a computer science student at the University of Southern
                  California.
                </div>
              </div>
              <div className="">
                Checkout some of{" "}
                <Link className="underline" to={"/projects"}>
                  my projects
                </Link>{" "}
                and learn more &nbsp;
                <Link className="underline" to={"/about"}>
                  about me
                </Link>
                .
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};
