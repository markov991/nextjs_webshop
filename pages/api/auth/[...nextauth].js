import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export const autOptions = {
  secret: "ZtSX5Km1gk",
  session: {
    strategy: "jwt",
  },
  providers: [],
};
