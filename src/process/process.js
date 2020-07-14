import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../loading.json";
import "./process.scss";
function Process() {
  const [play, setPlay] = useState(false);
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
        Seceret Key : <span>"vbwvovbwvpbowvwpvb"</span>
      </h5>
      <div className="incomming">
        <h4>Incomming Data</h4>
        <p>hwvvpevpebeobwhvwpvw</p>
      </div>
      <Lottie
        options={defaultOptions}
        height={150}
        width={150}
        isStopped={play}
      />
      <div className="crypt">
        <h4>Encypted Data</h4>
        <p>hello</p>
      </div>
    </div>
  );
}
export default Process;
