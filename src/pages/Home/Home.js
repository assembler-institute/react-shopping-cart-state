import React from "react";

import products from "../../utils/demo-data";

import AppHeader from "../../components/AppHeader";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import ProductsListing from "../../components/ProductsListing";

function Home() {
  function handleDownVote() {}
  function handleUpVote() {}
  function handleSetFavorite() {}
  function handleAddToCart() {}

  return (
    <>
      <AppHeader />
      <Main className="container">
        <header className="jumbotron">
          <h1 className="display-4">Shoe shop</h1>
          <p className="lead">
            This is the best shoe shop ever, you will never find a better one.
          </p>
          <p className="font-weight-bold">Buy now!</p>
        </header>
        <ProductsListing
          products={products}
          handleDownVote={handleDownVote}
          handleUpVote={handleUpVote}
          handleSetFavorite={handleSetFavorite}
          handleAddToCart={handleAddToCart}
        />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
