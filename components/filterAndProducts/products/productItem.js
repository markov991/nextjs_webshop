import Image from "next/image";
import Link from "next/link";
import classes from "./productItem.module.css";
import wishlistIcon from "@/public/wishlist.svg";
import onWishlistIcon from "@/public/onWishlist.svg";

import { useEffect, useState } from "react";

export default function ProductItem({ product, itemOnWishlist, session }) {
  const [isOnWishlist, setIsOnWishlist] = useState(itemOnWishlist);
  const [isProcessing, setIsProcession] = useState(false);
  const toggleWishlistHandler = async () => {
    if (isProcessing) return;

    setIsProcession(true);
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    try {
      //Removing form wishlist
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
            throw new Error("Failed to remove item.");
          }
        }

        localStorage.setItem(
          "wishlist",
          JSON.stringify({
            items: wishlist.items.filter((item) => item != product.productId),
          })
        );
        setIsOnWishlist(false);
      }

      //adding to the wishlist
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
            throw new Error("Failed to add item.");
          }
        }
        localStorage.setItem(
          "wishlist",
          JSON.stringify({
            items: [...new Set([...wishlist.items, product.productId])],
          })
        );
        setIsOnWishlist(true);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsProcession(false);
    }
  };
  useEffect(() => {
    setIsOnWishlist(itemOnWishlist);
  }, [itemOnWishlist]);

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
        <button onClick={toggleWishlistHandler} disabled={isProcessing}>
          <Image
            alt="wishlist icon"
            src={isOnWishlist ? onWishlistIcon : wishlistIcon}
          />
        </button>
      </div>
      <p className={classes.productPrice}>${product.selling_price}</p>
    </div>
  );
}
