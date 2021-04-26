import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

const LOCAL_STORAGE_KEY = "react-sc-state";

function loadLocalStorageData() {
  const prevItems = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!prevItems) {
    return null;
  }

  try {
    return JSON.parse(prevItems);
  } catch (error) {
    return null;
  }
}

function buildNewCartItem(cartItem) {
  if (cartItem.quantity >= cartItem.unitsInStock) {
    return cartItem;
  }

  return {
    id: cartItem.id,
    title: cartItem.title,
    img: cartItem.img,
    price: cartItem.price,
    unitsInStock: cartItem.unitsInStock,
    createdAt: cartItem.createdAt,
    updatedAt: cartItem.updatedAt,
    quantity: cartItem.quantity + 1,
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
    const prevItems = loadLocalStorageData();

    if (!prevItems) {
      this.setState({
        isLoading: true,
      });

      api.getProducts().then((data) => {
        this.setState({
          products: data,
          isLoading: false,
        });
      });
      return;
    }

    this.setState({
      cartItems: prevItems.cartItems,
      products: prevItems.products,
    });
  }

  componentDidUpdate() {
    const { cartItems, products } = this.state;

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cartItems, products }),
    );
  }

  handleAddToCart(productId) {
    const { cartItems, products } = this.state;

    const prevCartItem = cartItems.find((item) => item.id === productId);
    const foundProduct = products.find((product) => product.id === productId);

    if (prevCartItem) {
      const updatedCartItems = cartItems.map((item) => {
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

      this.setState({ cartItems: updatedCartItems });
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, updatedProduct],
    }));
  }

  handleChange(event, productId) {
    const { cartItems } = this.state;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });

    this.setState({ cartItems: updatedCartItems });
  }

  handleRemove(productId) {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);

    this.setState({
      cartItems: updatedCartItems,
    });
  }

  handleDownVote(productId) {
    const { products } = this.state;

    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.votes.downVotes.currentValue <
          product.votes.downVotes.lowerLimit
      ) {
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
      if (
        product.id === productId &&
        product.votes.upVotes.currentValue < product.votes.upVotes.upperLimit
      ) {
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

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });

    this.setState({ products: updatedProducts });
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
        handleSetFavorite={() => {}}
        handleAddToCart={() => {}}
        handleRemove={() => {}}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
