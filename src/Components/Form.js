import React, { useState, useEffect } from "react";

import Signup from "./Signup";
import Login from "./Login";

function Form() {
  const [login, toggle] = useState(false);
  //const store = useContext(userstore);
  return (
    <div>
      <button onClick={() => toggle(!login)}>
        {login ? "go to signup" : "go to login"}
      </button>
      {login ? <Login /> : <Signup />}
    </div>
  );
}
export default Form;
