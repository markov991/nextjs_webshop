import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { firstName, lastName, email, password } = data;

  if (
    !firstName ||
    !lastName ||
    !email.includes("@") ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input- password should also be at least 7 characters long!!",
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists!!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });
  const user = await db.collection("usersDb").insertOne({
    email: email,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: null,
    phoneNumber: null,
    address: {
      state: null,
      city: null,
      streetAddress: null,
      postalCode: null,
    },
    orders: {
      completed: [],
      cancelled: [],
      processing: [],
    },
    wishlist: [],
    reviews: [],
  });
  res.status(201).json({ message: "Created user" });
  client.close();
}
