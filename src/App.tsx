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
/*
const switchClick = {
  start: (isswitchClicked: boolean) => ({
    scale: isswitchClicked ? 1 : 2,
  }),
  center: {
    scale: 1.5,
  },
  end: (isswitchClicked: boolean) => ({
    scale: isswitchClicked ? 2 : 1,
  }),
};
*/
function App() {
  const [switchClicked, setSwitchClicked] = useState(false);
  const [boxNumber, setBoxNumber] = useState<null | string>(null);
  const btnClick = () => {
    setSwitchClicked((prev) => !prev);
  };
  return (
    <Wrapper>
      <Grid>
        <Box onClick={() => setBoxNumber("1")} layoutId="1" />
        <Box>{!switchClicked ? <Circle layoutId="circle" /> : null}</Box>
        <Box>{switchClicked ? <Circle layoutId="circle" /> : null}</Box>
        <Box onClick={() => setBoxNumber("2")} layoutId="2" />
      </Grid>
      <SwitchBtn
        layout
        onClick={btnClick}
        style={{
          scale: switchClicked ? 1.3 : 1,
          color: switchClicked ? "rgba(255, 128, 0,1)" : "rgba(0, 8, 255,1)",
        }}
      >
        Switch
      </SwitchBtn>
      {boxNumber ? (
        <Overlay onClick={() => setBoxNumber(null)}>
          <Box layoutId={boxNumber + ""} style={{ backgroundColor: "white" }} />
        </Overlay>
      ) : null}
    </Wrapper>
  );
}

export default App;
