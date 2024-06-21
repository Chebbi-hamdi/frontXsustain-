import React from 'react'
import { Div } from '../../../../../Divs/Div_Param'
import styles from './style.module.scss'
import Flex from '../../../../../Flex/center/FlexCenter'
import Panda from '../../../../../../assets/images/Dashboard/PandaFlag.svg'
import Queue from '../QR'
const Review = ({NbrTasks}) => {
  return (
    <Queue
  imageSrc={Panda}
  tasksTxt={NbrTasks} 
   Hint="Ready for review" 
   customstyle={styles.customstyle}
   customstyleTxt={styles.customstyleTxt}
/>
 )
}

export default Review
