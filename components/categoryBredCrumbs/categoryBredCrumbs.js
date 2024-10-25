import React from "react";
import Link from "next/link";
import classes from "./categoryBredCrumbs.module.css";

export default function CategoryBredCrumbs({ category, productName }) {
  return (
    <div className={classes.bredCrumbs}>
      <span>
        <Link href="/">Home</Link>
      </span>
      <span>&gt;</span>
      <Link href="/categories">Categories</Link>
      {category && (
        <>
          <span>&gt;</span>
          <Link href={`/categories/${category}`}>{category}</Link>
        </>
      )}
      {productName && (
        <>
          <span>&gt;</span>
          <span>{productName}</span>
        </>
      )}
    </div>
  );
}
