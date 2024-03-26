import React from "react";
import Link from "next/link";
import classes from "./categoryBredCrumbs.module.css";

export default function CategoryBredCrumbs() {
  return (
    <div className={classes.bredCrumbs}>
      <span>
        <Link href="/">Home</Link>
      </span>
      <span>&gt;</span>
      <span>Categories</span>
    </div>
  );
}
