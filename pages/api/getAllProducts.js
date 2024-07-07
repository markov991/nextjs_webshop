import { connectToDatabase, getAllProducts } from "@/lib/db";

export default async function handler(req, res) {
  const { page } = req.query;
  const { colorFilter, priceFilter } = req.query;
  const convertedPriceFilter = priceFilter.split(",");

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }

  if (req.method === "GET") {
    const allProducts = await getAllProducts(client, page, {
      colorFilter: colorFilter,
      priceFilter: [+convertedPriceFilter[0], +convertedPriceFilter[1]],
    });
    res.status(200).json({ products: allProducts });
  }
  client.close();
}
