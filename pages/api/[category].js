import { connectToDatabase, getProductsFromCategory } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  const { category, page, colorFilter, priceFilter } = req.query;

  if (!category || !page || !priceFilter) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters" });
  }

  const convertedPriceFilter = priceFilter.split(",").map(Number);
  if (convertedPriceFilter.some(isNaN)) {
    return res.status(400).json({ message: "Invalid price filter values" });
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }
  try {
    const allProducts = await getProductsFromCategory(client, page, category, {
      colorFilter: colorFilter,
      priceFilter: convertedPriceFilter,
    });
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client && client.close();
  }
}
