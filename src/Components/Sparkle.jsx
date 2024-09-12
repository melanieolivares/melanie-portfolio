import SparkleInstance from "./SparkleInstance";
import { useState } from "react";
import { useRandomInterval } from "react";
import sparkle from "./assets/sparkle.svg";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const DEFAULT_COLOR = "hsl(50deg, 100%, 50%)";
const generateSparkle = (color = DEFAULT_COLOR) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    // Bright yellow color:
    color,
    size: random(10, 20),
    style: {
      // Pick a random spot in the available space
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
      // Float sparkles above sibling content
      zIndex: 2,
    },
  };
};

export const Sparkle = ({ children }) => {
  const [sparkles, setSparkles] = useState([]);
  useRandomInterval(
    () => {
      const now = Date.now();
      // Create a new sparkle
      const sparkle = generateSparkle();
      // Clean up any "expired" sparkles
      const nextSparkles = sparkles.filter((sparkle) => {
        const delta = now - sparkle.createdAt;
        return delta < 1000;
      });
      // Include our new sparkle
      nextSparkles.push(sparkle);
      // Make it so!
      setSparkles(nextSparkles);
    },
    50,
    500
  );
  return (
    <Wrapper>
      <SparkleInstance
        color={sparkle.color}
        size={sparkle.size}
        style={sparkle.style}
      />
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`;
const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
