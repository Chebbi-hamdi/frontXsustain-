import React from 'react'
import styles from  "./styles.module.scss";
import Line from "../../LandingPage/Line/index";
import { ReactComponent as PandaWithComputer } from "../../../assets/pandaComputer.svg";
import { ReactComponent as PandaPlaying } from "../../../assets/PandaPlaying.svg";
import ArrowContact from '../../../assets/images/Pricing/arrowContact.svg'
import Infinie from '../../../assets/images/Pricing/infinie.svg'
import Calendar from '../../../assets/images/Pricing/calendar.svg'
import Daily from '../../../assets/images/Pricing/Daily.svg'
import Pause from '../../../assets/images/Pricing/pause.svg'
import Upgrade from '../../../assets/images/Pricing/upgrade.svg'
const index = () => {
  return (
    <div className={styles.mainPackFlex}>  
        <div className={styles.mainPackFlexCenter}>
            <div style={{height:'71vh',width:'80%',backgroundColor:'#F9F9F9'}}>

                <div className={styles.DivCustomPack}>
                    <p className={styles.CustomPack}>
                        Custom Pack
                    </p>
                    <p className={styles.CustomPP}>
                    For fast-moving agencies, marketing teams & scale-ups who need access to reliable on-demand design & dev talents to move even faster.
                    </p>
                </div>
                <div className={styles.DivCustomPrice}>
                    <p className={styles.CustomPrice}>
                        Custom Price
                    </p>
                    <p className={styles.CustomPriceP}>
                        Pause or cancel anytime                
                    </p>
                </div>
                <div className={styles.FlexButtonContact}>
                    <div className={styles.ButtonContact}>

                        <p className={styles.PBtnContact} >Contact us</p> 
                        <img src={ArrowContact} alt='contact' className={styles.arrowContact}></img>
                        
                    </div>
                </div>
                <div className={styles.centerSatisfaction}>
                    <p className={styles.Satisfaction}>100% Satisfaction Guarantee</p>  
                </div>
                <div className={styles.FlexPropsss}> 
                    <div style={{width:'50%'}}>
                        <div className={styles.FlexProps}>
                            <img src={Infinie} alt='infinité'></img>
                            <p className={styles.PropsP}>Unlimited Design & Development Requests</p>
                        </div>
                        <div className={styles.FlexProps}>
                            <img src={Infinie} alt='infinité'></img>
                            <p className={styles.PropsP}>Unlimited Brands & Feautres</p>
                        </div>
                        <div className={styles.FlexProps}>
                            <img src={Infinie} alt='infinité'></img>
                            <p className={styles.PropsP}>Unlimited Revisions</p>
                        </div>
                        <div className={styles.FlexProps}>
                            <img src={Infinie} alt='infinité'></img>
                            <p className={styles.PropsP}>Unlimited stock photos via Shutterstock</p>
                        </div>
                    </div>
                    <div style={{width:'50%'}}>
                        <div className={styles.FlexProps}>
                            <img src={Calendar} alt='infinité'></img>
                            <p className={styles.PropsP}>1 request Design & 1 request dev</p>
                        </div>
                        <div className={styles.FlexProps}>
                            <img src={Daily} alt='infinité'></img>
                            <p className={styles.PropsP}>Daily Updates & Progress Reports</p>
                        </div>
                        <div className={styles.FlexProps}>
                            <img src={Pause} alt='infinité'></img>
                            <p className={styles.PropsP}>Pause or Cancel Anytime</p>
                        </div>
                        <div className={styles.FlexProps}>
                            <img src={Upgrade} alt='infinité'></img>
                            <p className={styles.PropsP}>Upgrade or Downgrade Anytime</p>
                        </div>

                    </div>
            </div>
            </div>
            <div className="price-div priceDivyess" style={{width:'30%',backgroundColor:'#F9F9F9'}}>
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
  )
}

export default index
