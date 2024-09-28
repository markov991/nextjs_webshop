import React, { useEffect, useState } from "react";
import classes from "./quantitySelect.module.css";

export default function QuantityInputBox({
  startingCount,
  onChangeQuantityHandler,
}) {
  const [selectedQuantity, setSelectedQuantity] = useState(startingCount);

  const reduceQuantityHandler = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  const addQuantityHandler = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    onChangeQuantityHandler(selectedQuantity);
  }, [selectedQuantity]);

  return (
    <div className={classes.quantityInputBox}>
      <button onClick={reduceQuantityHandler}>-</button>
      <span>{selectedQuantity}</span>
      <button onClick={addQuantityHandler}>+</button>
    </div>
  );
}
