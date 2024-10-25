import React, { useEffect, useState } from "react";

import HeroSection from "@/components/hero/hero";

import FeaturedProducts from "@/components/feturedProducts/featuredProducts";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    fetch("/api/gettingRandomProducts")
      .then((response) => response.json())
      .then((data) => {
        setFeaturedProducts(data.products);
        console.log(data.products);
      });
  }, []);
  return (
    <div>
      <HeroSection />

      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
}
