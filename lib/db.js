import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://markov991:bga57ZMmrVS7HYuZ@cluster0.sjrt4kv.mongodb.net/storeDb?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}

export async function getRandomProducts(client) {
  const db = client.db();
  const products = await db
    .collection("products")
    .aggregate([{ $sample: { size: 4 } }])
    .toArray();
  console.log("this is some collection", db.collection());

  return products;
}
