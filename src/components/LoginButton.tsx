import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    // Redirect the user to the SAML login endpoint
    window.location.href = '/api/auth/saml/login';
  };

  return (
    <button onClick={handleLogin}>Login with SAML</button>
  );
};

export default LoginButton;