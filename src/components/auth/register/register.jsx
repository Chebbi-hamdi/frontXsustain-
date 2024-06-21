import React, { useState,useEffect, useRef } from 'react';
import styles from './style.module.scss';
import tnlogo from '../../../assets/logo/tnlogo.svg';
import Input from '../../../drawables/inputs/input'; // Import the Input component
import Container from '../../../drawables/containers/container';
import Button from '../../../drawables/buttons/button1';
import Flex from '../../../drawables/Flex/flex';
import Scroll from '../../../drawables/cards/ScrollCard/scroll';
import { useForm } from 'react-hook-form';
import { useRegisterMutation,useRegisterRefMutation,useRegisterTeamMutation } from '../../../functions/UseMutation/useMutationLogin'; // Corrected import name
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';

const Registers = () => {
  const ipAddress = '1.2.3.4'; // Set it to whatever default value you want
  const isBigScreen = useMediaQuery({ query: '(max-width: 1600px)' });
  const isBMedScreen = useMediaQuery({ query: '(max-width: 13500px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });
  const [widthh, setWidthh] = useState('50%');
  let auth_card = useRef()
  const TN = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={tnlogo} alt="TN logo" style={{ mminWidth:"5em",marginRight: '5%', width: '1.2em', height: '1em' }} />
      TN +216
    </div>
  );
  useEffect(() => {
    if (isBigScreen) {
      setWidthh('50%');
      console.log('big');
    }
    if (isBMedScreen) {
      setWidthh('60%');
      console.log('med');
    }
    if (isSmallScreen) {
      setWidthh('70%');
      console.log('small');
    }
  }, [isSmallScreen, isBMedScreen, isBigScreen]);
  const handleAlertDismiss = () => {
    setMutationError(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mutationError, setMutationError] = useState(null);
  const [tokenTeam, setTokenTeam] = useState(null); // State to hold the token from URL
  const [tokenRef, settokenRef] = useState(null); // State to hold the token from URL

  useEffect(() => {
    // Extract the token from URL if it exists
    const params = new URLSearchParams(window.location.search);
    const token = params.get('tokenteam');
    if (token) {
      localStorage.setItem('tokenteam', token); // Store the token in local storage
      setTokenTeam(token); // Set the tokenTeam state
    }
  }, []);
  useEffect(() => {
    // Extract the token from URL if it exists
    const params = new URLSearchParams(window.location.search);
    const token = params.get('tokenRef');
    if (token) {
      localStorage.setItem('tokenRef', token); // Store the token in local storage
      settokenRef(token); // Set the tokenTeam state
    }
  }, []);

    const navigateToSignIn = () => {
    window.location.href = '/sign_in';

  };
  const navigateToSignInTeam = () => {
    window.location.href = '/sign_in';

  };
  const navigateToSignInRef = () => {
    window.location.href = '/sign_in';

  };


  const usereg = useRegisterMutation(handleAlertDismiss, navigateToSignIn);
  const useregteam = useRegisterTeamMutation(handleAlertDismiss, navigateToSignInTeam);
  const useregRef = useRegisterRefMutation(handleAlertDismiss, navigateToSignInRef);

  const onSubmit = async (data) => {
    const formDataWithIp = { ...data, ip: ipAddress };
    try {
      if (tokenTeam) {
        await useregteam.mutate(formDataWithIp);
      }
      if(tokenRef){
        await useregRef.mutate(formDataWithIp);

      }
      else {
        await usereg.mutate(formDataWithIp);
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  
  return (
    <Container className={styles.main_card}>
      <Container reff={auth_card} width={widthh} className={styles.auth_card}>
        <h3 className={styles.Titre}>SIGN UP TO XSUSTAIN.</h3>
        <Container  width="100%" className={styles.form}>
          <form className={styles.form1} onSubmit={handleSubmit(onSubmit)}>
            <Container width="100%">
              <Flex flex="space-between">
                <Container width="48.5%">
                  <Input className={styles.input} type="text" name="name" label="Name" register={register} required errors={errors} />
                </Container>
                <Container width="48.5%">
                  <Input className={styles.input} type="text" name="familyName" label="Family Name"  register={register} required errors={errors} />
                </Container>
              </Flex>
            </Container>
            <Container className={styles.email} width="100%">
              <Input className={styles.input} type="email" name="email.primary" label="Email"  register={register} required errors={errors} />
            </Container>
            <Container width="100%">
              <Flex flex="space-between">
                <Container width="20%">
                  <Scroll
                    label="Regions"
                    elements={[TN, TN, TN, TN, TN, TN, TN]}
                    defaultItem="Select a region"
                    customStyles={{
                      container: {},
                      label: {},
                      input: {},
                      inputText: {
                        color: 'black',
                        fontWeight: 'bold',
                      },
                      dropdown: {
                        backgroundColor: 'white',
                      },
                      dropdownItem: {
                        '&:hover': {
                          backgroundColor: 'black',
                        },
                      },
                    }}
                  />
                </Container>
                <Container width="79%">
                  <Input className={styles.input} type="text" name="phone.primary" label="Primary Phone Number"  register={register} required errors={errors} />
                </Container>
              </Flex>
            </Container>
            <Container className={styles.pass} width="100%">
              <Input className={styles.input} type="password" name="password" label="Password"  register={register} required errors={errors} />
            </Container>
            <Container className={styles.pass} width="100%">
              <div className={styles.agree}>
                <input className={styles.customcheckbox} type="checkbox" id="agree" name="agree" required />
                <p style={{ color: 'rgba(0, 0, 0, 0.3)' }}>I agree with XSUSTAIN's Terms of Service, Privacy Policy, and default Notification Settings.</p>
              </div>
              {isSubmitted ? (
                <Button type="submit" text="Create Account"  disabled={!mutationError} />
              ) : (
                <Button type="submit" text="Create Account"  disabled={mutationError} />
              )}
              {mutationError === 'email_already_exists' && <p>Email already exists. Please try another email.</p>}
            </Container>
          </form>
        </Container>
      </Container>
    </Container>
  );
};

export default Registers;
