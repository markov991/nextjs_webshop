import React from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./myOrders.module.css";

function SingleProduct({ productInfo }) {
  return (
    <div className={`${classes.productInfoGrid} ${classes.singleProductBox}`}>
      <span className={classes.imageAndName}>
        <Image
          src={productInfo.displayImage}
          width={75}
          height={80}
          alt={`Image of ${productInfo.productName}`}
        />
        <Link
          href={`/categories/${productInfo.category}/${productInfo.productId}`}
        >
          {productInfo.productName}
        </Link>
      </span>
      <span>${productInfo.price}</span>
      <span>{productInfo.quantity}</span>
      <span>${productInfo.price * productInfo.quantity}</span>
    </div>
  );
}

export default function OrderDetails({ orderInfo, onClick }) {
  return (
    <>
      <div
        className={`${classes.productInfoGrid} ${classes.productInfoContainer}`}
      >
        <span>Product Name</span>
        <span>Price</span>
        <span>Qty</span>
        <span>Subtotal</span>
      </div>
      <div>
        {orderInfo.items.map((item) => (
          <SingleProduct productInfo={item} key={item.productId} />
        ))}
      </div>
      <div className={classes.orderInformationContainer}>
        <h2>Order information</h2>

        <div>
          <div className={classes.paymentDetailsContainer}>
            <h3>Order Details</h3>
            <div>
              <span>Subtotal:</span>
              <span>${orderInfo.price.toFixed(2)}</span>
            </div>
            <div>
              <span> Discount:</span>
              <span>
                -$
                {(orderInfo.price * (orderInfo.discount / 100)).toFixed(2)}
              </span>
            </div>
            <div>
              <span>Grand Total:</span>
              <span>
                ${" "}
                {(
                  orderInfo.price -
                  orderInfo.price * (orderInfo.discount / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <h3>Payment Details</h3>
            <span>{orderInfo.paymentDetails}</span>
          </div>
          <div>
            <h3>Address Details</h3>
            <div className={classes.addressInformationContainer}>
              <span>{orderInfo.deliveryAddress.address}</span>
              <span>
                <span>{orderInfo.deliveryAddress.postalCode} </span>
                <span>{orderInfo.deliveryAddress.city}</span>
              </span>
              <span>{orderInfo.deliveryAddress.state}</span>
              <span>{orderInfo.deliveryAddress.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button className={classes.callToActionBtn}>Reorder</button>
        <button onClick={onClick}>Return</button>
      </div>
    </>
  );
}
