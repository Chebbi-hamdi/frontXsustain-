import React from 'react';
import styles from './style.module.scss';
import pass from '../../assets/images/Xsus.jpg';
import Input from '../../drawables/inputs/input';
import { useForm } from 'react-hook-form';
import { usePasswordResetMutation } from '../../functions/UseMutation/useMutationLogin';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const forgotPasswordMutation = usePasswordResetMutation();
  const token = useParams().token;

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate({ ...data, token }, {
      onSuccess: () => {
        navigate('/sign_in');
      },
    });
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
            <div className={styles.forgotPassword1}>Reset Password</div>
            <div className={styles.forgotPassword2}>
              Please enter your new password below.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                className={styles.input}
                type="password"
                name="password"
                label="New Password"
                register={register}
                required
                errors={errors}
              />
              <Input
                className={styles.input}
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
                register={register}
                required
                errors={errors}
              />
              <div className={styles.component41Parent}>
                <button type="submit" className={styles.component411}>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
