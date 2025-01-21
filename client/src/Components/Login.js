import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const handleSuccess = (response) => {
    const decodedUser = jwtDecode(response.credential);
    console.log("User Info:", decodedUser);
    
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default Login;
