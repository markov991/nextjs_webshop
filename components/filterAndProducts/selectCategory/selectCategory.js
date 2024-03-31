import { useState } from "react";
import { useRouter } from "next/router";

import classes from "./selectCategory.module.css";

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    router.push(`/categories/${category}`);
  };
  return (
    <div className={classes.categorySelection}>
      <legend>Category:</legend>
      <div className={classes.categorySelectionButtons}>
        <button
          className={`${
            selectedCategory === "Clothing"
              ? classes.classActive
              : classes.classInactive
          }`}
          onClick={() => handleCategoryChange("Clothing")}
        >
          Clothing
        </button>
        <button
          className={`${
            selectedCategory === "Shoes"
              ? classes.classActive
              : classes.classInactive
          }`}
          onClick={() => handleCategoryChange("Shoes")}
        >
          Shoes
        </button>
        <button
          className={`${
            selectedCategory === "Accessories"
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
