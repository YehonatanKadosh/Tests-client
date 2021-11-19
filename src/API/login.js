import api from ".";

const rout = "login";

const login = (email, password) =>
  new Promise((resolve, reject) => {
    api
      .post(rout, { email, password })
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((reason) => reject(reason.response.data));
  });

export default login;
