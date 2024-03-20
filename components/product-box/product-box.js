import { useState, useEffect } from "react";

import Image from "next/image";
import React from "react";
import wishlist from "@/public/wishlist.svg";
import classes from "./product-box.module.css";
const DUMMY_PRODUCT = {
  availability: "InStock",
  average_rating: 4.6,
  brand: "adidas",
  breadcrumbs: "Kids/Shoes",
  category: "Shoes",
  color: "White",
  country: "USA",
  description:
    "Prototype after prototype. Innovation after innovation. Testing after testing. Meet us in the hot pursuit of the pinnacle harmonization of weight, cushioning, and responsiveness. Ultraboost 21. Say hello to incredible energy return.",
  images:
    "https://assets.adidas.com/images/w_600,f_auto,q_auto/fe2812af605a4015902fac7c01378cc6_9366/Ultraboost_21_Shoes_White_FZ2929_01_standard.jpg",
  index: 203,
  name: "Ultraboost 21 Shoes",
  productId: "FZ2929",
  reviews_count: 241,
  selling_price: 128,
  _id: "65f717ebdf1fdac1ea3eae62",
};

export default function ProductBox({ product }) {
  const [imageLocation, setImageLocation] = useState("");

  useEffect(() => {
    const productImage = product.images.split("~")[0];
    setImageLocation(productImage);
  }, []);

  return (
    <div className={classes.productBox_Container}>
      <div className={classes.product_Image_Container}>
        <Image
          width={300}
          height={300}
          alt={DUMMY_PRODUCT.name}
          src={imageLocation}
        />
      </div>
      <div className={classes.productName}>
        <h2>{product.name}</h2>
        <Image alt="wishlist icon" src={wishlist} />
      </div>
      <p className={classes.productPrice}>${product.selling_price}</p>
    </div>
  );
}
