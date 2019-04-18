import React, { useState, useInject, useContext } from "react";
import userstore from "../Store/User";
export default function Login() {
  const store = useContext(userstore);
  const [User, setUser] = useState({ _id: null, password: "", email: "" });
  return (
    <React.Fragment>
      <h2>Login</h2>
      <label htmlFor="name">Enter your name: </label>
      <br />
      <input
        id="name"
        type="email"
        autoComplete="true"
        onChange={e => setUser({ email: e.target.value })}
      />
      <br />
      <label htmlFor="name">Password</label>
      <br />
      <input
        type="password"
        autoComplete="true"
        onChange={e => setUser({ password: e.target.value })}
      />
      <br />
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          store.signup({ email: User.email, password: User.password });
        }}
      >
        Login
      </button>
    </React.Fragment>
  );
}
