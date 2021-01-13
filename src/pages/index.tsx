// import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { Title } from '@/styles/pages/Home';
import React from 'react';
import SEO from '@/components/SEO';

interface Product {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: Product[];
}


export default function Home({ recommendedProducts }: HomeProps) {
  // // client side fetching
  // const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then(res => {
  //     res.json().then(data => { setRecommendedProducts(data) })
  //   })
  // }, []);

  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL);


    // dynamic import
    const { sum } = (await import('@/lib/math')).default
    alert(sum(3, 5));
  }

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="boost.png"
        shouldExcludeTitleSuffix />

      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(recommendedProduct =>
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          )}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  )
}

// server side fetching
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    },
  }
}
