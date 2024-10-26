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

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
  }

  const db = client.db();
  try {
    const newAddress = {};

    if (city) newAddress["address.city"] = city;
    if (streetAddress) newAddress["address.streetAddress"] = streetAddress;
    if (postalCode) newAddress["address.postalCode"] = postalCode;
    if (state) newAddress["address.state"] = state;

    await db.collection("usersDb").updateOne(
      { email: session.user.email },
      {
        $set: newAddress,
      }
    );
    res.status(201).json({ message: "Address updated" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  } finally {
    client.close();
  }
}
