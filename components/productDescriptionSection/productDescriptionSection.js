import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ProductBox from "../product-box/product-box";
import ProductItem from "../filterAndProducts/products/productItem";
import classes from "./productDescriptionSection.module.css";

export default function ProductDescriptionSection({
  description,
  price,
  category,
  color,
  productId,
}) {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("PRODUCT_DETAILS");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { data: session } = useSession();

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

  useEffect(() => {
    setActiveButton("PRODUCT_DETAILS");
    setRelatedProducts([]);
  }, [router.query]);

  useEffect(() => {
    if (activeButton === "RELATED_PRODUCTS") {
      fetch(
        `/api/getRelatedProducts?productItem=${productId}&colorFilter=${color}&priceFilter=${
          price - 10
        },${price + 10}&category=${category}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRelatedProducts([...data.products]);
        });
    }
  }, [activeButton]);

  return (
    <div className={classes.productDescriptionSectionBox}>
      <div className={classes.btnBox}>
        <button
          onClick={() => {
            setActiveButton("PRODUCT_DETAILS");
          }}
          className={`${
            activeButton === "PRODUCT_DETAILS"
              ? classes.btnActive
              : classes.btnInactive
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => {
            setActiveButton("RELATED_PRODUCTS");
          }}
          className={`${
            activeButton === "RELATED_PRODUCTS"
              ? classes.btnActive
              : classes.btnInactive
          }`}
        >
          Related Products
        </button>
        <button
          onClick={() => {
            setActiveButton("RATINGS_REVIVES");
          }}
          className={`${
            activeButton === "RATINGS_REVIVES"
              ? classes.btnActive
              : classes.btnInactive
          }`}
        >
          Ratings and Revives
        </button>
      </div>
      {activeButton === "PRODUCT_DETAILS" && (
        <p className={classes.productDescription}>{description}</p>
      )}
      {activeButton === "RELATED_PRODUCTS" && (
        <div className={classes.relatedProductsBox}>
          {/* {relatedProducts.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))} */}
          {relatedProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              itemOnWishlist={wishlist.includes(product.productId)}
              session={session}
            />
          ))}
        </div>
      )}
      {activeButton === "RATINGS_REVIVES" && <div>Ratings and revievs</div>}
    </div>
  );
}
