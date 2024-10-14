import { connectToDatabase, findFirstImage } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  const { items: wishlistItems } = JSON.parse(req.query.items);

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }

  try {
    const db = client.db();
    const wishlistItemDetails = await Promise.all(
      wishlistItems.map(async (productId) => {
        const product = await db
          .collection("products")
          .findOne({ productId: productId });
        const validImages = await findFirstImage(product.images);

        return { ...product, images: validImages };
      })
    );
    res.status(200).json({ productDetails: wishlistItemDetails });
  } catch (error) {
  } finally {
    client.close();
  }
}