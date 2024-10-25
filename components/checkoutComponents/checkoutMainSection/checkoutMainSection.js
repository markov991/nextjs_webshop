import React, { useState, useEffect } from "react";
import classes from "./checkoutMainSection.module.css";
import Image from "next/image";
import Link from "next/link";
import InputCouponBox from "@/components/couponBox/inputCouponBox";
import AddressStageComponent from "../addressAndPayment/addressStageComponent";
import PaymentStageComponent from "../addressAndPayment/paymentStageComponent";

export default function CheckOutMainSection({
  cartItems,
  session,
  initialUserInfo,
}) {
  const [items, setItems] = useState();
  const [discountInformation, setDiscountInformation] = useState();
  const [checkoutStage, setCheckoutStage] = useState("ITEMS");
  const [selectedUserInfo, setSelectedUserInfo] = useState();
  let subtotal;

  if (items) {
    subtotal = items
      .map((item) => item.selling_price * item.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  async function removingItemHandler(productId) {
    if (session) {
      const response = await fetch(`/api/removingItemFromCart`, {
        method: "PATCH",
        body: JSON.stringify({
          user: session.user.email,
          product: productId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setItems((prev) => prev.filter((item) => item.productId !== productId));
      }
    }
    if (!session) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const correctedItems = cart.items.filter(
        (item) => item.productId !== productId
      );
      const correctedCart = { ...cart, items: correctedItems };

      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...correctedCart,
        })
      );
      setItems((prev) => prev.filter((item) => item.productId !== productId));
    }
  }
  useEffect(() => {
    if (session) {
      setItems(cartItems.items);
      setDiscountInformation({
        approvedDiscount: cartItems.approvedDiscount,
        usedCode: cartItems.usedCodeForDiscount,
      });
    }
    if (!session) {
      const cart = localStorage.getItem("cart");
      fetch(`/api/getItemsFromTheCart?user=&cart=${cart}`)
        .then((respond) => respond.json())
        .then((data) => {
          setItems(data.cart.items);
        });
      setDiscountInformation({
        approvedDiscount: JSON.parse(cart).approvedDiscount,
        usedCode: JSON.parse(cart).usedCodeForDiscount,
      });
    }
  }, []);
  async function couponCodeCheckHandler(code) {
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
              items: items,
            })
          );
        }

        setDiscountInformation({
          approvedDiscount: discountCodeInfo.discountValue,
          usedCodeForDiscount: discountCodeInfo.discountCode,
        });
      }
    }
    if (!discountCodeInfo) {
      alert("Code does not exist");
    }
  }
  function nextStageHandler(value) {
    if (checkoutStage === "ITEMS") {
      setCheckoutStage("ADDRESS");
    }
    if (checkoutStage === "ADDRESS") {
      setSelectedUserInfo(value);

      setCheckoutStage("PAYMENT");
    }
  }
  function backToCartHandler() {
    setCheckoutStage("ITEMS");
  }
  function backToAddress() {
    setCheckoutStage("ADDRESS");
  }

  return (
    <main className={classes.main}>
      {checkoutStage === "ITEMS" && (
        <section className={classes.productsSectionAndCouponContainer}>
          <div className={classes.productsSectionContainer}>
            <div className={classes.productInfoGrid}>
              <span>Product Name</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
            </div>
            {items &&
              items.map((item) => (
                <div key={item.productId} className={classes.productInfoGrid}>
                  <div className={classes.productImageAndName}>
                    <Image
                      src={item.images[0]}
                      width={75}
                      height={80}
                      alt={`Image of a ${item.name}`}
                    />
                    <div className={classes.productNameAndRmvBtn}>
                      <Link
                        href={`/categories/${item.category}/${item.productId}`}
                      >
                        <span>{item.name}</span>
                      </Link>
                      <span className={classes.removeBtn}>
                        <button
                          onClick={() => removingItemHandler(item.productId)}
                        >
                          Remove
                        </button>
                      </span>
                    </div>
                  </div>
                  <span>${item.selling_price.toFixed(2)}</span>
                  <span>{item.quantity}</span>
                  <span>
                    ${(item.quantity * item.selling_price).toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
          <div className={classes.couponSectionContainer}>
            <div className={classes.couponSectionHeader}>
              <span>Apply Coupon Code </span>
            </div>
            <div className={classes.couponBoxHolder}>
              <InputCouponBox passingCode={couponCodeCheckHandler} />
            </div>
          </div>
        </section>
      )}
      {checkoutStage === "ADDRESS" && (
        <AddressStageComponent
          backToCart={backToCartHandler}
          initialAddress={initialUserInfo}
          passAddressInfo={(value) => nextStageHandler(value)}
        />
      )}
      {checkoutStage === "PAYMENT" && (
        <PaymentStageComponent
          backToCart={backToCartHandler}
          backToAddress={backToAddress}
          userInfo={selectedUserInfo}
          userCart={items}
          userDiscountInfo={discountInformation}
          session={session}
        />
      )}
      {items && discountInformation && (
        <section className={classes.orderSummaryContainer}>
          <div className={classes.orderSummaryHeading}>Order Summary</div>
          <div className={classes.billInformationContainer}>
            <div>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>Discount:</span>
              <span>
                $
                {(
                  subtotal *
                  (discountInformation.approvedDiscount / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className={classes.grandTotal}>
              <span>Grand Total</span>
              <span>
                $
                {(
                  subtotal -
                  subtotal * (discountInformation.approvedDiscount / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>
          {checkoutStage === "ITEMS" && (
            <div className={classes.btnContainer}>
              <button onClick={nextStageHandler}>Place order</button>
              <Link href="/categories">Continue Shopping</Link>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
