import React from "react";
import Image from "next/image";
import classes from "./myOrders.module.css";
import arrow from "@/public/arrow.svg";

export default function SingleOrder({ orderDetail }) {
  return (
    <div className={`${classes.fiveGridColumn} ${classes.singleOrderBox}`}>
      <span>{orderDetail.orderId}</span>
      <span>{orderDetail.date}</span>
      <span>${orderDetail.price.toFixed(2)}</span>
      <span>{orderDetail.status}</span>
      <span>
        <button>
          <Image src={arrow} />
        </button>
      </span>
    </div>
  );
}
