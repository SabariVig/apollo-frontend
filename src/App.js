import React from "react";
import { Switch,Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import "antd/dist/antd.css";
import Navbar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Hello</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
