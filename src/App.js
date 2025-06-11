import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import Emails from "./components/Emails";
import AIPrompt from "./components/AIPrompt";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/emails" component={Emails} />
        <Route path="/ai-prompt" component={AIPrompt} />
      </Switch>
    </Router>
  );
}

export default App;
