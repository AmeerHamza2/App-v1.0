import axios from "axios";
import authHeader from "../member/auth_header";

const AUTH_URL = "http://localhost:8088/admin/auth/";

const AUTH_URL_1 = "http://localhost:8088/admin/auth/";

class AuthService {
  constructor() {
    this.authenticated = false;
  }

  login(email, password) {
    return axios
      .post(AUTH_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          if (response.data.role === "ADMIN") {
            console.log(response.data.name);
            this.authenticated = true;
            localStorage.setItem("admin", JSON.stringify(response.data));
          }
          if (response.data.role === "MECHANIC") {
            console.log(response.data.name);
            this.authenticated = true;
            localStorage.setItem("mechanic", JSON.stringify(response.data));
          }
        }
        console.log(response.data.role);
        return response.data;
      })
      .catch((err) => {
        console.log("Login Error" + err);
      });
  }

  registerMechanic(name, email, password, mobile) {
    return axios
      .post(
        AUTH_URL + "registerMechanic",
        { name, email, password, mobile },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem("admin");
    console.log("Inside Logout Method");
  }

  logoutMechanic() {
    localStorage.removeItem("mechanic");
    console.log("Inside Logout Method");
  }

  register(firstname, lastname, email, password, mobile,role) {
   //  role  = "ADMIN";
    return axios.post(AUTH_URL + "register", {
      firstname,
      lastname,
      email,
      password,
      mobile,
      role,
    });
  }

  getCurrentMechanic() {
    return JSON.parse(localStorage.getItem("mechanic"));
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem("admin"));
  }
}

export default new AuthService();
