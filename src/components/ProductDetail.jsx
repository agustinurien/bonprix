import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

const ProductDetail = ({ sku }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${sku}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [sku]);

  return (
    <>
      {!product ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <h2>Product Detail</h2>
            <p>SKU: {product.sku}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
          </div>
          <div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
