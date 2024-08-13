import React from "react";
import Image from "next/image";
import wishlist from "@/public/wishlist.svg";
import profile from "@/public/profile.svg";
import shopCart from "@/public/shopCart.svg";
import classes from "./icons-group.module.css";
import Link from "next/link";

export default function IconsGroup() {
  return (
    <div className={classes.icons}>
      <Image alt="Icon for wishlist" src={wishlist} />
      <Link href="/profile">
        <Image alt="Profile icon" src={profile} />
      </Link>
      <Image alt="Shop cart icon" src={shopCart} />
    </div>
  );
}
