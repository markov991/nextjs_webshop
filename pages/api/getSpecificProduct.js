import { connectToDatabase, getProductDetails } from "@/lib/db";

export default async function handler(req, res) {
  const { productId } = req.query;
  console.log("this is id from api get sp:", productId);

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }

  if (req.method === "GET") {
    const product = await getProductDetails(client, productId);
    res.status(200).json({ product: product });
    console.log(product);
  }
  client.close();
}
