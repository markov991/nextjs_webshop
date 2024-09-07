import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { hashPassword, verifyPassword } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  const {
    currPassword,
    newPassword,
    confPassword,
    email: newEmail,
    ...userData
  } = req.body;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  const client = await connectToDatabase();

  const db = client.db();

  if (newPassword) {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    const verify = await verifyPassword(currPassword, user.password);
    if (!verify) {
      client.close();
      res.status(401).json({ message: "Wrong password!" });
    }
    if (verify) {
      if (!(newPassword.trim() === confPassword.trim())) {
        client.close();
        res.status(400).json({ message: "Password do not match!" });
        return;
      }

      const newHushedPassword = await hashPassword(newPassword);
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: { password: newHushedPassword },
        }
      );
    }
  }

  //
  let newData = {};
  for (const key in userData) {
    if (userData[key]) {
      newData = { ...newData, [key]: userData[key] };
    }
  }
  if (Object.keys(newData).length > 0) {
    await db.collection("usersDb").updateOne(
      { email: session.user.email },
      {
        $set: newData,
      }
    );
  }

  if (newEmail) {
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: { email: newEmail },
      }
    );
    await db.collection("usersDb").updateOne(
      { email: session.user.email },
      {
        $set: { email: newEmail },
      }
    );
  }

  client.close();
  res.status(201).json({ message: "Data updated" });
}
