import React from 'react';
import styles from './style.module.scss';
import Google_logo from '../../../assets/images/super-g.png';
import Or from '../../../assets/images/Vector-36.png';
import { Link, useNavigate } from 'react-router-dom';
import Flex from '../../../drawables/Flex/flex'
import { Navigate } from 'react-router-dom';

const MainAuth = () => {
  // Fonction pour gérer le clic sur le bouton "Sign in with Google"
  const handleGoogleSignIn = () => {
    // Rediriger vers l'URL d'authentification Google
    window.location.href = "http://localhost:3001/api/v0/auth/google";
  };
  const navigate = useNavigate();

  return (
    <div className={styles.main_card}>
      <div >
      <div className={styles.auth_card}>
        <div className={styles.H3Div}>
        <h3 className={styles.H33} >SIGN UP TO XSUSTAIN.</h3>
        </div>
        <div className={styles.buttons}>
          <div className={styles.leFlex}>
          <button className={styles.btn_google} onClick={handleGoogleSignIn}>
            <img className='google_logo' src={Google_logo} alt="google" />
            <p>Sign in with Google</p>
          </button>
          <div className={styles.or}>
            <img className={styles.Or_left} src={Or} alt="google" />
            <p>Or</p>
            <img className={styles.Or_right} src={Or} alt="google" />
          </div>
          <div className='btn_email'>
            <Link to="/sign_up" className={styles.btn_email}>
              <p color='black'>Continue with email</p>
            </Link>
          </div></div>
        </div>
        <div className={styles.terms_login}>
          <div className={styles.first}>
            <div className={styles.second} width={"90%"}>
              <p className={styles.p1} >
               <div> By creating an account you agree with our <strong>Terms of Service, Privacy Policy,</strong></div>
               <div>and our default <strong>Notification Settings.</strong></div>
              </p>
              <p className={styles.p2}>
               <div> Already have an account?<strong className={styles.ToSignIn} onClick={(e)=>navigate("/sign_in")}> Sign In</strong></div>
              </p>
            </div></div>
        </div>
      
      </div>
      </div>
    </div>
  );
}

export default MainAuth;
