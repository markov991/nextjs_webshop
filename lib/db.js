import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sjrt4kv.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`
  );

  return client;
}

export async function getRandomProducts(client) {
  const db = client.db();
  // const featuredProducts = [];
  const products = await db
    .collection("products")
    .aggregate([{ $sample: { size: 4 } }])
    .toArray();
  const featuredProducts = await products.map((product) => {
    return { ...product, images: product.images.split("~") };
  });

  const checkImages = async () => {
    const results = await Promise.all(
      featuredProducts[0].images.map(async (url) => {
        try {
          const response = await fetch(url, {
            method: "HEAD",
          });
          const contentType = response.headers.get("content-type");
          const contentLength = response.headers.get("content-length");

          if (contentType.startsWith("image/") && contentLength != 0) {
            return url;
          }
        } catch (error) {
          console.error(`Error checking URL ${url} `, error);
          return false;
        }
      })
    );
    console.log(results);
  };

  checkImages();

  console.log("this is some collection", featuredProducts);

  return featuredProducts;
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

  return {
    colors: colors,
    min_price: Math.min(...pricesArray),
    max_price: Math.max(...pricesArray),
  };
}
// this is url: https://assets.adidas.com/images/w_600,f_auto,q_auto/a378437a4a2b401897bcad0b0086cd09_9366/Essentials_Logo_Hoodie_(Gender_Neutral)_Blue_H14656_23_hover_model.jpg This is headers:  HeadersList {
//   cookies: null,
//   [Symbol(headers map)]: Map(19) {
//     'connection' => { name: 'Connection', value: 'close' },
//     'content-length' => { name: 'Content-Length', value: '0' },
//     'content-type' => { name: 'Content-Type', value: 'image/gif' },
//     'content-disposition' => { name: 'Content-Disposition', value: 'inline' },
//     'content-transfer-encoding' => { name: 'Content-Transfer-Encoding', value: 'binary' },
//     'expires' => { name: 'Expires', value: 'Sun, 31 Mar 2024 18:57:44 GMT' },
//     'x-cld-error' => {
//       name: 'X-Cld-Error',
//       value: 'Resource not found - a378437a4a2b401897bcad0b0086cd09_9366'
//     },
//     'x-request-id' => { name: 'X-Request-Id', value: 'a202baae695ac1c12eb1194d95fa02fb' },
//     'date' => { name: 'Date', value: 'Sat, 30 Mar 2024 18:57:44 GMT' },
//     'vary' => { name: 'Vary', value: 'Save-Data' },
//     'strict-transport-security' => { name: 'Strict-Transport-Security', value: 'max-age=604800' },
//     'pragma' => { name: 'Pragma', value: 'no-cache' },
//     'cache-control' => {
//       name: 'Cache-Control',
//       value: 'private, no-transform, max-age=0, no-cache'
//     },
//     'server-timing' => {
//       name: 'Server-Timing',
//       value: 'cld-fastly;dur=304;cpu=1;start=2024-03-30T18:57:44.158Z;desc=miss,rtt;dur=20,cloudinary;dur=193;start=2024-03-30T18:57:44.215Z,cld-id;desc=a202baae695ac1c12eb1194d95fa02fb,cld-error;desc="Resource not found - a378437a4a2b401897bcad0b0086cd09_9366"'
//     },
//     'server' => { name: 'Server', value: 'Cloudinary' },
//     'timing-allow-origin' => { name: 'Timing-Allow-Origin', value: '*' },
//     'access-control-allow-origin' => { name: 'Access-Control-Allow-Origin', value: '*' },
//     'access-control-expose-headers' => {
//       name: 'Access-Control-Expose-Headers',
//       value: 'X-Cld-Error,Content-Length,Content-Disposition,Server-Timing,Vary'
//     },
//     'accept-ranges' => { name: 'Accept-Ranges', value: 'bytes' }
//   },
//   [Symbol(headers map sorted)]: null
// }
