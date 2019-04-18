import { useObservable, observer } from "mobx-react-lite";
import { request } from "../App";
import { decorate, action, observable } from "mobx";
import { createContext } from "react";
class userstore {
  user = {
    person: { _id: null, email: null },
    auth: false,
    message: null,
    async checkAuth({ t }) {
      const data = await request("/login", "POST", { t });
      if (data.sucess) {
        this.auth = true;
        this.person._id = data._id;
        this.person.email = data.email;
        this.message = null;
      } else {
        this.auth = false;
      }
      console.log(this.auth);
      console.log(this.person);
    },
    async signup(u) {
      const data = await request("/signup", "POST", u);
      console.log(data);
      if (data.sucess) {
        this.auth = true;
        this.person._id = data.t;
        this.person.email = data.email;
        localStorage.removeItem("t");
        localStorage.setItem("t", data.t);
      } else {
        this.auth = false;
        this.message = "signup failed";
      }
      console.log(this.person.email);
    }
  };
}
decorate(userstore, {
  user: observable,
  person: observable,
  auth: observable,
  checkAuth: action,
  signup: action
});
export default createContext(new userstore());
