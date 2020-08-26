import React from "react";
import "./App.css";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import UserDetail from "./UserDetail";
import axios from "axios";
import jwt_decode from "jwt-decode";
let backendUrl =
  process.env.REACT_APP_BACKEND_APP_URL || "http://localhost:3000";
// let backendUrl = "https://deere-project4-express.herokuapp.com/api";

class App extends React.PureComponent {
  state = {
    currentUser: null,
  };

  handleSignup = async (e) => {
    e.preventDefault();
    let response = await axios({
      method: "post",
      url: `${backendUrl}/auth/signup`,
      data: {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });
    let token = response.data.token;
    localStorage.setItem("jwt", `${token}`);
    let decoded = jwt_decode(token);

    this.setState({ currentUser: decoded });
    this.props.history.push(`/users/${this.state.currentUser.id}`);
  };

  handleLogin = async (e) => {
    e.preventDefault();
    let response = await axios({
      method: "post",
      url: `${backendUrl}/auth/login`,
      data: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });

    let token = response.data.token;

    localStorage.setItem("jwt", `${token}`);
    let decoded = jwt_decode(token);

    this.setState({ currentUser: decoded });
    this.props.history.push(`/users/${this.state.currentUser.id}`);
    console.log(decoded);
  };

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({ currentUser: null });
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
          {this.state.currentUser
            ? `Welcome, ${this.state.currentUser.username}`
            : ""}
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
          <Route
            path="/users/:id"
            render={(routerProps) => <UserDetail {...this.state} />}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
