import React, { useRef } from "react";
import "./style.css";
import Vector from "../../../assets/Vector.svg";
import Vector2 from "../../../assets/Vector2.svg";
import Panda from "../../../assets/panda.svg";
import Button from "../buttons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PandaBleu from "../../../assets/bleuPanda.svg";

const Heading = () => {
  const imgRef = useRef(null);
  let timeoutId = null;

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      rotationY: 180,
      duration: 0.5
    });
    imgRef.current.src = PandaBleu;

    timeoutId = setTimeout(() => {
      handleMouseLeave();
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId); 
    gsap.to(imgRef.current, {
      rotationY: 0,
      duration: 0.5
    });
    imgRef.current.src = Panda;
  };

  return (
    <>
      <div className="containerHeading">

        <img src={Vector} className="vector" alt="Vector" />
        <img src={Vector2} className="vector2" alt="Vector" />
        <img src={Vector2} className="vector23" alt="Vector" />
        <div>
          THE ULTIMATE DESIGN & DEVELOPMENT
          HUB FOR ALL YOUR NEEDS
        </div>
      </div>
      <div className="LeFlex">
        <div className="PandaFlex">
          <img
          ref={imgRef}
          src={Panda}
          alt="panda1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="pandaImg"
        />        
        </div>
        <div className="SousTitreContainerLand">
          <div className="SousTitreDivLand">
            <p className="SousTitreLand">

            Get unlimited design & development requests for a flat monthly rate.
            Fast turnaround. No contracts or surprises. Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
