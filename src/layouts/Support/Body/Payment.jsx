import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v0/payment', { amount });
      console.log(response.data);
      const resultLink = response.data.result;

        window.location.href = resultLink.link;
        
      setAmount(''); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Payment;