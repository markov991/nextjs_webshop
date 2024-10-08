import React, { useState, useEffect } from "react";
import Image from "next/image";
import arrow from "@/public/arrow.svg";
import classes from "./sideNavigation.module.css";

export default function SideNavigation(props) {
  const [activeNavigation, setActiveNavigation] = useState("PERSONAL_INFO");
  const handleRadioChange = (value) => {
    setActiveNavigation(value);
    props.changeNavigation(value);
  };

  return (
    <div className={classes.sideNavigationContainer}>
      <label htmlFor="personal_info">
        <div>
          <input
            id="personal_info"
            type="radio"
            name="side_navigation"
            value="PERSONAL_INFO"
            checked={activeNavigation === "PERSONAL_INFO"}
            onChange={() => {
              handleRadioChange("PERSONAL_INFO");
            }}
          />
          <span htmlFor="personal_info">Personal info</span>
          <span className={classes.checkmark}></span>
        </div>
        <Image alt="arrow icon" src={arrow} />
      </label>
      <label htmlFor="my_orders">
        <div>
          <input
            id="my_orders"
            type="radio"
            name="side_navigation"
            value="ORDERS"
            checked={activeNavigation === "ORDERS"}
            onChange={() => {
              handleRadioChange("ORDERS");
            }}
          />
          <span>My Orders</span>
          <span className={classes.checkmark}></span>
        </div>
        <Image alt="arrow icon" src={arrow} />
      </label>
      <label htmlFor="my_wishlist">
        <div>
          <input
            id="my_wishlist"
            type="radio"
            name="side_navigation"
            value="WISHLIST"
            checked={activeNavigation === "WISHLIST"}
            onChange={() => {
              handleRadioChange("WISHLIST");
            }}
          />
          <span>My Wishlist</span>
          <span className={classes.checkmark}></span>
        </div>
        <Image alt="arrow icon" src={arrow} />
      </label>
      <label htmlFor="my_reviews">
        <div>
          <input
            id="my_reviews"
            type="radio"
            name="side_navigation"
            value="REVIEWS"
            checked={activeNavigation === "REVIEWS"}
            onChange={() => {
              handleRadioChange("REVIEWS");
            }}
          />
          <span>My Reviews</span>
          <span className={classes.checkmark}></span>
        </div>
        <Image alt="arrow icon" src={arrow} />
      </label>
      <label htmlFor="my_address_book">
        <div>
          <input
            id="my_address_book"
            type="radio"
            name="side_navigation"
            value="ADDRESS"
            checked={activeNavigation === "ADDRESS"}
            onChange={() => {
              handleRadioChange("ADDRESS");
            }}
          />
          <span>My Address Book</span>
          <span className={classes.checkmark}></span>
        </div>
        <Image alt="arrow icon" src={arrow} />
      </label>
    </div>
  );
}
