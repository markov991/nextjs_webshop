import React, { useState } from "react";
import StarRatingDisplay from "@/components/starRatingDisplay/starRatingDisplay";

import classes from "./productInfoSection.module.css";
import CouponBox from "@/components/couponBox/couponBox";
import QuantitySelect from "@/components/quantitySelect/quantitySelect";
import ProductPageBtns from "@/components/productPageBtns/productPageBtns";
import { useSession } from "next-auth/react";

export default function ProductInfoSection({
  productId,
  name,
  avg_rating,
  rating_count,
  price,
}) {
  const [quantitySelected, setQuantitySelected] = useState();

  const { data: session } = useSession();
  async function addToTheCartHandler() {
    if (session) {
      const response = await fetch("/api/addItemToTheCart", {
        method: "PATCH",
        body: JSON.stringify({
          user: session.user.email,
          productId,
          quantity: quantitySelected,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        alert("Something went wrong please try again!!");
      }
    }
    if (!session) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      if (cart) {
        const { items, approvedDiscount, usedCodeForDiscount } = cart;
        const hasItemInCart = items.filter(
          (item) => item.productId === productId
        ).length;

        if (hasItemInCart) {
          const correctedItemQuantity = items.map((item) => {
            if (item.productId === productId) {
              return { productId, quantity: item.quantity + quantitySelected };
            } else
              return { productId: item.productId, quantity: item.quantity };
          });

          localStorage.setItem(
            "cart",
            JSON.stringify({
              approvedDiscount,
              usedCodeForDiscount,
              items: correctedItemQuantity,
            })
          );
        }
        if (!hasItemInCart) {
          localStorage.setItem(
            "cart",
            JSON.stringify({
              approvedDiscount,
              usedCodeForDiscount,
              items: [...items, { productId, quantity: quantitySelected }],
            })
          );
        }
      }
      if (!cart) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            approvedDiscount: 0,
            usedCodeForDiscount: null,
            items: [{ productId, quantity: quantitySelected }],
          })
        );
      }
    }
  }

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
      <QuantitySelect
        onChangeQuantityHandler={(value) => setQuantitySelected(value)}
      />

      <ProductPageBtns onAddToTheCartHandler={addToTheCartHandler} />
    </div>
  );
}
