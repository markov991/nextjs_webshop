import { connectToDatabase, getAllFilters } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }
  let client;

  try {
    client = await connectToDatabase();

    const document = await getAllFilters(client);

    res.status(200).json({ filters: document });
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!!" });
  } finally {
    if (client) {
      client.close();
    }
  }
}
