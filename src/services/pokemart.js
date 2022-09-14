import axios from "axios";

const url = "http://localhost:5000";

function signUp(body) {
  const promise = axios.post(`${url}/sign-up`, body);
  return promise;
}

export { signUp };
