import Image from "next/image";
import Link from "next/link";
import classes from "./productItem.module.css";
import wishlist from "@/public/wishlist.svg";
// import { checkImages } from "@/lib/db";
// import { useState } from "react";

export default function ProductItem({ product }) {
  // const [x,setX]=useState()

  // const validImages

  return (
    <div className={classes.productBox_Container}>
      <div className={classes.product_Image_Container}>
        <Image
          width={300}
          height={300}
          alt={product.name}
          src={product.images[0]}
        />
      </div>
      <div className={classes.productName}>
        <Link href={`/categories/${product.category}/${product.productId}`}>
          <h2>{product.name}</h2>
        </Link>
        <Image alt="wishlist icon" src={wishlist} />
      </div>
      <p className={classes.productPrice}>${product.selling_price}</p>
    </div>
  );
}
