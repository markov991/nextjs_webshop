import React, { useRef } from "react";
import classes from "./myAddress.module.css";

export default function MyAddress({ initialAddress }) {
  const cityName = useRef();
  const pinCode = useRef();
  const streetAddress = useRef();
  const state = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredCityName = cityName.current.value;
    const enteredPinCode = pinCode.current.value;
    const enteredStreetAddress = streetAddress.current.value;
    const enteredState = state.current.value;

    if (
      !enteredCityName.trim() &&
      !enteredPinCode.trim() &&
      !enteredStreetAddress.trim() &&
      !enteredState.trim()
    ) {
      return;
    }

    const response = await fetch("api/changeAddressInfo", {
      method: "PATCH",
      body: JSON.stringify({
        city: enteredCityName,
        streetAddress: enteredStreetAddress,
        postalCode: enteredPinCode,
        state: enteredState,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.reload();
    }
  }
  return (
    <div className={classes.myAddressComponent}>
      <h2>Your Address</h2>
      <form onSubmit={submitHandler} className={classes.addressGridForm}>
        <div>
          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder={initialAddress.city || "Enter City"}
              ref={cityName}
            />
          </div>
          <div>
            <label htmlFor="pinCode">Pin Code</label>
            <input
              id="pinCode"
              type="text"
              placeholder={initialAddress.postalCode || "Enter Pin Code"}
              ref={pinCode}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              type="text"
              placeholder={initialAddress.streetAddress || "Enter Address"}
              ref={streetAddress}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              placeholder={initialAddress.state || "Enter State"}
              ref={state}
            />
          </div>
        </div>
        <div className={classes.sbmButton}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
