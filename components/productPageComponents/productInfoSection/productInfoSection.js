import React, { useState, useEffect } from "react";
import StarRatingDisplay from "@/components/starRatingDisplay/starRatingDisplay";
import classes from "./productInfoSection.module.css";
import CouponBox from "@/components/couponBox/couponBox";
import QuantitySelect from "@/components/quantitySelect/quantitySelect";
import ProductPageBtns from "@/components/productPageBtns/productPageBtns";
import { useSession } from "next-auth/react";

export default function ProductInfoSection({
  productId,
  name,
  avg_rating,
  rating_count,
  price,
}) {
  const [quantitySelected, setQuantitySelected] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [isOnWishlist, setIsOnWishlist] = useState();
  const [approvedDiscount, setApprovedDiscount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    async function handlingWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));
      console.log(wishlist);

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

      console.log("This is session", session);
    }

    async function handlingDiscount() {
      if (session) {
        const response = await fetch(
          `/api/getItemsFromTheCart?user=${session.user.email}`
        );
        const cartData = await response.json();
        setApprovedDiscount(cartData.cart.approvedDiscount);
      }
      if (!session) {
        const { approvedDiscount } = JSON.parse(localStorage.getItem("cart"));
        setApprovedDiscount(approvedDiscount);
      }
    }
    handlingDiscount();
    handlingWishlist();
  }, [session]);

  useEffect(() => {
    setIsOnWishlist(wishlist.includes(productId));
  }, [wishlist, productId]);

  async function addToTheCartHandler() {
    if (session) {
      const response = await fetch("/api/addItemToTheCart", {
        method: "PATCH",
        body: JSON.stringify({
          user: session.user.email,
          productId,
          quantity: quantitySelected,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        alert("Something went wrong please try again!!");
      }
    }
    if (!session) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      if (cart) {
        const { items, approvedDiscount, usedCodeForDiscount } = cart;
        const hasItemInCart = items.filter(
          (item) => item.productId === productId
        ).length;

        if (hasItemInCart) {
          const correctedItemQuantity = items.map((item) => {
            if (item.productId === productId) {
              return { productId, quantity: item.quantity + quantitySelected };
            } else
              return { productId: item.productId, quantity: item.quantity };
          });

          localStorage.setItem(
            "cart",
            JSON.stringify({
              approvedDiscount,
              usedCodeForDiscount,
              items: correctedItemQuantity,
            })
          );
        }
        if (!hasItemInCart) {
          localStorage.setItem(
            "cart",
            JSON.stringify({
              approvedDiscount,
              usedCodeForDiscount,
              items: [...items, { productId, quantity: quantitySelected }],
            })
          );
        }
      }
      if (!cart) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            approvedDiscount: 0,
            usedCodeForDiscount: null,
            items: [{ productId, quantity: quantitySelected }],
          })
        );
      }
    }
  }

  async function wishlistHandler() {
    setIsOnWishlist((prev) => !prev);

    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (isOnWishlist) {
      if (session) {
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
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          items: wishlist.items.filter((item) => item != productId),
        })
      );
    }
    if (!isOnWishlist) {
      if (session) {
        const addingItem = await fetch(
          `/api/wishlistHandler?user=${session.user.email}`,
          {
            method: "PATCH",
            body: JSON.stringify({ itemsToAdd: [`${productId}`] }),
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
          items: [...wishlist.items, productId],
        })
      );
    }
  }
  async function checkingDiscountCodeHandler(code) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const response = await fetch(
      `/api/checkingDiscountCode?user=${
        session && session.user.email
      }&usedCode=${code}`
    );

    const { data: discountCodeInfo } = await response.json();

    if (discountCodeInfo) {
      if (!discountCodeInfo.activeCode) {
        alert("This code expired");
      }
      if (discountCodeInfo.activeCode) {
        if (!session) {
          localStorage.setItem(
            "cart",
            JSON.stringify({
              approvedDiscount: discountCodeInfo.discountValue,
              usedCodeForDiscount: discountCodeInfo.discountCode,
              items: cart.items,
            })
          );
        }
      }
      setApprovedDiscount(discountCodeInfo.discountValue);
    }
    if (!discountCodeInfo) {
      alert("Code does not exist");
    }
  }

  return (
    <div className={classes.nameAndPrice}>
      <h1>{name}</h1>
      <div className={classes.ratingsAndRevives}>
        <StarRatingDisplay avgRating={avg_rating} />

        <div className={classes.numOfRevives}>
          <span>({rating_count})</span>
          <span>Ratings</span>
        </div>
      </div>
      <div className={classes.price}>
        <div className={`${!approvedDiscount ? classes.officialPrice : ""}`}>
          ${price.toFixed(2)}
        </div>
        {approvedDiscount > 0 && (
          <div className={`${approvedDiscount ? classes.officialPrice : ""}`}>
            ${price - price * (approvedDiscount / 100).toFixed(2)}
          </div>
        )}
      </div>

      <CouponBox passingCode={(code) => checkingDiscountCodeHandler(code)} />
      <QuantitySelect
        onChangeQuantityHandler={(value) => setQuantitySelected(value)}
      />

      <ProductPageBtns
        wishlistHandler={wishlistHandler}
        onAddToTheCartHandler={addToTheCartHandler}
        isOnWishlist={isOnWishlist}
      />
    </div>
  );
}
