import { useState, useEffect } from "react";
import classes from "./productsSection.module.css";
import ProductItem from "./productItem";
import { useSession } from "next-auth/react";

export default function ProductsSection({ products }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toggleProductSortOptions, setToggleProductSortOptions] =
    useState(false);
  const [productSortValue, setProductSortValue] = useState("Default");
  const [productSortAscending, setProductSortAscending] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  useEffect(() => {
    async function handlingWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));

      if (session) {
        const wishlistDb = await fetch(
          `/api/wishlistHandler?user=${session.user.email}`
        );
        const responseWishlistDb = await wishlistDb.json();

        setWishlist([
          ...new Set([...wishlist.items, ...responseWishlistDb.data]),
        ]);
        localStorage.setItem(
          "wishlist",
          JSON.stringify({
            items: [
              ...new Set([...wishlist.items, ...responseWishlistDb.data]),
            ],
          })
        );
        //comparing and merging

        if (
          responseWishlistDb.data.length !==
          [...new Set([...wishlist.items, ...responseWishlistDb.data])].length
        ) {
          const updatingWishlist = await fetch(
            `/api/wishlistHandler?user=${session.user.email}`,
            {
              method: "PATCH",
              body: JSON.stringify({ itemsToAdd: wishlist.items }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!updatingWishlist.ok) {
            alert("Something went wrong!");
          }
        }
      }
      if (!session) {
        if (!wishlist) {
          localStorage.setItem(
            "wishlist",
            JSON.stringify({
              items: [],
            })
          );
        }

        setWishlist(wishlist.items);
      }
    }
    handlingWishlist();
  }, [session]);

  useEffect(() => {
    if (productSortValue === "Name") {
      const sortedProducts = [...displayedProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setDisplayedProducts(
        productSortAscending ? sortedProducts : sortedProducts.reverse()
      );
    }
    if (productSortValue === "Price") {
      const sortedProducts = [...displayedProducts].sort(
        (a, b) => a.selling_price - b.selling_price
      );
      setDisplayedProducts(
        productSortAscending ? sortedProducts : sortedProducts.reverse()
      );
    }
    if (productSortValue === "Rating") {
      const sortedProducts = [...displayedProducts].sort(
        (a, b) => a.average_rating - b.average_rating
      );
      setDisplayedProducts(
        productSortAscending ? sortedProducts : sortedProducts.reverse()
      );
    }
    if (productSortValue === "Default") {
      setDisplayedProducts(products);
    }
  }, [productSortValue, productSortAscending]);

  return (
    <div className={classes.productsSection}>
      <div className={classes.productsSortOptionsBox}>
        <span>Sort By</span>
        <div className={classes.sortOptionsBox}>
          <button
            onClick={() => {
              setToggleProductSortOptions(!toggleProductSortOptions);
            }}
            className={classes.activeSortValue}
          >
            <span>{productSortValue}</span>
            <span>&dArr;</span>
          </button>

          {toggleProductSortOptions && (
            <div className={classes.sortOptions}>
              <button
                onClick={() => {
                  setProductSortValue("Name");
                  setToggleProductSortOptions(false);
                }}
              >
                Name
              </button>
              <button
                onClick={() => {
                  setProductSortValue(`Price`);
                  setToggleProductSortOptions(false);
                }}
              >
                Price
              </button>

              <button
                onClick={() => {
                  setProductSortValue("Rating");
                  setToggleProductSortOptions(false);
                }}
              >
                Rating
              </button>
              <button
                onClick={() => {
                  setProductSortValue("Default");
                  setToggleProductSortOptions(false);
                }}
              >
                Default
              </button>
            </div>
          )}
        </div>
        <button
          className={classes.ascToggleBtn}
          onClick={() => {
            setProductSortAscending(!productSortAscending);
          }}
        >
          {productSortAscending ? <>&darr;</> : <>&uarr;</>}{" "}
        </button>
      </div>
      <div className={classes.productListSection}>
        {displayedProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            itemOnWishlist={wishlist.includes(product.productId)}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
