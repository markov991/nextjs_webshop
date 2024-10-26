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
        let client;

        try {
          client = await connectToDatabase();

          const usersCollection = client.db().collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("No user found");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Could no log you in!");
          }

          return { email: user.email };
        } finally {
          if (client) {
            client.close();
          }
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
