import React from "react";
import pizzas from "../data/pizzas.json";
import Pizza from "./Pizza";

const App = () => {
  return (
    <ul>
      {pizzas.map((e) => (
        <Pizza key={e.id} pizza={e} />
      ))}
    </ul>
  );
};

export default App;
