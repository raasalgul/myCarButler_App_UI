import axios from "axios";
import {userLogin, userRegister} from "../constants/Constant"


class AuthService {
  async login(email, password) {
    let token=""
    let formData={
          "email":email,
          "password":password
        }
    await fetch(`${userLogin}/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers:{'Content-Type':'application/json'},
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(formData) // body data type must match "Content-Type" header
    }).then(response => response.json())
    .then((data) => {
        console.log("inside response")
        token = data
        localStorage.setItem("user", JSON.stringify(token));
        //token = JSON.stringify(data)
      //  console.log(token.token)
    })
    .catch((error) => {
        console.log(error);
    });
    return token;
  }

  logout() {
    // const history = useHistory();

    // localStorage.removeItem("user");
    // window.location.reload(false)
    // history.push("/");
  }
 
  register( firstname,
    password,email,lastname,address) {
    return axios.post(userRegister, {
      firstname,
       password,
       email,
       lastname,
       address
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
