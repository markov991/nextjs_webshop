import React, { useRef } from "react";
import classes from "./addressStageComponent.module.css";

export default function AddressStageComponent({
  backToCart,
  initialAddress,
  passAddressInfo,
}) {
  const fullName = useRef();
  const phoneNumber = useRef();
  const cityName = useRef();
  const pinCode = useRef();
  const streetAddress = useRef();
  const state = useRef();

  function gettingAddressInfo(e) {
    e.preventDefault();

    const enteredFullName = fullName.current.value;
    const enteredPhoneNumber = phoneNumber.current.value;
    const enteredCityName = cityName.current.value;
    const enteredPinCode = pinCode.current.value;
    const enteredStreetAddress = streetAddress.current.value;
    const enteredState = state.current.value;

    if (
      !enteredFullName ||
      !enteredPhoneNumber ||
      !enteredCityName ||
      !enteredPinCode ||
      !enteredStreetAddress ||
      !enteredState
    ) {
      return;
    }

    passAddressInfo({
      fullName: enteredFullName,
      phoneNumber: enteredPhoneNumber,
      cityName: enteredCityName,
      pinCode: enteredPinCode,
      streetAddress: enteredStreetAddress,
      state: enteredState,
    });
  }
  return (
    <section>
      <div className={classes.addressGridForm}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            defaultValue={
              initialAddress &&
              (`${initialAddress.firstName} ${initialAddress.lastName}` || null)
            }
            placeholder={
              (initialAddress &&
                `${initialAddress.firstName} ${initialAddress.lastName}`) ||
              "Enter Full Name"
            }
            ref={fullName}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            defaultValue={
              (initialAddress && initialAddress.phoneNumber) || null
            }
            placeholder={
              (initialAddress && initialAddress.phoneNumber) ||
              "Enter Phone number"
            }
            ref={phoneNumber}
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            defaultValue={(initialAddress && initialAddress.city) || null}
            placeholder={
              (initialAddress && initialAddress.city) || "Enter City"
            }
            ref={cityName}
          />
        </div>
        <div>
          <label htmlFor="pinCode">Pin Code</label>
          <input
            id="pinCode"
            type="text"
            defaultValue={(initialAddress && initialAddress.postalCode) || null}
            placeholder={
              (initialAddress && initialAddress.postalCode) || "Enter Pin Code"
            }
            ref={pinCode}
          />
        </div>

        <div>
          <label htmlFor="streetAddress">Street Address</label>
          <input
            id="streetAddress"
            type="text"
            defaultValue={
              (initialAddress && initialAddress.streetAddress) || null
            }
            placeholder={
              (initialAddress && initialAddress.streetAddress) ||
              "Enter Address"
            }
            ref={streetAddress}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            defaultValue={(initialAddress && initialAddress.state) || null}
            placeholder={
              (initialAddress && initialAddress.state) || "Enter State"
            }
            ref={state}
          />
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button onClick={backToCart}>Back To Cart</button>
        <button onClick={gettingAddressInfo}>Next</button>
      </div>
    </section>
  );
}
