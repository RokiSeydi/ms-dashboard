import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { callMsGraph } from "../graph";

function Calendar() {
  const { instance, accounts } = useMsal();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const request = {
      scopes: ["Calendars.Read"],
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(
          response.accessToken,
          "https://graph.microsoft.com/v1.0/me/events"
        )
          .then((data) => setEvents(data.value))
          .catch(console.error);
      })
      .catch((err) => {
        if (err instanceof InteractionRequiredAuthError) {
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(
              response.accessToken,
              "https://graph.microsoft.com/v1.0/me/events"
            )
              .then((data) => setEvents(data.value))
              .catch(console.error);
          });
        }
      });
  }, [instance, accounts]);

  return (
    <div>
      <h1>Calendar</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.subject}</li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
