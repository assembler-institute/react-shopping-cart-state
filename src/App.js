/* eslint-disable no-param-reassign */
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
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
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
    const { cartItems } = this.state;
    const { products } = this.state;
    let counter = 0;

    products.forEach((prod) => {
      if (prod.id === productId) {
        cartItems.forEach((cItem) => {
          if (cItem.id === productId) {
            // Limit quantity to 10 -->
            /* if (cItem.quantity !== 10) {
              cItem.quantity += 1;
            } else {
              cItem.quantity = 10;
            } */

            cItem.quantity += 1;
            cItem.subtotal = cItem.price * cItem.quantity;
          } else {
            counter += 1;
          }
        });
        if (cartItems.length === counter) {
          prod.quantity = 1;
          prod.subtotal = prod.price;
          cartItems.push(prod);
        }
      }
    });
    this.setState({
      cartItems: cartItems,
    });
  }

  handleChange(event, productId) {
    const { cartItems } = this.state;

    const toCount = cartItems.find((product) => product.id === productId);

    toCount.quantity = parseInt(event.target.value, 10);

    toCount.subtotal = toCount.price * toCount.quantity;

    this.setState({
      cartItems: cartItems,
    });
  }

  handleRemove(productId) {
    let { cartItems } = this.state;

    const toRemove = cartItems.filter((item) => item.id !== productId);

    cartItems = toRemove;
    this.setState({
      cartItems: cartItems,
    });
  }

  handleDownVote(productId) {
    const { products } = this.state;
    const downVoted = products.find((product) => product.id === productId);

    downVoted.votes.downVotes.currentValue += 1;

    this.setState({
      products: products,
    });
  }

  handleUpVote(productId) {
    const { products } = this.state;
    const upVoted = products.find((product) => product.id === productId);

    upVoted.votes.upVotes.currentValue += 1;

    this.setState({
      products: products,
    });
  }

  handleSetFavorite(productId) {
    const { products } = this.state;
    const favorited = products.find((product) => product.id === productId);

    if (favorited.isFavorite) {
      favorited.isFavorite = false;
    } else {
      favorited.isFavorite = true;
    }

    this.setState({
      products: products,
    });
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
        handleDownVote={(prop) => {
          this.handleDownVote(prop);
        }}
        handleUpVote={(prop) => {
          this.handleUpVote(prop);
        }}
        handleSetFavorite={(prop) => {
          this.handleSetFavorite(prop);
        }}
        handleAddToCart={(prop) => {
          this.handleAddToCart(prop);
        }}
        handleRemove={(prop) => {
          this.handleRemove(prop);
        }}
        handleChange={(prop, id) => {
          this.handleChange(prop, id);
        }}
      />
    );
  }
}

export default App;
