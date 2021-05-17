import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

const LOCAL_STORAGE_KEY = "items-state";

const addNewItemToCart = (newItem) => {
  if (newItem.quantity >= newItem.unitsInStock) {
    return newItem;
  }
  const newItemObj = {
    id: newItem.id,
    title: newItem.title,
    img: newItem.img,
    price: newItem.price,
    unitsInStock: newItem.unitsInStock,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    quantity: newItem.quantity + 1,
  };
  return newItemObj;
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
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  componentDidMount() {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!localItems) {
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
      cartItems: localItems.cartItems,
      products: localItems.products,
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

  handleDownVote(productId) {
    const { products } = this.state;
    const downVotedProduct = products.map((product) => {
      const downVotes = product.votes.downVotes;
      const { currentValue, lowerLimit } = downVotes;
      if (product.id === productId && currentValue < lowerLimit) {
        return {
          ...product,
          votes: {
            ...product.votes,
            downVotes: {
              ...downVotes,
              currentValue: currentValue + 1,
            },
          },
        };
      }
      return product;
    });
    this.setState({ products: downVotedProduct });
  }

  handleUpVote(productId) {
    const { products } = this.state;
    const upVotedProduct = products.map((product) => {
      const upVotes = product.votes.upVotes;
      const { currentValue, upperLimit } = upVotes;
      if (product.id === productId && currentValue < upperLimit) {
        return {
          ...product,
          votes: {
            ...product.votes,
            upVotes: {
              ...upVotes,
              currentValue: currentValue + 1,
            },
          },
        };
      }
      return product;
    });
    this.setState({ products: upVotedProduct });
  }

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
