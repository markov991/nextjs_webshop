import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  const { user } = req.query;

  let client;

  try {
    client = await connectToDatabase();

    if (req.method === "GET") {
      const { wishlist } = await client
        .db()
        .collection("usersDb")
        .findOne({ email: user });

      res.status(200).json({ data: wishlist });
    }
    if (req.method === "PATCH") {
      const { itemsToAdd, itemToDelete } = req.body;

      if (itemsToAdd) {
        await client
          .db()
          .collection("usersDb")
          .updateOne(
            { email: user },
            { $addToSet: { wishlist: { $each: itemsToAdd } } }
          );
      }
      if (itemToDelete) {
        await client
          .db()
          .collection("usersDb")
          .updateOne(
            { email: user },
            { $pull: { wishlist: { $in: itemToDelete } } }
          );
      }
      res.status(200).json({ message: "Update successfully" });
    }
  } catch (error) {
    console.error("Order processing error:", error);
    res.status(500).json({ status: "error", message: error.message });
  } finally {
    client.close();
  }
}
