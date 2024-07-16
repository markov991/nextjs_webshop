import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductPage() {
  const router = useRouter();

  const productName = router.query.product;
  const [productDetails, setProductDetails] = useState({});
  console.log(productName);
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
  }, [productDetails]);

  if (!productName) {
    return <div>LOADING</div>;
  }
  if (productName) {
    return (
      <>
        <div>This is product {productName[1]} </div>
        <div>{productDetails.name}</div>
      </>
    );
  }
}
