import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";

import { About, AppTemplate, Welcome } from "./pages";

import "./App.css";

const App = () => (
  <AppTemplate>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/about" component={About} />
      <Route exact path="/auth/spotify" />
    </Switch>
  </AppTemplate>
);

export default App;
