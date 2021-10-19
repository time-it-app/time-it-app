import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage.jsx";
import About from "../pages/About.jsx";
import Settings from "../pages/Settings.jsx";
import Task from "../pages/Task.jsx";

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
