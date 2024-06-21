import React from "react";
import "./style.css"

export default function Service(props){
    return(
        <div className="service service-item" style={{background : props.background , color : props.color}}>
            <p className="serviceName">{props.text}</p>
        </div>
    )
}