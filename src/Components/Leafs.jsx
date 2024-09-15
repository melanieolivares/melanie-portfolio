import { useEffect, useState, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
const DEFAULT_COLOR = "#a55742";
const generateSparkle = (color) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(30, 50),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  };
  return sparkle;
};

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);
  return prefersReducedMotion;
}

const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    let isEnabled =
      typeof minDelay === "number" && typeof maxDelay === "number";
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);
  return cancel;
};

const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }) => {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(color));
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 500,
    prefersReducedMotion ? null : 1000
  );
  return (
    <Wrapper {...delegated}>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  );
};
const Sparkle = ({ size, color, style }) => {
  const path =
    "M54.969 36.804c1.08-.595 2.272-.68 3.424-.761.778-.055 1.523-.109 2.23-.304-1.212-.608-2.501-.743-3.96-.897-.878-.093-2.933-.311-3.453-2.21a2.143 2.143 0 01-.073-.582c-.419.369-.932.55-1.504.537-1.076-.038-2.087-.826-2.517-1.96-.206-.543-.153-1.067-.102-1.575.04-.404.078-.785-.02-1.146a2.624 2.624 0 00-.372-.82c-.223.651-.715 1.196-1.131 1.658-1.195 1.324-3.036 2.477-4.56 2.169-.643-.129-1.516-.583-2.025-2.02-1.398-3.948 1.642-7.648 3.862-10.35.672-.818 1.525-1.737 2.58-2.298h-.029a2.38 2.38 0 00-.924.164c-.372.156-.777.424-1.205.709-1.222.809-2.74 1.816-4.16.372-2-2.03-.543-3.863.629-5.335.316-.398.622-.782.864-1.159-.698.276-1.45.29-2.06.005-.722-.34-1.105-1.038-1.05-1.917l.035-.573c.139-2.168.28-4.4-.317-6.511-1.198 3.841-2.358 5.928-3.809 6.893-.445.297-.85.404-1.228.324-.64-.133-1.036-.75-1.457-1.403-.441-.686-.895-1.39-1.646-1.693.535 1.807.428 5.61-.503 7.309-.495.9-1.113 1.06-1.532 1.041-1.613-.087-2.425-1.355-3.14-2.473-.214-.335-.424-.663-.651-.954-.658-.837-1.817-1.322-2.82-1.283 3.312 2.27 2.296 8.187 1.875 10.057-.047.21-.073.481-.101.775-.1 1.005-.223 2.256-1.156 2.677-1.66.747-2.643-1.376-3.012-2.177-.508-1.1-.696-2.14-.877-3.145-.245-1.358-.464-2.568-1.482-3.584.095.74-.04 1.581-.407 2.333-.498 1.02-1.314 1.624-2.238 1.656-1.957.074-3.11-2.093-3.96-3.672-.233-.433-.454-.843-.653-1.135a5.203 5.203 0 01-.483-.903c-.05.285-.066.567-.005.822.152.637.427 1.252.693 1.85.703 1.574 1.43 3.203-.238 5.045-.49.54-1.13.635-1.693.717-.148.022-.29.043-.423.07.735.265 1.302.816 1.642 1.617.707 1.663.3 4.115-.891 5.357-.802.837-1.825 1.16-2.877.907-.859-.205-1.66-.781-2.235-1.558.012.192.039.378.09.559.562 1.964 2.211 3.263 3.806 4.52.224.176.446.351.664.527 1.324 1.067 3.443 3.162 2.764 5.193-.265.79-1.087 1.268-2.314 1.343-.533.032-1.207-.11-1.925-.26-1.168-.244-2.491-.519-3.19-.043-.14.096-.254.221-.341.38 1.452-.235 3.45.19 4.476.824 1.063.656 1.068 1.313.976 1.646-.114.414-.48.734-1.002.91 1.082.565 2.459.593 3.902.623 1.08.022 2.196.046 3.228.304.379.095.697.344.873.683.173.334.193.711.057 1.064-.271.703-.751 1.257-1.484 1.7 1.508.257 3.71.035 5.651-.933a69.17 69.17 0 002.612-3.927c-.42-.486-.808-.994-1.174-1.515-.828-.442-1.783-.727-2.71-.999-1.509-.443-4.357-2.441-4.216-2.58.14-.139 2.932 1.455 4.419 1.892.59.173 1.189.356 1.772.577-1.025-1.655-1.862-3.42-2.68-5.146l-.01-.023c-3.115-.117-8.906-3.533-8.804-3.687.102-.153 5.786 2.765 8.449 2.944l-.459-.961c-.942-1.957-1.943-4.056-2.73-6.211-1.809-.57-3.888-4.82-3.694-4.862.195-.039 2.004 3.201 3.373 3.954-.518-1.561-.912-5.097-.715-5.114.2-.016 1.403 5.16 2.387 7.508.757-2.306 1.193-7.975 1.391-7.979.2.012.018 6.367-.957 8.98a119.88 119.88 0 001.592 3.412l.826 1.732c.426.9.86 1.809 1.32 2.706.11-2.63 1.673-8.249 1.864-8.197.192.05-1.239 6.492-1.163 9.515.673 1.198 1.427 2.348 2.31 3.4a80.068 80.068 0 002.774-4.998c.5-.994 1.025-2.094 1.563-3.265-.002-.01-.011-.015-.012-.025-.044-1.243-.682-2.338-1.3-3.395-.88-1.51-.72-5.334-.535-5.262.184.074.288 3.414 1.156 4.9.48.823.968 1.667 1.222 2.61.862-1.926 1.75-4.018 2.627-6.192a12.04 12.04 0 01-1.024-1.7c-.004-.008-.009-.015-.012-.023a12.697 12.697 0 01-.982-2.646c-.896-.499-3.32-3.668-3.174-3.803.145-.134 2.405 2.33 2.98 2.809-.04-.238-.093-.473-.123-.713-.292-2.307-1.506-4.13-1.362-4.266.144-.137 1.66 1.816 2.072 4.16.084.48.141.964.246 1.432a11.4 11.4 0 00.622 1.912c.226-.872.267-1.717.306-2.54.048-1.033.812-3.417.995-3.343.183.075-.231 2.36-.278 3.376-.051 1.096-.116 2.23-.58 3.452.24.462.463.833.634 1.092a214.63 214.63 0 002.589-6.824c-.005-.018-.023-.03-.024-.05-.083-.997-1.176-5.81-.994-5.888.18-.078 1.379 3.196 1.551 4.436.359-1.022 2.942-8.886 3.295-8.843.104.01-.987 5.936-1.003 5.99-.02.073-.043.147-.064.22.193-.13.386-.26.604-.403.952-.624 3.108-2.279 3.255-2.143.147.133-1.874 2.097-2.862 2.743-.515.337-.996.656-1.327.928a198.904 198.904 0 01-3.248 9.942c1.21-.71 2.455-1.446 3.446-2.369.226-.21.462-.46.704-.717-.178-1.045 2.538-4.516 2.713-4.418.173.097-1.712 3.014-1.917 3.575.952-.985 3.688-1.869 3.702-1.671.013.198-2.756 1.696-3.76 2.776a19.07 19.07 0 01-.953.98c-.367.342-.769.65-1.182.947 1.518-.15 4.459-1.91 4.594-1.767.136.144-3.336 2.526-5.24 2.526-.155 0-.308-.008-.461-.018a58.3 58.3 0 01-1.335.806l-.613.362c-.021.012-.045.01-.068.018a175.845 175.845 0 01-2.01 5.293c1.18-.933 8.528-3.726 8.66-3.58.133.147-8.227 3.581-9.413 5.472-.007.011-.02.016-.028.026-.6 1.44-1.19 2.79-1.758 4.005a80.078 80.078 0 01-1.99 3.931c.714.135 1.486.236 2.312.3 2.955-1.583 7.417-8.152 7.596-8.072.18.082-3.619 6.414-6.311 8.14 3.424.098 7.591-.421 12.119-1.897.9-.916 4.63-6.39 4.777-6.258.148.131-2.925 5.104-3.44 5.792 2.61-.946 8.456-3.895 8.558-3.725.102.169-3.285 2.264-4.84 2.977.815.178 6.295.582 6.227.768-.052.146-5.997.17-7.203-.33a43.094 43.094 0 01-8.242 2.631c1.411.89 7.367 2.89 7.368 3.088.002.21-7.642-2.386-8.385-2.893a35.56 35.56 0 01-5.042.56c.502 1.54 3.037 4.414 2.919 4.573-.07.094-3.153-2.826-3.664-4.56-.12.002-.244.007-.363.007-1.779 0-3.378-.16-4.757-.437a69.55 69.55 0 01-3.203 5.234c-.302 2.68.565 5.27 2.102 6.564-.307-1.109-.367-2.615.136-3.37.203-.305.683-.77 1.594-.423 1.164.438 1.617 2.46 1.916 3.799l.104.451c.307 1.259.888 2.257 1.762 3.015-.436-1.078-.352-2.34.26-3.732a.38.38 0 01.352-.213.36.36 0 01.321.256c.622 2.092 2.803 4.358 5.074 5.272.847.341 2.024.622 3.204.28-1.73-.737-4.034-2.346-5.04-4.245-.552-1.041-.666-2.052-.339-3.004.127-.368.36-.508.533-.56.561-.17 1.236.34 1.833.79.227.172.484.366.606.412.694.267 1.313.197 1.972-.08-1.068-.42-1.991-1.478-2.185-2.45-.191-.957.317-1.714 1.359-2.024 1.616-.484 3.267-.01 4.865.447.569.163 1.107.317 1.631.425.88.18 1.819.149 2.727.123.384-.012.768-.03 1.147-.021.631.004 2.448-.06 3.49-.886-1.035-.087-1.897-.614-2.432-1.51-.78-1.304-.665-3.067.288-4.384 1.33-1.838 2.814-1.315 4.124-.855.552.195 1.118.395 1.685.436-.17-.235-.356-.47-.549-.71-.426-.535-.866-1.087-1.149-1.714-.493-1.097.036-2.206 1.416-2.97z";
  return (
    <SparkleWrapper style={style}>
      <SparkleSvg width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </SparkleSvg>
    </SparkleWrapper>
  );
};

const comeInOut = keyframes`
0% {
  transform: translateY(-100%);
  opacity: 1;
}


100% {
  transform: translateY(100%);
  transform: translateX(100%);
  opacity: 0;
}
`;
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;
const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;
const SparkleWrapper = styled.span`
  position: absolute;
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} 1500ms linear;
  }
`;
const SparkleSvg = styled.svg`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1000ms linear;
  }
`;
const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
export default Sparkles;
