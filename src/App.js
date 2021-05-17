import React, { Component } from "react";
import Home from "./pages/Home";
import * as api from "./api";

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

  // handleChange(event, productId) {}

  handleRemove(productId) {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);

    this.setState({
      cartItems: updatedCartItems,
    });
  }

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
