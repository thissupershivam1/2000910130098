import React, { useState } from 'react';
import axios from 'axios';

const NumbersComponent = () => {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:8008/numbers', {
        params: {
          url: ['http://20.244.56.144/numbers/primes', 'http://abc.com/fibo'],
        },
      });
      setNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
    }
  };

  return (
    <div>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumbersComponent;

