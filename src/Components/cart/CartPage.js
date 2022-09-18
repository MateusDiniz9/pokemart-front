import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getCart, postPurchase } from "../../services/pokemart";
import Loading from "../../commons/Loading";
//import header
import CartProduct from "./CartProduct";
import CartContext from "../../contexts/CartContext";

function CartPage() {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const [ balance, setBalance ] = useState(0);
    const [ uniqueCartProducts, setUniqueCartProducts ] = useState([]);
    const [localData] = useState(JSON.parse(localStorage.getItem('pokemart')));
    const [ purchase, setPurchase ] = useState({
      paymentMethod: '',
      products: []
    })

  useEffect(() => {
    if (localData?.token) {
        getCart()
          .then(res => setCart(res.data))
          .catch(erro => console.log(erro))
    } else {
        setCart(localData?.cart);
    }
  }, [setCart, localData]);

  useEffect(() => {
    const uniqueProducts = [];
    const uniqueIds = [];
    cart?.products.forEach(element => {
      if (!uniqueIds.includes(element.id)) {
        uniqueIds.push(element.id);
        uniqueProducts.push(element)
      }
    })
    setUniqueCartProducts(uniqueProducts);
    setPurchase({ ...purchase, products: cart?.products })
  }, [cart]);

  useEffect(() => {
    let temp = 0;
    cart?.products.forEach((data) => temp = temp + data.price);
    setBalance(temp);
}, [cart]);

  function updateInput(e) {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  }

  function confirmPurchase(e) {
    if (window.confirm('Você deseja confirmar essa compra?')) {
      setSending(true)
      postPurchase(purchase)
        .then(res => navigate(`/checkout/${res.data.saleId}`))
        .catch(erro => {
          alert('Não foi possível confirmar a sua compra, sentimos muito');
          console.log(erro);
      });
    }
}

  return (
    <>
        {/* <Header /> */}
        <Main>
          <h1>{localData?.token ? `${<span>{localData.username}</span>},` : 'Visitante,' } esse é seu carrinho:</h1>
          <ProductsBox>
              {cart && uniqueCartProducts.length !== 0 ? uniqueCartProducts.map((product, index) => <CartProduct key={index} product={product} quantity={cart.products.filter(element => product.name === element.name).length}/>) : 'Seu carrinho ainda está vazio, adicione alguns produtos!'}
          </ProductsBox>
          <TotalBox>
            <p>Total: {balance}</p>
          </TotalBox>

          <h2>Escolha a sua forma de pagamento:</h2>
          <form onSubmit={confirmPurchase}>
            <PaymentBox>
              <div>
                <Input
                    disabled={sending}
                    type="radio"
                    id="paymentMethod1"
                    name="paymentMethod"
                    value="Pix"
                    onChange={updateInput}
                  />
                <label for="paymentMethod1">Pix</label>
              </div>
              <div>
                  <Input
                      disabled={sending}
                      type="radio"
                      id="paymentMethod2"
                      name="paymentMethod"
                      value="Cartão de crédito"
                      onChange={updateInput}
                  />
                  <label for="paymentMethod2">Cartão de crédito</label>
              </div>
              
              <div>
                  <Input
                      disabled={sending}
                      type="radio"
                      id="paymentMethod3"
                      name="paymentMethod"
                      value="Cartão de débito"
                      onChange={updateInput}
                  />
                  <label for="paymentMethod3">Cartão de débito</label>
              </div>

              <div>
                  <Input
                      disabled={sending}
                      type="radio"
                      id="paymentMethod4"
                      name="paymentMethod"
                      value="Boleto"
                      onChange={updateInput}
                  />
                  <label for="paymentMethod4">Boleto</label>
              </div>
            </PaymentBox>

            <Button disabled={sending} type="submit">
              {sending ? <Loading /> : "Finalizar a compra"}
            </Button>
          </form>

          <Link to="/">
              <h3>Quer procurar mais alguns produtos?</h3>
          </Link>
        </Main>
    </>
  );
}

export default CartPage;

const Main = styled.div`
  background-color: #11296B;
  min-height: 100vh;
  margin: auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    margin-bottom: 24px;
    text-align: left;
}
h2 {
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
    margin-bottom: 5px;
    text-align: left;
}
  h3 {
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    margin-top: 36px;
    text-align: center;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    &:disabled {
      opacity: 0.8;
      cursor: default;
    }
  }
  span {
    color: #FFCB05;
  }
  form {
    width: 100%;
  }
`;

const ProductsBox = styled.div`
  background-color: #EDEDED;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 5px 5px 0 0;
`;

const TotalBox = styled.div`
  background-color: #FFCB05;
  width: 100%;
  height: 80px;
  padding: 15px;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: right;
  border-radius: 0 0 5px 5px;
  margin-bottom: 25px;
`;

const PaymentBox = styled.div`
  background-color: #EDEDED;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 16px;

  div {
    gap: 3px;
    display: flex;
    flex-direction: column;
    justify-content: top;
    text-align: center;
    width: 100px;
  }
`;

const Input = styled.input`
  height: 16px;
`;

const Button = styled.button`
  background-color: #FFCB05;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
  &:disabled {
    filter: brightness(0.7);
    cursor: default;
  }
`;