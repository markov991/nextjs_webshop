import React from "react";
import classes from "./couponBox.module.css";

export default function CouponBox() {
  return (
    <div className={classes.couponBox}>
      <div>
        <h3>Coupon Details</h3>
        <p>Please enter coupon code and get 20%-100% discount</p>
      </div>
      <div className={classes.inputCouponCodeBox}>
        <div>
          <input placeholder="Apply valid code" />
          <button>CHECK</button>
        </div>
      </div>
    </div>
  );
}
