import React from "react";
import "./style.css";
import { ReactComponent as FunkyPanda } from "../../../assets/funky-panda.svg";
import PriceDiv from "./price-div";
import Card from "../card";
import Line from "../Line";
import Button from "../../LandingPage/buttons/index";
import { ReactComponent as PandaWithComputer } from "../../../assets/pandaComputer.svg";
import { ReactComponent as PandaPlaying } from "../../../assets/PandaPlaying.svg";

export default function Prices() {
  return (
    <div className="prices">
      <div className="prices-container">
        <FunkyPanda className="funky-panda" />
        <PriceDiv wid={"35%"}
          type="STANDARD"
          price="1500"
          desc="One request at a time. Pause or cancel anytime."
          requests="1"
        />
        <PriceDiv wid={"35%"}
          type="PRO"
          price="2500"
          desc="One request at a time. Pause or cancel anytime."
          requests="1"
        />
        <div className="price-div priceDivyes" style={{width:'50%!important'}}>
          <div className="pricedivfirst">

          <div className="price-divflex">
            <div style={{width:"60%"}}>
            <div className="titlePrice3">Book a call</div>
              <p className="soustitrepar" style={{
                  color: "#757575",
                  fontFamily:"AeonikRegular",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  paddingTop:"6%"
                }}
>
                {"Learn more about how xsustain works and how it can help you."}
              </p>
              <p
                style={{
                  color: "#2468FF",
                  fontFamily:"AeonikRegular",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  paddingTop:"10%"
                }}
              >
                Book a call{" "}
              </p>
            
            </div>
            <PandaWithComputer className="positionSvg-left" />
          </div>
          </div>
          <br></br>
            <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <Line></Line>
          </div>
          <br></br>
          <div className="pricedivfirst" style={{height:'45%',display:'flex',alignItems:'center'}}>

            <div className="price-divflex">
              <div style={{width:"65%"}}>
              <div className="titlePrice3">Refer a friend & earn</div>
                <p className="soustitrepar" style={{
                    color: "#757575",
                    fontFamily:"AeonikRegular",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    paddingTop:"6%"
                  }}
            >
                  {"Earn 5% monthly recurring commissions for each referral."}
                </p>
                <p
                  style={{
                    color: "#2468FF",
                    fontFamily:"AeonikRegular",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    paddingTop:"10%"
                  }}
                >
                  Join now{" "}
                </p>
              
              </div>
              <PandaPlaying className="positionSvg-left" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
