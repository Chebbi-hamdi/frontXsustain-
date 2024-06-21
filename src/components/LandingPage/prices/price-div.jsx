import React from "react";
import { ReactComponent as StarGroup } from "../../../assets/stargroup.svg";
import { ReactComponent as Infiniti } from "../../../assets/infiniti.svg";
import { ReactComponent as Calendar } from "../../../assets/calendar.svg";
import { ReactComponent as Calendar1 } from "../../../assets/calendar1.svg";
import { ReactComponent as Clock } from "../../../assets/clock.svg";
import { ReactComponent as Stats } from "../../../assets/stats.svg";
import { ReactComponent as Pause } from "../../../assets/pause.svg";

import axios from 'axios';



import Button from "../buttons";
import "./PriceDiv.css";
import Line from "../Line";

export default function PriceDiv(props,wid) {
  const brands = props.type === 'standard' ? [
    { name: "Unlimited Brands", icon: <Infiniti /> },
    { name: "Unlimited Users", icon: <Infiniti /> },
    { name: "Unlimited stock photos via Shutterstock", icon: <Infiniti /> },
    { name: "Webflow development", icon: <Calendar /> },
    { name: `1 request at a time`, icon: <Calendar1 /> },
    { name: "Average 48 hour delivery", icon: <Clock /> },
    { name: "Daily Updates & Progress Reports", icon: <Stats /> },
    { name: "Pause or Cancel Anytime", icon: <Pause /> },
] : [
  { name: "Unlimited Brands", icon: <Infiniti /> },
  { name: "Unlimited Users", icon: <Infiniti /> },
  { name: "Unlimited stock photos via Shutterstock", icon: <Infiniti /> },
  { name: "Webflow development", icon: <Calendar /> },
  { name: `2 request at a time`, icon: <Calendar1 /> },
  { name: "Average 48 hour delivery", icon: <Clock /> },
  { name: "Daily Updates & Progress Reports", icon: <Stats /> },
  { name: "Pause or Cancel Anytime", icon: <Pause /> },];

    const handleTransaction = async () => {
      // event.preventDefault();
      try {
        // const response = await axios.post('http://localhost:3000/api/v0/payment', { amount: props.price  });
        const response = await axios.post('http://192.168.11.113:3000/api/v0/payment', { amount: props.price  });
        const resultLink = response.data.result;
  
          window.location.href = resultLink.link;
          
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="price-div" style={{width:{wid}}}>
      <div className="phoneJustifyContent">
      <div className="typePlan">
        {props.type}
        </div>
      <h2 className="price">
        <StarGroup className="starGroup" /><span className="h2-phoneSize"> ${props.price}/m </span>
      </h2>
      <p>{props.desc}</p>
      </div>
      <div className="btnDivv">
      <Button
        color="#FFFFFF"
        background="#2468FF"
        customClassName="customButton" 
        onClick={handleTransaction}
      >
        Get started today
      </Button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p style={{ width: "154px", height: "14px", color: "#000", fontFamily: "AeonikRegular", fontSize: "12px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", width:"100%", textAlign: "center" }}>100% Satisfaction Guarantee</p>
      </div>
  
   
      <Line></Line>
      <br></br>      <br></br><br></br>

      {brands.map((brand, index) => (
        <div key={index}>
          {brand.icon}
          <span className="packText">{brand.name}</span> 
          <br></br><br></br><br></br>

        </div>

      ))}
    </div>
  );
}
