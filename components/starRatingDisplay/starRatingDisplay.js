import React from "react";
import fullStar from "@/public/fullStar.svg";
import emptyStar from "@/public/emptyStar.svg";
import Image from "next/image";
import classes from "./starRatingDisplay.module.css";

export default function StarRatingDisplay({ avgRating }) {
  const ratingDisplay = new Array(5);
  console.log(Math.trunc(avgRating), ratingDisplay);

  const Stars = ({ avgRating }) =>
    Array.from({ length: 5 }).map((_, index) => (
      <Image key={index} src={index < avgRating ? fullStar : emptyStar} />
    ));

  return (
    <div className={classes.starRatingBox}>
      {avgRating && <Stars avgRating={Math.trunc(avgRating)} />}
    </div>
  );
}
