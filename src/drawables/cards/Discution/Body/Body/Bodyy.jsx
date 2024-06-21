import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { Div } from '../../../../Divs/Div_Param';
import MsgRec from './MsgRec/msgRec';
import MsgSent from './MsgSent/msgSent';
import Footer from '../footer/Footer';
import { getUser } from '../../../../../store/tokenSlice';
import { useSelector } from 'react-redux';
import Background from '../../../../../assets/images/Disc/whiteBackground.svg';
import { getOnlineUsers, getSocket } from '../../../../../store/socketSlice';
import { useConversation, useConversationLoad } from '../../../../../functions/UseQuery/DiscutionQuery';
import { useParams } from 'react-router-dom';
import Loader from '../../../../loader/Loader';
import LoaderSpin from '../../../../loader/LoaderSpin';

const Bodyy = ({ selectedItem }) => {
  const [LoadNumber, setLoadNumber] = useState(2); // Start from 2
  const [reachedTop, setReachedTop] = useState(false);
  const topDiv = useRef();
  const ChildBody = useRef();
  const messagesEndRef = useRef(null);
  const { user } = useSelector(getUser);
  const socket = useSelector(getSocket);
  const { id } = useParams();
  const { data, isLoading, refetch, isError } = useConversation(id);
  const { data: dataLoaded, isLoading: isLoading1, refetch: refetch1, isError: isError1 } = useConversationLoad(id, LoadNumber);
  const [sortedMessages, setSortedMessages] = useState([]);
  const onlineUsers = useSelector(getOnlineUsers);

  const recieverId = selectedItem?.participants[0]?._id;


  const scrolltoBottom =()=>{
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ block:'end',behaivor:'smooth'});
    }
  }
  // Scroll down by 30 elements
  const scrollto30 =()=>{

      const element = document.getElementById(`message-${15}`);
      if (element) {
        element.scrollIntoView({ block: 'start' ,behaivor:'smooth'});
      }
  }
      
  const isMessageSentByCurrentUser = (message) => {
    return message.sender?._id === user?._id || message.senderId === user?._id;
  };
  useEffect(() => {
  if (!selectedItem || !socket) return; // Early return if missing dependencies
      try{
        if (socket){
            socket.on("sendMessage", data1 => {
              console.log('data from sendMessage On',data)
                    const content = data1?.message;
                    const idDsc = id;
                    const sender = data1?.sender;
                    setSortedMessages((prevMessages) => [...prevMessages, { content: content, idDsc, senderId: sender, timestamp: new Date().toLocaleString() }]);
                  });
          return () => {
            socket.off("sendMessage");
          };

        }
      }catch(error){
        console.log(error);
      }
     


  }, [sortedMessages, selectedItem, socket]);

  useEffect(() => {
    refetch();
    scrolltoBottom()

  }, [id,recieverId]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setSortedMessages(Array.isArray(data?.messages) ? [...data?.messages].sort((a, b) => new Date(a.timestamp).toLocaleString() - new Date(b.timestamp).toLocaleString()) : []);
    }
    scrolltoBottom()

  }, [data, isLoading, isError, refetch]);

  useEffect(() => {
    setSortedMessages((prevMessages) => [...(dataLoaded?.messages ?? []), ...prevMessages].sort((a, b) => new Date(a.timestamp).toLocaleString() - new Date(b.timestamp).toLocaleString()));
    console.log('discution',sortedMessages)
    console.log('00',sortedMessages)


  }, [ dataLoaded]);


  if(socket){
    socket.on("sendMessage", data1 => {
      refetch1()
    })


  }

  
  if (isLoading) {
    return <LoaderSpin />;
  } else if (!selectedItem) {
    return null;
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !reachedTop) {
      setReachedTop(true);
      setLoadNumber((prev) => prev + 1);
      refetch1()
      scrollto30()

    }
  }, options);

  if (topDiv.current) {
    observer.observe(topDiv.current);
  }
  return (
    <Div className={styles.MainBody}>
      <img src={Background} className={styles.Backgrounddddd} alt="background" />
      <div className={styles.ChildBody1}>
        <div ref={ChildBody} className={styles.ChildBody} >
          <div className={styles.topDiv} ref={topDiv}>..</div>

          {sortedMessages?.map((message, index) => (
            isMessageSentByCurrentUser(message) ? (
              <MsgSent
                id={`message-${index}`}
                TimeMsg={message?.timestamp}
                LastMsg={message?.content}
                NameContact="Me"
                Imagee={user.imagePath}
              />
            ) : (
              <MsgRec
                id={`message-${index}`}
                key={index}
                TimeMsg={message?.timestamp}
                LastMsg={message?.content}
                NameContact={selectedItem.participants[0]?.name}
                Imagee={selectedItem.participants[0]?.imagePath}
                contact={selectedItem?.participants[0]}
              />
            )
          ))}
          <div ref={messagesEndRef} />
        </div>
        <Footer recieverName={selectedItem?.participants[0]?.name} recieverId={recieverId} idDsc={selectedItem?._id} sender={selectedItem?.participants?._id} setSortedMessages={setSortedMessages} />
      </div>
    </Div>
  );
};

export default Bodyy;
