import axios from "axios";

const URL_BASE = "http://127.0.0.1:5000";

function postLogin(login) {
  const promise = axios.post(`${URL_BASE}/sign-in`, login);
  return promise;
}

function signUp(body) {
  const promise = axios.post(`${URL_BASE}/sign-up`, body);
  return promise;
}

function Header() {
  const authorization = JSON.parse(localStorage.getItem('pokemart'));
  const config = {
    headers: {
      authorization: `Bearer ${authorization.token}`,
      userId: authorization.userId
    }
  };
  return config;
}

function getCheckout() {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/checkout`, '', config);
  return promise;
}

export { postLogin, signUp, getCheckout };
