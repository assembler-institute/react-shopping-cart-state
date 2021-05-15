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
            /* if (cItem.quantity !== 10) {
              cItem.quantity += 1;
            } else {
              cItem.quantity = 10;
            } */
            cItem.quantity += 1;
            // eslint-disable-next-line
            cItem.subtotal = cItem.price * cItem.quantity;
            // eslint-disable-next-line
            console.log(cItem);
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

  handleChange(quantity, productId, price) {
    const { cartItems } = this.state;
    console.log(price);
    console.log(quantity);
    console.log(productId);
    console.log(cartItems);
  }

  handleRemove(productId) {
    let { cartItems } = this.state;

    const toRemove = cartItems.filter((item) => item.id !== productId);

    cartItems = toRemove;
    this.setState({
      cartItems: cartItems,
    });
  }

  // handleDownVote(productId) {}

  handleUpVote(productId) {
    const { cartItems } = this.state;
    console.log(cartItems);
    console.log(productId);
    console.log(this);
  }

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
        handleUpVote={this.handleUpVote}
        handleSetFavorite={() => {}}
        handleAddToCart={(prop) => {
          this.handleAddToCart(prop);
        }}
        handleRemove={(prop) => {
          this.handleRemove(prop);
        }}
        handleChange={(prop) => {
          this.handleChange(prop);
        }}
      />
    );
  }
}

export default App;
