import { useState } from "react";
import classes from "./productsSection.module.css";

export default function ProductsSection() {
  const [toggleProductSortOptions, setToggleProductSortOptions] =
    useState(false);
  const [productSortValue, setProductSortValue] = useState("Default");
  const [productSortAscending, setProductSortAscending] = useState(true);

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
          {productSortAscending ? <>&uarr;</> : <>&darr;</>}{" "}
        </button>
      </div>
      <div>products</div>
    </div>
  );
}
