import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import wishlist from "@/public/wishlist.svg";
import profile from "@/public/profile.svg";
import shopCart from "@/public/shopCart.svg";
import classes from "./icons-group.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CartModal from "../cartModal/cartModal";
import WishlistModal from "../wishlistModal/wishlistModal";

export default function IconsGroup() {
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [wishlistItems, setWishlistItems] = useState();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const showCartHandler = async () => {
    setLoading(true);
    setShowCart((prev) => !prev);
    setCartItems(null);

    if (session) {
      await fetch(`/api/getItemsFromTheCart?user=${session.user.email}`)
        .then((respond) => respond.json())
        .then((data) => {
          setCartItems(data);
        });
      setLoading(false);
    }
    if (!session) {
      const cart = localStorage.getItem("cart");

      if (cart) {
        await fetch(`/api/getItemsFromTheCart?user=&cart=${cart}`)
          .then((respond) => respond.json())
          .then((data) => {
            setCartItems(data);
          });
        setLoading(false);
      }
      if (!cart) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            approvedDiscount: 0,
            usedCodeForDiscount: "",
            items: [],
          })
        );
        setCartItems({
          cart: {
            approvedDiscount: 0,
            usedCodeForDiscount: "",
            items: [],
          },
        });
        setLoading(false);
      }
    }
  };
  async function removingItemFromCartHandler(value) {
    if (session) {
      setLoading(true);
      const response = await fetch(`/api/removingItemFromCart`, {
        method: "PATCH",
        body: JSON.stringify({
          user: session.user.email,
          product: value,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        await fetch(`/api/getItemsFromTheCart?user=${session.user.email}`)
          .then((respond) => respond.json())
          .then((data) => {
            setCartItems(data);
          });
        setLoading(false);
      }
    }
    if (!session) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const correctedItems = cart.items.filter(
        (item) => item.productId !== value
      );
      const correctedCart = { ...cart, items: correctedItems };

      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...correctedCart,
        })
      );

      setCartItems({
        cart: {
          approvedDiscount: cart.approvedDiscount,
          usedCodeForDiscount: cart.usedCodeForDiscount,
          items: cartItems.cart.items.filter(
            (item) => item.productId !== value
          ),
        },
      });
    }
  }
  async function onChangeQuantityHandler(value, productId, oldQuantity) {
    if (!session) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const correctedItems = cart.items.map((item) =>
        item.productId === productId ? { ...item, quantity: value } : item
      );

      const correctedCart = { ...cart, items: correctedItems };

      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...correctedCart,
        })
      );
      setCartItems({
        cart: {
          approvedDiscount: cart.approvedDiscount,
          usedCodeForDiscount: cart.usedCodeForDiscount,
          items: cartItems.cart.items.map((item) =>
            item.productId === productId ? { ...item, quantity: value } : item
          ),
        },
      });
    }

    if (session && value !== oldQuantity) {
      setLoading(true);
      const newValue = value - oldQuantity;
      const response = await fetch("/api/addItemToTheCart", {
        method: "PATCH",
        body: JSON.stringify({
          user: session.user.email,
          productId: productId,
          quantity: newValue,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        alert("Something went wrong please try again!!");
      }
      if (response.ok) {
        setCartItems({
          cart: {
            approvedDiscount: cartItems.cart.approvedDiscount,
            usedCodeForDiscount: cartItems.cart.usedCodeForDiscount,
            items: cartItems.cart.items.map((item) =>
              item.productId === productId ? { ...item, quantity: value } : item
            ),
          },
        });
        setLoading(false);
      }
    }
  }
  async function showWishlistHandler() {
    setShowWishlist(true);
    setLoading(true);
    const wishlist = localStorage.getItem("wishlist");
    const response = await fetch(`/api/getWishlistItems?items=${wishlist}`);
    if (response.ok) {
      const wishlistItemsDetails = await response.json();
      setWishlistItems(wishlistItemsDetails.productDetails);
      setLoading(false);
    }
    console.log(response);

    console.log("This is wishlist");
  }
  async function removingItemFromWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));

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
    setWishlistItems(
      wishlistItems.filter((item) => item.productId != productId)
    );
  }
  async function checkingDiscountCodeHandler(code) {
    setLoading(true);
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

        setCartItems((prev) => ({
          cart: {
            ...prev.cart,
            approvedDiscount: discountCodeInfo.discountValue,
            usedCodeForDiscount: discountCodeInfo.discountCode,
          },
        }));
      }
    }
    if (!discountCodeInfo) {
      alert("Code does not exist");
    }
    setLoading(false);
  }

  return (
    <div className={classes.icons}>
      <button onClick={showWishlistHandler}>
        <Image alt="Icon for wishlist" src={wishlist} />
      </button>
      <Link href="/profile">
        <Image alt="Profile icon" src={profile} />
      </Link>
      <button onClick={showCartHandler}>
        <Image alt="Shop cart icon" src={shopCart} />
      </button>
      {showCart &&
        createPortal(
          <CartModal
            loading={loading}
            onCloseModal={() => setShowCart(false)}
            cartItems={cartItems}
            passingItemToBeRemovedHandler={removingItemFromCartHandler}
            onChangeQuantityHandler={onChangeQuantityHandler}
            passingCode={checkingDiscountCodeHandler}
          />,
          document.body
        )}
      {showWishlist &&
        createPortal(
          <WishlistModal
            wishlistItems={wishlistItems}
            onCloseModal={() => setShowWishlist(false)}
            passingItemToBeRemovedFromWishlist={removingItemFromWishlist}
          />,
          document.body
        )}
    </div>
  );
}
