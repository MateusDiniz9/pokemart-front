import styled from "styled-components";
import Header from "../commons/Header";
import { useState, useEffect, useContext } from "react";
import { getProducts } from "../services/pokemart";
import types from "../enums/types";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [logged, setLogged] = useState(Boolean);
  const [user, setUser] = useState({});
  const { cart, setCart } = useContext(UserContext);

  console.log(cart);
  function findType(pokemon) {
    let color1;
    let color2;
    let background;
    for (let i = 0; i < types.length; i++) {
      if (types[i].type === pokemon.type[0]) {
        color1 = types[i].color;
        background = types[i].background;
      }
      if (pokemon.type[1] && types[i].type === pokemon.type[1]) {
        color2 = types[i].color;
      }
    }
    return { color1, color2, background };
  }

  function sendToCart(product) {
    if (logged) {
      //busca o cart desse usuario da api e salva em cart
      //se n existir o cart dele na api mantem esses produtos que ele colocou buscando do localstorage
    } else {
      console.log("aqui", cart);
      setCart([...cart, product]);
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart,
        })
      );
    }
  }

  useEffect(() => {
    getProducts().then((res) => {
      const newpokes = res.data.map((pokemon) => ({
        ...pokemon,
        color: findType(pokemon),
      }));
      setProducts(newpokes);
    });
    const cartSerial = localStorage.getItem("cart");
    const cartLocal = JSON.parse(cartSerial);
    setCart([cartLocal]);
    const userSerial = localStorage.getItem("pokemart");
    const userLocal = JSON.parse(userSerial);
    if (userLocal === null) {
      setLogged(false);
    } else {
      setLogged(true);
      setUser(userLocal);
    }
  }, []);

  return (
    <Wraper>
      <Header />
      <Products>
        {products.length === 0
          ? ""
          : products.map((product, index) => (
              <Pokemon
                key={index}
                color={
                  product.color.color2
                    ? product.color.color2
                    : product.color.color1
                }
                colorBotao={product.color.color1}
              >
                <Back src={product.color.background}></Back>
                <Poke src={product.img} alt="img_poke" />
                <h2>
                  {product.name[0].toUpperCase() + product.name.substring(1)}
                </h2>
                <h3>
                  {product.type[0][0].toUpperCase() +
                    product.type[0].substring(1)}{" "}
                  {product.type[1]
                    ? product.type[1][0].toUpperCase() +
                      product.type[1].substring(1)
                    : ""}
                </h3>
                <h4>R$ {(product.price / 100).toFixed(2)}</h4>
                <h5>À vista no PIX</h5>
                <button onClick={() => sendToCart(product)}>
                  <ion-icon name="cart"></ion-icon>Comprar
                </button>
              </Pokemon>
            ))}
      </Products>
    </Wraper>
  );
}

const Wraper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Products = styled.div`
  margin-top: 150px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #00509d;
  padding: 0 10px;
`;
const Back = styled.img`
  width: 100%;
  height: 100%;
`;
const Pokemon = styled.div`
  position: relative;
  width: 270px;
  height: 150px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 8px solid ${(props) => props.color};
  color: white;
  z-index: 5;
  h2 {
    position: absolute;
    top: 10px;
    right: 5px;
  }
  h3 {
    position: absolute;
    top: 40px;
    right: 5px;
  }
  h4 {
    position: absolute;
    right: 5px;
    bottom: 47px;
  }
  h5 {
    position: absolute;
    right: 5px;
    bottom: 32px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 140px;
    height: 20px;
    background-color: ${(props) => props.colorBotao};
    border: 1px solid black;
    z-index: 5;
    position: absolute;
    right: 5px;
    bottom: 10px;
  }
`;
const Poke = styled.img`
  width: 90px;
  height: 90px;
  margin: 0 auto;
  z-index: 5;
  position: absolute;
  left: 5px;
`;
