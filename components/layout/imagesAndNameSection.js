import React from "react";

import classes from "./imagesAndNameSection.module.css";

export default function ImagesAndNameSection({ children }) {
  return <section className={classes.imagesAndNameSection}>{children}</section>;
}
