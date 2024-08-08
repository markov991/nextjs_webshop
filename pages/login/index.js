import React, { useRef } from "react";
import classes from "./index.module.css";
import Link from "next/link";

export default function Index() {
  const refEmail = useRef();
  const refPassword = useRef();

  const logInHandler = (e) => {
    e.preventDefault();

    const enteredEmail = refEmail.current.value;
    const enteredPassword = refPassword.current.value;
  };
  return (
    <div className={classes.logInContainer}>
      <div className={classes.twoGridCenter}>
        <div className={classes.registerSection}>
          <h3>New here</h3>
          <div>
            <Link href="/register">Register</Link>
          </div>
        </div>
        <form className={classes.formContainer} onSubmit={logInHandler}>
          <h3>Welcome back</h3>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              ref={refEmail}
              id="email"
              required
              placeholder="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              ref={refPassword}
              id="password"
              required
              placeholder="password"
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
