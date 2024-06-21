import React, { useRef } from "react";
import Vector from "../../../assets/Vector.svg";
import Vector2 from "../../../assets/Vector2.svg";
import Panda from "../../../assets/panda.svg";
import gsap from "gsap";
import PandaBleu from "../../../assets/bleuPanda.svg";
import styles from './style.module.scss'
import sousMot from '../../../assets/images/Pricing/sousMot.svg'
import Planing from '../../../assets/images/Pricing/Planning.svg'
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

        
        <div>
            Predictable Pricing.
        </div>
            <span className={styles.spanBlue}><img src={sousMot} className={styles.sousMot} alt="Vector" /> No Surprises.
            </span>
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
            <p className={styles.SousTitreLand}>

            Choose the number of active talents working on your requests at the same time
            </p>
          </div>
        </div>

      </div>
      <div className={styles.CenterPlan}>

        <img src={Planing} className={styles.plan} alt="plan"></img>
      </div>
    </>
  );
};

export default Heading;
