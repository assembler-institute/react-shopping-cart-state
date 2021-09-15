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
		const productIndex = cartItems.findIndex((product) => product.id === productId);

		if (productIndex === -1) {
			const { id, title, img, price, unitsInStock, createdAt, updatedAt, quantity } = products.find((product) => product.id === productId);

			cartItems.push({
				id,
				title,
				img,
				price,
				unitsInStock,
				createdAt,
				updatedAt,
				quantity: quantity + 1,
			});
		} else if (cartItems[productIndex].quantity < cartItems[productIndex].unitsInStock) {
			cartItems[productIndex].quantity += 1;
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

		products[productIndex].votes.downVotes.currentValue++;

		this.setState({ products });
	}

	handleUpVote(productId) {
		const { products } = this.state;
		const productIndex = products.findIndex((product) => product.id === productId);

		products[productIndex].votes.upVotes.currentValue++;

		this.setState({ products });
	}

	handleSetFavorite(productId) {
		const { products } = this.state;
		const productIndex = products.findIndex((product) => product.id === productId);

		products[productIndex].isFavourite = !products[productIndex].isFavourite;

		console.log(products[productIndex].isFavourite);
		this.setState({ products });
	}

	render() {
		const { cartItems, products, isLoading, hasError, loadingError } = this.state;

		return <Home cartItems={cartItems} products={products} isLoading={isLoading} hasError={hasError} loadingError={loadingError} handleDownVote={this.handleDownVote} handleUpVote={this.handleUpVote} handleSetFavorite={this.handleSetFavorite} handleAddToCart={this.handleAddToCart} handleRemove={this.handleRemove} handleChange={this.handleChange} />;
	}
}

export default App;
