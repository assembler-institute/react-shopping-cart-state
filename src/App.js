import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

function newCartComponent(product) {
  return {
    id: product.id,
    title: product.title,
    img: product.img,
    price: product.price,
    unitsInStock: product.unitsInStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    quantity: product.quantity + 1,
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
    this.handleSetFavorite = this.handleSetFavorite.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
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
    const index = products.findIndex((v) => v.id === productId);
    const element = cartItems.find((v) => v.id === productId);

    if (element) {
      const updatedInfo = cartItems.map((item) => {
        if (item.id !== productId) return item;
        if (item.quantity >= item.unitsInStock) return item;
        return { ...item, quantity: item.quantity + 1 };
      });
      this.setState({ cartItems: updatedInfo });
      return;
    }

    const updatedProduct = newCartComponent(products[index]);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, updatedProduct],
    }));
  }

  // handleChange(event, productId) {}

  handleRemove(productId) {
    const { cartItems } = this.state;
    const cartUpdated = cartItems.filter((v) => v.id !== productId);
    this.setState({ cartItems: cartUpdated });
  }

  handleDownVote(productId) {
    const { products } = this.state;

    const updatedArr = products.map((pr) => {
      const {
        votes: {
          downVotes: { currentValue, upperLimit },
        },
      } = pr;

      if (pr.id === productId && currentValue < upperLimit) {
        return {
          ...pr,
          votes: {
            ...pr.votes,
            upVotes: {
              ...pr.votes.upVotes,
              currentValue: pr.votes.upVotes.currentValue + 1,
            },
          },
        };
      }
      return pr;
    });

    this.setState({ products: updatedArr });
  }

  handleUpVote(productId) {
    const { products } = this.state;

    const updatedArr = products.map((pr) => {
      if (pr.id === productId) {
        const prMod =
          pr.votes.upVotes.currentValue < pr.votes.upVotes.upperLimit
            ? {
                ...pr,
                votes: {
                  ...pr.votes,
                  upVotes: {
                    ...pr.votes.upVotes,
                    currentValue: pr.votes.upVotes.currentValue + 1,
                  },
                },
              }
            : pr;
        return prMod;
      }
      return pr;
    });

    this.setState({ products: updatedArr });
  }

  handleSetFavorite(productId) {
    const { products } = this.state;

    const updatedArr = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isFavorite: !product.isFavorite };
      }
      return product;
    });

    this.setState({ products: updatedArr });
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
        handleChange={() => {}}
      />
    );
  }
}

export default App;
