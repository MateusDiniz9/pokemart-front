import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart, postPurchase } from "../../services/pokemart";
//import header
import CartProduct from "./CartProduct";

function CartPage() {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [cart, setCart] = useState([]);
    const localData = JSON.parse(localStorage.getItem('pokemart'));

  useEffect(() => {
    if (localData.token) {
        getCart()
        .then(res => setCart(res.data))
        .catch(erro => console.log(erro))
    } else {
        setCart(localData.cart);
    }
  }, []);

  function confirmPurchase() {
    if (window.confirm('Você deseja confirmar essa compra?')) {
        setSending(true)
        postPurchase(cart)
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
          <h1>{localData?.token ? `${localData.username},` : 'Visitante,' } esse é seu carrinho:</h1>

            <ProductsBox>
                {cart?.length !== 0 ? cart.products.map((product, index) => <CartProduct key={index} product={product[0]}/>) : 'Seu carrinho ainda está vazio, adicione alguns produtos!'}
            </ProductsBox>

            <PaymentBox>
                <div>
                    <Input
                        disabled={sending}
                        type="radio"
                        id="paymentMethod1"
                        name="Pix"
                        value="Pix"
                    />
                    <label for="paymentMethod1">Pix</label>
                </div>
                <div>
                    <Input
                        disabled={sending}
                        type="radio"
                        id="paymentMethod2"
                        name="Cartão de crédito"
                        value="Cartão de crédito"
                    />
                    <label for="paymentMethod2">Cartão de crédito</label>
                </div>
                
                <div>
                    <Input
                        disabled={sending}
                        type="radio"
                        id="paymentMethod3"
                        name="Cartão de débito"
                        value="Cartão de débito"
                    />
                    <label for="paymentMethod3">Cartão de débito</label>
                </div>
            </PaymentBox>

            <Button disabled={sending} onClick={() => confirmPurchase()}>
                {sending ? '<Loading />' : "Comprar"}
            </Button>

            <Link to="/">
                <h3>Quer voltar e dar uma olhadinha em outros produtos?</h3>
            </Link>
        </Main>
    </>
  );
}

export default CartPage;

const Main = styled.div`
  background-color: purple;
  min-height: 100vh;
  margin: auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 400;
    font-size: 32px;
    color: #ffffff;
    margin-bottom: 24px;
}
  h3 {
    font-weight: 700;
    font-size: 15px;
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
`;

const ProductsBox = styled.div`
  background-color:red;
  min-height: 300px;
  width: 90%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    background-color: green;
    padding: 5px;
  }
`;

const PaymentBox = styled.form`
  background-color: blue;
  width: 90%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  label {
    background-color: yellow;
    margin-left: 5px;
  }
`;

const Input = styled.input`
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  padding: 10px;
  border-radius: 5px;
  &::placeholder {
    color: #000000;
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f2f2f2;
    color: #d4d4d4;
  }
`;

const Button = styled.button`
  background-color: #a328d6;
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 5px;

  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
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