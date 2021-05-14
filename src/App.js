/* eslint-disable no-unused-expressions */
import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

function newCartItem(item) {
  if (item.quantity >= item.unitsInStock) {
    return item;
  }
  return {
    id: item.id,
    title: item.title,
    img: item.img,
    price: item.price,
    unitsInStock: item.unitsInStock,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    quantity: item.quantity + 1,
  };
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api.getProducts().then((data) => {
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    const { products, cartItems } = this.state;
    const product = products.find((element) => element.id === productId);
    const itemInCart = cartItems.find((item) => item.id === productId);

    if (itemInCart) {
      // eslint-disable-next-line no-console
      const updatedItems = cartItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.unitsInStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });

      this.setState({ cartItems: updatedItems });
      return;
    }

    const updatedItem = newCartItem(product);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, updatedItem],
    }));
  }

  // handleChange(event, productId) {}

  // handleRemove(productId) {}

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  // handleSetFavorite(productId) {}

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={() => {}}
        handleAddToCart={this.handleAddToCart}
        handleRemove={() => {}}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
