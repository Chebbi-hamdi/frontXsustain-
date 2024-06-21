import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.css";
import Card from "../card";
import Arrow from "../../../assets/arrow.svg";
import Arrow2 from "../../../assets/arrow2.svg";
import Camera from "../../../assets/camera.svg";
import Panda from "../../../assets/pnadaSkate.svg";
import Grp2 from "../../../assets/grp2.svg";
import skateStreet from "../../../assets/skateStreet.svg";
import Button from "../buttons";
import DirectionBleu from "../../../assets/direction.svg";
import whiteArrow from "../../../assets/whiteArrow.svg";
import VectorWhite from "../../../assets/VectorWhite.svg";
import VectorBlack from "../../../assets/VectorBlack.svg";
import { useMediaQuery } from "react-responsive";

const Steps = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCard2, setIshoveredCard2] = useState(false);
  const [isHoveredCard3, setIshoveredCard3] = useState(false);
  const [isPhoneVersion, setIsPhoneVersion] = useState(false);
  const isBigScreen = useMediaQuery({ query: "(min-width: 750px)" });
let pandaref = useRef()
  useEffect(() => {
    const handleResize = () => {
      setIsPhoneVersion(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleHover = () => {
    if (isBigScreen) {

      setIsHovered(true);
      gsap.to(".arrowImage", { duration: 0.5, scale: 1.5 });
      gsap.to(".textContent", { duration: 0.5, y: -20 });
      gsap.to(
        '.grppandaPosition',
        {
          right: '50%',
          bottom:0,
          duration: 1,
          ease: "power1.inOut",
        }
      );

    }
  };

  const handleHoverExit = () => {
    if (isBigScreen) {

      setIsHovered(false);
      gsap.to(".arrowImage", { duration: 0.5, scale: 0.9 });
      gsap.to(".textContent", { duration: 0.5, y: 0 });
      
      gsap.to(
        '.grppandaPosition',
        {
          right: '0',
          bottom:'50%',
           duration: 1,
          ease: "power1.inOut",
        }
      );
    }
  };

  return (
    <>
      <div className="LeFlexSteps">
        <div
          onMouseEnter={(e) => (isBigScreen ? setIshoveredCard3(true) : {})}
          onMouseLeave={(e) => (isBigScreen ? setIshoveredCard3(false) : {})}
          className="card1"
        >
          <Card
            customStyles={
              isHoveredCard3
                ? {
                    boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)",
                    "-webkit-box-shadow": "10px 10px 0px 0px rgba(0,0,0,1)",
                    "-moz-box-shadow": "10px 10px 0px 0px rgba(0,0,0,1)",
                  }
                : {}
            }
            color={isHoveredCard3 ? "#000" : ""}
            height={isBigScreen ? "100%" : "100%"}
            width={isBigScreen ? "100%" : "80%"}
            >
            <p
              style={{ color: isHoveredCard3 ? "#FFFF" : "" }}
              className="tl positionInside2"
            >
              Samples of our Work
            </p>
            <p
              style={{ color: isHoveredCard3 ? "#FFFF" : "" }}
              className="text21 positionInside2 aaaa pt-311"
            >
              More products{" "}
            </p>
            <img
              width={"62px"}
              height={"62px"}
              className="pl-48 pb-455 phoneVersionArrow"
              src={isHoveredCard3 ? whiteArrow : Arrow}
              alt="Logo"
            />
            <img
              className="grp2Position"
              style={
                isHoveredCard3
                  ? { opacity: 1, transform: "scale(1.4)" }
                  : { opacity: 0.7, transform: "scale(1)" }
              }
              src={isHoveredCard3 ? DirectionBleu : Grp2}
              alt="Logo"
            />

          </Card>
        </div>
        <div className="Crad2nd3Wraped" style={isBigScreen ? { width: "30%", height: '100%' } : {width: "30%", height: '80%'}}>
        <div
            className="card2"
            onMouseEnter={(e) => {
              handleHover();
              setIsHovered(true);
            }}
            onMouseLeave={(e) => {
              handleHoverExit();
              setIsHovered(false);
            }}
          >
            <Card
              customStyles={
                isHovered
                  ? {
                      boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)",
                      "-webkit-box-shadow": "6px 5px 0px 0px rgba(0,0,0,1)",
                      "-moz-box-shadow": "10px 10px 0px 0px rgba(0,0,0,1)",

                    }
                  : {width:'100%',height:'100%'}
              }
              position={'relative'}
              color={isHovered ? "#2468FF" : ""}
              height={isBigScreen ? "100%" : "70%!important"}
              width={isBigScreen ? "100%" : "100%"}
              >
              <img ref={pandaref} className="grppandaPosition pandasvg" src={Panda} alt="Logo" />
              <img className="grp4Position" src={skateStreet} alt="Logo" />

              <div className="paddingTopPhone">
                <p
                  style={{ color: isHovered ? "#FFFF" : "" }}
                  className="tm positionInside textContent"
                >
                  How it work ?
                </p>
                <p
                  style={{ color: isHovered ? "#FFFF" : "" }}
                  className="text2 positionInside pt-31 textContent testtt"
                >
                  Make the smart choice
                </p>
              </div>
              <img
                width={"30px"}
                height={"30px"}
                className="pl-43 pb-45 phoneVersionArrow2 arrowImage"
                src={isHovered ? VectorWhite : VectorBlack}
                style={{ transform: isHovered ? "scale(0.9)" : "scale(1)" }}
                VectorWhite
                alt="Logo"
              />
            </Card>
          </div>

          <div
          style={{display:'flex',alignItems:'flex-end',justifyContent:'center'}}
            onMouseEnter={(e) => (isBigScreen ? setIshoveredCard2(true) : {})}
            onMouseLeave={(e) => (isBigScreen ? setIshoveredCard2(false) : {})}
            className="card3"
          >
            <Card
              customStyles={{
                ...isHoveredCard2
                  ? {
                      boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)",
                      "-webkit-box-shadow": "6px 5px 0px 0px rgba(0,0,0,1)",
                      "-moz-box-shadow": "10px 10px 0px 0px rgba(0,0,0,1)",
                    }
                  : {}}
              }
              color={isHoveredCard2 ? "#2468FF" : ""}
              height="90%"
              width="100%"
            >
              <div className="paddingTopPhone">
                <p
                  style={{ color: isHoveredCard2 ? "#FFFF" : "" }}
                  className="tm card3-pt positionInside resTxtSch"
                >
                  Schedule a call
                </p>
                <p
                  style={{ color: isHoveredCard2 ? "#FFFF" : "" }}
                  className="text2 positionInside pt-31 phoneVersionCard2"
                >
                  Have Some Question ?
                </p>
               
              </div>
              <img
                className="grp3Position ph positionCameraPhone phoneCamVersion"
                src={Camera}
                alt="Logo"
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps;
