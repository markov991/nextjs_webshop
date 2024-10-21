import React, { useRef } from "react";
import classes from "./couponBox.module.css";

export default function InputCouponBox({ passingCode }) {
  const inputCode = useRef();
  return (
    <div className={classes.inputCouponCodeBox}>
      <div>
        <input ref={inputCode} placeholder="Apply valid code" />
        <button onClick={() => passingCode(inputCode.current.value)}>
          CHECK
        </button>
      </div>
    </div>
  );
}
