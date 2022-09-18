import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import { GrFormTrash, GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import { updateCart } from "../../services/pokemart";
import CartContext from "../../contexts/CartContext";

export default function CartProduct({ product, quantity }) {
    const [localData] = useState(JSON.parse(localStorage.getItem('pokemart')))
    const { cart, setCart } = useContext(CartContext);

    function updateProducts(operation) {
        let products = cart.products;

        if (operation === 'delete') {
            products = products.filter(data => product.name !== data.name);
        } else if (operation === 'add') {
            products.push(product);
        } else if (operation === 'subtract') {
            products.splice(products.indexOf(product), 1);
        }

        return products;
    }

    function changeQuantity(operation) {
        const products = updateProducts(operation)

        if (localData?.token) {
            updateCart(products)
                .then(res => setCart(res.data))
                .catch(erro => console.log(erro))
        } else {
            console.log('localstorage')
        }
    }

    return (
        <>
            <Container>
                <ProductBox>
                    <img src={product.img} alt={`${product.name} img`}/>
                    <p>{product.name.charAt(0).toUpperCase()+product.name.slice(1)}</p>
                </ProductBox>
                <ControllersBox>
                    <div>
                        <GrFormTrash onClick={() => changeQuantity('delete')}/>
                    </div>
                    <p>{product.price*quantity}</p>
                    <div>
                        <GrFormAdd onClick={() => changeQuantity('add')}/>
                        <p>{quantity}</p>
                        <GrFormSubtract onClick={() => changeQuantity('subtract')}/>
                    </div>
                </ControllersBox>
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 2px 2px #11296B;
    border-radius: 5px;
`;

const ProductBox = styled.div`
    gap: 5px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;

    img {
        height: 80px;
    }
`;

const ControllersBox = styled.div`
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 24px;

    div {
        display: flex;
        align-items: center;
    }
`;