import axios from "axios";
import mechHeader from "../mech_header";
import authHeader from "../auth_header";

const API_URL = "http://localhost:8088/admin/mechanic/";
const ACC_URL = "http://localhost:8020/mechanic/account/";

class MechanicService {
  findAll(serviceProviderId) {
    return axios
      .get(API_URL + `findAll/${serviceProviderId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteAccount(id) {
    return axios
      .delete(ACC_URL + `delete/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findAvailable(serviceProviderId) {
    return axios
      .get(API_URL + `findAvailable/${serviceProviderId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new MechanicService();
