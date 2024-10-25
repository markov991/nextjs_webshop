import React from "react";
import classes from "./quantitySelect.module.css";
import QuantityInputBox from "./quantityInputBox";

export default function QuantitySelect({ onChangeQuantityHandler }) {
  return (
    <div className={classes.quantitySelectComponentBox}>
      <span>Quantity:</span>
      <QuantityInputBox
        startingCount={1}
        onChangeQuantityHandler={(value) => onChangeQuantityHandler(value)}
      />
    </div>
  );
}
