import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sjrt4kv.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`
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

export async function getAllFilters(client) {
  const db = client.db();
  const products = await db.collection("products").find().toArray();
  // const filters = {
  //   colors: [],
  //   min_price: null,
  //   max_price: null,
  //   other_categories: [],
  // };
  const colors = [];
  const pricesArray = [];

  products.map((product) => {
    pricesArray.push(product.selling_price);
    if (!colors.includes(product.color)) {
      colors.push(product.color);
    }
  });

  console.log(colors);

  return {
    colors: colors,
    min_Price: Math.max(...pricesArray),
    max_price: Math.min(...pricesArray),
  };
}
