import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (!req.method === "PATCH") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed!!" });
  }

  const { city, streetAddress, postalCode, state } = req.body;

  console.log(req.body);

  if (
    !city.trim() &&
    !streetAddress.trim() &&
    !postalCode.trim() &&
    !state.trim()
  ) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Not authenticated!" });
  }
  const client = await connectToDatabase();

  const db = client.db();

  const user = await db
    .collection("usersDb")
    .findOne({ email: session.user.email });
  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found!" });
  }

  const updatedAddress = {
    ...user.address,
    ...(city && { city }),
    ...(streetAddress && { streetAddress }),
    ...(postalCode && { postalCode }),
    ...(state && { state }),
  };

  await db.collection("usersDb").updateOne(
    { email: session.user.email },
    {
      $set: { address: updatedAddress },
    }
  );

  client.close();
  res.status(201).json({ message: "Address updated" });
}
