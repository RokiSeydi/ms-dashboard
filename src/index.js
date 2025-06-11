import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalConfig = {
  auth: {
    // Application (client) ID from the Azure portal (random one from uni)
    clientId: "af619383-16e3-483b-8f1b-e1c8ba4c8906",
    authority: "https://login.microsoftonline.com/2b897507-ee8c-4575-830b-4f8267c3d307",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>,
  document.getElementById("root")
);
