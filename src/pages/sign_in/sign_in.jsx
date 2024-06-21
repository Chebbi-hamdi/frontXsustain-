import React from 'react'
import LeftPart from '../../layouts/left_part/left_part'
import styles from './style.module.scss'
import Login1 from '../../components/auth/login/login';
const sign_in = () => {
  return (
    <div className={styles.main_box}>
        <LeftPart /> 
        <Login1/>
        
    </div>   
  )
}

export default sign_in
