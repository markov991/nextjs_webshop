import React from "react";
import Head from "next/head";
import { connectToDatabase, getProductDetails, getAllPaths } from "@/lib/db";
import CategoryBredCrumbs from "@/components/categoryBredCrumbs/categoryBredCrumbs";
import ProductImagesSlider from "@/components/productPageComponents/productImagesSlider/productImagesSlider";
import ProductInfoSection from "@/components/productPageComponents/productInfoSection/productInfoSection";
import ImagesAndNameSection from "@/components/layout/imagesAndNameSection";
import ProductDescriptionSection from "@/components/productDescriptionSection/productDescriptionSection";

export default function ProductPage({ productDetails }) {
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
  } = productDetails;

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta property="title" content={name} />
        <meta property="description" content={description} />
      </Head>
      <CategoryBredCrumbs category={category} productName={name} />
      <main>
        <ImagesAndNameSection>
          <ProductImagesSlider imagesArray={images} />
          <ProductInfoSection
            productId={productId}
            name={name}
            avg_rating={average_rating}
            rating_count={reviews_count}
            price={selling_price}
          />
        </ImagesAndNameSection>
        <ProductDescriptionSection
          price={selling_price}
          color={color}
          category={category}
          description={description}
          productId={productId}
        />
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.product[1];
  const client = await connectToDatabase();
  const productDetails = getProductDetails(client, productId);
  const { _id, ...data } = await productDetails;
  client.close();

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

    fallback: false,
  };
}
