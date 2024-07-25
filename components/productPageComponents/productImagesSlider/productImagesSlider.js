import React, { useState } from "react";
import Image from "next/image";
import classes from "./productImagesSlider.module.css";

export default function ProductImagesSlider({ imagesArray }) {
  const [activeImage, setActiveImage] = useState(0);

  const prevImageHandler = () => {
    if (activeImage === 0) {
      setActiveImage(imagesArray.length - 1);
    } else {
      setActiveImage((prev) => prev - 1);
    }
  };

  const nextImageHandler = () => {
    if (activeImage === imagesArray.length - 1) {
      setActiveImage(0);
    } else {
      setActiveImage((prev) => prev + 1);
    }
  };
  return (
    <div className={classes.imageSliderContainer}>
      <div className={classes.mainImageBox}>
        <Image
          src={imagesArray[activeImage]}
          width={605}
          height={6}
          layout="responsive"
          objectFit="contain"
          alt="Product image"
        />
      </div>
      <div className={classes.selectProductImageBox}>
        <button onClick={prevImageHandler}>
          <span>&lt;</span>
        </button>
        {imagesArray.map((image, index) => {
          return (
            <Image
              onClick={() => {
                setActiveImage(index);
              }}
              src={image}
              width={75}
              height={75}
              alt="Product image"
            />
          );
        })}
        <button onClick={nextImageHandler}>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}
