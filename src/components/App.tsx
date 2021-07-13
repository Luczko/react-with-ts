import React from "react";
import pizzas from "../data/pizzas.json";
import Pizza from "./Pizza";
import Cart from "./Cart";
import AppCSS from "./App.module.css";
import PizzaSVG from "../svg/pizza.svg";
import AppStateProvider from "./AppState";

const App = () => {
  return (
    <AppStateProvider>
      <div className={AppCSS.container}>
        <div className={AppCSS.header}>
          <PizzaSVG width={120} height={120} />
          <div className={AppCSS.siteTitle}>Delicious Pizza</div>
          <Cart />
          <ul>
            {pizzas.map((e) => (
              <Pizza key={e.id} pizza={e} />
            ))}
          </ul>
        </div>
      </div>
    </AppStateProvider>
  );
};

export default App;
