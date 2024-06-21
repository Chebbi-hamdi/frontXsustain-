import "./Fail.css"; // Import a CSS file to style your component
import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useSearchParams } from "react-router-dom";

const Success = () => {
  const [savedData, setSavedData] = useState({});
  


  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const amount = searchParams.get("amount");
  console.log("paymentId-------------", paymentId);
  console.log("amount-------------", amount);
  useEffect(() => {
    axios
      // .post(`http://localhost:3000/api/v0/payment/${paymentId}`)
      .post(`http://192.168.11.113:3000/api/v0/payment/${paymentId}`)
      .then((response) => {
        console.log("response-------------", response); 
        setSavedData(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  useEffect(() => {
    if (savedData) {
      // axios.post(`http://localhost:3000/api/v0/transaction`, {
      axios.post(`http://192.168.11.113:3000/api/v0/transaction`, {
        amount: amount,
        order: savedData?.details?.order_number,
        name: savedData?.details?.name,
        email: savedData?.details?.email,
        phone: savedData?.details?.phone_number,
        type: savedData?.type,
        status: savedData?.status,
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [savedData]);  // Moved the dependency array inside the parentheses
  console.log("savedData-------------", savedData);
  return (
    <div className="success-page">
      <h1>Operation Successful</h1>
      <p>Your operation was completed successfully.</p>
      <button
        onClick={() =>
          // Redirect to the home page
          // (window.location.href = "http://localhost:3001/sign_in")
          (window.location.href = "http://192.168.11.113:3001/sign_in")
        }
      >
        Continue
      </button>
    </div>
  );
};

export default Success;
