import { connectToDatabase, getRandomProducts } from "@/lib/db";
import Head from "next/head";
import HeroSection from "@/components/hero/hero";

import FeaturedProducts from "@/components/feturedProducts/featuredProducts";

export default function HomePage({ featuredProducts }) {
  return (
    <div>
      <Head>
        <title>ADIDAS - All in or nothing</title>
        <meta property="title" content="ADIDAS - All in or nothing" />
        <meta
          name="description"
          content=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            efficitur augue vitae pretium rhoncus."
        />
      </Head>
      <HeroSection />

      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
}

export async function getStaticProps(context) {
  const client = await connectToDatabase();
  const products = await getRandomProducts(client);
  const featuredProducts = products.map(({ _id, ...item }) => item);
  client.close();
  return { props: { featuredProducts } };
}
