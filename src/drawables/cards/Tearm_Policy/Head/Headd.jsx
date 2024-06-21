import React from 'react'
import style from './style.module.scss'
import { Div } from '../../../Divs/Div_Param'
import { H24 } from '../../../txt/Txt'
const Headd = ({Title}) => {
  return (
    <Div className={style.Head}>
        <Div className={style.HeadCenter}>
            <H24 className={style.Title}>{Title}</H24>
        </Div>
    </Div>
  )
}

export default Headd
