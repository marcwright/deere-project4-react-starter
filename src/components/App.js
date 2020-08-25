import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

class App extends React.PureComponent {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <nav>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        <main>
          <Route exact path="/" render={(routerProps) => <Home />} />
          <Route path="/signup" render={(routerProps) => <Signup />} />
          <Route path="/login" render={(routerProps) => <Login />} />
        </main>
      </div>
    );
  }
}

export default App;
