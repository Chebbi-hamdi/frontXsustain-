import React from "react";
import {ReactComponent as BlackHearts} from '../../../assets/black-hearts.svg'

import './style.css'
import Service from "./service";
import  Deb from '../../../assets/debRekch.png'
import {ReactComponent as Swish} from '../../../assets/Swish.svg'

export default function Services(){
    return(
        <div className="description">
            <div className="top-side-description services">
                <h1>Branding & Development<br/>
                    <span>& more.<BlackHearts className="HeartIcon scnd"/></span>
                </h1>
                <div className="service-list">
                    <Service background="#2468ff" color="white" text="Landing pages"/>
                    <Service background="#3FE8BE" color="black" text="Mobile apps"/>
                    <Service background="#C6FF00" color="black" text="Logos"/>
                    <Service background="#DFDFDF" color="black" text="Branding"/>
                    <Service background="#2468ff" color="white" text="Slide Decks"/>
                    <Service background="#C6FF00" color="black" text="Brand Guides"/>
                    <Service background="#DFDFDF" color="black" text="Icons"/>
                    <Service background="#2468ff" color="white" text="Webflow"/>
                    <Service background="#3FE8BE" color="black" text="Social media"/>
                </div>

            </div>
            <div className="gifs">
                <img className="deb" src={Deb} ></img>
                <div className="gif-card">
                <video className="gif-card" autoPlay loop muted>
                <source src={require("../../../assets/videos/1.mp4")} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="gif-card">
                <video className="gif-card" autoPlay loop muted>
                <source src={require("../../../assets/videos/2.mp4")} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="gif-card">
                <video className="gif-card" autoPlay loop muted>
                <source src={require("../../../assets/videos/3.mp4")} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <Swish/>
            
        </div>
    )
}