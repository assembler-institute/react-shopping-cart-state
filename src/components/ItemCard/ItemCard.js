import React from "react";

import FavoriteIconButton from "../FavoriteIconButton";
import IconButton from "../IconButton";
import Button from "../Button";
import { ThumbDown, ThumbUp } from "../SVGIcons";

import "./ItemCard.scss";

function Divider() {
  return <hr className="ItemCard__divider" />;
}

function ItemCard({
  id,
  img,
  title,
  shortDescription,
  isFavourite,
  upVotes,
  downVotes,
  handleDownVote,
  handleUpVote,
  handleSetFavorite,
  handleAddToCart,
}) {
  function onDownVote() {
    handleDownVote(id);
  }
  function onUpVote() {
    handleUpVote(id);
  }
  function onSetFavorite() {
    handleSetFavorite(id);
  }
  function onAddToCart() {
    handleAddToCart(id);
  }

  return (
    <article className="item-card col col-12 col-md-6 col-lg-4">
      <header className="position-relative">
        <img src={img} className="item-card__image" alt={title} />
        <FavoriteIconButton
          handleSetFavorite={onSetFavorite}
          isFavourite={isFavourite}
        />
        <h2>{title}</h2>
      </header>

      <Divider />
      <p>{shortDescription}</p>
      <Divider />
      <footer className="d-flex justify-content-between">
        <div className="d-flex justify-content-start">
          <div className="d-flex align-items-center">
            <IconButton aria-label="down vote product" handleClick={onDownVote}>
              <ThumbDown />
            </IconButton>
            <p className="mx-1">{downVotes.currentValue}</p>
          </div>
          <div className="d-flex align-items-center">
            <IconButton aria-label="up vote product" handleClick={onUpVote}>
              <ThumbUp />
            </IconButton>
            <p className="mx-1">{upVotes.currentValue}</p>
          </div>
        </div>
        <Button name="add to cart" onClick={onAddToCart}>
          Add to cart
        </Button>
      </footer>
    </article>
  );
}

export default ItemCard;
