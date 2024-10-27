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
  const [noMoreItemsToLoad, setNoMoreItemsToLoad] = useState(false);
  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    if (eventId && filters.priceRange[0] && filters.priceRange[1]) {
      fetch(
        `/api/${eventId}?page=0&colorFilter=${filters.pickedColor}&priceFilter=${filters.priceRange}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.products.length !== 15) {
            setNoMoreItemsToLoad(true);
          }
          if (data.products.length === 15) {
            setNoMoreItemsToLoad(false);
          }

          setProducts([...data.products]);
        });
    }
  }, [eventId, filters]);

  const loadMoreHandler = () => {
    setCounter(counter + 1);
    fetch(
      `/api/${eventId}?page=${counter + 1}&colorFilter=${
        filters.pickedColor
      }&priceFilter=${filters.priceRange}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.products.length < 15) {
          setNoMoreItemsToLoad(true);
        }
        if (data.products.length === 15) {
          setNoMoreItemsToLoad(false);
        }
        setProducts([...products, ...data.products]);
      });
  };

  return (
    <main className={classes.categoriesSection}>
      <CategoryHero />
      <CategoryBredCrumbs category={eventId} />

      <h1>All categories</h1>
      <FilterAndProductsSection
        loadMoreHandler={loadMoreHandler}
        category={eventId}
        products={products}
        noMoreItemsToLoad={noMoreItemsToLoad}
      />
    </main>
  );
}
