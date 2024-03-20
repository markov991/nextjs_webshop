import React from "react";
import Link from "next/link";
import ProductBox from "../product-box/product-box";
import classes from "./featuredProducts.module.css";

export default function FeaturedProducts({ featuredProducts }) {
  return (
    <section className={classes.featuredProducts}>
      <div className={classes.featuredProductsHeading}>
        <h2>Some of our wear</h2>
        <Link href="/categories">
          Browse all<span>&rarr;</span>
        </Link>
      </div>
      <div className={classes.featuredProductsBox}>
        {featuredProducts.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
