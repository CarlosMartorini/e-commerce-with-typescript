import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, ProductList } from "./Styles";
import { useCart } from "../../providers/cart/Cart";
import { Product } from "../../types/Product";


const Home = () => {
  const { setCart, cart } = useCart();

  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadProducts() {
    const response = await api.get("/products/");

    const data = response.data.map((product: Product) => ({
    ...product,
    price: product.price,
  }));

  setLoading(false);
  setProducts(data);
}

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
    {loading ? (
      <CircularProgress size={50} />
    ) : (
      <ProductList>
        {
          products.map((product: Product) => (
            <li key={product.id}>
              <figure>
                <img src={product.img} alt={product.title} />
              </figure>
              <strong>{product.title}</strong>
              <div>
                <span>{product.price}</span>
                  <button
                    type="button"
                    onClick={() => setCart([...cart, product])}
                  >
                  <span>Adicionar ao carrinho</span>
                  </button>
              </div>
            </li>
          ))
        }
        </ProductList>
    )}
    </Container>
  );
}

export default Home;
