import React from 'react'
import styles from './style.module.scss'
import TaskIcon from '../../../../assets/images/TaskManager/task-square.svg'
import SearchBar from '../../../../drawables/SearchInput/SearchBar'
import Flex from '../../../../drawables/Flex/flex'
import { H24 } from '../../../../drawables/txt/Txt'
import { Div } from '../../../../drawables/Divs/Div_Param'
import { getProjects, getTasks } from '../../../../store/Project-Task-Slice'
import { useSelector } from 'react-redux'
const Head = ({title}) => {

  return (
    <Div className={styles.MainHT}>
        <Div height={"90%"} className={styles.LeFlex}>
            <Div className={styles.Title}>
                <Flex className={styles.flexTitle}>
                <Div >
                    <img className={styles.Icon} src={TaskIcon} alt=''></img>
                </Div>
                <Div >
                    <H24 className={styles.TitileTxt}>{title} manager</H24>
                </Div>

                </Flex>
            </Div>
            <Div className={styles.SearchBar}>
                <Div>
                    <SearchBar className={styles.SearchBar0} /> 
                </Div>
            </Div>
        </Div>
      
    </Div>
  )
}

export default Head
