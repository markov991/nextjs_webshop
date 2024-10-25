import { useState, useEffect } from "react";

import ColorFilter from "./colorFilter/colorFilter";

import classes from "./filterSection.module.css";
import PriceFilter from "./priceFilter/priceFilter";
import SelectCategory from "./selectCategory/selectCategory";

export default function FilterSection(category) {
  const [colorsFilter, setColorsFilter] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    fetch("/api/getAllFilters")
      .then((response) => response.json())
      .then((data) => {
        setColorsFilter(data.filters.colors);
        setMinPrice(data.filters.min_price);
        setMaxPrice(data.filters.max_price);
      });
  }, []);
  return (
    <div className={classes.filterSection}>
      <SelectCategory category={category} />
      <ColorFilter colors={colorsFilter} />
      <PriceFilter minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
}
