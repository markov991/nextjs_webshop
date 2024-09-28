import { connectToDatabase, removeItemFromCart } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  const { user, product } = req.body;

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }
  try {
    await removeItemFromCart(client, user, product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
  client.close();
  res.status(200).json({
    status: "success",
    message: "Item successfully removed from cart",
  });
}
