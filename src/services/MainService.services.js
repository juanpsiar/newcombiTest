import { client } from './api';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

const code = {
  username: process.env.REACT_APP_AUTH_USERNAME,
  password: process.env.REACT_APP_AUTH_PASSWORD,
};

class MainService {
  static async postAuthentication() {
    let result;

    await client
      .post(`/auth`, code)
      .then((resp) => {
        result = resp;
      })
      .catch((error) => console.log('error', error));
    return result.data;
  }

  static async getTableData() {
    let result;

    await client
      .get(`/api/members`, config)
      .then((resp) => {
        result = resp;
        console.log({ result });
      })
      .catch((error) => console.log('error', error));
    return result.data;
  }

  static async createUser(userCreated) {
    let result;
    console.log('post', { userCreated });
    await client
      .post(`/api/members`, userCreated, config)
      .then((resp) => {
        result = resp;
        console.log({ result });
      })
      .catch((error) => console.log('error', error));
    return result;
  }
}

export default MainService;
