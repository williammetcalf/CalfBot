import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";

import { AppTemplate, Welcome } from "./pages";

import "./App.css";

const App = () => (
  <AppTemplate>
    <Switch>
      <Route exact path="/" component={Welcome} />
    </Switch>
  </AppTemplate>
);

export default App;
