import React from "react";
import { useMsal } from "@azure/msal-react";

function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup({ scopes: ["user.read"] })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
}

export default Login;
