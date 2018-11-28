import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";

import { AppTemplate, Home } from "./pages";

import "./App.css";

const App = () => (
  <AppTemplate>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </AppTemplate>
);

export default App;
