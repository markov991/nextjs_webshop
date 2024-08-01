import React, { useState } from "react";
import classes from "./quantitySelect.module.css";

export default function QuantitySelect() {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const reduceQuantityHandler = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  const addQuantityHandler = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  return (
    <div className={classes.quantitySelectComponentBox}>
      <span>Quantity:</span>
      <div className={classes.quantityInputBox}>
        <button onClick={reduceQuantityHandler}>-</button>
        <span>{selectedQuantity}</span>
        <button onClick={addQuantityHandler}>+</button>
      </div>
    </div>
  );
}
