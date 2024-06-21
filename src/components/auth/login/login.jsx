 import React /*,{ useState }*/ from 'react';
import styles from './style.module.scss';
import Google_logo from '../../../assets/images/super-g.png';
import Linkedin_logo from '../../../assets/images/link (2).svg';
import Or from '../../../assets/images/Vector-36.png';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Input from '../../../drawables/inputs/input';
import { useLoginMutation } from '../../../functions/UseMutation/useMutationLogin';
//import Button from "../../../drawables/buttons/button1";

const Login1 = () => {
const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();
    const loginMutation = useLoginMutation();

    const navigate = useNavigate()
const onSubmit = (data) => {
    // Add the IP address to the form data
    console.log(data);

loginMutation.mutate(data,{
    onSuccess:() =>{
     navigate('/dash')
    }
});
};
const handleGoogleSignIn = () => {
    // Rediriger vers l'URL d'authentification Google
    window.location.href = "http://localhost:3000/api/v0/auth/google";
      // window.location.href = "http://192.168.11.113:3000/api/v0/auth/google";
};
const handleLinkedinSignIn = () => {
    // Rediriger vers l'URL d'authentification Facebook
    window.location.href = "http://localhost:3000/api/v0/auth/linkedin";
   // window.location.href = "http://192.168.11.113:3000/api/v0/auth/linkedin";

}
return (
    <div className={styles.desktop7}>
     <div className={styles.googleLogin}>
             <div className={styles.frameContainer}>
             <h1 className={styles.signInTo}>SIGN IN TO XSUSTAIN.</h1>

             <button className={styles.frameE} onClick={handleGoogleSignIn}>
                <div className={styles.frameEChild} />
                
                <img className={styles.googleIcon} alt="" src={Google_logo} />
                <div className={styles.signInWith}>Sign in with Google</div>
             </button>
            
             <button className={styles.frameE} onClick={handleLinkedinSignIn}>
                <div className={styles.frameEChild} />
                
                <img className={styles.googleIcon} alt="" src={Linkedin_logo} />
                <div className={styles.signInWith}>Sign in with Linkedin</div>
             </button>
             </div>
        <form className={styles.signinText} onSubmit={handleSubmit(onSubmit)}>
         <div className={styles.usernameEmail}>
            <div className={styles.frameEParent}>

             <div className={styles.convertFrameParent}>
                <div className={styles.convertFrame}>
                 <div className={styles.convertFrameInner}>
                    <img
                     className={styles.frameChild}
                     loading="eager"
                     alt=""
                     src={Or}
                    />
                 </div>
                 <div className={styles.orSignIn}><p className={styles.orSignInp}>or sign in with email</p></div>
                 <div className={styles.headerWrapper}>
                    <img
                     className={styles.headerIcon}
                     loading="eager"
                     alt=""
                     src={Or}
                    />
                 </div>
                </div>
             </div>
             <Input labelStyle={styles.labelInput} className={styles.input} type="email" name="email" label="Email" register={register} required errors={errors} />
             <div className={styles.frameParent}>
                <div className={styles.passwordParent}>
                </div>
                <Input labelStyle={styles.labelInput} className={styles.input} type="password" name="password" label="Password" register={register} required errors={errors} />
             </div>
             <div className={styles.forgotPassword}>
                 <Link to="/forgot_password" className={styles.forgotPassword1}>
                    Forgot password?
                 </Link>

                 </div>

            </div>
         </div>
         <div className={styles.component41Parent}>
             <button type='submit' className={styles.component411}>Sign in</button >
            <div className={styles.dontHaveAnContainer}>
             <span className={styles.dontHaveAnContainer1}>
                <span className={styles.dontHaveAn}>Don't have an account? </span>
                <Link to='/sign_up'>
                 <span className={styles.signUp}>Sign up</span>
                </Link>
             </span>
            </div>
         </div>
        </form>
     </div>
    </div>
);
};

export default Login1;