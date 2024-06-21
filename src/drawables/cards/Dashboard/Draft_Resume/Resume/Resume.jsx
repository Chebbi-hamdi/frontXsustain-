import React from 'react'
import { Div } from '../../../../Divs/Div_Param'
import styles from './style.module.scss'
import PandaImg from "../../../../../assets/images/Dashboard/SleepyPanda.svg"
import Button from "../../../../buttons/button.Dash"
import CustomCard from '../cardDR'
const Draft = () => {
  return (
            <CustomCard
              title="Not sure What ro request?"
              hint="Make the most out of your XSUSTAIN Subscription by browsing our request types!"
              imageSrc={PandaImg}
              buttonText="Browse Request Types"
              ButtonTitle=" -"
              customClassName={styles.Custom}
              customImage={styles.CustomImg}
              CustomTxt={styles.CustomTxt}


            />  )
}

export default Draft
