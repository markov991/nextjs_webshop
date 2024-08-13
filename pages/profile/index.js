import React from "react";
import { getSession, signOut } from "next-auth/react";

export default function profilePage(props) {
  function logoutHandler() {
    signOut();
  }
  return (
    <div>
      <h1>This is profile page</h1>
      <button onClick={logoutHandler}>Sign out</button>
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
  console.log("This is Session", session);
  return {
    props: { session },
  };
}
