import Image from "next/image";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import classes from "./paymentStageComponent.module.css";
import creditCard from "../../../public/creditCard.svg";
import truck from "../../../public/truck.svg";

export default function PaymentStageComponent({
  backToCart,
  backToAddress,
  userInfo,
  userCart,
  userDiscountInfo,
  session,
}) {
  const nameOnCard = useRef();
  const cardNumber = useRef();
  const expiryDate = useRef();
  const cvv = useRef();
  const router = useRouter();

  const [selectedPayment, setSelectedPayment] = useState("CREDIT_CARD");
  function paymentChange(e) {
    setSelectedPayment(e.target.value);
  }
  async function finishShopping() {
    let response;

    if (selectedPayment === "CREDIT_CARD") {
      const enteredNameOnCard = nameOnCard.current.value;
      const enteredCardNumber = cardNumber.current.value;
      const enteredExpiryDate = expiryDate.current.value;
      const enteredCvv = cvv.current.value;
      const cardDetails = {
        enteredNameOnCard,
        enteredCardNumber,
        enteredExpiryDate,
        enteredCvv,
      };
      if (
        !enteredNameOnCard ||
        !enteredCardNumber ||
        !enteredExpiryDate ||
        !enteredCvv
      ) {
        alert("Fill all card details");
        return;
      }

      response = await fetch(
        `/api/purchaseHandler?user=${session && session.user.email}`,
        {
          method: "POST",
          body: JSON.stringify({
            userInfo,
            userCart,
            userDiscountInfo,
            cardDetails,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (selectedPayment === "PAY_ON_DELIVERY") {
      response = await fetch(
        `/api/purchaseHandler?user=${session && session.user.email}`,
        {
          method: "POST",
          body: JSON.stringify({
            userInfo,
            userCart,
            userDiscountInfo,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (response.ok) {
      if (!session) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            approvedDiscount: 0,
            usedCodeForDiscount: "",
            items: [],
          })
        );
      }
      router.push("/");
    }
  }

  return (
    <section className={classes.paymentContainer}>
      <div>
        <div>
          <h2>Payments</h2>
          <div className={classes.paymentSelectionContainer}>
            <label
              htmlFor="CREDIT_CARD"
              className={`${classes.paymentChoice} ${
                selectedPayment === "CREDIT_CARD" ? classes.activePayment : ""
              }`}
            >
              <input
                name="paymentChoice"
                value="CREDIT_CARD"
                type="radio"
                id="CREDIT_CARD"
                checked={selectedPayment === "CREDIT_CARD"}
                onChange={paymentChange}
              />
              <Image
                width={50}
                src={creditCard}
                alt="Credit card vector image"
              />
              <span>Credit Card</span>
            </label>
            <label
              htmlFor="PAY_ON_DELIVERY"
              className={`${classes.paymentChoice} ${
                selectedPayment === "PAY_ON_DELIVERY"
                  ? classes.activePayment
                  : ""
              }`}
            >
              <input
                name="paymentChoice"
                value="PAY_ON_DELIVERY"
                type="radio"
                id="PAY_ON_DELIVERY"
                checked={selectedPayment === "PAY_ON_DELIVERY"}
                onChange={paymentChange}
              />
              <Image width={50} src={truck} alt="Truck image" />
              <span>Pay on delivery</span>
            </label>
          </div>
          <div className={classes.selectedPaymentContainer}>
            {selectedPayment === "CREDIT_CARD" && (
              <div className={classes.creditCardPayment}>
                <h4>Enter your Credit Card details</h4>
                <div className={classes.creditCardForm}>
                  <div className={classes.formGroup}>
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      placeholder="John Doe"
                      ref={nameOnCard}
                      required
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      ref={cardNumber}
                      required
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder="MM/YY"
                      ref={expiryDate}
                      required
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      maxLength={3}
                      ref={cvv}
                      required
                    />
                  </div>
                  {/* <button type="submit" className={classes.submitBtn}>
                    Submit Payment
                  </button> */}
                </div>
              </div>
            )}

            {selectedPayment === "PAY_ON_DELIVERY" && (
              <div className={classes.payOnDeliveryPayment}>
                <h4>You selected Pay on Delivery</h4>
                <p>
                  You will pay upon receiving the goods. Please ensure you have
                  the exact amount, as the delivery personnel may not have
                  change.
                </p>
                <div className={classes.addressInfo}>
                  <h5>Delivery Address:</h5>
                  <p>{userInfo.fullName}</p>
                  <p>{userInfo.streetAddress}</p>
                  <p>
                    {userInfo.cityName}, {userInfo.state}, {userInfo.pinCode}
                  </p>
                  <p>Phone: {userInfo.phoneNumber}</p>
                  <button
                    onClick={backToAddress}
                    className={classes.changeAddressBtn}
                  >
                    Change Address
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button onClick={backToCart}>Back to cart</button>
        <button onClick={finishShopping}>Next</button>
      </div>
    </section>
  );
}
