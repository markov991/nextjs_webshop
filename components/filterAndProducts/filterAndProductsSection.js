import React from "react";
import classes from "./filterAndProductsSection.module.css";
import FilterSection from "./filterSection";
import ProductsSection from "./products/productsSection";

export default function FilterAndProductsSection({ products, category }) {
  return (
    <section className={classes.filterAndProducts}>
      <FilterSection category={category} />
      <ProductsSection products={products} />
    </section>
  );
}
