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

    await removeItemFromCart(client, user, product);
    res.status(200).json({
      status: "success",
      message: "Item successfully removed from cart",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    client.close();
  }
}
