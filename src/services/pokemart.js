import axios from "axios";

const URL_BASE =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : process.env.REACT_APP_API_BASE_URL;

function postLogin(login) {
  const promise = axios.post(`${URL_BASE}/sign-in`, login);
  return promise;
}

function signUp(body) {
  const promise = axios.post(`${URL_BASE}/sign-up`, body);
  return promise;
}

function getProducts() {
  const promise = axios.get(`${URL_BASE}/products`);
  return promise;
}

export { postLogin, signUp, getProducts };
