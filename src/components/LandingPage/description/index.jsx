import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./style.css";
import Card from "../card";

import { ReactComponent as TwirlIcon } from "../../../assets/twirl.svg";
import { ReactComponent as HeartStarIcon } from "../../../assets/heart-star.svg";
import { ReactComponent as DoudaIcon } from "../../../assets/douda.svg";
import { ReactComponent as BlueMelon } from "../../../assets/blue-melon.svg";
import { ReactComponent as MakeTheChoice } from "../../../assets/Make The Choice.svg";
import { ReactComponent as CardInside } from "../../../assets/cardInside1.svg";
import { ReactComponent as CardInside2 } from "../../../assets/insideCard2.svg";
import { ReactComponent as CardInside3 } from "../../../assets/cardInside3.svg";
import { ReactComponent as CardInside4 } from "../../../assets/cardInside4.svg";
import { ReactComponent as BlueCrown } from "../../../assets/BlueCrown.svg";
import { ReactComponent as GreenHeart } from "../../../assets/GreenHeart.svg";
import { ReactComponent as ArrowToMove } from "../../../assets/arrowToMove.svg";
import { ReactComponent as Snail } from "../../../assets/Snail.svg";
import { ReactComponent as Shining } from "../../../assets/Shining.svg";
import { ReactComponent as ClockCircle } from "../../../assets/clock-circle.svg";
import { ReactComponent as Star } from "../../../assets/Star.svg";
import { ReactComponent as SideWayL } from "../../../assets/SideWayL.svg";
import { ReactComponent as PriritaizeYourOrder } from "../../../assets/PriritaizeYourOrder.svg";
import { ReactComponent as NewTaskBlue } from "../../../assets/NewTaskBlue.svg";
import { ReactComponent as OrderFeddbacks } from "../../../assets/orderFeddbacks.svg";
import { ReactComponent as HandToMove } from "../../../assets/HandToMove.svg";

export default function Desc() {
  const bottomPremiumRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const handleMouseEnter = (cardId) => {
    console.log(cardId);
    setHoveredCard(cardId);
    gsap.to(`.card-description-${cardId}`, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.in",
    });
    gsap.to(`.card-description-opacity-${cardId}`, {
      opacity: 1,
      duration: 0.2,
      ease: "power1.in",
    });
    gsap.to(`.card-arrow-${cardId}`, {
      right: "33%",
      bottom: "10%",
      duration: 0.5,
      ease: "power1.in",
    });
    gsap.to(`.card-hand-${cardId}`, {
      top: "35%",
      duration: 0.3,
      ease: "power1.in",
    });
  };
  const handleMouseLeave = (cardId) => {
    setHoveredCard(null);
    gsap.to(`.card-description-${cardId}`, {
      opacity: 1,
      duration: 0.2,
      ease: "power1.in",
    });
    gsap.to(`.card-description-opacity-${cardId}`, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.in",
    });
    gsap.to(`.card-arrow-${cardId}`, {
      right: "10%",
      bottom: "10%",
      duration: 0.5,
      ease: "power1.in",
    });
    gsap.to(`.card-hand-${cardId}`, {
      top: "60%",
      duration: 0.3,
      ease: "power1.in",
    });
  };

  return (
    <div className="description">
      <DoudaIcon className="douda" />
      <div className="top-side-description">
        <div className="titlebreez">
          <div className="BreezPTitle">
            Making Development and Branding 
          </div>
          <span className="BreezSpanTitle">
          <TwirlIcon /> a{" "} Breeze
            <HeartStarIcon className="HeartIcon" />
          </span>
        </div>
        <div className="paragraphBreez">
          <div className="centerBREEZ">

            Xsustain is a design <span>&</span> development subscription service
            that alleviates the hassle of hiring creatives for your business
          </div>
        </div>
      </div>
      <div className="middle-side-description">
        <BlueMelon className="blueMelon" />
        <div className="choice">
          <MakeTheChoice />
        </div>
        <div className="cards">
          <div
            className="phoneCardSize"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            <Card
              height="100%"
              width="100%"
              className="custom-card"
              customStyles={{
                backgroundColor: hoveredCard === 1 ? "#2468FF" : "transparent",
                color: hoveredCard === 1 ? "#FFF" : "#000",
              }}
            >
              <div className="description1 parent-container">
                <h2>Subscribe</h2>
                <p className="desc-txt phonePosition">
                  Subscribe to a plan <span>&</span> request as many designs as
                  you'd like.
                </p>
                <div className="position-left-margin">
                  <ArrowToMove className={`z-index card-arrow-1 `} />
                  <CardInside
                    style={{
                      marginBottom: "-1%",
                      opacity: 1,
                      paddingTop: "7px",
                    }}
                    className={`z-index card-description-1 absolute phoneSVGSize`}
                  />{" "}
                  <NewTaskBlue
                    style={{
                      marginBottom: "-1%",
                      opacity: 0,
                      paddingTop: "7px",
                    }}
                    className={`z-index card-description-opacity-1 absolute phoneSVGSize`}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div
            className="phoneCardSize"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            <Card
              width={"100%"}
              height={"100%"}
              className="custom-card"
              customStyles={{
                backgroundColor: hoveredCard === 2 ? "#3FE8BE" : "transparent",
                color: hoveredCard === 2 ? "#000000" : "#000000",
              }}
            >
              <div className="description1 parent-container">
                <h2>Prioritize your orders</h2>
                <p className="desc-txt phonePosition">
                  Align your order to fit your priority so we can handle them
                  fast.
                </p>
                <div className=" position-left position-bottom z-index">
                  <HandToMove className={`z-index card-hand-2 hidden `} />
                  <CardInside2
                    style={{ marginBottom: "2.6%", marginLeft: "0%" }}
                    className={`z-index card-description-2 absolute phoneVersionPosition2 `}
                  />{" "}
                  <PriritaizeYourOrder
                    style={{ marginBottom: "2.6%", marginLeft: "0%" }}
                    className={`z-index card-description-opacity-2 hidden   `}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div
            className="phoneCardSize"
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave(3)}
          >
            <Card
              width={"100%"}
              height={"100%"}
              className="custom-card"
              customStyles={{
                backgroundColor: hoveredCard === 3 ? "#C6FF00" : "transparent",
                color: hoveredCard === 3 ? "#000000" : "#000000",
              }}
            >
              <div className="description1 parent-container">
                <h2>Best Profile</h2>
                <p className="desc-txt phonePosition">
                  We choose the best profile from our team to handle your order.
                </p>
                <div className="position-left3 position-bottom z-index card5 position3 ">
                  <CardInside3
                    style={{ paddingTop: "15%", marginLeft: "85%" }}
                    className="z-index phoneVersionPosition2  "
                  />
                </div>
              </div>
            </Card>
          </div>

          <div
            className="phoneCardSize"
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={() => handleMouseLeave(4)}
          >
            <Card
              width={"100%"}
              height={"100%"}
              className="custom-card"
              customStyles={{
                backgroundColor: hoveredCard === 4 ? "#000000" : "transparent",
                color: hoveredCard === 4 ? "#FFF" : "#000000",
              }}
            >
              <div className="description1 parent-container">
                <h2 style={{ paddingTop: "2%" }} className="z-index">
                  {" "}
                  Rate your orders
                </h2>
                <p className="desc-txt">
                  We'll revise the designs until you're 100% satisfied.
                </p>
                <div className="position-left5  z-index">
                  <CardInside4
                    style={{ marginTop: "-1%", marginLeft: "35.6%" }}
                    className={`z-index card-description-4 absolute phoneVersionPosition3`}
                  />{" "}
                  <OrderFeddbacks
                    style={{ marginTop: "-1.8%", marginLeft: "34.8%" }}
                    className={`z-index card-description-opacity-4 hidden absolute   phoneVersionPosition3`}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="bottom-side-description">
        <p ref={bottomPremiumRef}>
          Webflow Developer <BlueCrown /> Shopify Developer <GreenHeart />{" "}
          WordPress Developer <Snail /> UI/UX Designer <Shining /> Front-End
          Developer <ClockCircle /> Portals <Star /> Funnels <SideWayL />
        </p>
      </div>
    </div>
  );
}
