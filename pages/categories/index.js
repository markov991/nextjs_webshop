import { useState, useEffect } from "react";

import classes from "./index.module.css";
import FilterAndProductsSection from "@/components/filterAndProducts/filterAndProductsSection";

import CategoryHero from "@/components/hero-category/categoryHero";
import CategoryBredCrumbs from "@/components/categoryBredCrumbs/categoryBredCrumbs";

export default function CategoriesPage() {
  return (
    <main className={classes.categoriesSection}>
      <CategoryHero />
      <CategoryBredCrumbs />

      <h1>All categories</h1>
      <FilterAndProductsSection />
    </main>
  );
}
