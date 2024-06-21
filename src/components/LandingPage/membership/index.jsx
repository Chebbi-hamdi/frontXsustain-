import React, { useEffect, useRef } from "react";
import "./style.css";
import { ReactComponent as ShiningCrown } from "../../../assets/shining-crown.svg";
import { ReactComponent as Lightning } from "../../../assets/lightning.svg";
import { ReactComponent as Arcs } from "../../../assets/arcs.svg";
import { ReactComponent as Brush } from "../../../assets/brush.svg";
import { ReactComponent as Scale } from "../../../assets/scale.svg";
import { ReactComponent as Money } from "../../../assets/money-recive.svg";
import { ReactComponent as Infinity } from "../../../assets/infinity.svg";
import { ReactComponent as Circles } from "../../../assets/circles.svg";
import { ReactComponent as BlueCrown } from "../../../assets/BlueCrown.svg";
import { ReactComponent as GreenHeart } from "../../../assets/GreenHeart.svg";
import { ReactComponent as Snail } from "../../../assets/Snail.svg";
import { ReactComponent as Shining } from "../../../assets/Shining.svg";
import { ReactComponent as ClockCircle } from "../../../assets/clock-circle.svg";
import { ReactComponent as Star } from "../../../assets/Star.svg";
import { ReactComponent as SideWayL } from "../../../assets/SideWayL.svg";
import { gsap } from "gsap";
import Cookies from "../../../assets/cookies.png";
import { useNavigate } from "react-router-dom";
export default function Membership() {
  const navigate = useNavigate();
  const bottomPremiumRef = useRef(null);
  useEffect(() => {
    const bottomPremiumElement = bottomPremiumRef.current;

    if (bottomPremiumElement) {
      const tl = gsap.timeline({ repeat: -1 });

      tl.fromTo(
        bottomPremiumElement,
        { x: "-100%" }, // Start position (off screen to the left)
        { x: "125%", duration: 6, ease: "none" } // End position (off screen to the right)
      );
    }
  }, []);

  const navPrice = () => {
    console.log("navPrice");    
    navigate("/pricing");
  };

  return (
    <div className="membership">
      <div className="content2">
        <div className="title">
          <ShiningCrown className="shining-crown" />
          <h1 className="phoneVersionTitle">Premium Membership Rewards</h1>
        </div>
        <p className="phoneHidden">
          "We're so good that you'll never need to go anywhere else for your
          development and design. Seriously."
        </p>
        <button className="blue-button phoneHidden" onClick={navPrice}>
          SEE PLANS
        </button>
      </div>

      <img src={Cookies} className="cookie"></img>

      <div className="grid3-1">
        <div className="premium-line">
          <Lightning />
          <h5>Lightning fast Delivery</h5>
          <p>Get your design one at a time in just a few days on average.</p>
        </div>
        <div className="premium-line">
          <Arcs />
          <h5>Unique and all yours</h5>
          <p>
            Each of your designs is made especially for you and is 100% yours.
          </p>
        </div>
        <div className="premium-line">
          <Brush />
          <h5>Top-notch quality</h5>
          <p>Insane design quality at your fingertips whenever you need it.</p>
        </div>
        <div className="premium-line">
          <Scale />
          <h5>Flexible and scalable</h5>
          <p>Scale up or down as needed, and pause or cancel at anytime.</p>
        </div>
        <div className="premium-line">
          <Infinity />
          <h5>Design board</h5>
          <p>Add as many design requests to your board as you'd like.</p>
        </div>
        <div className="premium-line">
          <Money />
          <h5>Fixed monthly rate</h5>
          <p>No surprises here! Pay the same fixed price each month.</p>
        </div>
      </div>
      <Circles className="circles" />
      <div className="bottom-premium">
        <p ref={bottomPremiumRef}>
          Webflow Developer <BlueCrown /> Shopify Developer <GreenHeart />{" "}
          WordPress Developer <Snail /> UI/UX Designer <Shining /> Front-End
          Developer <ClockCircle /> Portals <Star /> Funnels <SideWayL />
        </p>
      </div>
    </div>
  );
}
