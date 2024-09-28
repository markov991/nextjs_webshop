import React from "react";
import classes from "./couponBox.module.css";
import InputCouponBox from "./inputCouponBox";

export default function CouponBox() {
  return (
    <div className={classes.couponBox}>
      <div>
        <h3>Coupon Details</h3>
        <p>Please enter coupon code and get 20%-100% discount</p>
      </div>
      <InputCouponBox />
    </div>
  );
}
