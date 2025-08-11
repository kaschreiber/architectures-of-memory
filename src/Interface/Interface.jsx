import React from "react";
import "./style.css";
import usePhases, { PHASE } from "../stores/usePhases.jsx";

const Interface = () => {
  const phase = usePhases((state) => state.phase);
  const start = usePhases((state) => state.start);
  return (
    <div className="interface">
      {/*{phase === PHASE.START && (*/}
      {/*  <div className="start" onClick={start}>*/}
      {/*    Start Experience*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{phase === PHASE.EXPERIENCE && <div className="start">Experience</div>}*/}
    </div>
  );
};

export default Interface;
