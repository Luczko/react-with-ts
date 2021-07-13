import React from "react";
import PizzaCSS from "./Pizza.module.css";
import { AppSetStateContext, useSetState } from "./AppState";
import { useContext } from "react";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Props {
  pizza: Pizza;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
  const setState = useSetState();
  const hanfleAddToCartClick = () => {
    setState((state) => {
      const itemExist = state.cart.items.find((e) => e.id === pizza.id);
      console.log(itemExist);
      return {
        ...state,
        cart: {
          ...state.cart,
          items: itemExist
            ? state.cart.items.map((e) => {
                if (e.id === pizza.id) {
                  return { ...e, quantity: e.quantity + 1 };
                }
                return e;
              })
            : [
                ...state.cart.items,
                {
                  id: pizza.id,
                  name: pizza.name,
                  price: pizza.price,
                  quantity: 1,
                },
              ],
        },
      };
    });
  };

  return (
    <li className={PizzaCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type='button' onClick={hanfleAddToCartClick}>
        Add to Cart
      </button>
    </li>
  );
};

export default Pizza;
