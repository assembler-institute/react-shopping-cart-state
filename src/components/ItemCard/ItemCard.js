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
  isFavorite,
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
    <article className="ItemCard col col-12 col-md-6 col-lg-4">
      <header>
        <div className="ItemCard__image-wrapper">
          <img src={img} className="ItemCard__image" alt={title} />
          <FavoriteIconButton
            handleSetFavorite={onSetFavorite}
            isFavorite={isFavorite}
          />
        </div>
        <h2 className="ItemCard__title">{title}</h2>
      </header>
      <Divider />
      <p className="ItemCard__description">{shortDescription}</p>
      <Divider />
      <footer className="ItemCard__meta">
        <div className="ItemCard__icons">
          <div className="ItemCard__icon-row">
            <IconButton aria-label="up vote product" handleClick={onUpVote}>
              <ThumbUp />
            </IconButton>
            <p
              className={
                upVotes.currentValue > upVotes.upperLimit / 2
                  ? "ItemCard__icon-popular ItemCard__icon-txt"
                  : "ItemCard__icon-txt"
              }
            >
              {upVotes.currentValue}
            </p>
          </div>
          <div className="ItemCard__icon-row">
            <IconButton aria-label="down vote product" handleClick={onDownVote}>
              <ThumbDown />
            </IconButton>
            <p
              className={
                downVotes.currentValue > downVotes.lowerLimit / 2
                  ? "ItemCard__icon-unpopular ItemCard__icon-txt"
                  : "ItemCard__icon-txt"
              }
            >
              {downVotes.currentValue}
            </p>
          </div>
        </div>
        <div className="ItemCard__icon-row">
          <Button onClick={onAddToCart}>Add to cart</Button>
        </div>
      </footer>
    </article>
  );
}

export default ItemCard;
