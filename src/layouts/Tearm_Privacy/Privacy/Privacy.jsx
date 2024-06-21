import React from 'react'
import Head from '../../../drawables/cards/Tearm_Policy/Head/Headd'
import Policy from '../../../drawables/cards/Tearm_Policy/body/TearmCard'
import styles from "./style.module.scss"
const Privacy = () => {
  return (<div className={styles.MainPrivacy}>
    <Head Title="Privacy Policy"/>
    <Policy TearmOrPolicys={["a. xsustain is committed to protecting your privacy and ensuring the security of your personal information."]} Titles={"1. Introduction"}/>
    <Policy TearmOrPolicys={["a. Personal Information: We may collect personal information, including but not limited to names, contact details, and payment information, when you use our services."," b. Usage Data: We may collect information about how you interact with our platform, such as the pages you visit and your interactions.", "c. Device Information: We may collect information about your device, including IP address, browser type, and device identifiers."]} Titles={"2. Information We Collect"}/>
    <Policy TearmOrPolicys={["a. We use your information to provide and improve our services, customize your experience, and communicate with you. ","b. We may use your email address to send updates, newsletters, or promotional materials. You can opt-out of these communications at any time."]} Titles={"3. How We Use Your Information"}/>
    <Policy TearmOrPolicys={["a. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law."]} Titles={"4. Data Sharing and Third Parties"}/>
    <Policy TearmOrPolicys={["a. We implement security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure."]} Titles={"5. Data Security"}/>
    <Policy TearmOrPolicys={["a. We use cookies and similar technologies to enhance your experience, gather usage data, and improve our services."]} Titles={"6. Cookies and Similar Technologies"}/>
    <Policy TearmOrPolicys={["a. You have the right to access, correct, or delete your personal information. Contact us to exercise these rights."]} Titles={"7. Your Rights"}/>
    <Policy TearmOrPolicys={["a. xsustain does not knowingly collect personal information from children under the age of 13. If we become aware of such data, we will promptly delete it."]} Titles={"8. Children's Privacy"}/>
    <Policy TearmOrPolicys={["a. We reserve the right to update or modify this Privacy Policy at any time. Changes will be effective upon posting."]} Titles={"9. Changes to This Privacy Policy"}/>
    <Policy TearmOrPolicys={["a. If you have questions or concerns about our Privacy Policy, contact us at [contact email/phone]."]} Titles={"10. Contact Information"}/>

  </div>

      
  )
}

export default Privacy
