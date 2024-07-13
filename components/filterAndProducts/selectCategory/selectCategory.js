import { useState } from "react";
import { useRouter } from "next/router";

import classes from "./selectCategory.module.css";

export default function SelectCategory({ category }) {
  const router = useRouter();

  const handleCategoryChange = (category) => {
    router.push(`/categories/${category}`);
  };

  return (
    <div className={classes.categorySelection}>
      <legend>Category:</legend>
      <div className={classes.categorySelectionButtons}>
        <button
          className={`${
            category.category === "Clothing"
              ? classes.classActive
              : classes.classInactive
          }`}
          onClick={() => handleCategoryChange("Clothing")}
        >
          Clothing
        </button>
        <button
          className={`${
            category.category === "Shoes"
              ? classes.classActive
              : classes.classInactive
          }`}
          onClick={() => handleCategoryChange("Shoes")}
        >
          Shoes
        </button>
        <button
          className={`${
            category.category === "Accessories"
              ? classes.classActive
              : classes.classInactive
          }`}
          onClick={() => handleCategoryChange("Accessories")}
        >
          Accessories
        </button>
      </div>
    </div>
  );
}
