import React from 'react'
import { Div } from '../../../drawables/Divs/Div_Param'
import styles from './style.module.scss'
import SearchBar from '../../../drawables/cards/Support/Head/SearchBar/SearchBar'
import Line from '../../../assets/images/Support/Line.svg'

const Headd = () => {
  return (
    <Div width={'95%'} height={"90%"} className={styles.MainHeadSupp}>
        <Div height={"90%"} width={"90%"} className={styles.TextContainerHead}>
            <p className={styles.HeadTxt}>How can we <span className={styles.Healp}>Help</span> ?<img src={Line} alt='' className={styles.imgTitle}></img></p>
            
            {/* <SearchBar/> */}

        </Div>
    </Div>
  )
}

export default Headd
