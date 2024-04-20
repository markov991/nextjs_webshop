import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./index.module.css";
import FilterAndProductsSection from "@/components/filterAndProducts/filterAndProductsSection";

import CategoryHero from "@/components/hero-category/categoryHero";
import CategoryBredCrumbs from "@/components/categoryBredCrumbs/categoryBredCrumbs";
import { useSelector } from "react-redux";

export default function CategoriesPages() {
  const router = useRouter();
  const eventId = router.query.category;
  const [counter, setCounter] = useState(0);
  const [products, setProducts] = useState([]);
  const filters = useSelector((state) => state.filter);
  console.log(filters);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    if (eventId) {
      fetch(`/api/${eventId}?page=${counter}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts([...data.products]);
        });
    }
  }, [eventId]);

  const loadMoreHandler = () => {
    setCounter(counter + 1);
    fetch(`/api/${eventId}?page=${counter + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, ...data.products]);
      });
  };

  return (
    <main className={classes.categoriesSection}>
      <CategoryHero />
      <CategoryBredCrumbs />

      <h1>All categories</h1>
      <FilterAndProductsSection products={products} />
      <button onClick={loadMoreHandler}>LOAD MORE</button>
    </main>
  );
}
