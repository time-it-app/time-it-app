import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "../assets/css/App.css";
import About from "../pages/About";
import MainPage from "../pages/MainPage";
import Settings from "../pages/Settings";
import Task from "../pages/Task";

export default function App() {
  return (
    <HashRouter>
      <div id="main">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/tasks" component={MainPage} />
          <Route exact path="/task" component={Task} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </HashRouter>
  );
}
