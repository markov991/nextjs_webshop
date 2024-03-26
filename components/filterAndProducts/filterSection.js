import { useState, useEffect } from "react";

import ColorFilter from "./colorFilter/colorFilter";
import classes from "./filterSection.module.css";
import PriceFilter from "./priceFilter/priceFilter";
import SelectCategory from "./selectCategory/selectCategory";

export default function FilterSection() {
  return (
    <div className={classes.filterSection}>
      <SelectCategory />
      <ColorFilter />
      <PriceFilter />
    </div>
  );
}
