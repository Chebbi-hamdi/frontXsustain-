import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "./style.scss";
import Button from "../buttons";
import { ReactComponent as Grp } from "../../../assets/Grp22.svg";
import { ReactComponent as Instagram } from "../../../assets/instagram.svg";
import { ReactComponent as X } from "../../../assets/X.svg";
import { ReactComponent as Be } from "../../../assets/be.svg";
import { ReactComponent as Linkedin } from "../../../assets/linkedin.svg";
import { ReactComponent as Facebook } from "../../../assets/facebook.svg";
import { ReactComponent as Tiktok } from "../../../assets/tiktok.svg";
import { ReactComponent as Youtube } from "../../../assets/youtube.svg";
import left from "../../../assets/left.png";
import { useMediaQuery } from "react-responsive";

import right from "../../../assets/right.png";

const Footer = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 750)" });

  const rightHandRef = useRef();
  const leftHandRef = useRef();
  const mainRef = useRef();
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: mainRef.current,
      start: "top top ",
      end: "+=500", // Add this line
      scrub: 1,
      markers: true,
      invalidateOnRefresh: true,
      pin: true,
    },
  });
  useEffect(() => {
    if (isBigScreen) {
      tl.fromTo(
          rightHandRef.current,
          {
            xPercent: -100,
          },
          { xPercent: -10 }
        )
        .fromTo(
          leftHandRef.current,
          {
            ease: "power2.in",
            xPercent: 100,
            yPercent: 5,
          },
          { xPercent: -25, yPercent: 5 },
          "<"
        );
    }
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="centerCard">

      <div
        className={isHovered ? "relativediv hover" : "relativediv"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grp className="positionGrpSvg" />
        <div className="footerDiv" ref={mainRef}>
        <>
      {!isBigScreen && (
        <div className="footer-box">
          <div className="rightHand" ref={rightHandRef}>
            <img src={left} alt="left_hand" className={"trans_right_box"} />
          </div>
          <div className="lefthand" ref={leftHandRef}>
            <img src={right} alt="right_hand" className={"trans_left_box"} />
          </div>
        </div>
      )}
    </>

          <div className="LeFlexHeadFooter">
            <div className="centerFooter">
              <div className="logo2">
                <p className="subTitle">EXCITED? US TOO. LET’S GET MOVING.</p>
              </div>
              <div className="login">
                <Button
                  color="#FFF"
                  background="#0000"
                  customClassName="customFooterButton"
                >
                  SCHEDULE A CALL{" "}
                </Button>{" "}
              </div>

            </div>
          </div>

          <div className="FooterTitle">
            <div className="centerHello">
              <p className="centerHellop" > 
              HELLO

              </p>
            </div>
          <div className="divFollow">
            <div className="centerDivHello">

              <p className="Follow">FOLLOW US</p>
              <div className="iconss">
                <Tiktok className="icon" />
                <X className="icon" />
                <Facebook className="icon" />
                <Linkedin className="icon" />
                <Be className="icon" />
                <Youtube className="icon" />
                <Instagram className="icon" />
              </div>
            </div>

          </div>

          <div class="footer-links">
            <div className="flexCopy">
              <div style={{width:'90%'}}>
                <p className="Copyrights">
                  COPYRIGHT 🐼​ 2024 XSUSTAIN. ALL RIGHTS RESERVED
                </p>
              </div>
              <div class="footer-links">
                <div className="centerCopyright"> 
                  <div className="footer-links-right">
                    <div>Terms & conditions</div>
                    <div>Privacy Policy</div>
                    <div>Cookie Policy</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
