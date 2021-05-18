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
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
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

      if (!localStorage.getItem("App data")) {
        localStorage.setItem("App data", JSON.stringify(this.state));
      }
    });
  }

  componentDidUpdate() {
    const updatedState = this.state;
    localStorage.setItem("App data", JSON.stringify(updatedState));
  }

  handleAddToCart(productId) {
    const { products, cartItems } = this.state;
    const product = products.find((element) => element.id === productId);
    const itemInCart = cartItems.find((item) => item.id === productId);

    if (itemInCart) {
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

  handleChange(event, productId) {
    const { cartItems } = this.state;
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: event.target.value,
        };
      }

      return item;
    });

    this.setState({ cartItems: updatedItems });
  }

  handleRemove(productId) {
    const { cartItems } = this.state;
    const itemToRemove = cartItems.find((item) => item.id === productId);
    const indextToRemove = cartItems.indexOf(itemToRemove);

    cartItems.splice(indextToRemove, 1);

    this.setState({
      cartItems: cartItems,
    });
  }

  handleDownVote(productId) {
    const { products } = this.state;
    // eslint-disable-next-line no-console
    console.log(products);
    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.votes.downVotes.currentValue <
          product.votes.downVotes.lowerLimit
      ) {
        // eslint-disable-next-line no-console
        console.log(product);
        return {
          ...product,
          votes: {
            ...product.votes,
            downVotes: {
              ...product.votes.downVotes,
              currentValue: product.votes.downVotes.currentValue + 1,
            },
          },
        };
      }
      return product;
    });

    this.setState({ products: updatedProducts });
  }

  handleUpVote(productId) {
    const { products } = this.state;
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          votes: {
            ...product.votes,
            upVotes: {
              ...product.votes.upVotes,
              currentValue: product.votes.upVotes.currentValue + 1,
            },
          },
        };
      }
      return product;
    });

    this.setState({ products: updatedProducts });
  }

  handleSetFavorite(productId) {
    const { products } = this.state;
    const updatedFavorites = products.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      }

      return item;
    });

    this.setState({ products: updatedFavorites });
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
        handleDownVote={this.handleDownVote}
        handleUpVote={this.handleUpVote}
        handleSetFavorite={this.handleSetFavorite}
        handleAddToCart={this.handleAddToCart}
        handleRemove={this.handleRemove}
        handleChange={this.handleChange}
      />
    );
  }
}

export default App;
