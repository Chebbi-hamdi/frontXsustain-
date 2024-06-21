import React from 'react'
import Draw from '../../assets/images/draw.png'
import styles from "./style.module.scss"
import Headd from "../../layouts/TaskManager/Manager/Head/Head"
import { Div } from '../../drawables/Divs/Div_Param'
import Flex from '../../drawables/Flex/flex'
import ProjectManagerLay from '../../layouts/projectManager/projectManagerLay'
import { getProjects } from '../../store/Project-Task-Slice'
import { useSelector } from 'react-redux'
const ProjectManagerComp = () => {

  return (
    <Div height={'90dvh'} width={"100%"} className={styles.MainCardD}>
      <Flex  width='95%' height='90%'   className={styles.LeFlex}>
        <Div width="100*%" height={"15%"} className={styles.Header}>
          <img src={Draw} alt='mm' className={styles.Draw}></img>

          <Headd title={'Project'}/>
        </Div>
          <Div width={"100%"} height={"90%"} className={styles.Bodyy}>
          <ProjectManagerLay />
        </Div>
      </Flex>

  </Div>
  )
}

export default ProjectManagerComp
