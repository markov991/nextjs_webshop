import { connectToDatabase, getAllProducts } from "@/lib/db";

export default async function handler(req, res) {
  const x = req.query;
  console.log(x);
  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }

  if (req.method === "GET") {
    const allProducts = await getAllProducts(client, 0);
    res.status(200).json({ products: allProducts });
  }
}
