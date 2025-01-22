import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Access Token:", response.access_token);
      localStorage.setItem("accessToken", response.access_token);

      const userInfo = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }).then((res) => res.json());

      console.log("User Info:", userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

      navigate("/home");
    },
    onError: () => {
      console.error("Login Failed");
    },
    scope: "https://www.googleapis.com/auth/calendar",
  });

  return (
    <div>
      <button onClick={() => login()}>Login with Google</button>
    </div>
  );
};

export default Login;
