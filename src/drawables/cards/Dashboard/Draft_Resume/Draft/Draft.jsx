import React from 'react'
import { Div } from '../../../../Divs/Div_Param'
import styles from './style.module.scss'
import PandaImg from "../../../../../assets/images/Dashboard/PandaReview.svg"
import Button from "../../../../buttons/button.Dash"
import CustomCard from '../cardDR'
const Draft = () => {
  return (
            <CustomCard
              title="Resume Your draft"
              hint="You have one or more saved draft in your queue."
              imageSrc={PandaImg}
              buttonText="Recent saved draft"
              ButtonTitle="Resume your draft"
              customClassName={styles.Custom}
              customImage={styles.CustomImg}


            />

      
  )
}

export default Draft
