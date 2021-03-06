import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import withAuth from "./components/AuthGuard/AuthGuard";

import { About, AppTemplate, Home, Welcome } from "./pages";

import "./App.css";

const App = () => (
  <AppTemplate>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/about" component={About} />
      <Route exact path="/home" component={withAuth(Home)} />
      <Route exact path="/home-dev" component={Home} />
    </Switch>
  </AppTemplate>
);

export default App;
