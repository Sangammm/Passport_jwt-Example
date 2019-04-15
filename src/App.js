import React, { useState, useEffect } from "react";
import "./App.css";

const url = "http://localhost:3002";
export const request = async (api, method, body) => {
  const res = await fetch(`${url}${api}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

function App() {
  const check = async () => {
    const res = await fetch(`${url}/`);
    if (res.ok) {
      let data = await res.json();
      if (data.Auth) {
        setAuth(true);
        setUser(data.User);
      }
    }
  };

  const signup = async body => {
    const data = await request("/signup", "POST", body);
    if (data.Auth) {
      setAuth(true);
      setUser(data.User);
    }
  };

  const [email, setEmail] = useState("");
  useEffect(() => {
    fetch(`${url}/`)
      .then(res => res.json())
      .then(data => {
        if (data.auth) {
          setAuth(true);
          setUser(data.User);
        }
      });
  }, []);

  const [Auth, setAuth] = useState(false);
  const [User, setUser] = useState(null);

  check();
  return (
    <div className="App">
      {!Auth ? (
        <form>
          <label htmlFor="name">Enter your name: </label>
          <input
            id="name"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              signup({ email: email });
            }}
          >
            SignUp
          </button>
        </form>
      ) : (
        <h2>{User}</h2>
      )}
    </div>
  );
}
export default App;
