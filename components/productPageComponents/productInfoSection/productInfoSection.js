import React from "react";
import classes from "./productInfoSection.module.css";

export default function ProductInfoSection({
  name,
  avg_rating,
  rating_count,
  price,
}) {
  return (
    <div className={classes.nameAndPrice}>
      <h1>{name}</h1>
      <div>
        <span>{avg_rating}</span>
        <span>({rating_count})</span>
      </div>
      <div className={classes.price}>${price.toFixed(2)}</div>
    </div>
  );
}
