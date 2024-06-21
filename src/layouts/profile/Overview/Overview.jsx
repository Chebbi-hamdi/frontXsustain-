// Overview.js

import React, { useEffect, useState } from 'react';
import Container from '../../../drawables/containers/container';
import Flex from "../../../drawables/Flex/flex";
import styles from './style.module.scss';
import { P16 } from '../../../drawables/txt/Txt';
import { useSelector } from 'react-redux'; 
import { useTeamData } from '../../../functions/UseQuery/TeamData';
import ProfileIm from "../../../assets/images/profilePic.png";
import Facebook from '../../../assets/images/face.svg'
import Instagram from '../../../assets/images/insta.svg'
import X from '../../../assets/images/X.svg'
import { Link } from 'react-router-dom';
import Edit from '../../../assets/images/edit_but.svg'
import BorderConBasic from '../../../drawables/containers/Border_Con_Basic'
import BasicSwitch from '../../../drawables/buttons/Switch'; // Importing the BasicSwitch component
import salamanka from '../../../assets/images/vector.svg'
import { Div } from '../../../drawables/Divs/Div_Param';
import { useProfileData } from '../../../functions/UseQuery/ProfileInfo';
import BubleImg from '../../../drawables/bubleimg/bubleImg'
import { AbleNotif, DisableNotif } from '../../../api/notif';
import "./modal.css";
import { Modal } from "@mui/material";
import { useUpdateProfile } from "../../../functions/UseMutation/useMutationProfile";
import HoverTip from '../../../drawables/cards/hoverTip/HoverTip';
import { useDispatch } from 'react-redux';
import { getNotifGlob, getNotifMessagerie, getNotifTask, setNotifGlob, setNotifMessagerie, setNotifTaskk } from '../../../store/settingsSlice';
import LoaderSpin from '../../../drawables/loader/LoaderSpin';

const Overview = ({ setSelectedTab }) => {
    const userData = useSelector(state => state.token.user);
    const { Team, isLoading: teamLoading } = useTeamData(userData?._id);
    const { UserProfile, isLoading: profileLoading } = useProfileData(userData?._id);
    const [notifGlobal, setNotifGlobal] = useState(userData.notifGlobal);
    const [notifTask, setNotifTask] = useState(userData.notifTask);
    const [notifMessage,setNotifMessage ] = useState(userData.notifMessages);
    let nature;
    const userUpdate = useSelector((state) => state.profile.profileUpdate);
    console.log("userUpdate--------------", userUpdate);
  
    const [openModal, setOpenModal] = useState(false);
    const [userName, setUserName] = useState("");
    //   const [userEmail, setUserEmail] = useState("");
      const [userPhone, setUserPhone] = useState("");
      const [userLocation, setUserLocation] = useState("");
      const useUpdateProfileData = useUpdateProfile();
      const dispatch = useDispatch();

    useEffect(() => {
      setNotifGlobal(userData.notifGlobal);
    }, [userData.notifGlobal]);
  
    if (teamLoading || profileLoading) {
        return <LoaderSpin />;
        }

    const handleToggle = async () => {
        if(notifGlobal){
            setNotifGlobal(false)
            setNotifTask(false)
            setNotifMessage(false)
            dispatch(setNotifGlob(false));
            dispatch(setNotifTaskk(false));
            dispatch(setNotifMessagerie(false));

            const nature = 'glob'
            DisableNotif(nature)
        }
        if(!notifGlobal){
            setNotifGlobal(true)
            setNotifMessage(true)
            setNotifTask(true)
            dispatch(setNotifGlob(true));
            dispatch(setNotifTaskk(true));
            dispatch(setNotifMessagerie(true));

            const nature = 'glob'
            AbleNotif(nature) 
        }
    };
    const handleToggleTask = () => {
        if(notifTask){
            setNotifTask(false)
            dispatch(setNotifTaskk(false));

            const nature = 'task'
            DisableNotif(nature)
        }
        if(!notifTask){
            setNotifTask(true)
            dispatch(setNotifTaskk(true));

            const nature = 'task'
            AbleNotif(nature) 
        }
    };
    const handleToggleMessage = () => {
        if(notifMessage){
            setNotifMessage(false)
            const nature = 'msg'
            dispatch(setNotifMessagerie(false));

            DisableNotif(nature)
        }
        if(!notifMessage){
            setNotifMessage(true)
            dispatch(setNotifMessagerie(true));

            const nature = 'msg'
            AbleNotif(nature) 
        }
    };
    const handleEditProfile = () => {
        setOpenModal(true);
        setUserName(userInfo?.name);
        // setUserEmail(userInfo.email);
        setUserPhone(userInfo?.phone?.primary);
        setUserLocation(userInfo.address);
    
        // console.log("Edit profile clicked", userInfo.name, userInfo.email);
      };
      const handleSubmitEditProfile = (e) => {
        e.preventDefault();
    
        useUpdateProfileData.mutate({
          name: userName,
        //   email: { primary: userEmail },
          phone: { primary: userPhone   },
          address: userLocation,
        });
        setOpenModal(false);
      };
        
    const userInfo = UserProfile?.user; // Safely access UserProfile.user

    // Flatten the array of teams into an array of all members
    const allMembers = Team?.team?.map(team => team?.members).flat();


    return (
        <Container className={styles.Main} width={"90%"}>
            <Flex className={styles.Secondary}>
                <BorderConBasic className={styles.PlatSett} width={"40%"} height={"100%"}>
                    <Div height={"90%"} className={styles.HeaderCard1}>
                        <Container height="20%" width={"100%"} className={styles.HeaderCard}> 
                            <Div flex='center' className={styles.Leflexx}>
                                <h2 className={styles.Title}>Platform Settings</h2>
                            </Div>
                        </Container>
                        <Div className={styles.Account}>
                            <div className={styles.AccountCenter}>
                                <h2 className={styles.AccountTitle}>ACCOUNT</h2>
                                <p className={styles.Follow}><BasicSwitch onChange={handleToggle}  checked={notifGlobal} /> Email me when someone follows me</p>
                                <p className={styles.Answer}><BasicSwitch onChange={handleToggleTask} checked={notifTask} /> Email me when someone answers on my post</p>
                                <p className={styles.Mention}> <BasicSwitch onChange={handleToggleMessage} checked={notifMessage} /> Email me when someone mentions me</p>
                            </div>
                        </Div>
                        <Div className={styles.Application}>
                            <div className={styles.ApplicationCenter}>
                                <h2 className={styles.appTitle}>APPLICATION</h2>
                                <p className={styles.Lanches}><BasicSwitch checked={notifGlobal} /> New launches and projects</p>
                                <p className={styles.Updates}><BasicSwitch checked={notifGlobal} /> Monthly product updates</p>
                                <p className={styles.Newsteller}> <BasicSwitch checked={notifGlobal} /> Subscribe to newsletter</p>
                            </div>
                        </Div>
                    </Div>
                </BorderConBasic>
                <BorderConBasic className={styles.ProfileInf} width={"30%"} height={"100%"}>
                    <Div className={styles.flexProfile} flex='center'>
                        <div style={{width:'95%',height:'100%'}}>
                            <Container height="50%" className={styles.HeaderProfileInfo}> 
                                <Container className={styles.Headd}>
                                    <div className={styles.Headd1}> 
                                        <div className={styles.Titlediv}>
                                            <h2 className={styles.Title}>Profile Information</h2> 
                                        </div>
                                        <div style={{ height: "20%" }} onClick={handleEditProfile}>
                                            <img
                                                className={styles.Edit}
                                                src={Edit}
                                                alt="Edit"
                                                height={"20px"}
                                            ></img>
                                            </div>
                                    </div>
                                </Container>   
                                <div className={styles.Introdiv}>
                                    <p className={styles.Intro}>Hi, I’m Taylandi yassine , Business owner : If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term</p>
                                </div>
                                <img src={salamanka} alt='' className={styles.Ligne}></img>
                            </Container>
                            <Container width={"100%"} className={styles.Profile}> 
                                <div className={styles.Profile1}>
                                <div className={styles.InformationDiv}>
                                    <p className={styles.titre}> Full Name:</p>
                                    <p className={styles.Name}>
                                    {userUpdate?.user?.name || userInfo?.name}
                                    </p>
                                </div>
                                <div className={styles.InformationDiv}>
                                    <p className={styles.titre}>Mobile: </p>
                                    <p className={styles.Mobile}>
                                    {userUpdate?.user?.phone?.primary || userInfo?.phone?.primary}
                                    </p>
                                </div>
                                <div className={styles.InformationDiv}>
                                    <p className={styles.titre}> Email: </p>
                                    <p className={styles.Email}>
                                    {userUpdate?.user?.email?.primary || userInfo?.email?.primary}
                                    </p>
                                </div>
                                <div className={styles.InformationDiv}>
                                    <p className={styles.titre}> Location: </p>
                                    <p className={styles.Location}>
                                    {userUpdate?.user?.address || userInfo?.address}
                                    </p>
                                </div>
                                <div className={styles.InformationDiv}>
                                    <p weight={"bold"} className={styles.titre}>
                                    {" "}
                                    Social Media:
                                    </p>
                                    <Link
                                    to={
                                        userUpdate?.user.socials?.facebook ||
                                        userInfo?.socials?.facebook
                                    }
                                    >
                                    <img src={Facebook} alt="Facebook" />
                                    </Link>
                                    <Link
                                    to={
                                        userUpdate?.user.socials?.twitter ||
                                        userInfo?.socials?.twitter
                                    }
                                    >
                                    <img src={X} alt="twitter" />
                                    </Link>
                                    <Link
                                    to={
                                        userUpdate?.user.socials?.instagram ||
                                        userInfo?.socials?.instagram
                                    }
                                    >
                                    <img src={Instagram} alt="instagram" />
                                    </Link>
                                </div>
                                </div>

                            </Container>   
                        </div>
                    </Div>
                </BorderConBasic>
                <BorderConBasic className={styles.TeamMem} width={"30%"} height={"100%"}>
                    <div className={styles.flexteam} >
                        <div className={styles.centerHead} style={{width:'90%',height:"96%"}}>
                            <Container className={styles.HeaderTeam}> 
                                <Container style={{width:"100%",display:"flex", gap:"38%", flexDirection:'row', alignItems: "baseline"}}>
                                    <h2 className={styles.Title}>Team members </h2>
                                    <div style={{height:"10%"}}>
                                        <img className={styles.editTeam} src={Edit} alt='Edit' height={"20px"} onClick={() => setSelectedTab('teams')} />  
                                    </div>
                                </Container>
                            </Container>
                            <Container className={styles.TeamMemBody}>
                                {allMembers?.map((member) => (
                                    <div className={styles.ListOfMemebers} key={member._id}>                                        
                                        {(member.imagePath === null || member.imagePath === undefined|| member.imagePath === '') ? 
                                            <BubleImg className1={styles.span} className={styles.buble} user={member} /> :
                                            <img src={member?.imagePath } alt="" className={styles.MemberImg} />
                                        }                                                   
                                        <div className={styles.name_email_Container}>
                                            <div className={styles.MemberName}>{member?.name || "Not found"}</div>
                                            <div className={styles.MemeberEmail}><HoverTip nbr={20}text={member?.email.primary} className={styles.MemeberEmailHOver}/></div>
                                        </div>
                                    </div>
                                ))}
                            </Container>
                        </div>
                    </div>
                </BorderConBasic>
            </Flex>
            <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.Modal}
      >
        <Container className={styles.ModalContent}>
          <P16 className={styles.ModalTitle}>Edit Profile</P16>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={userInfo?.email?.primary}
                disabled
              />
            </label>
         
            <label>
              Phone:
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </label>

            <button type="submit" onClick={handleSubmitEditProfile}>
              Save Changes
            </button>
          </form>
        </Container>
      </Modal>
        </Container>
    );
}

export default Overview;