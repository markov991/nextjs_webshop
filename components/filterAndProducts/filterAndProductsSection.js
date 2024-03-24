import React from "react";
import classes from "./filterAndProductsSection.module.css";
import FilterSection from "./filterSection";
import ProductsSection from "./productsSection";
export default function FilterAndProductsSection() {
  return (
    <section className={classes.filterAndProducts}>
      <FilterSection />
      <ProductsSection />
    </section>
  );
}
