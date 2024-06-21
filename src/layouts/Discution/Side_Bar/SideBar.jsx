import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import reduire from '../../../assets/images/reduire.png';
import Container from '../../../drawables/containers/container';
import gsap from "gsap";
import ProfileImg from "../../../assets/images/profilePic.png"
import ConversationCard from "../../../drawables/cards/Discution/SideBar/ConversationCard"
import { useDispatch } from 'react-redux';
import { setCollpased } from '../../../store/variablesSlice';
import { useAddDscMutation } from '../../../functions/UseMutation/useMutation.Discution';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/tokenSlice';
import { GetDiscutions } from '../../../api/Discution';
import { io } from 'socket.io-client';
import { getSocket } from '../../../store/socketSlice';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { MarkAsRead } from '../../../api/Message';
import { useMediaQuery } from 'react-responsive';

const SideBar = ({ onSelect }) => {
    const navigate = useNavigate()
    const SideRef = useRef();
    const ConvRef = useRef();
    const ConvRef1 = useRef();
    const fleshRef = useRef();
    const XsusRef = useRef();
    const [add,setAdd]=useState(false)
    const { user } = useSelector(getUser);
    const socket = useSelector(getSocket);
    const isBigScreen = useMediaQuery({ query: '(max-width: 1080px)' });

    const { id } = useParams()

    const refsArray = useRef([]); // Ref to store refs for each ConversationCard

    const HandleItemClick = (item) => {
        onSelect(item);
        MarkAsRead(item.lastMessage?._id)
            socket.emit("joinDiscution", item?._id, user?._id);

    };

    const [participantEmail, setParticipantEmail] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const dispatch = useDispatch();
    const [participant, setParticipant] = useState([]);
    const [activeCard, setActiveCard] = useState(null); // Store the id of the active card
    const handleCreateDiscussion = async () => {
        try {
            mutate({ id: user?._id, email: participantEmail });
            // Update participant immediately after adding the new discussion
            const participantsName1 = await GetDiscutions(user._id);

            if (!participantsName1) {
                throw new Error('GetDiscutions function returned undefined');
            }
            setParticipant(participantsName1);
            // Clear the input field after creating the discussion
            setParticipantEmail('');
            setAdd(true)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleKeyDown = (e) => {
        const fetchDiscutions = async () => {
            try {
                socket.on("sendMessage");

                const participantsName = await GetDiscutions(user?._id);
                setParticipant(participantsName);
                console.log(participantsName)

            } catch (error) {
                console.error("Error fetching discussions:", error);
            }
        };

        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission behavior

            handleCreateDiscussion();
            fetchDiscutions()
        }
    };
    
    useEffect(() => {
        const fetchDiscutions = async () => {
            try {
                socket.on("sendMessage");

                const participantsName = await GetDiscutions(user?._id);
                setParticipant(participantsName);
                console.log(participantsName)

            } catch (error) {
                console.error("Error fetching discussions:", error);
            }
        };
        fetchDiscutions();
    }, [user?._id,socket,add]);

    const { mutate } = useAddDscMutation();

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleReduceClick = () => {
        toggleSidebar();
    };

    const handleChange = (e) => {
        setParticipantEmail(e.target.value);
    };


    
    useEffect(() => {
        const sidebar= "7%";
        const width = sidebarCollapsed ? "25%" : "103px;";
        const opacityScale = sidebarCollapsed ? { display: "block" } : { display: "none" };
        const opacityScaleBoxMessage = sidebarCollapsed ? { opacity: 1 } : { opacity: 0 };
        const rotation = sidebarCollapsed ? 0 : 180;
        const leftRight = sidebarCollapsed ? 0 : "10%";
        const textContent = sidebarCollapsed ? "XSUSTAIN." : "XS.";
        var tl = gsap.timeline();
 
            if (sidebarCollapsed) {
                gsap.to(ConvRef.current, { ...opacityScale, delay: 0.25 });
                gsap.to(ConvRef1.current, { ...opacityScaleBoxMessage, delay: 0.25 });
                gsap.to(fleshRef.current, { rotation, duration: 0.3 });
                
                gsap.to(SideRef.current, {  width, duration: 0.3 });
                gsap.to(XsusRef.current, { textContent, duration: 0.3 });
            } else {
                gsap.to(ConvRef.current, { ...opacityScale, duration: 0 });
                gsap.to(ConvRef1.current, { ...opacityScaleBoxMessage, duration: 0 });
                gsap.to(fleshRef.current, { rotation, duration: 0.3 });
                gsap.to(SideRef.current, { width, duration: 0.3 });
                gsap.to(XsusRef.current, { textContent, duration: 0.3 });
            }
        

        dispatch(setCollpased(sidebarCollapsed));

    }, [sidebarCollapsed, dispatch]);
    console.log("dddddddd",isBigScreen);
    useEffect(()=> {
        console.log(isBigScreen);
        if(isBigScreen)
        setSidebarCollapsed(false);
        else
        setSidebarCollapsed(true);

    },[isBigScreen])

    const discussion = participant.find(participant => participant._id === id);
    if (discussion) {
        onSelect(discussion);
        if (socket) {
            socket.emit("joinDiscution", id, user._id);
        }
    } else {
        // Si l'identifiant de la discussion n'est pas trouvé dans la liste des participants
        console.log(`Discussion with ID ${id} not found in the participant list.`);
    }
    console.log('___________---------------_____________',participant)
    return (
        <div className={styles.main_card} width={"30%"} ref={SideRef} >
            <Container className={styles.container}>
                <Container className={styles.XsusCont}>
                    <Container className={styles.XsusContCHild}>
                        <h2 className={styles.hh2} onClick={(e)=>{navigate('/dash')}} ref={XsusRef}>XSUSTAIN.</h2>

                    </Container>
                </Container>
                <Container className={styles.ContactCont}>
                    <Container className={styles.ContactContChild}>
                        <Container className={styles.RecentMsg}>
                            <p className={styles.Text} ref={ConvRef} >Recent Messages </p><img onClick={handleReduceClick} ref={fleshRef} src={reduire} alt='' />
                        </Container>
                        <div className={`${styles.RecentMsgCon}`} style={{ maxHeight: '83vh', overflowY: 'auto' }}>
                            <input
                                type="email"
                                placeholder="Enter the recipient's email"
                                aria-label="Email"
                                value={participantEmail}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className={styles.input}
                            />
                            {participant
                            ?.sort((a, b) => {
                                const timeA = new Date(a.lastMessage?.timestamp);
                                const timeB = new Date(b.lastMessage?.timestamp);
                                return timeB - timeA; // Sort by descending order (most recent first)
                            })
                            ?.map((conversation, index) => {
                                const cardRef = refsArray.current[index] || (refsArray.current[index] = React.createRef());
                                MarkAsRead(conversation._id);

                                return (
                                <div key={conversation._id} onClick={() => HandleItemClick(conversation)} >
                                    <ConversationCard
                                    refff={cardRef} // Assign ref to each ConversationCard
                                    id={conversation?._id}
                                    TimeMsg={conversation.lastMessage?.timestamp} // Vous pouvez remplacer cette valeur par la date/heure appropriée
                                    LastMsg={conversation?.lastMessage?.content} // Utilisez le champ lastMessage de chaque conversation
                                    NameContact={conversation?.participants?.map(participant => participant?.name).join(', ')} // Concaténez les noms des participants
                                    Imagee={conversation?.participants?.map(participant => participant?.imagePath).join(', ')} // Assurez-vous d'avoir une image de profil pour chaque conversation
                                    partic={conversation}
                                    setActiveCard={setActiveCard}
                                    isActive={activeCard === conversation?._id}
                                    seen={conversation?.lastMessage?.seen}
                                    />
                                </div>
                                );
                            })}
                        </div>
                    </Container>
                </Container>
            </Container>
        </div>
    );
}

export default SideBar;
