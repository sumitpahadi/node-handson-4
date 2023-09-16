import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('https://backend-irql.onrender.com/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      setVerified(true);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  }, []);

  return (
    <div>
      {verified ? (
        <div>
          <h1>Authenticated</h1>
          {/* Render your authenticated content here */}
        </div>
      ) : (
        <h1>Not Authenticated</h1>
      )}
    </div>
  );
}

export default Home;
