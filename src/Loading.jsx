import { motion } from "framer-motion";

export const Loading = () => (
  <motion.div
    key={"loading"}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {
      <div className="h-screen flex flex-col place-items-center place-content-center text-center">
        <img src={"src/assets/MelanieLogo.png"} />
        <div className="text-white">
          <h1 className="text-8xl leading-25 ">melanie&#39;s</h1>
          <h2 className="text-4xl font-extralight">creations</h2>
        </div>
      </div>
    }
  </motion.div>
);
