import { connectToDatabase, getRelatedProducts } from "@/lib/db";

export default async function handler(req, res) {
  const { category, priceFilter, colorFilter } = req.query;
  const convertedPriceFilter = priceFilter.split(",");

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }

  if (req.method === "GET") {
    const relatedProducts = await getRelatedProducts(client, category, {
      colorFilter: colorFilter,
      priceFilter: [+convertedPriceFilter[0], +convertedPriceFilter[1]],
    });
    res.status(200).json({ products: relatedProducts });
  }
  client.close();
}
