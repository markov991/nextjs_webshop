import React from "react";
import classes from "./wishlistModal.module.css";
import LoadingSpinner from "../UI/loadingSpinner";
import Image from "next/image";
import Link from "next/link";

export default function WishlistModal({
  wishlistItems,
  loading,
  onCloseModal,
  passingItemToBeRemovedFromWishlist,
}) {
  return (
    <div className={classes.modalContainer}>
      <div className={classes.wishlistContainer}>
        <button onClick={onCloseModal} className={classes.returnBtn}>
          <div>
            <span>&larr;</span>
            <span>Back</span>
          </div>
        </button>
        <div className={classes.itemsContainer}>
          {(!wishlistItems || loading) && <LoadingSpinner />}
          {wishlistItems &&
            !loading &&
            wishlistItems.map((item) => (
              <div key={item.productId} className={classes.itemDetails}>
                <Image
                  width={75}
                  height={80}
                  alt={item.name}
                  src={item.images}
                />
                <Link href={`/categories/${item.category}/${item.productId}`}>
                  <h3>{item.name}</h3>
                </Link>
                <button
                  onClick={() =>
                    passingItemToBeRemovedFromWishlist(item.productId)
                  }
                >
                  X
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
