import React from "react";

export default function Login(props) {
  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={props.handleLogin}>
          Username: <input type="text" name="username" /> <br />
          <br />
          Password: <input type="text" name="password" />
          <br />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
