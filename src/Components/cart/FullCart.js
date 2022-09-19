import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import CartProduct from "./CartProduct";
import Loading from "../../commons/Loading";
import { postPurchase } from "../../services/pokemart";
import { Link, useNavigate } from "react-router-dom";

export default function FullCart() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [sending, setSending] = useState(false);
  const { cart } = useContext(CartContext);
  const [uniqueCartProducts, setUniqueCartProducts] = useState([]);
  const [purchase, setPurchase] = useState({
    paymentMethod: "",
    products: [],
  });

  useEffect(() => {
    const uniqueProducts = [];
    const uniqueIds = [];
    cart?.products.forEach((element) => {
      if (!uniqueIds.includes(element.id)) {
        uniqueIds.push(element.id);
        uniqueProducts.push(element);
      }
    });
    setUniqueCartProducts(uniqueProducts);
  }, [cart]);

  useEffect(() => {
    let temp = 0;
    cart?.products.forEach((data) => (temp = temp + data.price));
    setBalance(temp);
  }, [cart]);

  function updateInput(e) {
    setPurchase({ products: cart?.products, [e.target.name]: e.target.value });
  }

  function confirmPurchase(e) {
    e.preventDefault();
    if (window.confirm("Você deseja confirmar essa compra?")) {
      setSending(true);
      postPurchase(purchase)
        .then((res) => navigate(`/checkout/${res.data}`))
        .catch((erro) => {
          alert("Não foi possível confirmar a sua compra, sentimos muito");
          console.log(erro);
        });
    }
  }

  return (
    <>
      <ProductsBox>
        {cart && uniqueCartProducts.length !== 0
          ? uniqueCartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                quantity={
                  cart.products.filter(
                    (element) => product.name === element.name
                  ).length
                }
              />
            ))
          : "Seu carrinho ainda está vazio, adicione alguns produtos!"}
      </ProductsBox>
      <TotalBox>
        <p>Total: R${(balance / 100).toFixed(2)}</p>
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
            <label htmlFor="paymentMethod1">Pix</label>
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
            <label htmlFor="paymentMethod2">Cartão de crédito</label>
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
            <label htmlFor="paymentMethod3">Cartão de débito</label>
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
            <label htmlFor="paymentMethod4">Boleto</label>
          </div>
        </PaymentBox>

        <Button disabled={sending} type="submit">
          {sending ? <Loading /> : "Finalizar a compra"}
        </Button>

        <Link to="/">
          <h3>Quer procurar mais alguns produtos?</h3>
        </Link>
      </form>
    </>
  );
}

const ProductsBox = styled.div`
  background-color: #ededed;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 5px 5px 0 0;
`;

const TotalBox = styled.div`
  background-color: #ffcb05;
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
  background-color: #ededed;
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
  background-color: #ffcb05;
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
