import React from 'react'
import styles from './style.module.scss';
import pass from '../../assets/images/Xsus.jpg';
import Input from '../../drawables/inputs/input';
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from '../../functions/UseMutation/useMutationLogin';

import { useNavigate } from 'react-router-dom';

const Forgot_password = () => {


const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const forgotPasswordMutation = useForgotPasswordMutation();
    const  onSubmit = (data) => {
        console.log("--------------",data)

        forgotPasswordMutation.mutate(data,{
            onSuccess:() =>{
                navigate('/sign_in')
            }
        });
        console.log(data);
    };


  return (
    <div>
        <div className={styles.component4}>
            <div className={styles.component4Child}>
            <div className={styles.component4Inner}>
                <div className={styles.component4InnerChild}>
                <img
                    className={styles.component4Child}
                    loading="eager"
                    alt=""
                    src={pass}
                />
                </div>
                <div className={styles.forgotPassword1}>Forgot password?</div>
                <div className={styles.forgotPassword2}>
                Enter the email address associated with your account, and we’ll email you a link to reset your password.
                </div>
                <Input className={styles.input} type="email" name="email" label="Email"  register={register} required errors={errors} />
                <div  className={styles.component41Parent}>
                <button type='submit'  className={styles.component411} onClick={handleSubmit(onSubmit)}>Reset Password</button >
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Forgot_password