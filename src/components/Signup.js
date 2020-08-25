import React from "react";

export default function Signup(props) {
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={props.handleSignup}>
        Name: <input type="text" name="name" />
        <br />
        <br />
        Username: <input type="text" name="username" /> <br />
        <br />
        Password: <input type="text" name="password" />
        <br />
        <br />
        <input type="submit" value="SignUp" />
      </form>
    </div>
  );
}
