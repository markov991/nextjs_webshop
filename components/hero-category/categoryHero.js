import React from "react";
import Link from "next/link";
import Image from "next/image";
import discount from "@/public/discount.jpg";
import classes from "./categoryHero.module.css";

export default function CategoryHero() {
  return (
    <section className={classes.callToActionSection}>
      <Image
        alt="Picture with word DISCOUNT on it."
        src={discount}
        height={400}
      />
      <div className={classes.callToActionBox}>
        <h2>
          <span>Save some money</span>
          <span>Create account</span>
        </h2>
        <div>
          <button>
            <Link href="/register">SIGN UP</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
