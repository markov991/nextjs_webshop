import { connectToDatabase, getCartItems, getUsersCart } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const { user, cart } = req.query;

  let client;
  try {
    client = await connectToDatabase();
    let usersCart;
    if (user) {
      usersCart = await getUsersCart(client, user);
    }
    if (!user) {
      const parsedCart = JSON.parse(cart);
      usersCart = {
        ...parsedCart,
        items: await getCartItems(client, parsedCart.items),
      };
    }

    return res.status(200).json({ cart: usersCart });
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  } finally {
    client.close();
  }
}
