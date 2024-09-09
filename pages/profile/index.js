import React from "react";
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
  function logoutHandler() {
    signOut();
  }
  return (
    <div className={classes.profilePageContainer}>
      <BreadCrumb />
      <div className={classes.nameAndLogoutBtn}>
        <h1>Personal information</h1>
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
        <SideNavigation />
        <div>
          <MyOrders />
          {/* <PersonalInfo initialData={props.userInfoData} /> */}
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
