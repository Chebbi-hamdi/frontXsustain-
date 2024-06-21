import React from 'react'
import { Div } from '../../../drawables/Divs/Div_Param'
import styles from "./style.module.scss"
import Flex from "../../../drawables/Flex/center/FlexCenter"
import Footer from '../../../layouts/footer/footer'
import Headd from "../../../layouts/Dashboard/Head/Head"
import Bodyy from '../../../layouts/Dashboard/Body/Bodyy'
import Draw from '../../../assets/images/draw.png'

const Dashboard = () => {
  return (
    <Div height={'90%'} width={"100%"} className={styles.MainCardD}>
      <Flex  width='100%' height='100%'   className={styles.LeFlex}>
        <Div width="95%" height={"35%"} className={styles.Header}>
          <img src={Draw} alt='mm' className={styles.Draw}></img>

          <Headd/>
        </Div>
          <Div width={"95%"} height={"57%"} className={styles.Bodyy}>
          <Bodyy/>
          <Footer ></Footer>

        </Div>
      </Flex>
    </Div>
  )
}

export default Dashboard
