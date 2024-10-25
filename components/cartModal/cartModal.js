import React, { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./cartModal.module.css";
import Link from "next/link";
import QuantityInputBox from "../quantitySelect/quantityInputBox";
import InputCouponBox from "../couponBox/inputCouponBox";
import LoadingSpinner from "../UI/loadingSpinner";

export default function CartModal({
  cartItems,
  onCloseModal,
  loading,
  passingItemToBeRemovedHandler,
  onChangeQuantityHandler,
  passingCode,
}) {
  let subtotal;
  if (cartItems) {
    subtotal = cartItems.cart.items
      .map((item) => item.selling_price * item.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  const removeItemFromCartHandler = (value) => {
    passingItemToBeRemovedHandler(value);
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.cartContainer}>
        <button onClick={onCloseModal} className={classes.returnBtn}>
          <div>
            <span>&larr;</span>
            <span>Back</span>
          </div>
        </button>
        <div className={classes.itemsContainer}>
          {(!cartItems || loading) && <LoadingSpinner />}

          {cartItems && !loading && (
            <>
              {cartItems.cart.items.map((item) => (
                <div key={item.productId} className={classes.itemDetails}>
                  <Image
                    alt={item.name}
                    width={75}
                    height={80}
                    src={item.images[0]}
                  />
                  <div>
                    {/* <span></span> */}
                    <Link
                      onClick={onCloseModal}
                      href={`/categories/${item.category}/${item.productId}`}
                    >
                      <h3>{item.name}</h3>
                    </Link>
                    <div>
                      <button
                        onClick={() =>
                          removeItemFromCartHandler(item.productId)
                        }
                      >
                        X
                      </button>
                    </div>
                    <div style={{ width: "fit-content" }}>
                      <QuantityInputBox
                        startingCount={item.quantity}
                        onChangeQuantityHandler={(value) =>
                          onChangeQuantityHandler(
                            value,
                            item.productId,
                            item.quantity
                          )
                        }
                      />
                    </div>
                    <span>
                      ${item.selling_price.toFixed(2) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}

              {cartItems.cart.items.length !== 0 && !loading && (
                <>
                  <div className={classes.priceCartInfo}>
                    <div>
                      <span>Subtotal:</span>
                      <span>$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>Discount:</span>

                      <span>
                        $
                        {(
                          subtotal *
                          (cartItems.cart.approvedDiscount / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span>Total:</span>
                      <span>
                        $
                        {(
                          subtotal -
                          subtotal * (cartItems.cart.approvedDiscount / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <InputCouponBox passingCode={(value) => passingCode(value)} />
                  <div className={classes.centeredContent}>
                    <button className={classes.placeOrderBtn}>
                      <Link onClick={onCloseModal} href={"/checkout"}>
                        Place Your Order
                      </Link>
                    </button>
                  </div>
                  <div className={classes.centeredContent}>
                    <button
                      className={classes.continueShoppingBtn}
                      onClick={onCloseModal}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}

              {cartItems.cart.items.length === 0 && !loading && (
                <h3 style={{ textAlign: "center" }}>
                  PLease add something to the cart
                </h3>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
