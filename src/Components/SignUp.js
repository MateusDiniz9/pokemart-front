import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/greatball.png";
import { signUp } from "../services/pokemart";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirme, setPasswordConfirme] = useState("");

  function signUpFront(e) {
    e.preventDefault();
    if (!(password === passwordConfirme)) {
      setPasswordConfirme("");
      alert("senhas nao coincidem");
    } else {
      const body = { name, email, password };
      signUp(body)
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          alert("Cadastrado com sucesso");
        });
    }
  }
  return (
    <Wraper>
      <Logo>
        <img src={icon} alt="greatball" />
        PokeMart
      </Logo>
      <Forms onSubmit={signUpFront}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Confirme a senha"
          value={passwordConfirme}
          onChange={(e) => setPasswordConfirme(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </Forms>
      <Link to="/login">
        <h6>Já tem uma conta? Entre agora!</h6>
      </Link>
    </Wraper>
  );
}

const Wraper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00509d;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h6 {
    font-size: 18px;
    color: #ffcb05;
  }
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    border: none;
    color: #11296b;
    margin-bottom: 10px;
    padding-left: 10px;
    font-weight: 400;
    font-size: 20px;
    background-color: white;
  }
  input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
  input::placeholder {
    color: #11296b;
  }
  button {
    width: 326px;
    height: 46px;
    background-color: #ffdb57;
    color: #11296b;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin: 40px 0;
    border: none;
  }
`;

const Logo = styled.h1`
  margin-top: 40%;
  margin-bottom: 40px;
  font-family: "Luckiest Guy", cursive;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffdb57;

  img {
    width: 60px;
    height: 60px;
  }
`;
