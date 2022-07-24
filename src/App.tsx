import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 50px;
  div:first-child,
  div:last-child {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  width: 300px;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const CenterBox = styled(motion.div)`
  background-color: white;
  height: 200px;
  width: 300px;
  border-radius: 5px;
`;

const Circle = styled(motion.div)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: white;
`;

const SwitchBtn = styled(motion.button)`
  width: 70px;
  height: 30px;
  background-color: white;
  border-radius: 5px;
  border: 0px;
  color: rgb(0, 8, 255);
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const boxVariants = {
  initial: (i: string) => ({
    scale: 1,
    x: 0,
    y: 0,
  }),
  hover: (i: string) => ({
    scale: 1.1,
    y: i ? -15 : 15,
    x: i ? -20 : 20,
  }),
};

const btnVariants = {
  zero: {
    color: "rgba(0, 8, 255,1)",
    transform: "scale(1)",
  },
  one: {
    color: "rgba(255, 128, 0,1)",
    transform: "scale(1.1)",
  },
};

const overlayVariants = {
  start: {
    opacity: 1,
  },
  end: {
    opacity: 0,
  },
};

function App() {
  const [switchClicked, setSwitchClicked] = useState(0);
  const [boxNumber, setBoxNumber] = useState<null | string>(null);
  const btnClick = () => {
    setSwitchClicked((prev) => (prev === 1 ? 0 : 1));
  };
  const onClickBox = (i: string) => {
    setBoxNumber(i);
  };
  return (
    <Wrapper>
      <Grid>
        <Box
          onClick={() => onClickBox("1")}
          layoutId="1"
          custom={1}
          variants={boxVariants}
          initial="initial"
          whileHover="hover"
        />
        <Box>{!switchClicked ? <Circle layoutId="circle" /> : null}</Box>
        <Box>{switchClicked ? <Circle layoutId="circle" /> : null}</Box>
        <Box
          onClick={() => onClickBox("0")}
          layoutId="0"
          custom={0}
          variants={boxVariants}
          initial="initial"
          whileHover="hover"
        />
      </Grid>
      <SwitchBtn
        onClick={btnClick}
        variants={btnVariants}
        initial="zero"
        animate={switchClicked === 1 ? "one" : "zero"}
      >
        Switch
      </SwitchBtn>
      <AnimatePresence>
        {boxNumber ? (
          <Overlay
            onClick={() => setBoxNumber(null)}
            variants={overlayVariants}
            animate="start"
            exit="end"
          >
            <CenterBox layoutId={boxNumber} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
