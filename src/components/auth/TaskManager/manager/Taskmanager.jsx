import React from 'react'
import Draw from '../../../../assets/images/draw.png'
import { Div } from '../../../../drawables/Divs/Div_Param'
import styles from "./style.module.scss"
import Flex from "../../../../drawables/Flex/center/FlexCenter"
import Headd from "../../../../layouts/TaskManager/Manager/Head/Head"
import Bodyy from '../../../../layouts/TaskManager/Manager/Body/Body'
import { useSelector } from 'react-redux'
import { getProjects } from '../../../../store/Project-Task-Slice'
const Taskmanager = () => {
  return (
    <Div height={'90dvh'} width={"100%"} className={styles.MainCardD}>
      <Flex  width='95%' height='90%'   className={styles.LeFlex}>
        <Div width="100*%" height={"15%"} className={styles.Header}>
          <img src={Draw} alt='mm' className={styles.Draw}></img>

          <Headd  title={'Task'} />
        </Div>
          <Div width={"100%"} height={"90%"} className={styles.Bodyy}>
          <Bodyy/>
        </Div>
      </Flex>

  </Div>
  )
}

export default Taskmanager
