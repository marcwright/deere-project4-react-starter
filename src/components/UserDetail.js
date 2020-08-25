import React from "react";

export default function UserDetail(props) {
  return (
    <div>
      <h1>
        Hello {props.currentUser ? props.currentUser.username : "Not Logged In"}
      </h1>
    </div>
  );
}
