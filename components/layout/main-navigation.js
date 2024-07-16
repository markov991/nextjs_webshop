import React from "react";
import Link from "next/link";
import Image from "next/image";
import search from "@/public/search.svg";
import classes from "./main-navigation.module.css";
import IconsGroup from "./icons-group";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <div>
        <Link className={classes.logo} href="/">
          ADIDAS
        </Link>
        <nav className={classes.categories}>
          <Link href="/categories/Clothing">CLOTHING</Link>
          <Link href="/categories/Shoes">SHOES</Link>
          <Link href="/categories/Accessories">ACCESSORIES</Link>
        </nav>
      </div>
      <div>
        <div className={classes.searchBox}>
          <Image alt="search icon" src={search} />
          <input placeholder="Search for products" type=" text" />
        </div>
        <IconsGroup />
      </div>
    </header>
  );
}
