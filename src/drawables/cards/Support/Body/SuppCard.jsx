import React from 'react'
import { Div } from '../../../Divs/Div_Param'
import styles from './style.module.scss'
import Flex from '../../../Flex/flex'

const SuppCard = ({Height,Width,imagee,Title,Descrption,className}) => {
  return (
    <Div height={Height} width={Width} className={styles.MainCard} >
        <Div className={styles.flex} height={"100%"} width={"100%"} >
            <div className={`${styles.card_box} ${className}`} >
                <Div  width={"90%"} className={styles.imgCont}>
                    <img src={imagee} alt='' className={styles.img}></img>
                </Div>
                <Div   className={styles.TxtCont}>
                    <Div className={styles.flex1} height={"50%"} width={"100%"} >

                        <p className={styles.Title}>{Title}</p>
                        <p className={styles.Descrption}>{Descrption}</p>      
                    </Div>

                </Div>
            </div>
            
        </Div>
        
    </Div>
  )
}

export default SuppCard
