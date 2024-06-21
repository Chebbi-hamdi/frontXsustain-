import React, { useState, useEffect } from 'react';
import BorderContainer from '../../../drawables/containers/Boder_Container';
import Flex from '../../../drawables/Flex/flex';
import Container from '../../../drawables/containers/container';
import styles from './style.module.scss';
import PtiPanda from '../../../assets/images/pandas.png';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector from react-redux to access Redux state
import CardButton from '../../../drawables/buttons/CardButton';
import TeamIm from '../../../assets/images/teams.svg';
import OverIm from '../../../assets/images/overview.svg';
import ProIm from '../../../assets/images/projects.svg';
import { P14 } from '../../../drawables/txt/Txt';
import { setTabName } from '../../../store/variablesSlice';
import EditIcon from '../../../assets/images/Edit_Icon.svg';
import BubleImg from '../../../drawables/bubleimg/bubleImg';
import { useUpdateProfilePic } from '../../../functions/UseMutation/useMutationProfile';
import { getProfilePic } from '../../../store/profile';
import { getProgressUpload } from '../../../store/uploadSlice';
import { LinearProgress } from '@mui/material';

const HeadProfile = ({ setSelectedTab, selectedTab }) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.token.user);
    const tab_name = useSelector(state => state.variables.tabName);
    const userUpdate = useSelector(state => state.profile.profileUpdate);
    const updatedImage = useSelector(getProfilePic);
console.log('get get ',updatedImage)
console.log('get----------------------------------------------- get ',userUpdate)
console.log('get----------------------------------------------- get ',userData)

    const [value, setValue] = useState('');
    const ProfilePic =userData?.imagePath ;

    useEffect(() => {
        setValue(tab_name);
    }, [tab_name]);

    // Call useUpdateProfilePic outside of the component
    const mutation = useUpdateProfilePic();

    // Watch for changes in updatedProfilePic and update ProfilePic accordingly
    
    // Fonction appelée lorsque l'utilisateur sélectionne une nouvelle image de profil
    const handleProfilePicChange = (event) => {
        const selectedFile = event.target.files[0]; // Prend le premier fichier sélectionné
        mutation.mutate(selectedFile,dispatch);
    };
    const progress = useSelector(getProgressUpload)
    useEffect(()=>{

        console.log('pro[[[o',progress)
    })

    return (
        <BorderContainer width={"90%"} height={"15%"} flex={"center"}>
            <Container className={styles.header_container} flex='center'>
                <Flex className={styles.flexx} flex="space-between">
                    <Container width="30%" className={styles.profile}>
                        <img src={PtiPanda} alt='' className={styles.Panda}></img>
                        <Container className={styles.userData}>
                            {userData && (
                                <>
                                    <div className={styles.profileImgContainer}>
                                        {(ProfilePic === null || ProfilePic === undefined) ?
                                            <BubleImg user={userData} /> : (updatedImage === null || updatedImage === undefined)?

                                            <img src={ProfilePic} alt='' className={styles.profileImg} />:
                                            <img src={updatedImage} alt='' className={styles.profileImg} />
                                        
                                        }
                                        <label htmlFor="profilePicInput">
                                            <img src={EditIcon} alt='' className={styles.EditIcon} />
                                        </label>
                                        <input
                                            type="file"
                                            id="profilePicInput"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleProfilePicChange}
                                        />
                                          {progress !== undefined && progress !== null && !isNaN(progress) && progress >= 0 && progress <= 100 && progress !== 100 && (
                          <LinearProgress variant="determinate" value={progress} />
                        )}
                                    </div>

                                    <Container className={styles.name}><Container>{userData?.name || userUpdate?.user?.name}</Container>
                                        <Container className={styles.email}>{userData?.email?.primary || userUpdate?.user?.email?.primary}</Container>
                                    </Container>
                                </>
                            )}

                        </Container>
                    </Container>
                    <Container width="50%" className={styles.navig}>

                        <CardButton
                            imageStyle={{ width: '22px', height: '22px' }}
                            image={OverIm}
                            width="30%"
                            className={value === "overview" ? styles.active : undefined} // Updated className prop

                            onClick={() => dispatch(setTabName("overview"))}
                        >
                            <P14 color={"#000"} weight={'bold'} >OVERVIEW</P14>
                        </CardButton>

                        <CardButton
                            imageStyle={{ width: '22px', height: '22px' }}
                            image={TeamIm}
                            width="30%"
                            className={value === "teams" ? styles.active: undefined}

                            onClick={() => dispatch(setTabName("teams"))}
                        >
                            <P14 color={"#000"} weight={'bold'}>TEAMS</P14>
                        </CardButton>

                        <CardButton
                            imageStyle={{ width: '22px', height: '22px' }}
                            image={ProIm}
                            width="30%"
                            className={value === "projects" ? styles.active:undefined}

                            onClick={() => dispatch(setTabName("projects"))}
                        >
                            <P14 color={"#000"} weight={'bold'}>PROJECTS</P14>
                        </CardButton>

                    </Container>
                </Flex>
            </Container>
        </BorderContainer>
    );
}

export default HeadProfile;
