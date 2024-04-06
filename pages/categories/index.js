import { useState, useEffect } from "react";

import classes from "./index.module.css";
import FilterAndProductsSection from "@/components/filterAndProducts/filterAndProductsSection";

import CategoryHero from "@/components/hero-category/categoryHero";
import CategoryBredCrumbs from "@/components/categoryBredCrumbs/categoryBredCrumbs";
// import { connectToDatabase, getAllProducts } from "@/lib/db";

export default function CategoriesPage(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/getAllProducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  // const { products } = props;

  console.log(props);
  return (
    <main className={classes.categoriesSection}>
      <CategoryHero />
      <CategoryBredCrumbs />

      <h1>All categories</h1>
      <FilterAndProductsSection products={products} />
    </main>
  );
}

// export async function getStaticProps() {
//   // const response = await fetch("/api/getAllProducts");
//   const client = await connectToDatabase();
//   const response = await getAllProducts(client);
//   // const data = await response.json();

//   return {
//     props: {
//       products: response,
//     },
//     revalidate: 600,
//     // fallback:
//   };
// }
