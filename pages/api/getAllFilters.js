import { connectToDatabase, getAllFilters } from "@/lib/db";

export default async function handler(req, res) {
  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!!" });
    return;
  }
  // console.log(client.db());

  if (req.method === "GET") {
    const document = await getAllFilters(client);
    console.log(document);
    res.status(200).json({ filters: document });
  }
}
