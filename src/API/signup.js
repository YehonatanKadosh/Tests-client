import api from ".";

const rout = "signup";

const signup = (user) =>
  new Promise((resolve, reject) => {
    api
      .post(rout, user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((reason) => reject(reason.response.data));
  });

export default signup;
