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

export { postLogin, signUp, getProducts, confirmCheckout, getCart, postPurchase, getCheckout, updateCart };
