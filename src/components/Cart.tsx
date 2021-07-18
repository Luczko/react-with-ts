import React, { createRef } from "react";
import CartCSS from "./Cart.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { AppStateContext } from "./AppState";

interface Props {}

interface State {
  isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  #containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.#containerRef = createRef();
  }

  onChange = (): void => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleOustsideElement = (e: MouseEvent) => {
    if (
      this.#containerRef.current &&
      !this.#containerRef.current.contains(e.target as Node)
    )
      this.setState({ isOpen: false });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOustsideElement);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOustsideElement);
  }

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          const itemCount = state.cart.items.reduce((sum, item) => {
            return sum + item.quantity;
          }, 0);
          return (
            <div className={CartCSS.cartContainer} ref={this.#containerRef}>
              <button
                className={CartCSS.button}
                type='button'
                onClick={this.onChange}
              >
                <FiShoppingCart />
                <span>{itemCount} pizza(s)</span>
              </button>
              <div
                className={CartCSS.cartDropDown}
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  {state.cart.items.map((e) => {
                    return (
                      <li key={e.id}>
                        {e.name} &times; {e.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
