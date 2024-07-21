import React from "react";
import { connectToDatabase, getProductDetails, getAllPaths } from "@/lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductPage(props) {
  const router = useRouter();

  const productName = router.query.product;
  const [productDetails, setProductDetails] = useState({});
  console.log(props);
  useEffect(() => {
    if (productName[1]) {
      fetch(`/api/getSpecificProduct?productId=${productName[1]}`)
        .then((response) => response.json())
        .then((data) => {
          setProductDetails({ ...data.product });
        });
    }
  }, []);

  useEffect(() => {
    console.log(productDetails);
    console.log(props.productDetails);
  }, [productDetails]);

  if (!productName) {
    return <div>LOADING</div>;
  }
  if (productName) {
    return (
      <>
        <div>This is product {productName[1]} </div>
        <div>{props.selling_price}</div>
      </>
    );
  }
}

export async function getStaticProps(context) {
  const productId = context.params.product[1];
  const client = await connectToDatabase();
  const productDetails = await getProductDetails(client, productId);
  const { _id, ...data } = await productDetails;
  console.log("THESE ARE GET STATIC PROPS:", productDetails);
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
