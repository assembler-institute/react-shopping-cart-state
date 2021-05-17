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
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSetFavorite = this.handleSetFavorite.bind(this);
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
    const { products, cartItems } = this.state;

    const itemInCart = cartItems.find((item) => item.id === productId);
    const productRef = products.find((item) => item.id === productId);

    if (itemInCart) {
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

    if (!itemInCart) {
      cartItems.push({
        id: productRef.id,
        title: productRef.title,
        img: productRef.img,
        price: productRef.price,
        unitsInStock: productRef.unitsInStock,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        quantity: 1,
      });
      this.setState({
        cartItems: cartItems,
      });
    }
  }

  handleChange(event, productId) {
    const { cartItems } = this.state;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quatity: Number(event.target.value),
        };
      }
      return item;
    });
    this.setState({ cartItems: updatedCartItems });
  }

  handleRemove(productId) {
    const { cartItems } = this.state;
    const itemInCart = cartItems.filter((item) => item.id !== productId);

    this.setState({ cartItems: itemInCart });
  }

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  handleSetFavorite(productId) {
    const { products } = this.state;
    const setFavoriteProduct = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isFavorite: !product.isFavorite };
      }
      return product;
    });
    this.setState({ products: setFavoriteProduct });
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
