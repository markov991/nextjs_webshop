import Image from "next/image";
import discount from "@/public/discount.jpg";
import classes from "./index.module.css";
import FilterAndProductsSection from "@/components/filterAndProducts/filterAndProductsSection";

import Link from "next/link";

export default function CategoriesPage() {
  return (
    <main className={classes.categoriesSection}>
      {/* Eventually put it in separate component */}
      <section className={classes.callToActionSection}>
        <Image src={discount} height={400} />
        <div className={classes.callToActionBox}>
          <h2>
            <span>Save some money</span>
            <span>Create account</span>
          </h2>
          <div>
            <button>
              <Link href="/auth">SIGN UP</Link>
            </button>
          </div>
        </div>
      </section>
      {/* AS MENTIONED ABOVE */}
      <div className={classes.bredCrumbs}>
        <span>
          <Link href="/">Home</Link>
        </span>
        <span>&gt;</span>
        <span>All</span>
      </div>
      <h1>All categories</h1>
      <FilterAndProductsSection />
    </main>
  );
}
