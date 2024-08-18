import React from "react";
import classes from "./selectedInfoStyle.module.css";

export default function PersonalInfo() {
  return (
    <div className={classes.personalInfoContainer}>
      <h2 className={classes.personalInfoHeading}>Personal info</h2>

      <div className={classes.personalInfoFormContainer}>
        <div className={classes.firstAndLastNameContainer}>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input id="firstName" type="text" placeholder="Marko" />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input id="lastName" type="text" placeholder="Veljkovic" />
          </div>
        </div>
        <div className={`${classes.emailContainer} ${classes.mrk}`}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="markov991@gmail.com" />
        </div>
        <div className={classes.mobileNumberContainer}>
          <label htmlFor="phoneNumber">Mobile Number</label>
          <input id="phoneNumber" type="tel" />
        </div>
        <div className={classes.dateOfBirthContainer}>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input id="dateOfBirth" type="date" />
        </div>
      </div>

      <div>
        <h2 className={classes.changePasswordHeading}>Change Password</h2>
        <div className={classes.passwordFormContainer}>
          <div>
            <label htmlFor="currPassword">Current Password</label>
            <input id="currPassword" type="password" />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input id="newPassword" type="password" />
          </div>
          <div>
            <label htmlFor="conPassword">Confirm Password</label>
            <input id="conPassword" type="password" />
          </div>
        </div>
      </div>
      <div className={classes.saveChangesBtn}>
        <button>Save Changes</button>
      </div>
    </div>
  );
}
