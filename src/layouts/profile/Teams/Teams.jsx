import React, { Suspense, useEffect, useState } from 'react';
import { P14, P16 } from '../../../drawables/txt/Txt';
import Container from '../../../drawables/containers/container';
import styles from './style.module.scss';
import { useSelector } from 'react-redux'; 
import ProfileIm from "../../../assets/images/profilePic.png";
import Scroll from '../../../drawables/cards/ScrollCard/scrollV1';
import TrashCan from '../../../assets/images/Trash_Empty.svg'
import { useTeamData } from '../../../functions/UseQuery/TeamData'
import Flex from '../../../drawables/Flex/flex'
import { Div } from '../../../drawables/Divs/Div_Param';
import { DelTeammate, GetTeamMembers } from '../../../api/TeamMembers'
import ResponsiveDialog from '../../../drawables/cards/ConfirmationDIalog/ModalConfirmation';
import useRefreshTeamMem from '../../../store/refreshTeamMemberInfo';
import BubleImg from '../../../drawables/bubleimg/bubleImg'
import AddTeam from '../../../assets/images/+.svg'
import AddTodo from "../../../assets/images/TaskManager/status/AddTodo.svg";
import { ClickAwayListener } from '@mui/material';
import { createDiscution } from '../../../api/Discution';
import { Navigate, useNavigate } from 'react-router-dom';
import LoaderSpin from '../../../drawables/loader/LoaderSpin';

const Teams = () => {
    const userData = useSelector(state => state.token.user);
    const [selectedMember, setSelectedMember] = useState(null);
    const [open, setOpen] = useState(false); // Define open state for dialog
    const { Team, isLoading, refetch } = useTeamData(userData._id);

    const allMembers = Team?.team.map(team => team.members).flat();

    // Call refreshTeamMem when TeamInfo is available
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDeleteClick = (member) => {
        setSelectedMember(member);
        setOpen(true); // Open the dialog when delete is clicked
    };
    const handleaddClick = async (member) => {
        await setSelectedMember(member);
        handleaddClickAfter(member);
        console.log('membeerre+++++++++++++++++++++',member);
    };
    
    const handleaddClickAfter = async (member) => {
        console.log('membeerre+++++++++++++++++++++',member);
            const Id=await createDiscution(userData._id, member?.email?.primary);
            navigate(`/disc/${Id.Id}`); // Use navigate function to redirect
    };
    
    const handleConfirmDelete = () => {
        DelTeammate(selectedMember._id, selectedMember.name, Team.team[0]._id).then(() => {
            refetch().then((updatedData) => {
                setOpen(false);
            });
        });
    };
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleclickaway = () => {
        // Code to add a todo to your list

        setShowModal(false);
      };                  
  
    const handleAddTodo = () => {
      // Code to add a todo to your list
      // Reset input value and close modal
      setInputValue('');
      setShowModal(false);
    };        
    
    if(isLoading)    return <LoaderSpin />;
    return (
        <div className={styles.Main}>
            <Container width="100%" className={styles.Titles}>
                <Container className={styles.insideTitles}>
                    <P14 className={styles.h3Team}>Team Members</P14>
                    <P14 className={styles.pTeam}>Manage your team members</P14>
                </Container>
                <div className={styles.AddTeammateDiv} onClick={() => setShowModal(true)}>
                    <p className={styles.AddTeamTxt}>Add Teammate</p>
                    <img src={AddTodo} className={styles.AddTeam} alt='add member' />
                </div>
                
                {showModal && (
                    <ClickAwayListener onClickAway={handleclickaway}>
                    <div className={styles.Modal}>
                        <div className={styles.ModalContent}>
                        <input
                        className={styles.input}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter teammate email"
                        />
                        <button onClick={handleAddTodo}>Add</button>
                        </div>
                    </div>
                    </ClickAwayListener>
                 )}

            </Container>
            <Container className={styles.members}>
                <Flex flex='center'>
                    <Div height={'100%'} width={"100%"}>
                        {allMembers?.map((member) => (
                            <div className={styles.ListOfMemebers} key={member._id}>

                                {(member.imagePath === null || member.imagePath === undefined|| member.imagePath === '') ? 
                                <BubleImg className1={styles.span} className={styles.buble} user={member} /> :
                                <img src={member?.imagePath } alt="" className={styles.MemberImg} />
                                }
                                <div className={styles.name_email_Container}>
                                    <div className={styles.MemberName}>{member?.name || "Not found"}</div>
                                    <div className={styles.MemeberEmail}>{member?.email.primary}</div>
                                </div>
                                <div className={styles.Trash_Edit0}>
                                    <div className={styles.Trash_Edit}>
                                        <P16 className={styles.MessageT} onClick={() => handleaddClick(member)}> Message</P16>
                                        <img src={TrashCan} alt='Delete' className={styles.trashCan} onClick={() => handleDeleteClick(member)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Div>
                </Flex>
            </Container>
            {/* Pass open state and setOpen function to ResponsiveDialog */}
            <ResponsiveDialog
                open={open}
                setOpen={setOpen}
                buttonText="Delete"
                dialogTitle="Delete Team Member"
                dialogContent={`Are you sure you want to delete ${selectedMember?.name}?`}
                agreeText="Delete"
                disagreeText="Cancel"
                onAgree={handleConfirmDelete}
                onDisagree={() => setOpen(false)} // Close the dialog on cancel
            />
        </div>
    );
};

const TeamsWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Teams />
  </Suspense>
);

export default TeamsWithSuspense;
