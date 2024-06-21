import React from 'react'
import { Div } from '../../../../../Divs/Div_Param'
import styles from './style.module.scss'
import Flex from '../../../../../Flex/center/FlexCenter'
import Panda from '../../../../../../assets/images/Dashboard/LoadingPanda.svg'
import Review from '../QR'

const Queue = ({NbrTasks}) => {
  return (
<Review
  imageSrc={Panda} 
  Hint="In Queue"
  tasksTxt={NbrTasks} 
  customstyle={styles.customstyle}
  customstyleTxt={styles.customstyleTxt}
/>
  )
}

export default Queue
