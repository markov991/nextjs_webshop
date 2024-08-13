import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export const authOptions = {
  secret: "ZtSX5Km1gk",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 6, //6 hours season duration
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could no log you in!");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
