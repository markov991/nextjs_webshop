import React from "react";
import { connectToDatabase, getProductDetails, getAllPaths } from "@/lib/db";

export default function ProductPage(props) {
  const {
    name,
    category,
    description,
    average_rating,
    brand,
    color,
    images,
    productId,
    selling_price,
    reviews_count,
    availability,
  } = props.productDetails;

  console.log(props);

  return (
    <>
      <div>{name}</div>
    </>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.product[1];
  const client = await connectToDatabase();
  const productDetails = getProductDetails(client, productId);
  const { _id, ...data } = await productDetails;

  return {
    props: {
      productDetails: data,
    },
  };
}

export async function getStaticPaths() {
  const products = await getAllPaths();
  const paths = products.map((product) => {
    return {
      params: {
        product: [product.category, product.productId],
      },
    };
  });

  return {
    paths: paths,

    fallback: true,
  };
}
