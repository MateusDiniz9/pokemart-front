import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postLogin } from "../services/pokemart";
import Loading from "../commons/Loading";

function LogInPage() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("pokemart") !== null) {
      navigate("/");
    }
  }, [navigate]);
  function updateInput(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  function resetForm() {
    setLogin({
      email: "",
      password: "",
    });
    setSending(false);
  }
  function logIn(e) {
    e.preventDefault();
    setSending(true);
    postLogin(login)
      .then((resposta) => {
        localStorage.setItem(
          "pokemart",
          JSON.stringify({
            userId: resposta.data.userId,
            token: resposta.data.token,
            username: resposta.data.username,
            shoppingCart: resposta.data.shoppingCart,
          })
        );
        navigate("/");
      })
      .catch((erro) => {
        alert("Não foi possível logar, tente novamente");
        console.log(erro);
        resetForm();
      });
  }
  return (
    <Main>
      <img src="../../public/icon.png" alt="pokemart logo" />
      <h1>All you and your little friend needs</h1>
      <Box onSubmit={logIn}>
        <Input
          disabled={sending}
          required
          type="email"
          name="email"
          value={login.email}
          onChange={updateInput}
          placeholder="E-mail"
        />
        <Input
          disabled={sending}
          required
          type="password"
          name="password"
          value={login.password}
          onChange={updateInput}
          placeholder="Senha"
        />
        <Button type="submit" disabled={sending}>
          {" "}
          {sending ? <Loading /> : "Entrar"}{" "}
        </Button>
      </Box>
      <Link to="/sign-up">
        <h3>Primeira vez? Cadastre-se conosco!</h3>
      </Link>
    </Main>
  );
}
export default LogInPage;
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
const Box = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
const Input = styled.input`
  width: 100%;
  height: 58px;

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
