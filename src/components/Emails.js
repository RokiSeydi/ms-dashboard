import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { callMsGraph } from "../graph";

function Emails() {
  const { instance, accounts } = useMsal();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const request = {
      scopes: ["Mail.Read"],
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(
          response.accessToken,
          "https://graph.microsoft.com/v1.0/me/messages"
        )
          .then((data) => setEmails(data.value))
          .catch(console.error);
      })
      .catch((err) => {
        if (err instanceof InteractionRequiredAuthError) {
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(
              response.accessToken,
              "https://graph.microsoft.com/v1.0/me/messages"
            )
              .then((data) => setEmails(data.value))
              .catch(console.error);
          });
        }
      });
  }, [instance, accounts]);

  return (
    <div>
      <h1>Emails</h1>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.subject}</li>
        ))}
      </ul>
    </div>
  );
}

export default Emails;
