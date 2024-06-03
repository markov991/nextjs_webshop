import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sjrt4kv.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`
  );

  return client;
}

export async function checkImages(imageArray) {
  const images = imageArray.split("~");
  const results = await Promise.all(
    images.map(async (url) => {
      try {
        const response = await fetch(url, {
          method: "HEAD",
        });
        const contentType = response.headers.get("content-type");
        const contentLength = response.headers.get("content-length");

        if (contentType.startsWith("image/") && contentLength != 0) {
          return url;
        } else {
          return null;
        }
      } catch (error) {
        // console.error(`Error checking URL ${url} `, error);
        return null;
      }
    })
  );
  const filteredImages = results.filter((imageUrl) => imageUrl !== null);

  return filteredImages;
}

export async function getRandomProducts(client) {
  const db = client.db();

  const products = await db
    .collection("products")
    .aggregate([{ $sample: { size: 4 } }])
    .toArray();

  const featuredProducts = await Promise.all(
    products.map(async (product) => {
      const validImages = await checkImages(product.images);

      return { ...product, images: validImages };
    })
  );

  return featuredProducts;
}

export async function getAllProducts(client, n, category) {
  const db = client.db();
  console.log(category);
  // let products;

  // if (!category) {
  //   products = await db
  //     .collection("products")
  //     .find({})
  //     .skip(15 + 15 * n)
  //     .limit(15)
  //     .toArray();
  // } else {
  // products = await db
  //   .collection("products")
  //   .find({ category: category })
  //   .skip(15 + 15 * n)
  //   .limit(15)
  //   .toArray();
  // }
  const products = await db
    .collection("products")
    // .find({ category: category, $or: [{ color: "Purple" }, { color: "Blue" }] })
    .find({ category: category, color: { $in: ["Purple", "Blue"] } })
    .skip(15 * n)
    .limit(15)
    .toArray();

  const allProducts = await Promise.all(
    products.map(async (product) => {
      const validImages = await checkImages(product.images);

      return { ...product, images: validImages };
    })
  );

  // const allProducts = products.map((product) => {
  //   const { _id, images, ...rest } = product;

  //   const validImages = product.images.split("~");
  //   return { ...rest, images: validImages };
  // });

  return allProducts;
}

export async function getAllFilters(client) {
  const db = client.db();
  const products = await db.collection("products").find().toArray();

  const colors = [];
  const pricesArray = [];

  products.map((product) => {
    pricesArray.push(product.selling_price);
    if (!colors.includes(product.color)) {
      colors.push(product.color);
    }
  });

  return {
    colors: colors,
    min_price: Math.min(...pricesArray),
    max_price: Math.max(...pricesArray),
  };
}
