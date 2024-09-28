import React from "react";
import classes from "./loadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={classes.centerBox}>
      <div className={classes.spinner}></div>;
    </div>
  );
}
