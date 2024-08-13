import React, { useRef } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./index.module.css";

async function createUser(firstName, lastName, email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }

  return data;
}

export default function RegisterPage() {
  const router = useRouter();
  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();

  async function handleRegisterAccount(e) {
    e.preventDefault();
    const enteredFirstName = refFirstName.current.value;
    const enteredLastName = refLastName.current.value;
    const enteredEmail = refEmail.current.value;
    const enteredPassword = refPassword.current.value;

    if (
      !enteredFirstName ||
      !enteredLastName ||
      !enteredEmail.includes("@") ||
      enteredPassword.trim().length < 7
    ) {
      alert("Something went wrong");
    } else {
      try {
        const user = await createUser(
          enteredFirstName,
          enteredLastName,
          enteredEmail,
          enteredPassword
        );
        if (user) {
          router.replace("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className={classes.registerPageContainer}>
      <div className={classes.twoGridCenter}>
        <div className={classes.logInSection}>
          <h3>Welcome back</h3>
          <div>
            <Link href="/login">Sign in</Link>
          </div>
        </div>
        <form
          onSubmit={handleRegisterAccount}
          className={classes.formContainer}
        >
          <h3>Register</h3>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              ref={refFirstName}
              required
              id="firstName"
              type="text"
              placeholder="First name"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              ref={refLastName}
              required
              id="lastName"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              ref={refEmail}
              required
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              ref={refPassword}
              required
              type="password"
              id="password"
              placeholder="Password"
              minLength="7"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
