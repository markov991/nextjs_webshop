import React from "react";

import classes from "./hero.module.css";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className={classes.heroSection}>
      <div className={classes.heroSectionOverlay}>
        <div className={classes.heroContent}>
          <h1>All in or nothing</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            efficitur augue vitae pretium rhoncus.
          </p>
          <div>
            <button>
              <Link href="/categories">&rarr; See more</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
