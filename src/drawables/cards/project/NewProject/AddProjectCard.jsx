import React from 'react'
import {  Div } from '../../../Divs/Div_Param'
import styles from './AddProjectCard.module.scss'
import { P14,H24 ,P11} from '../../../txt/Txt';
import outline from "../../../../assets/images/outline.svg"

const AddProjectCard = () => {
  return (
    <Div width={"32%"} height={'70%'}  className={styles.Main}>
            <img src={outline} className={styles.Outline}></img>
            <P14 className={styles.Create}>Create a New Project</P14>
    </Div >
  )
}

export default AddProjectCard
