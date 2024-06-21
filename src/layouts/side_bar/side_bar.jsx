import React, { useEffect, useRef, useState } from 'react';
import Container from '../../drawables/containers/container';
import styles from './sidebar.module.scss';
import reduire from '../../assets/images/reduire.png';
import task from '../../assets/images/Side_Bar/task.svg';
import dash from '../../assets/images/Side_Bar/category.svg';
import msg from '../../assets/images/Side_Bar/chat.svg';
import member from '../../assets/images/Side_Bar/friend.svg';
import sett from '../../assets/images/Side_Bar/support.svg';
import Sub from "../../assets/images/Side_Bar/Sub.svg";
import refer from "../../assets/images/Side_Bar/referFriend.svg";
import ListSidebar from '../../drawables/list/list';
import gsap from "gsap";
import Draw1 from '../../assets/images/draw1.png';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/tokenSlice';
import { useMediaQuery } from 'react-responsive';
import { useNotifData } from '../../functions/UseQuery/notifQuery';
import ListSideBarWithChild from '../../drawables/list/listWithChilds/ListWithChilds';
import { getNotifGlob, getNotifMessagerie, getNotifTaskk } from '../../store/settingsSlice';
import { selectActiveItem, setActiveItem } from '../../store/sidebarSlice ';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Side_bar = () => {
    const activeItem = useSelector(selectActiveItem); // Select active item from Redux store

    let cardRef = useRef();
    let cardRef1 = useRef();
    let cardRef3 = useRef();
    let cardRef4 = useRef();
    let cardRef5 = useRef();
    let cardRef6 = useRef();
    let cardRef0 = useRef();
    let cardRef2 = useRef();
    let cardRef11 = useRef();
    let cardRef41 = useRef();
    let refChild2 = useRef();
    let refChild1 = useRef();
    let refChild2display = useRef();
    let refChild1display = useRef();
    let dashh = useRef();
    let Msg = useRef();
    let Task = useRef();
    let Mem = useRef();
    let SubS = useRef();
    let RefFriend = useRef();
    let Supp = useRef();
    const isBigScreen = useMediaQuery({ query: '(max-width: 1080px)' });
    const notifGlob = useSelector(getNotifGlob);
    const notifMessagerie = useSelector(getNotifMessagerie);
    const notifTasks = useSelector(getNotifTaskk);
    const [nbrNewMessageNotifications, setNbrNewMessageNotifications] = useState();
    const [nbrNewTaskNotifications, setNbrNewTaskNotifications] = useState();
    
    let flesh = useRef();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    let initialStyles = {
        cardRef0: {display:'flex'},
        cardRef3: { display:'flex'},
        cardRef4: { display:'flex'},
        cardRef5: { display:'flex'},
        cardRef6: { display:'flex'},
        cardRef41: { display:'flex'},
        refChild2: { paddingLeft:'2.8vw'},
        refChild1: { paddingLeft:'2.8vw'},
        refChild2display: { display:'flex'},
        refChild1display: { display:'flex'},
        cardRef: { display:'flex',alignItems: 'center',},
        flesh: {rotation: 0},
        cardRef2: {  
            textContent: "XSUSTAIN.", 
            display: 'block',
            fontSize: "1.5em",
            marginBlockStart: '0.83em',
            marginBlockEnd: '0.83em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
            fontWeight: 'bold' 
        }      ,
        dashh:{paddingLeft:'3vw'},
        Msg:{paddingLeft:'3vw'},
        Task:{paddingLeft:'3vw'},
        Mem:{paddingLeft:'3vw'},
        SubS:{paddingLeft:'3vw'},
        RefFriend:{paddingLeft:'3vw'},
        Supp:{paddingLeft:'3vw'},
    };
    
    const inverseOnClickOpen = () => {
        gsap.to(cardRef1.current, {width: "20%",  minWidth: '250px!important',  duration: 0});
        gsap.to(cardRef0.current, {...initialStyles.cardRef0,  duration: 0});
        gsap.to(cardRef3.current, {...initialStyles.cardRef3,  duration: 0});
        gsap.to(cardRef4.current, {...initialStyles.cardRef4,  duration: 0});
        gsap.to(cardRef5.current, {...initialStyles.cardRef5,  duration: 0});
        gsap.to(cardRef6.current, {...initialStyles.cardRef6,  duration: 0});
        gsap.to(cardRef.current, {...initialStyles.cardRef,  duration: 0});
        gsap.to(cardRef11.current, {...initialStyles.cardRef,  duration: 0});
        gsap.to(cardRef41.current, {...initialStyles.cardRef41,  duration: 0});
        gsap.to(refChild2.current, {...initialStyles.refChild2,  duration: 0});
        gsap.to(refChild1.current, {...initialStyles.refChild1,  duration: 0});
        gsap.to(refChild2display.current, {...initialStyles.refChild2display,  duration: 0});
        gsap.to(refChild1display.current, {...initialStyles.refChild1display,  duration: 0});
        gsap.to(refChild1.current, {...initialStyles.refChild1,  duration: 0});
        gsap.to(flesh.current, {...initialStyles.flesh});
        gsap.to(cardRef2.current, {            
            textContent: "XSUSTAIN.", 
            display: 'block',
            fontSize: "1.5em",
            marginBlockStart: '0.83em',
            marginBlockEnd: '0.83em',
            fontWeight: 'bold', 
            backgroundColor:"white",
            color:"black",
            duration: 0
        });
        tl.to(dashh.current, {duration: 0.3,...initialStyles.dashh})
        .to(Msg.current, {duration: 0.3,...initialStyles.Msg}, '-=0.3')
        .to(Task.current, {duration: 0.3,...initialStyles.Task}, '-=0.3')
        .to(Mem.current, {duration: 0.3,...initialStyles.Mem}, '-=0.3')
        .to(SubS.current, {duration: 0.3,...initialStyles.SubS}, '-=0.3')
        .to(RefFriend.current, {duration: 0.3,...initialStyles.RefFriend}, '-=0.3')
        .to(Supp.current, {duration: 0.3,...initialStyles.Supp}, '-=0.3');

        toggleSidebar()
    };

    const tl = gsap.timeline();

    const onClickOpen = () => {
        gsap.to(cardRef1.current,{width:"8%",minWidth: "90px!important",duration: 0});
        gsap.to(cardRef0.current, {display:"none",duration:0});
        gsap.to(cardRef3.current, {display:"none",duration:0});
        gsap.to(cardRef4.current, {display:"none",duration:0});
        gsap.to(cardRef5.current, {display:"none",duration:0});
        gsap.to(cardRef6.current, {display:"none",duration:0});
        gsap.to(cardRef.current, {display:"none",duration:0});
        gsap.to(cardRef41.current, {display:"none",duration:0});
        gsap.to(cardRef11.current, {display:"none",duration:0});
        gsap.to(refChild1display.current, {display:"none",duration:0});
        gsap.to(refChild2display.current, {display:"none",duration:0});
        gsap.to(refChild2.current, {paddingLeft:"0",duration:0});
        gsap.to(refChild1.current, {paddingLeft:"0",duration:0});
        gsap.to(flesh.current, {rotation:180,padding:-50});
        gsap.to(cardRef2.current, { duration: 0, textContent: "XS.",marginBlock:'0vw' });
        tl.to(dashh.current, { duration: 0.3, paddingLeft: '1.5vw' })
        .to(Msg.current, { duration: 0.3, paddingLeft: '1.5vw' }, '-=0.3')
        .to(Task.current, { duration: 0.3, paddingLeft: '1.5vw' }, '-=0.3')
        .to(Mem.current, { duration: 0.3, paddingLeft: '1.5vw' }, '-=0.3')
        .to(SubS.current, { duration: 0.3, paddingLeft: '1.5vw' }, '-=0.3')
        .to(RefFriend.current, { duration: 0.3, paddingLeft: '1.5vw' }, '-=0.3')
        .to(Supp.current, { duration: 0.3, paddingLeft: '1.5vw' }, '-=0.3');
      
        toggleSidebar()
    };
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleReduceClick = () => {
        if (sidebarCollapsed) {
            onClickOpen();
        } else {
            inverseOnClickOpen();
        }
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const {user} = useSelector(getUser);
    const {data}=useNotifData(user?._id)

    useEffect(()=> {
        if(isBigScreen)
            onClickOpen();
        else
            inverseOnClickOpen();
    },[isBigScreen])

    const getNewNotificationsCount = (notifications, type) => {
        return notifications?.filter(notification => notification.type === type && !notification.seen).length;
    };

    const newTaskNotifications = getNewNotificationsCount(data, 'NewTask');
    const newMessageNotifications = getNewNotificationsCount(data, 'NewMessage');

    useEffect(()=>{
        if(notifTasks !== null && newTaskNotifications){
            setNbrNewTaskNotifications(notifTasks ? newTaskNotifications : 0);
        } else {
            setNbrNewTaskNotifications(user.notifTask ? newTaskNotifications : 0);
        }
        
        if(notifMessagerie !== null && newMessageNotifications){
            setNbrNewMessageNotifications(notifMessagerie ? newMessageNotifications : 0);
        } else {
            setNbrNewMessageNotifications(user.notifMessages ? newMessageNotifications : 0);
        }
    }, [notifTasks, notifMessagerie, notifGlob, user, newTaskNotifications, newMessageNotifications]);

    if (!data){
        return (<div>...isloadgin</div>)
    }

    return (
        <div className={styles.main_card} ref={cardRef1}>
            <Container className={styles.container}>
                <Container className={styles.rec1}>
                    <Container className={styles.rec11}>
                        <h2 className={styles.hh2} ref={cardRef2}  onClick={(e)=>{navigate('/dash')}}>XSUSTAIN.</h2>
                        <img src={reduire} alt="Réduire" className={styles.reduceImage} ref={flesh} onClick={handleReduceClick} />
                    </Container>
                </Container>
                <Container className={styles.rec2}>
                    <ul className={styles.list}>
                        <ListSidebar
                            ref1={dashh}
                            navigateTo="/dash"
                            reff={cardRef6}
                            src={dash}
                            text={"Dashbord"}
                            activeItem={activeItem} // Pass activeItem from Redux
                            setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                        />
                        <ListSidebar
                            ref1={Msg}
                            navigateTo={"/disc/" + user?.discussions[user?.discussions?.length - 1] || 'null'}
                            nbr={nbrNewMessageNotifications}
                            reff={cardRef0}
                            src={msg}
                            text={"Messages"}
                            activeItem={activeItem} // Pass activeItem from Redux
                            setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                            />
                        <ListSideBarWithChild
                            ref1={Task}
                            refChild1display={refChild1display}
                            refChild2display={refChild2display}
                            refChild2={refChild2}
                            refChild1={refChild1}
                            navigateTo="/tasks"
                            nbr={nbrNewTaskNotifications}
                            reff={cardRef3}
                            src={task}
                            text={"Tasks"}
                            activeItem={activeItem} // Pass activeItem from Redux
                            setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                            />
                            {
                                !user.agent&&(
                                <>
                                    <ListSidebar
                                        ref1={Mem}
                                        navigateTo="/"
                                        reff={cardRef4}
                                        src={member}
                                        text={"Members"}
                                        activeItem={activeItem} // Pass activeItem from Redux
                                        setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                                    />
                                    <ListSidebar
                                        ref1={SubS}
                                        navigateTo="/sub"
                                        reff={cardRef41}
                                        src={Sub}
                                        text={"Subscriptions"}
                                        activeItem={activeItem} // Pass activeItem from Redux
                                        setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                                    />
                                    <ListSidebar
                                        ref1={RefFriend}
                                        navigateTo={`/Ref`}
                                        reff={cardRef11}
                                        src={refer}
                                        text={"Refer a friend"}
                                        activeItem={activeItem} // Pass activeItem from Redux
                                        setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                                    />
                                    <ListSidebar
                                        ref1={Supp}
                                        navigateTo="/supp"
                                        reff={cardRef5}
                                        src={sett}
                                        text={"Support"}
                                        activeItem={activeItem} // Pass activeItem from Redux
                                        setActiveItem={(item) => dispatch(setActiveItem(item))} // Dispatch setActiveItem action
                                    />
                                </>
                                )
                            }
                    </ul>
                </Container>
                <img className={styles.draw} src={Draw1} alt=""></img>        
            </Container>
        </div>
    );
}

export default Side_bar;
