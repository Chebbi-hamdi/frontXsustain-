import React, {  useRef} from 'react';
import { P14,H24 } from '../../../drawables/txt/Txt';
import Container from '../../../drawables/containers/container'
import styles from './style.module.scss'
import BorderContainer from '../../../drawables/containers/Boder_Container'
import { Div } from '../../../drawables/Divs/Div_Param';
import ProjectCard from "../../../drawables/cards/project/AllProject/Project"
import AddProjectCard from "../../../drawables/cards/project/NewProject/AddProjectCard"
import { useSelector } from 'react-redux';
import { useProject } from '../../../functions/UseQuery/ProjectQuery';
import LoaderSpin from '../../../drawables/loader/LoaderSpin';
const Projects = () => {
    const user = useSelector(state => state.token.user); // Assuming user data is stored under 'user' key in persistedReducer

    const { Projects, isLoading, isError, error } = useProject(user._id);
    console.log('=======',Projects)


    if(isLoading) return <LoaderSpin />;

  return (
    <div className={styles.Main} >
        <div className={styles.center} >
                <Div width="95%" height="17%" className={styles.Title}>
                    <H24 className={styles.h3Team}>Projects</H24>
                    <P14 className={styles.pTeam}>Projects already done</P14>
                </Div>            
                <Container  className={styles.allProject}>
                        <Div height={"90%"} width={"90%"} className={styles.ListProject}>
                            {Projects?.map((proj,index)=>(
                                     <ProjectCard id={proj._id} image={proj?.imagePath} name={proj?.name} index={index}></ProjectCard>

                            ))

                            }
                            <AddProjectCard></AddProjectCard>
                        </Div>
                </Container>

            
        </div>
    
</div>
)
}

export default Projects
