import { client } from './api';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

class MainService {
  static async postAuthentication(code) {
    let result;
    console.log(
      'process.env.REACT_APP_AUTH_DOMAIN',
      process.env.REACT_APP_AUTH_DOMAIN
    );
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

    await client
      .post(`/api/members`, config, userCreated)
      .then((resp) => {
        result = resp;
        console.log({ result });
      })
      .catch((error) => console.log('error', error));
    return result.data;
  }
}

export default MainService;
