import React from 'react'
import styles from './styles.module.scss'
import { SendVerifEmail } from '../../api/user'
import { useSendEmailVerif } from '../../functions/UseMutation/useMutationVerifEmail'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/tokenSlice'
const VerifierEmail = () => {
    console.log('ok')
    const { user } = useSelector(getUser);

    const VerifMailMut = useSendEmailVerif();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        VerifMailMut.mutate({user}, {
          onSuccess: () => {
            navigate('/sign_in');
          },
        });
      };
    
          return (
    <div className={styles.mainEmailV}>
        <div className={styles.childCenterV}>
            <form className={styles.redirectP} onSubmit={handleSubmit(onSubmit)}> 
                <div className={styles.center}>

                    <p>verifier Email</p>
                    <button type="submit" className={styles.component411}>
                    Send E mail
                    </button>
                </div>


            </form>

        </div>
    </div>
  )
}

export default VerifierEmail
