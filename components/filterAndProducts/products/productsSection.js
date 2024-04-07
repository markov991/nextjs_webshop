import { useState, useEffect } from "react";
import classes from "./productsSection.module.css";
import ProductItem from "./productItem";

export default function ProductsSection({ products }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  useEffect(() => {
    setDisplayedProducts(products);
    console.log(products);
  }, [products]);

  const [toggleProductSortOptions, setToggleProductSortOptions] =
    useState(false);
  const [productSortValue, setProductSortValue] = useState("Default");
  const [productSortAscending, setProductSortAscending] = useState(true);

  useEffect(() => {
    if (productSortValue === "Name") {
      const sortedProducts = [...displayedProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setDisplayedProducts(
        productSortAscending ? sortedProducts : sortedProducts.reverse()
      );
    }
    if (productSortValue === "Price") {
      const sortedProducts = [...displayedProducts].sort(
        (a, b) => a.selling_price - b.selling_price
      );
      setDisplayedProducts(
        productSortAscending ? sortedProducts : sortedProducts.reverse()
      );
    }
    if (productSortValue === "Rating") {
      const sortedProducts = [...displayedProducts].sort(
        (a, b) => a.average_rating - b.average_rating
      );
      setDisplayedProducts(
        productSortAscending ? sortedProducts : sortedProducts.reverse()
      );
    }
    if (productSortValue === "Default") {
      setDisplayedProducts(products);
    }
  }, [productSortValue, productSortAscending]);

  return (
    <div className={classes.productsSection}>
      <div className={classes.productsSortOptionsBox}>
        <span>Sort By</span>
        <div className={classes.sortOptionsBox}>
          <button
            onClick={() => {
              setToggleProductSortOptions(!toggleProductSortOptions);
            }}
            className={classes.activeSortValue}
          >
            <span>{productSortValue}</span>
            <span>&dArr;</span>
          </button>

          {toggleProductSortOptions && (
            <div className={classes.sortOptions}>
              <button
                onClick={() => {
                  setProductSortValue("Name");
                  setToggleProductSortOptions(false);
                }}
              >
                Name
              </button>
              <button
                onClick={() => {
                  setProductSortValue(`Price`);
                  setToggleProductSortOptions(false);
                }}
              >
                Price
              </button>

              <button
                onClick={() => {
                  setProductSortValue("Rating");
                  setToggleProductSortOptions(false);
                }}
              >
                Rating
              </button>
              <button
                onClick={() => {
                  setProductSortValue("Default");
                  setToggleProductSortOptions(false);
                }}
              >
                Default
              </button>
            </div>
          )}
        </div>
        <button
          className={classes.ascToggleBtn}
          onClick={() => {
            setProductSortAscending(!productSortAscending);
          }}
        >
          {productSortAscending ? <>&darr;</> : <>&uarr;</>}{" "}
        </button>
      </div>
      <div className={classes.productListSection}>
        {displayedProducts.map((product) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
}
