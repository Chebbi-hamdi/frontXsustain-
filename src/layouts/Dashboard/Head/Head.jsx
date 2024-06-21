import React from 'react'
//import AddButton from "../../../assets/images/Dashboard/add-square.svg"
//import Profiles from "../../../assets/images/Dashboard/Profiles.svg"
//import DashboardIcon from "../../../assets/images/Dashboard/category.png"
import Flex from '../../../drawables/Flex/center/FlexCenter'
import { Div } from '../../../drawables/Divs/Div_Param'
import styles from "./style.module.scss"
import { H24, H28,P14 } from '../../../drawables/txt/Txt'

const Head = () => {
  return (
    /*<Flex height="100%" width="100%">
      <Div width={"48%"} height={"98%"} className={styles.DashTitle}>
        <Flex height='100%' width="100%" className={styles.Img_Title} align='center'>
            <img src={DashboardIcon} alt='ok' className={styles.DashboardIcon}></img>
            <H28 weight={'bold'} >Dashboard</H28>
        </Flex>

      </Div>
      <Div width={"48%"} height={"98%"} className={styles.AddProfiles}>
        <Flex height='100%' width="100%" className={styles.AddProfilesButton}>
          <div className={styles.PlusInvite}>
            <img src={AddButton} alt='ok' className={styles.AddButton}></img>
            <p className={styles.Invite}>Invite</p>
          </div>
 
            <img src={Profiles} alt='ok' className={styles.Profiles}></img>


        </Flex>

      </Div>
    </Flex>*/
    <Div height={"100%"} width={"100%"}className={styles.MainHeadDash0} >
            <Div height={"90%"} width={"100%"} className={styles.MainHeadDash}>

      <Div height={"100%"} width={"90%"} className={styles.PandaCont}>
        <H28 className={styles.Title}>XSUSTAIN.IO</H28>
        <P14 className={styles.Disc}>Making Your projects easier then ever</P14>
          

        </Div>
        </Div>
      


     

    </Div>
  )
}

export default Head
