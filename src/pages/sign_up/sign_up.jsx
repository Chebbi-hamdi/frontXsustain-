import React from 'react'
import LeftPart from '../../layouts/left_part/left_part'
import styles from './style.module.scss';
import Registers from '../../components/auth/register/register';
const sign_up = () => {
  return (
    <div  className={styles.main_box}>
      <LeftPart/>
      <Registers/>

    </div>
  )
}

export default sign_up
