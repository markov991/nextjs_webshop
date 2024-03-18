import React from "react";
import Image from "next/image";
import wishlist from "@/public/wishlist.svg";
import profile from "@/public/profile.svg";
import shopCart from "@/public/shopCart.svg";
import classes from "./icons-group.module.css";

export default function IconsGroup() {
  return (
    <div className={classes.icons}>
      <Image src={wishlist} />
      <Image src={profile} />
      <Image src={shopCart} />
    </div>
  );
}
