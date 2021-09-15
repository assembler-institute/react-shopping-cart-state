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
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
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
		});
	}

	handleAddToCart(productId) {
		const { products, cartItems } = this.state;

		const index = cartItems.findIndex((product) => product.id === productId);

		if (index > -1) {
			cartItems[index].quantity < cartItems[index].unitsInStock && cartItems[index].quantity++;
		} else {
			const product = products.find((product) => product.id === productId);

			cartItems.push({
				...product,
				quantity: 1,
			});
		}

		this.setState({ cartItems });
	}

	handleChange(event, productId) {
		const { cartItems } = this.state;
		const productIndex = cartItems.findIndex((product) => product.id === productId);

		if (productIndex !== -1) {
			cartItems[productIndex].quantity = event.target.value;
		}

		this.setState({ cartItems });
	}

	handleRemove(productId) {
		const cartItems = this.state.cartItems.filter((product) => product.id !== productId);

		this.setState({ cartItems });
	}

	handleDownVote(productId) {
		const { products } = this.state;
		const productIndex = products.findIndex((product) => product.id === productId);

		products[productIndex].votes.downVotes.currentValue < products[productIndex].votes.downVotes.lowerLimit && products[productIndex].votes.downVotes.currentValue++;

		this.setState({ products });
	}

	handleUpVote(productId) {
		const { products } = this.state;
		const productIndex = products.findIndex((product) => product.id === productId);

		products[productIndex].votes.upVotes.currentValue < products[productIndex].votes.upVotes.upperLimit && products[productIndex].votes.upVotes.currentValue++;

		this.setState({ products });
	}

	handleSetFavorite(productId) {
		const { products } = this.state;
		const productIndex = products.findIndex((product) => product.id === productId);

		products[productIndex].isFavorite = !products[productIndex].isFavorite;

		this.setState({ products });
	}

	render() {
		const { cartItems, products, isLoading, hasError, loadingError } = this.state;

		return <Home cartItems={cartItems} products={products} isLoading={isLoading} hasError={hasError} loadingError={loadingError} handleDownVote={this.handleDownVote} handleUpVote={this.handleUpVote} handleSetFavorite={this.handleSetFavorite} handleAddToCart={this.handleAddToCart} handleRemove={this.handleRemove} handleChange={this.handleChange} />;
	}
}

export default App;
