import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({ searchInput }) {
  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/listings")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);

  function handleDelete(id) {
    const filteredProducts = products.filter((product) => {
      return product.id !== id;
    });

    setProducts(filteredProducts);
  }

  const filteredSearchProducts = products.filter((product) => {
    
    return product.description
      .includes(searchInput);
  });

  const productsToDisplay = filteredSearchProducts.map((product) => {
    
    return (

      <ListingCard
        key={product.description}
        product={product}
        handleDelete={handleDelete}
      />

    );
  });
  return (

    <main>
      <ul className="cards">{productsToDisplay}</ul>
    </main>
  );
}

export default ListingsContainer;