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

function confirmCheckout(order) {
  const config = Header();
  const promise = axios.post(`${URL_BASE}/checkout`, order, config);
  return promise;
}

function getCart() {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/cart`, config);
  return promise;
}

function postPurchase(body) {
  const config = Header();
  const promise = axios.post(`${URL_BASE}/checkout`, body, config);
  return promise;
}

function getCheckout(saleId) {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/checkout/${saleId}`, config);
  return promise;
}

function updateCart(products) {
  const config = Header();
  const promise = axios.put(`${URL_BASE}/cart`, products, config);
  return promise;
}

export { postLogin, signUp, confirmCheckout, getCart, postPurchase, getCheckout, updateCart };
