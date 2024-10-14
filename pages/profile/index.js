import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/lib/db";
import logout from "@/public/logout.svg";
import bcClasses from "@/components/categoryBredCrumbs/categoryBredCrumbs.module.css";
import classes from "./index.module.css";
import { getSession, signOut } from "next-auth/react";
import SideNavigation from "@/components/profilePageComponents/sideNavigation/sideNavigation";
import PersonalInfo from "@/components/profilePageComponents/selectedInfo/personalInfo";
import MyOrders from "@/components/profilePageComponents/myOrders/myOrders";
import OrderDetails from "@/components/profilePageComponents/myOrders/orderDetails";
import MyAddress from "@/components/profilePageComponents/myAddress/myAddress";
import MyWishlist from "@/components/profilePageComponents/myWishlist/myWishlist";

function BreadCrumb() {
  return (
    <div className={bcClasses.bredCrumbs}>
      <Link href="/">
        <span>Home</span>
      </Link>
      <span>&gt;</span>
      <span>User profile</span>
    </div>
  );
}

export default function profilePage(props) {
  const [activeNavigation, setActiveNavigation] = useState("PERSONAL_INFO");
  const [orderDetailsShow, setOrderDetailsShow] = useState(false);
  const [orderDetailsInfo, setOrderDetailsInfo] = useState({});

  function logoutHandler() {
    signOut();
  }
  const heading =
    activeNavigation === "PERSONAL_INFO"
      ? "Personal information"
      : activeNavigation === "ORDERS"
      ? "My Orders"
      : activeNavigation === "WISHLIST"
      ? "My Wishlist"
      : activeNavigation === "REVIEWS"
      ? "My Reviews"
      : activeNavigation === "ADDRESS"
      ? "My Address"
      : "";
  const navigationDisplayHandler = (value) => {
    setOrderDetailsShow(false);
    setActiveNavigation(value);
  };
  const handleOrderSelect = (value) => {
    setOrderDetailsInfo(value);
    setOrderDetailsShow(true);
  };
  return (
    <div className={classes.profilePageContainer}>
      <BreadCrumb />
      <div className={classes.nameAndLogoutBtn}>
        <h1>{heading}</h1>
        <div>
          <button onClick={logoutHandler}>
            <span>
              <Image alt="Logout button icon" src={logout} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className={classes.selectionAndInfoGrid}>
        <SideNavigation changeNavigation={navigationDisplayHandler} />
        <div>
          {activeNavigation === "PERSONAL_INFO" && (
            <PersonalInfo initialData={props.userInfoData} />
          )}
          {activeNavigation === "ORDERS" && !orderDetailsShow && (
            <MyOrders
              ordersData={props.userInfoData.orders}
              onOrderSelect={handleOrderSelect}
            />
          )}
          {activeNavigation === "ORDERS" && orderDetailsShow && (
            <OrderDetails
              onClick={() => setOrderDetailsShow(false)}
              orderInfo={orderDetailsInfo}
            />
          )}
          {activeNavigation === "ADDRESS" && (
            <MyAddress initialAddress={props.userInfoData.address} />
          )}
          {activeNavigation === "WISHLIST" && (
            <MyWishlist session={props.session} />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const client = await connectToDatabase();
  const db = client.db().collection("usersDb");

  const userInfo = await db.findOne({ email: session.user.email });
  const { _id, ...userInfoData } = userInfo;
  client.close();

  return {
    props: { session, userInfoData },
  };
}
