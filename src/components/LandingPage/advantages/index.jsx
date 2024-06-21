import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ReactComponent as ClockCircleIcon } from "../../../assets/clock-circle.svg";
import { ReactComponent as CheckIcon } from "../../../assets/check.svg";
import "./style.css";

export default function Advantages() {
  const textRef = useRef(null);
  const maskRef = useRef(null);
  const [isDeveloper, setIsDeveloper] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.fromTo(
      textRef.current,
      { y: 0 },
      { duration: 1, y: -60, clipPath: "inset(0 0 100% 0)" }
    ) // Slide text up with masking
      .to(textRef.current, { duration: 2, y: 0, clipPath: "inset(0 0 0% 0)" }); // Slide text down with masking

    const interval = setInterval(() => {
      setIsDeveloper((prevIsDeveloper) => !prevIsDeveloper);
    }, 4000); // Adjusted time to match the animation timeline

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="advantages">
      <ClockCircleIcon className="clock-circle" />
      <br></br>
      <div className="adv-content">
        <div className="BigParg">
          <p className="BigPargp">
          Experiencing Frustration with Unreliable 
          Freelancers? Limited Budget for In-House 
   

          </p>
          <span className="spann" ref={textRef}>{isDeveloper ? "Developer" : "Designer"} ?</span>
        </div>
        <p className="smallParag"> 
          There are numerous options for finding remote or
          in-house staff these days. However, identifying the right candidates
          can be time-consuming, nerve-racking, and expensive,
          especially when you need them promptly! Fortunately, we've got a
          solution for you
        </p>
        <div className="checks">
          <div className="checked-item">
            <CheckIcon />
            <p className="textCHeckIcon">No Recruiting Fees</p>
          </div>
          <div className="checked-item">
            <CheckIcon />
            <p className="textCHeckIcon">No Contract</p>
          </div>
          <div className="checked-item">
            <CheckIcon />
            <p className="textCHeckIcon">Unlimited Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
