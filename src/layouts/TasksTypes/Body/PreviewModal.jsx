import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import axios from 'axios';

const PreviewModal = ({commentImageData} ) => {
  const [image, setImage] = useState('');
  const [commentsAndPositions, setCommentsAndPositions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    if (commentImageData !== null) {
      console.log("---------------------------------commentResponse---------------------",commentImageData)

    axios.get(`http://192.168.11.113:3000/api/v0/comment/${commentImageData?._id}`)
      .then((response) => {
        console.log('response', response);
        const { image, comments } = response.data;
        const commentsAndPositions = comments.map((commentObj) => ({
          comment: commentObj.comment,
          position: commentObj.position || {  },
        }));
        setCommentsAndPositions(commentsAndPositions);
        setImage(image);
      })
      .catch((error) => {
        console.error('Error fetching comment:', error);
      });
  }
    }, [commentImageData]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div style={{  
      width: '100%', 
      position: 'relative',
      borderRadius: '7px',
      // height: '100%',
      // padding: '10px',
      border: '2px solid #2468ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' 
  }}>
      <div style={{ position: 'relative',width:'80%'}}>
        <img src={image} alt="img" style={{ width: '100%', height:'100%' }} />
        {commentsAndPositions.map(({ comment, position }, index) => (
            index !== 0 &&(
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'absolute',
              top: `${position?.y}px`,
              left: `${position?.x + 150}px`,
              backgroundColor: 'transparent',
              padding: '20px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M1,24a1,1,0,0,0,.707-.293l6.619-6.619L9.574,18.38a5.169,5.169,0,0,0,3.605,1.614,3.991,3.991,0,0,0,1.339-.227,3.63,3.63,0,0,0,2.435-3.122,8.486,8.486,0,0,0-.222-3.027l-.214-1.042a1,1,0,0,1,.264-.943l1.587-1.588a.34.34,0,0,1,.236-.1.17.17,0,0,1,.167.065,3.077,3.077,0,0,0,3.971.432,3,3,0,0,0,.379-4.565L18.2.954a3.085,3.085,0,0,0-3.938-.4,3,3,0,0,0-.38,4.565l.076.076a.308.308,0,0,1,0,.434l-1.6,1.6a1,1,0,0,1-.954.261l-.817-.209a8.632,8.632,0,0,0-3.082-.233A3.863,3.863,0,0,0,4.25,9.634a4,4,0,0,0,.928,4.2l1.758,1.82L.293,22.293A1,1,0,0,0,1,24ZM6.135,10.3A1.856,1.856,0,0,1,7.713,9.036,6.7,6.7,0,0,1,8.406,9a6.622,6.622,0,0,1,1.681.217l.823.21a3.01,3.01,0,0,0,2.862-.785l1.6-1.6a2.31,2.31,0,0,0,0-3.262l-.076-.076a1,1,0,0,1,.134-1.528,1.084,1.084,0,0,1,1.356.19l4.924,4.924h0a1,1,0,0,1-.134,1.528,1.085,1.085,0,0,1-1.368-.2,2.212,2.212,0,0,0-1.584-.672,2.4,2.4,0,0,0-1.667.684l-1.586,1.587a3,3,0,0,0-.8,2.8l.219,1.058a6.646,6.646,0,0,1,.181,2.366,1.655,1.655,0,0,1-1.115,1.444,2.8,2.8,0,0,1-2.85-.9l-4.4-4.55A2.027,2.027,0,0,1,6.135,10.3Z"
                fill="blue"
              />
            </svg>
            {/* Conditionally render the Popup component */}
            {hoveredIndex === index && (
              <Popup
                comment={comment}
                position={position}
              />
            )}
          </div>)
        ))}
      </div>
    </div>
  );
};

export default PreviewModal;

