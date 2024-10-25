import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductItem from "../filterAndProducts/products/productItem";
import classes from "./featuredProducts.module.css";
import { useSession } from "next-auth/react";

export default function FeaturedProducts({ featuredProducts }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    setDisplayedProducts(featuredProducts);
  }, [featuredProducts]);

  useEffect(() => {
    async function handlingWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));

      if (session) {
        const wishlistDb = await fetch(
          `/api/wishlistHandler?user=${session.user.email}`
        );
        const responseWishlistDb = await wishlistDb.json();

        setWishlist([
          ...new Set([...wishlist.items, ...responseWishlistDb.data]),
        ]);
        localStorage.setItem(
          "wishlist",
          JSON.stringify({
            items: [
              ...new Set([...wishlist.items, ...responseWishlistDb.data]),
            ],
          })
        );
        //comparing and merging

        if (
          responseWishlistDb.data.length !==
          [...new Set([...wishlist.items, ...responseWishlistDb.data])].length
        ) {
          const updatingWishlist = await fetch(
            `/api/wishlistHandler?user=${session.user.email}`,
            {
              method: "PATCH",
              body: JSON.stringify({ itemsToAdd: wishlist.items }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!updatingWishlist.ok) {
            alert("Something went wrong!");
          }
        }
      }
      if (!session) {
        if (!wishlist) {
          localStorage.setItem(
            "wishlist",
            JSON.stringify({
              items: [],
            })
          );
        }

        setWishlist(wishlist.items);
      }
    }
    handlingWishlist();
  }, [session]);

  return (
    <section className={classes.featuredProducts}>
      <div className={classes.featuredProductsHeading}>
        <h2>Some of our wear</h2>
        <Link href="/categories">
          Browse all<span>&rarr;</span>
        </Link>
      </div>
      <div className={classes.featuredProductsBox}>
        {displayedProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            itemOnWishlist={wishlist.includes(product.productId)}
            session={session}
          />
        ))}
      </div>
    </section>
  );
}
