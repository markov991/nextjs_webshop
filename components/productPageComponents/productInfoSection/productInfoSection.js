import React from "react";
import StarRatingDisplay from "@/components/starRatingDisplay/starRatingDisplay";

import classes from "./productInfoSection.module.css";
import CouponBox from "@/components/couponBox/couponBox";
import QuantitySelect from "@/components/quantitySelect/quantitySelect";
import ProductPageBtns from "@/components/productPageBtns/productPageBtns";

export default function ProductInfoSection({
  name,
  avg_rating,
  rating_count,
  price,
}) {
  return (
    <div className={classes.nameAndPrice}>
      <h1>{name}</h1>
      <div className={classes.ratingsAndRevives}>
        <StarRatingDisplay avgRating={avg_rating} />

        <div className={classes.numOfRevives}>
          <span>({rating_count})</span>
          <span>Ratings</span>
        </div>
      </div>
      <div className={classes.price}>${price.toFixed(2)}</div>
      <CouponBox />
      <QuantitySelect />
      <ProductPageBtns />
    </div>
  );
}
