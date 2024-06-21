import React from 'react'
import Head from '../../../drawables/cards/Tearm_Policy/Head/Headd'
import Tearms from '../../../drawables/cards/Tearm_Policy/body/TearmCard'
import styles from "./style.module.scss"
const tearm = () => {
  return (
    <div className={styles.MainPrivacy}>
    <Head Title="Terms and Conditions"/>
    <Tearms TearmOrPolicys={["a. Personal Information: We may collect personal information, including but not limited to names, contact details, and payment information, when you use our services. ","b. Usage Data: We may collect information about how you interact with our platform, such as the pages you visit and your interactions.", "c. Device Information: We may collect information about your device, including IP address, browser type, and device identifiers."]} Titles={"1. Introduction"}/>
    <Tearms TearmOrPolicys={["a. xsustain provides [brief description of services]. ","b. Users must be [age] or older to use xsustain. ","c. Users agree not to use xsustain for any illegal or unauthorized purpose."]} Titles={"2. Use of the Service"}/>
    <Tearms TearmOrPolicys={["a. Users may need to create an account to access specific features. ","b. Users are responsible for maintaining the confidentiality of their account information."]} Titles={"3. Account Registration and Security"}/>
    <Tearms TearmOrPolicys={["a. xsustain's Privacy Policy explains how user data is collected, used, and protected. By using xsustain, you acknowledge and agree to our Privacy Policy."]} Titles={"4. Privacy Policy"}/>
    <Tearms TearmOrPolicys={["a. Users retain ownership of content they submit to xsustain."," b. Users grant xsustain a non-exclusive license to use, modify, and distribute their content for the purpose of providing the services."]} Titles={"5. User Content"}/>
    <Tearms TearmOrPolicys={["a. Users agree not to engage in any behavior that violates these terms or any applicable laws."]} Titles={"6. Prohibited Conduct"}/>
    <Tearms TearmOrPolicys={["a. xsustain reserves the right to terminate or suspend accounts for violations of these terms or any applicable laws."]} Titles={"7. Termination"}/>
    <Tearms TearmOrPolicys={["a. xsustain is not liable for any damages or losses resulting from the use of our services."]} Titles={"8. Limitation of Liability"}/>
    <Tearms TearmOrPolicys={["a. These terms are governed by and construed in accordance with the laws of [your jurisdiction]."]} Titles={"9. Governing Law"}/>


  </div>

  )
}

export default tearm
