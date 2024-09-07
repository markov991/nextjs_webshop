import React, { useRef } from "react";
import { signOut } from "next-auth/react";
import classes from "./selectedInfoStyle.module.css";

export default function PersonalInfo({ initialData }) {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const dateOfBirth = useRef();
  const currPassword = useRef();
  const newPassword = useRef();
  const confirmedNewPassword = useRef();

  async function handleProfileChanges() {
    const enteredFirstName = firstName.current.value;
    const enteredLastName = lastName.current.value;
    const enteredEmail = email.current.value;
    const enteredPhoneNumber = phoneNumber.current.value;
    const enteredDateOfBirth = dateOfBirth.current.value;
    const enteredCurrPassword = currPassword.current.value;
    const enteredNewPassword = newPassword.current.value;
    const enteredConfirmedNewPassword = confirmedNewPassword.current.value;

    const response = await fetch("api/changeUserData", {
      method: "PATCH",
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        phoneNumber: enteredPhoneNumber,
        dateOfBirth: enteredDateOfBirth,
        currPassword: enteredCurrPassword,
        newPassword: enteredNewPassword,
        confPassword: enteredConfirmedNewPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      if (enteredEmail) {
        signOut();
      } else {
        window.location.reload();
      }
    }
  }
  return (
    <div className={classes.personalInfoContainer}>
      <h2 className={classes.personalInfoHeading}>Personal info</h2>

      <div className={classes.personalInfoFormContainer}>
        <div className={classes.firstAndLastNameContainer}>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              ref={firstName}
              id="firstName"
              type="text"
              placeholder={initialData.firstName || "First name"}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              ref={lastName}
              id="lastName"
              type="text"
              placeholder={initialData.lastName || "Last name"}
            />
          </div>
        </div>
        <div className={`${classes.emailContainer} ${classes.mrk}`}>
          <label htmlFor="email">Email:</label>
          <input
            ref={email}
            id="email"
            type="email"
            placeholder={initialData.email}
          />
        </div>
        <div className={classes.mobileNumberContainer}>
          <label htmlFor="phoneNumber">Mobile Number</label>
          <input
            ref={phoneNumber}
            id="phoneNumber"
            type="tel"
            placeholder={
              initialData.phoneNumber || "Please enter your phone number"
            }
          />
        </div>
        <div className={classes.dateOfBirthContainer}>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            ref={dateOfBirth}
            id="dateOfBirth"
            type="date"
            /////////---------MOZDA DA SE UBACI ONCHANGE I DA SE STAVI STATE OVDE -----------//////////////
            defaultValue={initialData.dateOfBirth || null}
          />
        </div>
      </div>

      <div>
        <h2 className={classes.changePasswordHeading}>Change Password</h2>
        <div className={classes.passwordFormContainer}>
          <div>
            <label htmlFor="currPassword">Current Password</label>
            <input ref={currPassword} id="currPassword" type="password" />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input ref={newPassword} id="newPassword" type="password" />
          </div>
          <div>
            <label htmlFor="conPassword">Confirm Password</label>
            <input
              ref={confirmedNewPassword}
              id="conPassword"
              type="password"
            />
          </div>
        </div>
      </div>
      <div className={classes.saveChangesBtn}>
        <button onClick={handleProfileChanges}>Save Changes</button>
      </div>
    </div>
  );
}
