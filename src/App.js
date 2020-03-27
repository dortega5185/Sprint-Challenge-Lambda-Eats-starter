import React from "react";
import { Route } from "react-router-dom";
import Form from './components/Form'
import Home from "./components/Home";

const App = () => {
  return (
    <div className="core">
      <Route exact path="/" component={Home} />
      <Route path="/pizza" component={Form} />
    </div>
  );
};
export default App;
