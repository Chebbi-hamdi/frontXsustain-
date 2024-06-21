import React ,{useState}from 'react'
import { Div } from '../../../drawables/Divs/Div_Param'
import styles from './style.module.scss'
import SuppCard from '../../../drawables/cards/Support/Body/SuppCard'
import pricing from '../../../assets/images/Support/cash.svg'
import Sup from '../../../assets/images/Support/Supp.svg'
import task from '../../../assets/images/Support/task-square.svg'
import User from '../../../assets/images/Support/User_01.svg'
import Web from '../../../assets/images/Support/web.svg'
import work from "../../../assets/images/Support/Working.svg"
import Btn from "../../../drawables/buttons/button.Dash"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Body = () => {
    // const navigate = useNavigate();
    // const handleChange = () => {
    //     console.log("clicked")
    //     navigate('/payment')
    // }
      // Step 1: Set up state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Step 3: Send the data to the server
  const handleSubmit = async (e) => {
    console.log("clicked",formData)
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://192.168.11.113:3000/api/v0/team/contact', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
        });
 

        if (response.status === 200) {
            console.log('Submission successful', response.data); // Use response.data instead of response.json()
            // Handle success (e.g., showing a success message)
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                message: '',
                });
          } else {
            console.error('Submission failed');
            // Handle error (e.g., showing an error message)
          }

      
    } catch (error) {
      console.error('Submission error', error);
      // Handle error (e.g., showing an error message)
    }
  };
  return (
    // <Div height={'95%'} width={'85%'} className={styles.mainBodySupp}>
    //     <Div height={'90%'} width={'100%'}>
    //         <Div height={'10%'} width={'95%'} className={styles.TitleBody}>
                
    //             <p  className={styles.allsections}>View all sections</p>

    //         </Div>

    //         <Div height={'80%'} width={'95%'} className={styles.CardsContainer}>
    //             <Div height={'50%'} width={'100%'} className={styles.CardsContainer1}>

    //                 <SuppCard Height={"95%"} Width={"25%"} imagee={pricing} Title={"Planing"} Descrption={"The Production Team, Scope, Limitations, & Turnaround Time Information"}  />
    //                 <SuppCard Height={"95%"} Width={"25%"} imagee={User} Title={"Gére votre compte"} Descrption={"Configurez votre compte et faites-vous vérifier."}  />
    //                 <SuppCard Height={"95%"} Width={"25%"} imagee={task} Title={"Tasks"} Descrption={"Tasks configuration"}  />
    //                 <SuppCard Height={"95%"} Width={"25%"} imagee={Web} Title={"Website design"} Descrption={"Our subscribers' website. Learn how to use our platform to submit requests, "}  />
    //             </Div>
    //             <Div height={'50%'} width={'100%'} className={styles.CardsContainer2}>
    //                 <Div height={'100%'} width={'23.3%'} className={styles.CardsContainer3}>
    //                     <SuppCard Height={"95%"} Width={"100%"} imagee={work} Title={"Working With  Team"} Descrption={"The Production Team, Scope, Limitations, & Turnaround Time Information"}/>
    //                 </Div>
    //                 <SuppCard className={styles.cardbosCustom} Height={"95%"} Width={"75%"} imagee={Sup} Title={"FAQs & Support"} Descrption={"Still can't find what you need? View our FAQs here, or contact our Support Team!"}/>
    //             </Div>

    //         </Div>


    //         <Div height={'10%'} width={'95%'} className={styles.HealpSec}>
    //             <p className={styles.Title}> Do you still need help?</p>
    //             <Div height={"80%"} width={"20%"}>
    //                 <Btn text={"CONTACT US"} className={styles.btn} onClick={handleChange}/>
    //             </Div>
    //         </Div>



    //     </Div>
    // </Div>
    <div className={styles.container}>
    {/* <div className={styles.TitleBody}>
      <p className={styles.allsections}>Contact Us</p>
      <p className={styles.allsections}>Do you still need help?</p>
    </div> */}
    <div className={styles.FormContainer}>
    <form className={styles.Form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        name="fullName"
        className={styles.input}
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className={styles.input}
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        className={styles.input}
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <textarea
        placeholder="Message"
        name="message"
        className={styles.textarea}
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit" className={styles.btn}>CONTACT US</button>
    </form>
    </div>
  </div>
  )
}

export default Body
