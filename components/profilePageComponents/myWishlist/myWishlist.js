import React, { useState, useEffect } from "react";
import Image from "next/image";
import classes from "./myWishlist.module.css";
import Link from "next/link";
import LoadingSpinner from "@/components/UI/loadingSpinner";

export default function MyWishlist({ session }) {
  const [wishlistItems, setWishlistItems] = useState();

  useEffect(() => {
    async function gettingAllWishlistItems() {
      const lsWishlist = JSON.parse(localStorage.getItem("wishlist"));

      if (session) {
        const dbWishlistResponse = await fetch(
          `/api/wishlistHandler?user=${session.user.email}`
        );
        const { data: dbWishlistItems } = await dbWishlistResponse.json();

        const uniqueWishlist = [
          ...new Set([...lsWishlist.items, ...dbWishlistItems]),
        ];

        if (lsWishlist.items.length !== uniqueWishlist.length) {
          localStorage.setItem(
            "wishlist",
            JSON.stringify({
              items: uniqueWishlist,
            })
          );
        }
        if (dbWishlistItems.length !== uniqueWishlist.length) {
          const updatingWishlist = await fetch(
            `/api/wishlistHandler?user=${session.user.email}`,
            {
              method: "PATCH",
              body: JSON.stringify({ itemsToAdd: uniqueWishlist }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!updatingWishlist.ok) {
            alert("Something went wrong!");
          }
        }

        const response = await fetch(
          `/api/getWishlistItems?items=${JSON.stringify({
            items: uniqueWishlist,
          })}`
        );

        if (response.ok) {
          const wishlistItemsDetails = await response.json();

          setWishlistItems(wishlistItemsDetails.productDetails);
        }
      }
    }
    gettingAllWishlistItems();
  }, []);

  async function removeItemFromWishlistHandler(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));

    const removingItem = await fetch(
      `/api/wishlistHandler?user=${session.user.email}`,
      {
        method: "PATCH",
        body: JSON.stringify({ itemToDelete: [`${productId}`] }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!removingItem.ok) {
      alert("Something went wrong!");
    }
    if (removingItem.ok) {
      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          items: wishlist.items.filter((item) => item != productId),
        })
      );
      setWishlistItems(
        wishlistItems.filter((item) => item.productId != productId)
      );
    }
  }
  return (
    <div className={classes.wishlistContainer}>
      <div className={classes.wishlist}>
        <span>Product Name</span>
        <span>Price</span>
        <span></span>
      </div>
      <div className={classes.itemsContainer}>
        {!wishlistItems && <LoadingSpinner />}
        {wishlistItems &&
          wishlistItems.map((item) => (
            <div key={item.productId} className={classes.itemContainer}>
              <div className={classes.itemNameAndPic}>
                <Image
                  alt={`Images of ${item.name}`}
                  width={70}
                  height={65}
                  src={item.images}
                />
                <Link href={`/categories/${item.category}/${item.productId}`}>
                  <span>{item.name}</span>
                </Link>
              </div>
              <span>${item.selling_price.toFixed(2)}</span>
              <button
                onClick={() => removeItemFromWishlistHandler(item.productId)}
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
