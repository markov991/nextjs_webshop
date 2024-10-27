import React from "react";
import Link from "next/link";
import bcClasses from "@/components/categoryBredCrumbs/categoryBredCrumbs.module.css";
import classes from "./index.module.css";
import { getSession } from "next-auth/react";
import { connectToDatabase, getUsersCart } from "@/lib/db";
import CheckOutMainSection from "@/components/checkoutComponents/checkoutMainSection/checkoutMainSection";

export default function CheckoutPage(props) {
  const { userInfo, cart, session } = props;

  return (
    <>
      <div className={bcClasses.bredCrumbs}>
        <Link href="/">
          <span>Home</span>
        </Link>
        <span>&gt;</span>
        <span>Checkout</span>
      </div>
      <h1 className={classes.heading}>My Cart</h1>

      <CheckOutMainSection
        initialUserInfo={userInfo}
        cartItems={cart}
        session={session}
      />
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: { session },
    };
  }

  let client;
  try {
    client = await connectToDatabase();
    const db = client.db().collection("usersDb");

    const userInfo = await db.findOne({ email: session.user.email });
    const { _id, cart, ...userInfoData } = userInfo;

    const usersCart = await getUsersCart(client, session.user.email);
    const fixedItems = usersCart.items.map(({ _id, ...item }) => item);

    return {
      props: {
        session,
        cart: { ...usersCart, items: fixedItems },
        userInfo: {
          firstName: userInfoData.firstName,
          lastName: userInfoData.lastName,
          phoneNumber: userInfoData.phoneNumber,
          ...userInfoData.address,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: { session, cart: null, userInfo: null },
    };
  } finally {
    client && client.close();
  }
}
