import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from 'react';

// lazy loading of components
const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => <p>Loading ...</p>,
  // disable server side rendering of this component. Used when the component uses functions of the browser, such as document, window, navigator..
  ssr: false
})

export default function Product() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

  function handleAddToCart() {
    setIsAddToCartModalVisible(true)
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <button onClick={handleAddToCart}>Add to cart</button>
      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  )
}