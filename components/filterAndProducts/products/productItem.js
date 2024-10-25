import Image from "next/image";
import Link from "next/link";
import classes from "./productItem.module.css";
import wishlist from "@/public/wishlist.svg";
import onWishlist from "@/public/onWishlist.svg";

import { useState } from "react";

export default function ProductItem({ product, itemOnWishlist, session }) {
  const [isOnWishlist, setIsOnWishlist] = useState(itemOnWishlist);

  const toggleWishlistHandler = async () => {
    setIsOnWishlist((prev) => !prev);

    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (isOnWishlist) {
      if (session) {
        const removingItem = await fetch(
          `/api/wishlistHandler?user=${session.user.email}`,
          {
            method: "PATCH",
            body: JSON.stringify({ itemToDelete: [`${product.productId}`] }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!removingItem.ok) {
          alert("Something went wrong!");
        }
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          items: wishlist.items.filter((item) => item != product.productId),
        })
      );
    }
    if (!isOnWishlist) {
      if (session) {
        const addingItem = await fetch(
          `/api/wishlistHandler?user=${session.user.email}`,
          {
            method: "PATCH",
            body: JSON.stringify({ itemsToAdd: [`${product.productId}`] }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!addingItem.ok) {
          alert("Something went wrong!");
        }
      }
      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          items: [...wishlist.items, product.productId],
        })
      );
    }
  };

  return (
    <div className={classes.productBox_Container}>
      <div className={classes.product_Image_Container}>
        <Image
          width={300}
          height={300}
          alt={product.name}
          src={product.images}
        />
      </div>
      <div className={classes.productName}>
        <Link href={`/categories/${product.category}/${product.productId}`}>
          <h2>{product.name}</h2>
        </Link>
        <button onClick={toggleWishlistHandler}>
          <Image
            alt="wishlist icon"
            src={isOnWishlist ? onWishlist : wishlist}
          />
        </button>
      </div>
      <p className={classes.productPrice}>${product.selling_price}</p>
    </div>
  );
}
