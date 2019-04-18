import React, { useState, useInject, useEffect, useContext } from "react";
import userstore from "../Store/User";
function Signup() {
  const [User, setUser] = useState({ password: "", email: "" });
  // useEffect(() => {
  //   console.log(User);
  // });
  const store = useContext(userstore);
  return (
    <form>
      <h2>Signup</h2>
      <label>Email</label>
      <br />
      <input
        type="email"
        autoComplete="true"
        onChange={e =>
          setUser({ email: e.target.value, password: User.password })
        }
      />
      <br />
      <label>Password</label>
      <br />
      <input
        type="password"
        autoComplete="true"
        onChange={e => setUser({ password: e.target.value, email: User.email })}
      />
      <br />
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          store.user.signup({ email: User.email, password: User.password });
        }}
      >
        SignUp
      </button>
    </form>
  );
}
export default Signup;
