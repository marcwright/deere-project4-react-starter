import React from "react";
import "./App.css";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import axios from "axios";
const backendURL = "http://localhost:3000";

class App extends React.PureComponent {
  constructor(props) {
    super();
  }

  async handleSignup(e) {
    e.preventDefault();
    let response = await axios({
      method: "post",
      url: `${backendURL}/auth/signup`,
      data: {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });

    document.cookie = `jwt=${response.data.token}`;
    console.log(response);
  }

  async handleLogin(e) {
    e.preventDefault();
    let response = await axios({
      method: "post",
      url: `${backendURL}/auth/login`,
      data: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });

    document.cookie = `jwt=${response.data.token}`;
    console.log(response);
  }

  handleLogout = () => {
    console.log("clear cookie");
    document.cookie = "jwt=null";
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Project 4 Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/" onClick={this.handleLogout}>
            Logout
          </Link>
        </nav>
        <main>
          <Route exact path="/" render={(routerProps) => <Home />} />
          <Route
            path="/signup"
            render={(routerProps) => (
              <Signup handleSignup={this.handleSignup} />
            )}
          />
          <Route
            path="/login"
            render={(routerProps) => <Login handleLogin={this.handleLogin} />}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
