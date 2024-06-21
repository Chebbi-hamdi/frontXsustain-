import React from 'react'
import World from '../../../assets/images/Pricing/World.svg'
import Roquet from '../../../assets/images/Pricing/Roquet.svg'
import Infinity from '../../../assets/images/Pricing/infinityWhite.svg'
import LineVerticale from '../../../assets/images/Pricing/LIneVerticale.svg'
import styles from './style.module.scss'
const index = () => {
  return (
    <div style={{height:''}}>
      <div className={styles.HeadTitlePlan}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <p className={styles.BigTitlex}>
                GO-TO-MARKET, 
                <span className={styles.BlueSpannn}>
                    FAST.
                </span>
            </p>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

            <p className={styles.ParagT}> 
                Our structured timeline and process ensure your project is completed on time, within budget, and to your satisfaction. We'll keep you informed every step of the way, from initial concept to final delivery.
            </p>
        </div>

      </div>
      <div>
        <div style={{position:'relative'}}>
            <div className={styles.HeadTabPlanFlex}>
                <div className={styles.HeadTabPlan}>
                    <p className={styles.PColone}>WEEK 1</p>
                </div>
                <img src={LineVerticale}></img>
                <div className={styles.HeadTabPlan}>
                    <p className={styles.PColone}>WEEK 2</p>
                </div>
                <img src={LineVerticale}></img>

                <div className={styles.HeadTabPlan}>
                    <p className={styles.PColone}>WEEK 3</p>
                </div>
                <img src={LineVerticale}></img>

                <div className={styles.HeadTabPlan}>
                    <p className={styles.PColone}>WEEK 4</p>
                </div>
                <div className={styles.ButtonsDivTab}>
                    <div className={styles.centerButtonsyes}>
                        <div>

                            <div className={styles.FirstDiv}>
                                <img src={Infinity}></img>
                                <p>UNLIMITED DESIGN</p>
                            </div>
                        </div>
                        <div style={{display:'flex',alignContent:'center',justifyContent:'center',width:'100%'}}>

                            <div className={styles.SecondDiv}>
                                <img src={World}></img>

                                <p>WEB DEVELOPMENT</p>
                            </div>
                        </div>
                        <div style={{display:'flex',alignContent:'flex-end',justifyContent:'flex-end',width:'100%'}}>

                            <div className={styles.ThirdDiv}> 
                                <img src={Roquet}></img>

                                <p>QA & LAUNCH</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
      <div style={{height:'15vh'}}>

      </div>
    </div>
  )
}

export default index
