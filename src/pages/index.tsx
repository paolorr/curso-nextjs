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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    },
  }
}
