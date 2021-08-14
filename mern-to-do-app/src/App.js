import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import TasksList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
    <Navbar />
      <br />
      <Route path="/" exact component={TasksList} />
      <Route path="/edit/:id" exact component={EditTask} />
      <Route path="/create" exact component={CreateTask} />
      <Route path="/user" exact component={CreateUser} />
    </Router>
  );
}

export default App;
