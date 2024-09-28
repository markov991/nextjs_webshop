import React from "react";
import classes from "./couponBox.module.css";

export default function InputCouponBox() {
  return (
    <div className={classes.inputCouponCodeBox}>
      <div>
        <input placeholder="Apply valid code" />
        <button>CHECK</button>
      </div>
    </div>
  );
}
