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

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const prevItems = JSON.parse(localStorage.getItem("item-cart"))

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
    localStorage.setItem("item-cart", JSON.stringify({ cartItems, products }));
  }

  handleAddToCart(productId) {
    const { cartItems, products } = this.state;

    const prevCartItem = cartItems.find((item) => item.id === productId);
    const foundProduct = products.find((product) => product.id === productId);

    if (prevCartItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id !== productId) item;

        if (item.quantity >= item.unitsInStock) item;

        return { ...item, quantity: item.quantity + 1, };
      });

      this.setState({ cartItems: updatedCartItems });
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, updatedProduct],
    }));
  }

  handleRemove(productId) {
    const { cartItems } = this.state
    const updatedItems = cartItems.filter(item => item.id !== productId)

    this.setState({cartItems: updatedItems})
  }

  handleChange(event, productId) {
    const { cartItems } = this.state
    const updatedItems = cartItems.map(item => {
      if(item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value)
        }
      }
      return item
    })

    this.setState({ cartItems: updatedItems })
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
        handleAddToCart={this.handleAddToCart}
        handleRemove={this.handleRemove}
        handleChange= {this.handleChange}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={()=> {}}

      />
    );
  }
}

export default App;
