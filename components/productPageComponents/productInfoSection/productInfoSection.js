import React from "react";
import StarRatingDisplay from "@/components/starRatingDisplay/starRatingDisplay";

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
        <StarRatingDisplay avgRating={avg_rating} />

        <div>
          <span>({rating_count})</span>
          <span>Ratings</span>
        </div>
      </div>
      <div className={classes.price}>${price.toFixed(2)}</div>
    </div>
  );
}
