import axios from "axios";
import { toast } from "react-toastify";
const AUTH_URL = "http://localhost:8080/customer/auth/";

class AuthService {
  constructor() {
    this.authenticated = false;
  }
  login(email, password) {
    return axios
      .post(AUTH_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          console.log(response.data.userId);
          this.authenticated = true;
          localStorage.setItem("customer", JSON.stringify(response.data));
        }
        toast.success("Login Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
        return response.data;
      })
      .catch((err) => {
        toast.error("Invalid Email or Password !", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Login Error: " + err);

        return err;
      });
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem("customer");
    console.log("Inside Logout Method");
  }

  register(firstname, lastname, email, password) {
    return axios.post(AUTH_URL + "register", {
      firstname,
      lastname,
      email,
      password,
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
  getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("customer"));
  }
}

export default new AuthService();
