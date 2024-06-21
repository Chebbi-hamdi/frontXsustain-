import React from 'react'
import styles from './style.module.scss'
import { Container } from '@mui/material'
import ProfilePic from "../../../../../assets/images/profilePic.png"
import Cam from '../../../../../assets/images/Cam.svg'
import Phone from '../../../../../assets/images/Phone.svg'
import More from '../../../../../assets/images/autre.svg'
import BubleImg from '../../../../../drawables/bubleimg/bubleImg'

const Header = ({ selectedItem }) => {
  return (
    <div className={styles.MainCardH}>
                
                <Container className={styles.UserInfo}>
                    {selectedItem?.participants[0]?.imagePath ? (
                      <img src={selectedItem.participants[0].imagePath} alt='' className={styles.ProfilePicH} />
                        ) : (
                            <BubleImg user={selectedItem?.participants[0]} />
                        )}                
                          
                    <p className={styles.NameH}>{selectedItem?.participants[0]?.name}<p className={styles.StatusH}>Status</p></p>
               
                </Container>
                <Container className={styles.ButtonsH}>
                      {/*<img src={Cam} alt='' className={styles.Cam}></img>
                  <img src={Phone} alt='' className={styles.Phone}></img>*/}
                    <img src={More} alt='' className={styles.More}></img>

                </Container>

      
    </div>
  )
}

export default Header
