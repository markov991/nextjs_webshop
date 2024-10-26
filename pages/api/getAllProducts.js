import { connectToDatabase, getAllProducts } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  const { page, colorFilter, priceFilter } = req.query;

  const convertedPriceFilter = priceFilter.split(",").map(Number);
  if (convertedPriceFilter.some(isNaN)) {
    return res.status(400).json({ message: "Invalid price filter values" });
  }

  let client;

  try {
    client = await connectToDatabase();

    const allProducts = await getAllProducts(client, page, {
      colorFilter: colorFilter,
      priceFilter: convertedPriceFilter,
    });
    res.status(200).json({ products: allProducts });
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  } finally {
    client.close();
  }
}
