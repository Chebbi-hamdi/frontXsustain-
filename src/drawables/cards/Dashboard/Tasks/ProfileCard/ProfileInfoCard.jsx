import React from 'react'
import { Div } from '../../../../Divs/Div_Param'
import styles from "./style.module.scss"
import Flex from '../../../../Flex/center/FlexCenter'
import Panda from '../../../../../assets/images/Dashboard/WelcomePanda.svg'
const ProfileInfoCard = ({Name}) => {
  return (
    <Div width={"100%"} height={"100%"} className={styles.MainReview}>
       <Flex flex='center' className={styles.fullHeight}>
        <Div width={"90%"} height={"100%"}>


          <Flex width={"100%"} height={"100%"} flex='between' align='center'className={styles.fullHeight1}>

            <Div width={"70%"}  className={styles.WelcomeTxt}>
              <p className={styles.Welcom}>Happy to see you again</p>
              <p className={styles.Name}>{Name}</p>


            </Div>
            <img src={Panda} alt='' className={styles.Image}></img>
          </Flex>
        
        </Div>
       </Flex>
    </Div>

  )
}

export default ProfileInfoCard
