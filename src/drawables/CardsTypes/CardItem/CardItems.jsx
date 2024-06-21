import React from 'react'
import styles from './style.module.scss'
import { Div } from '../../Divs/Div_Param'



const CardItems = ({key, onclick, Height, Width, image, Title}) => {
    // const handleClick = () => {
    //     console.log("Card clicked"); // Add this line to check if handleClick is triggered
    //     //onClick(); // Trigger the onClick prop
    // };
    return (

    <div height={Height} width={Width} className={styles.MainCard} onClick={onclick}>
    <Div className={styles.flex} height={"100%"} width={"100%"}>
      <Div className={styles.card_box} width={"100%"}>
        <Div width={"100%"} className={styles.imgCont}>
          <img src={image} alt='' className={styles.img}></img>
        </Div>
        <Div className={styles.TxtCont}>
          <Div className={styles.flex1} height={"90%"} width={"100%"}>
            <p className={styles.Title}>{Title}</p>
          </Div>
        </Div>
      </Div>
    </Div>
  </div>


    )
}

export default CardItems
