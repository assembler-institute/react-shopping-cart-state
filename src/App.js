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
    const prevCartItem = cartItems.find(
      (cartItem) => productId === cartItem.id,
    );
    const newCartProduct = products.find((product) => product.id === productId);
    if (prevCartItem) {
      const nextCartState = cartItems.map((cartItem) => {
        if (productId !== cartItem.id) {
          return cartItem;
        }
        if (cartItem.quantity >= cartItem.unitsInStock) {
          return cartItem;
        }
        console.log(cartItems);

        return { ...cartItem, quantity: cartItem.quantity + 1 };
      });
      this.setState({ cartItems: nextCartState });
      return;
    }

    this.setState((prevState) => ({
      cartItems: [
        ...prevState.cartItems,
        {
          id: newCartProduct.id,
          title: newCartProduct.title,
          img: newCartProduct.img,
          price: newCartProduct.price,
          unitsInStock: newCartProduct.unitsInStock,
          createdAt: newCartProduct.createdAt,
          updatedAt: newCartProduct.updatedAt,
          quantity: newCartProduct.quantity + 1,
        },
      ],
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
