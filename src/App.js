import React, { useState, useEffect, useContext } from "react";
import { observer, useObservable } from "mobx-react-lite";
import "./App.css";

import userstore from "./Store/User";

import Form from "./Components/Form";

const url = "http://localhost:3002";

export const request = async (api, method, body = undefined) => {
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

const App = observer(() => {
  const store = useContext(userstore);
  useEffect(() => {
    var token = localStorage.getItem("t");
    console.log(token);

    if (token) {
      request("/login", "POST", { t: token }).then(data => {
        if (data && data.sucess) {
          store.user.auth = true;
          store.user.person.email = data.email;
        }
      });
      console.log(store.user.person);
    } else {
      store.user.auth = false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("t");
    store.user.auth = false;
  };
  return (
    <div className="App">
      {!store.user.auth ? (
        <Form />
      ) : (
        <React.Fragment>
          <h2>Welcome! {store.user.person.email}</h2>
          <p>Automatic sign in using passport js</p>
          <button onClick={logout}>Logout</button>
        </React.Fragment>
      )}
    </div>
  );
});
export default App;
