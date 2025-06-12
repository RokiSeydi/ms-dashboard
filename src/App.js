import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const msalConfig = {
  auth: {
    clientId: "af619383-16e3-483b-8f1b-e1c8ba4c8906",
    authority: "https://login.microsoftonline.com/2b897507-ee8c-4575-830b-4f8267c3d307",
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

export default App;