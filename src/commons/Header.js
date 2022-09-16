import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const [logged, setLogged] = useState(Boolean);
  const [name, setName] = useState("");
  const { cart } = useContext(UserContext);

  useEffect(() => {
    const userSerial = localStorage.getItem("pokemart");
    const user = JSON.parse(userSerial);

    if (user === null) {
      setLogged(false);
    } else {
      setLogged(true);
      setName(user.username);
    }
  }, []);

  function logOut() {
    setLogged(false);
    localStorage.removeItem("pokemart");
  }

  return (
    <Wraper>
      <Cart>
        <ion-icon name="cart-outline"></ion-icon>
        <CartItens>{cart.length > 0 ? cart.length : "0"}</CartItens>
      </Cart>
      <h1>
        <Link to="/">PokeMart</Link>
      </h1>
      <User>
        <div>
          <ion-icon name="person-circle-outline"></ion-icon>
        </div>
        {logged ? (
          <Perfil>
            <p>Olá, {name}</p>
            <div>
              <p onClick={logOut}>SAIR</p>
            </div>
          </Perfil>
        ) : (
          <p>
            Faça <Link to="/login">LOGIN</Link> ou crie seu{" "}
            <Link to="/cadastro">CADASTRO</Link>
          </p>
        )}
      </User>
    </Wraper>
  );
}

const Wraper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 150px;
  background-color: #11296b;
  color: #ffdb57;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  font-size: 35px;
  z-index: 10;
  p {
    font-size: 13px;
  }
  h1 {
    font-family: "Luckiest Guy", cursive;
    margin-right: 20px;
  }
  a {
    color: #ffcb05;
    text-decoration: none;
  }
  ion-icon {
    margin-right: 10px;
  }
`;
const User = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Perfil = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 3px;
  }
`;
const Cart = styled.div`
  position: relative;
  font-size: 50px;
  color: white;
`;
const CartItens = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  font-size: 25px;
  color: white;
  bottom: 0px;
  right: 5px;
  border: 1px solid #ffcb05;
  background-color: #ffcb05;
  border-radius: 50%;
  z-index: 10;
`;
