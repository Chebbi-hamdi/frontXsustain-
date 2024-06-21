import React, { useEffect, useState } from 'react';
import Container from '../../../drawables/containers/container'
import BorderContainer from '../../../drawables/containers/Boder_Container'
import styles from './style.module.scss'
import Draw from '../../../assets/images/draw.png'
import HeadProfile from "../../../layouts/profile/headProfile/HeadProfile"
import Teams from '../../../layouts/profile/Teams/Teams';
import Projects from '../../../layouts/profile/Projects/Projects';
import Overview from '../../../layouts/profile/Overview/Overview';
import { useSelector } from 'react-redux';
import Footer from "../../../layouts/footer/footer"
import { Div } from '../../../drawables/Divs/Div_Param';
const Corps_Pro = () => {

    const tab_name = useSelector(state => state.variables.tabName)
    const user = useSelector(state => state.token.user); // Assuming user data is stored under 'user' key in persistedReducer

    const userId = user ? user?._id : '';

    const [value,setValue] = useState('')

    useEffect(()=>{
        setValue(tab_name)
    },[tab_name])
    
    return (
        <Container className={styles.main}>
            <img src={Draw} alt='' className={styles.draw}></img>
            <HeadProfile setSelectedTab={value} selectedTab={value} />
            
            {value === "overview" && <Overview setSelectedTab={setValue} />}
            {value === "teams" && <BorderContainer width={"90%"} height={"85%"} flex={"center"}> <Teams /></BorderContainer>}
            
            {value === "projects" && <BorderContainer width={"90%"} height={"85%"} > <Projects /> </BorderContainer>}
            <div className={styles.footer}> 
                <Footer/>

            </div>

                
    
                 
        </Container>
    )
}

export default Corps_Pro
