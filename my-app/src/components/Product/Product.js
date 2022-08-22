import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSelectedProduct } from "../../requests/getProducts";
import Button from "../Button/Button";
import styles from "./Product.module.css";

const requestUrl = "https://api.escuelajs.co/api/v1/products/";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  useEffect(() => {
    getSelectedProduct(requestUrl, id).then((result) => setProduct(result));
  }, [id]);

  return (
    <>
      <section className='product'>
        <div className={styles.productContainer}>
          <h2 className={styles.productTitle}>
            Здесь представлено подробное описание товара
          </h2>
          <Button handler={goBack}>GoBack</Button>
          <div className={styles.productBox}>
            <div className={styles.productImage}>
              <img src={product.images} alt={product.title} />
            </div>
            <div className={styles.productDescr}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span>{product.price}</span>
              <Button>Добавить в корзину</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;