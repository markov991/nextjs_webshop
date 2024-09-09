import React from "react";
import classes from "./myOrders.module.css";
import SingleOrder from "./singleOrder";

export default function MyOrders() {
  const DUMMY_CONTENT = [
    {
      orderId: "#123345566",
      date: "September 5, 2024",
      price: 250.0,
      status: "Paid",
    },
    {
      orderId: "#987653410",
      date: "September 6, 2024",
      price: 100,
      status: "Paid",
    },
  ];

  return (
    <div>
      <div className={classes.ordersTypeSelection}>
        <button className={classes.active}>Completed</button>
        <button>Processing</button>
        <button>Cancelled</button>
      </div>

      <div>
        <div className={`${classes.orderList} ${classes.fiveGridColumn}`}>
          <span>Order id</span>
          <span>Date</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        <div className={classes.ordersBox}>
          {DUMMY_CONTENT &&
            DUMMY_CONTENT.map((order) => <SingleOrder orderDetail={order} />)}
        </div>
      </div>
    </div>
  );
}
