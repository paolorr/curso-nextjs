// import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import Link from 'next/link';
import PrismicDOM from 'prismic-dom';

import { Title } from '@/styles/pages/Home';
import React from 'react';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';

interface HomeProps {
  recommendedProducts: Document[];
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
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    },
  }
}
