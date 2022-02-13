import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";

function App() {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/registration" component={Registration} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  );
}

export default App;
