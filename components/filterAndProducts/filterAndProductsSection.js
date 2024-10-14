import React from "react";
import classes from "./filterAndProductsSection.module.css";
import FilterSection from "./filterSection";
import ProductsSection from "./products/productsSection";
import { SessionProvider } from "next-auth/react";

export default function FilterAndProductsSection({
  products,
  category,
  session,
}) {
  return (
    <section className={classes.filterAndProducts}>
      <FilterSection category={category} />
      <SessionProvider session={session}>
        <ProductsSection products={products} />
      </SessionProvider>
    </section>
  );
}
