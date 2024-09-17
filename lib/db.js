import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sjrt4kv.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`
  );

  return client;
}

export async function getAllPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const products = await db.collection("products").find().toArray();
  return products;
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

export async function findFirstImage(imagesArray) {
  const images = imagesArray.split("~");

  async function name(images) {
    for (let i = 0; i < images.length - 1; i++) {
      const response = await fetch(images[i], {
        method: "HEAD",
      });
      const contentType = response.headers.get("content-type");
      const contentLength = response.headers.get("content-length");
      if (contentType.startsWith("image/") && contentLength != 0) {
        return images[i];
      }
    }
  }

  return await name(images);
}
export async function getRandomProducts(client) {
  const db = client.db();

  const products = await db
    .collection("products")
    .aggregate([{ $sample: { size: 4 } }])
    .toArray();

  const featuredProducts = await Promise.all(
    products.map(async (product) => {
      const validImage = await findFirstImage(product.images);

      return { ...product, images: validImage };
    })
  );

  return featuredProducts;
}

export async function getAllProducts(client, n = 0, filters) {
  const db = client.db();
  const { colorFilter, priceFilter } = filters;

  let products;

  if (colorFilter) {
    products = await db
      .collection("products")

      .find({
        color: { $in: colorFilter.split(",") },
        selling_price: { $gte: priceFilter[0], $lte: priceFilter[1] },
      })
      .skip(15 * n)
      .limit(15)
      .toArray();
  }
  if (!colorFilter) {
    products = await db
      .collection("products")
      .find({ selling_price: { $gte: priceFilter[0], $lte: priceFilter[1] } })
      .skip(15 * n)
      .limit(15)
      .toArray();
  }

  const allProducts = await Promise.all(
    products.map(async (product) => {
      const validImages = await findFirstImage(product.images);

      return { ...product, images: validImages };
    })
  );

  return allProducts;
}

export async function getRelatedProducts(client, category, filters) {
  const db = client.db();
  const { colorFilter, priceFilter } = filters;

  const products = await db
    .collection("products")
    .find({
      category: category,
      color: colorFilter,
      selling_price: { $gte: priceFilter[0], $lte: priceFilter[1] },
    })
    .skip(4)
    .limit(4)
    .toArray();

  const allProducts = await Promise.all(
    products.map(async (product) => {
      const validImages = await findFirstImage(product.images);

      return { ...product, images: validImages };
    })
  );

  return allProducts;
}

export async function getProductsFromCategory(
  client,
  n = 0,
  category,
  filters
) {
  const db = client.db();
  const { colorFilter, priceFilter } = filters;

  let products;
  if (colorFilter) {
    products = await db
      .collection("products")
      .find({
        category: category,
        color: { $in: colorFilter.split(",") },
        selling_price: { $gte: priceFilter[0], $lte: priceFilter[1] },
      })
      .skip(15 * n)
      .limit(15)
      .toArray();
  }
  if (!colorFilter) {
    products = await db
      .collection("products")
      .find({
        category: category,
        selling_price: { $gte: priceFilter[0], $lte: priceFilter[1] },
      })
      .skip(15 * n)
      .limit(15)
      .toArray();
  }

  const allProducts = await Promise.all(
    products.map(async (product) => {
      const validImages = await findFirstImage(product.images);

      return { ...product, images: validImages };
    })
  );

  return allProducts;
}
export async function getProductDetails(client, productId) {
  const db = client.db();
  const product = await db
    .collection("products")
    .findOne({ productId: productId });
  const validImages = await checkImages(product.images);

  return { ...product, images: validImages };
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
