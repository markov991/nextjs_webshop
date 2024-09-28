import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const { user, productId, quantity } = req.body;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
  }

  const db = client.db();

  try {
    const updateItems = await db
      .collection("usersDb")
      .updateOne(
        { email: user, "cart.items.productId": productId },
        { $inc: { "cart.items.$.quantity": quantity } }
      );

    if (updateItems.modifiedCount === 0) {
      const addingItems = await db.collection("usersDb").updateOne(
        { email: user },
        {
          $push: { "cart.items": { productId, quantity } },
        }
      );
      if (addingItems.modifiedCount === 0) {
        throw new Error("Failed to add new product to the cart");
      }
    }
    res.status(200).json({ message: "Item added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  } finally {
    if (client) {
      
      client.close();
    }
  }
}
