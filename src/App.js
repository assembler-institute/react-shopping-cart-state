import React, { Component } from "react";
import Home from "./pages/Home";
import * as api from "./api";

function buildNewCartItem(cartItem) {
  if (cartItem.quantity >= cartItem.unitsInStock) {
    /* Si la cantidad a comprar supera el stock  o modificara cantidad. */
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
    this.handleSetFavorite = this.handleSetFavorite.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  componentDidMount() {
    const json = JSON.parse(localStorage.getItem("react"));
    if (!json) {
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

    this.setState({
      products: json.products,
      cartItems: json.cartItems,
    });
  }

  componentDidUpdate() {
    const { cartItems, products } = this.state;
    localStorage.setItem("react", JSON.stringify({ cartItems, products }));
  }

  handleAddToCart(productId) {
    const { products, cartItems } = this.state;
    const foundCart = cartItems.find((i) => i.id === productId);
    const product = products.find((i) => i.id === productId);

    /* Si el producto esta dentro se del cartItems */
    if (foundCart) {
      const updatedCart = cartItems.map((item) => {
        if (item.id !== productId) {
          /*  Si el producto comprado no esta en la lista */
          return item;
        }

        if (item.quantity >= item.unitsInStock) {
          /* Si la cantidad que compras es mayor a la unidades en stock */
          return item;
        }
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });

      this.setState({ cartItems: updatedCart });
      return;
    }

    const updatedProduct = buildNewCartItem(product);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, updatedProduct],
    }));
  }

  handleChange(event, productId) {
    const { cartItems } = this.state;

    const updatedItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }
      return item;
    });

    this.setState({
      cartItems: updatedItems,
    });
  }

  handleRemove(productId) {
    const { cartItems } = this.state;

    const updatedCart = cartItems.filter((item) => item.id !== productId);

    this.setState({
      cartItems: updatedCart,
    });
  }

  handleDownVote(productId) {
    const { products } = this.state;

    const updatedProducts = products.map((item) => {
      if (item.id === productId) {
        if (
          item.votes.downVotes.currentValue < item.votes.downVotes.lowerLimit
        ) {
          return {
            ...item,
            votes: {
              upVotes: {
                upperLimit: 10,
                currentValue: item.votes.upVotes.currentValue,
              },
              downVotes: {
                lowerLimit: 10,
                currentValue: item.votes.downVotes.currentValue + 1,
              },
            },
          };
        }
      }
      return item;
    });

    this.setState({ products: updatedProducts });
  }

  handleUpVote(productId) {
    const { products } = this.state;

    const updatedProducts = products.map((item) => {
      if (item.id === productId) {
        if (item.votes.upVotes.currentValue < item.votes.upVotes.upperLimit) {
          return {
            ...item,
            votes: {
              upVotes: {
                upperLimit: 10,
                currentValue: item.votes.upVotes.currentValue + 1,
              },
              downVotes: {
                lowerLimit: 10,
                currentValue: item.votes.downVotes.currentValue,
              },
            },
          };
        }
      }
      return item;
    });

    this.setState({ products: updatedProducts });
  }

  handleSetFavorite(productId) {
    const { products } = this.state;

    const updatedProducts = products.map((item) => {
      if (item.id === productId) {
        if (item.isFavorite) {
          return {
            ...item,
            isFavorite: false,
          };
        }
        return {
          ...item,
          isFavorite: true,
        };
      }
      return item;
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
