import React from "react";
import Image from "next/image";
import classes from "./myOrders.module.css";
import arrow from "@/public/arrow.svg";

export default function SingleOrder(props) {
  return (
    <div className={`${classes.fiveGridColumn} ${classes.singleOrderBox}`}>
      <span>{props.orderDetail.orderId}</span>
      <span>{props.orderDetail.date}</span>
      <span>${props.orderDetail.price.toFixed(2)}</span>
      <span>{props.orderDetail.status}</span>
      <span>
        <button
          onClick={() => {
            props.orderInfo(props.orderDetail);
          }}
        >
          <Image src={arrow} alt="arrow icon" />
        </button>
      </span>
    </div>
  );
}
