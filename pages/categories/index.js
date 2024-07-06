import { useState, useEffect } from "react";

import classes from "./index.module.css";
import FilterAndProductsSection from "@/components/filterAndProducts/filterAndProductsSection";

import CategoryHero from "@/components/hero-category/categoryHero";
import CategoryBredCrumbs from "@/components/categoryBredCrumbs/categoryBredCrumbs";

import { useSelector } from "react-redux";

export default function CategoriesPage(props) {
  const [counter, setCounter] = useState(0);
  const [products, setProducts] = useState([]);
  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    setCounter(0);
    fetch(`/api/getAllProducts?page=0&colorFilter=${filters.pickedColor}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts([...data.products]);
      });
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    fetch("/api/getAllProducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts([...data.products]);
      });
  }, []);
  // const { products } = props;
  const loadMoreHandler = () => {
    setCounter(counter + 1);
    fetch(`/api/getAllProducts?page=${counter + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, ...data.products]);
      });
  };

  console.log(props);
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
