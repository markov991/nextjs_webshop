import React, { useState } from "react";
import classes from "./myOrders.module.css";
import SingleOrder from "./singleOrder";

export default function MyOrders({ ordersData, onOrderSelect, onClick }) {
  const [activeType, setActiveType] = useState("COMPLETED");

  console.log(ordersData);
  const orderInfo = (value) => {
    onOrderSelect(value);
  };
  return (
    <div>
      <div className={classes.ordersTypeSelection}>
        <button
          onClick={() => {
            setActiveType("COMPLETED");
          }}
          className={`${activeType === "COMPLETED" ? classes.active : ""}`}
        >
          Completed
        </button>
        <button
          onClick={() => {
            setActiveType("PROCESSING");
          }}
          className={`${activeType === "PROCESSING" ? classes.active : ""}`}
        >
          Processing
        </button>
        <button
          onClick={() => {
            setActiveType("CANCELLED");
          }}
          className={`${activeType === "CANCELLED" ? classes.active : ""}`}
        >
          Cancelled
        </button>
      </div>

      <div>
        <div className={`${classes.orderList} ${classes.fiveGridColumn}`}>
          <span>Order id</span>
          <span>Date</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        <div className={classes.ordersBox}>
          {ordersData &&
            activeType === "COMPLETED" &&
            ordersData.completed.map((order) => (
              <SingleOrder
                onClick={onClick}
                orderDetail={order}
                key={order.orderId}
                orderInfo={orderInfo}
              />
            ))}
          {ordersData &&
            activeType === "PROCESSING" &&
            ordersData.processing.map((order) => (
              <SingleOrder
                onClick={onClick}
                orderDetail={order}
                key={order.orderId}
                orderInfo={orderInfo}
              />
            ))}
          {ordersData &&
            activeType === "CANCELLED" &&
            ordersData.cancelled.map((order) => (
              <SingleOrder
                onClick={onClick}
                orderDetail={order}
                key={order.orderId}
                orderInfo={orderInfo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
