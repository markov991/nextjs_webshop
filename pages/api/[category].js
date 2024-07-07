import { connectToDatabase, getProductsFromCategory } from "@/lib/db";

export default async function handler(req, res) {
  const { category } = req.query;
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
    const allProducts = await getProductsFromCategory(client, page, category, {
      colorFilter: colorFilter,
      priceFilter: [+convertedPriceFilter[0], +convertedPriceFilter[1]],
    });
    res.status(200).json({ products: allProducts });
  }
  client.close();
}
