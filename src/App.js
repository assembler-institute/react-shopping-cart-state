import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

const addNewItemToCart = (newItem) => {
  if (newItem.quantity >= newItem.unitsInStock) {
    return newItem;
  }
  return {
    id: newItem.id,
    title: newItem.title,
    img: newItem.img,
    price: newItem.price,
    unitsInStock: newItem.unitsInStock,
    createdAt: newItem.createdAt,
    updatedAt: newItem.updatedAt,
    quantity: newItem.quantity + 1,
  };
};

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
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSetFavorite = this.handleSetFavorite.bind(this);
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
    const itemInCart = cartItems.find((cartItem) => cartItem.id === productId);
    const checkProduct = products.find((product) => product.id === productId);
    if (itemInCart) {
      const changeQuantity = cartItems.map((cartItem) => {
        if (
          cartItem.id !== productId ||
          cartItem.quantity >= cartItem.unitsInStock
        ) {
          return cartItem;
        }
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      });
      this.setState({ cartItems: changeQuantity });
      return;
    }

    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, addNewItemToCart(checkProduct)],
    }));
  }

  handleChange(event, productId) {
    const { cartItems } = this.state;
    const updatedQuantity = cartItems.map((cartItem) => {
      if (
        cartItem.id === productId &&
        cartItem.quantity <= cartItem.unitsInStock
      ) {
        return {
          ...cartItem,
          quantity: event.target.value,
        };
      }
      return cartItem;
    });
    this.setState({ cartItems: updatedQuantity });
  }

  handleRemove(productId) {
    const { cartItems } = this.state;
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.id !== productId,
    );
    this.setState({ cartItems: updatedCart });
  }

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  handleSetFavorite(productId) {
    const { products } = this.state;
    const favoriteChecked = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }
      return product;
    });
    this.setState({ products: favoriteChecked });
  }

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
        handleSetFavorite={this.handleSetFavorite}
        handleAddToCart={this.handleAddToCart}
        handleRemove={this.handleRemove}
        handleChange={this.handleChange}
      />
    );
  }
}

export default App;
