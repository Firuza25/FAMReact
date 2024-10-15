import React, { useEffect, useState } from 'react';

const Account = ({ username }) => {
  const [welcomeAccount, setWelcomeAccount] = useState('');

  useEffect(() => {
    setWelcomeAccount(`Hello ${username}!`);
    console.log("I'm working"); 
  }, [username]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{welcomeAccount}</h2>
    </div>
  );
};

export default Account;
