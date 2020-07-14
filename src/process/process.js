import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../loading.json";
import { useSelector } from "react-redux";
import "./process.scss";
function Process() {
  const [play, setPlay] = useState(false);

  const state = useSelector((state) => state.ProcessReducer);

  console.log("satte", state);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="process">
      <h5>
        Seceret Key : <span>"obvwoqcbv21801f19d0zibcoavwpnq"</span>
      </h5>
      <div className="incomming">
        <h4>Incomming Data</h4>
        <p>{state.cypher}</p>
      </div>
      <Lottie
        options={defaultOptions}
        height={150}
        width={150}
        isStopped={play}
      />
      <div className="crypt">
        <h4>Decypted Data</h4>
        <p>{state.text}</p>
      </div>
    </div>
  );
}
export default Process;
