import React from "react";
import MainNavigation from "./main-navigation";
import Footer from "./footer";
import classes from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <div className={classes.layout}>
        <MainNavigation />
        {children}
      </div>
      <Footer />
    </>
  );
}
