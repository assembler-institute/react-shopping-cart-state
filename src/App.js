import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

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
    const { cartItems, products } = this.state;
    const prevCartState = cartItems.find(
      (cartItem) => productId === cartItem.id,
    );

    const notFoundInCart = cartItems.find(
      (cartItem) => productId !== cartItem.id,
    );

    if (prevCartState) {
      const nextCartState = cartItems.map((cartItem) => {
        if (productId !== cartItem.id) {
          return cartItem;
        }

        return { ...cartItem, quantity: cartItem.quantity + 1 };
      });
    }
    if (notFoundInCart) {
      const newCartState = products.map((product) => {
        if (product.id === productId) {
          cartItems.push({
            id: product.id,
            title: product.title,
            img: product.img,
            price: product.price,
            unitsInStock: product.unitsInStock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            quantity: 1,
          });
        }
        return cartItems;
      });
    }
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
        handleAddToCart={() => {}}
        handleRemove={() => {}}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
