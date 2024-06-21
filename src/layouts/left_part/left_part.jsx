import React from 'react';
import styles from './left_part.scss';
import bear from '../../assets/images/bear.png'; 

import titleImage from '../../assets/logo/logo.svg'; 
import vid from '../../assets/LeftPart.mp4'; 

const left_part = () => {
  return (
      <div className="container">
        <div className="rectangle">
        <div className="background-video">
          <video autoPlay loop muted>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Add other content on top of the video if needed */}
        </div>
          <div className='haut_rec'>
            <div className='img_logo_auth'>
                <img className='logo' src={titleImage} alt="Titre du rectangle" />
            </div>
          </div>
          <div className='bas_rec'>
          <div className='copy_right_box'>
              <p>COPY RIGHT ©2024 XSUSTAIN.</p>
              <p>ALL RIGHTS RESERVED.</p>
            </div>
        </div>
          </div>
         
   
      </div>
  );
}

export default left_part;
