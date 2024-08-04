import React from "react";
import Link from "next/link";
import classes from "./index.module.css";

export default function RegisterPage() {
  return (
    <div className={classes.registerPageContainer}>
      <div className={classes.twoGridCenter}>
        <div className={classes.logInSection}>
          <h3>Welcome back</h3>
          <div>
            <Link href="/login">Sign in</Link>
          </div>
        </div>
        <form className={classes.formContainer}>
          <h3>Register</h3>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              required
              id="firstName"
              type="text"
              placeholder="First name"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input required id="lastName" type="text" placeholder="Last name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input required type="email" id="email" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
