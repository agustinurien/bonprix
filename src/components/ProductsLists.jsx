import { useEffect, useState } from "react";

const ProductsLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.sku}
          style={{
            border: "2px solid black",
            padding: "20px",
            backgroundColor: "lightgray",
            marginBottom: "10px",
          }}
        >
          <h2>{product.name}</h2>
          <h3>{product.sku}</h3>

          <div>
            <a href={`/${product.sku}`}>View Details</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLists;
