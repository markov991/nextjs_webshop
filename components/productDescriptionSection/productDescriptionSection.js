import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductBox from "../product-box/product-box";
import classes from "./productDescriptionSection.module.css";

export default function ProductDescriptionSection({
  description,
  price,
  category,
  color,
}) {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("PRODUCT_DETAILS");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setActiveButton("PRODUCT_DETAILS");
    setRelatedProducts([]);
  }, [router.query]);

  useEffect(() => {
    if (activeButton === "RELATED_PRODUCTS") {
      fetch(
        `/api/getRelatedProducts?colorFilter=${color}&priceFilter=${
          price - 10
        },${price + 10}&category=${category}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRelatedProducts([...data.products]);
        });
    }
  }, [activeButton]);

  return (
    <div className={classes.productDescriptionSectionBox}>
      <div className={classes.btnBox}>
        <button
          onClick={() => {
            setActiveButton("PRODUCT_DETAILS");
          }}
          className={`${
            activeButton === "PRODUCT_DETAILS"
              ? classes.btnActive
              : classes.btnInactive
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => {
            setActiveButton("RELATED_PRODUCTS");
          }}
          className={`${
            activeButton === "RELATED_PRODUCTS"
              ? classes.btnActive
              : classes.btnInactive
          }`}
        >
          Related Products
        </button>
        <button
          onClick={() => {
            setActiveButton("RATINGS_REVIVES");
          }}
          className={`${
            activeButton === "RATINGS_REVIVES"
              ? classes.btnActive
              : classes.btnInactive
          }`}
        >
          Ratings and Revives
        </button>
      </div>
      {activeButton === "PRODUCT_DETAILS" && (
        <p className={classes.productDescription}>{description}</p>
      )}
      {activeButton === "RELATED_PRODUCTS" && (
        <div className={classes.relatedProductsBox}>
          {relatedProducts.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))}
        </div>
      )}
      {activeButton === "RATINGS_REVIVES" && <div>Ratings and revievs</div>}
    </div>
  );
}
