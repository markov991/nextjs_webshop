import { useState, useEffect } from "react";

import classes from "./index.module.css";
import FilterAndProductsSection from "@/components/filterAndProducts/filterAndProductsSection";

import CategoryHero from "@/components/hero-category/categoryHero";
import CategoryBredCrumbs from "@/components/categoryBredCrumbs/categoryBredCrumbs";

export default function CategoriesPage(props) {
  const [counter, setCounter] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/getAllProducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, ...data.products]);
      });
  }, [counter]);
  // const { products } = props;

  console.log(props);
  return (
    <main className={classes.categoriesSection}>
      <CategoryHero />
      <CategoryBredCrumbs />

      <h1>All categories</h1>
      <FilterAndProductsSection products={products} />
      <button onClick={() => setCounter(counter + 1)}>LOAD MORE</button>
    </main>
  );
}
