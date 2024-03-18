import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://markov991:bga57ZMmrVS7HYuZ@cluster0.sjrt4kv.mongodb.net/storeDb?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}
