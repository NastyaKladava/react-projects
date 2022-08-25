import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSelectedProduct } from "../../requests/getProducts";
import Button from "../Button/Button";
import { LoginContext } from "../../hoc/LoginProvider";
import styles from "./Product.module.css";

const requestUrl = "https://fakestoreapi.com/products/";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [prodInputQuantity, setProdInputQuantity] = useState(0);
  const { isLoggedIn, setSum, setQuantity } = useContext(LoginContext);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const addToCart = (e) => {
    let price = Number(parseInt(e.target.previousSibling.innerText));
    if (prodInputQuantity > 0) {
      setQuantity((prevState) => +prevState + +prodInputQuantity);
    }
    setSum((prevState) => prevState + price * prodInputQuantity);
  };

  useEffect(() => {
    getSelectedProduct(requestUrl, id, setProduct);
  }, [id]);

  return (
    <>
      <section className='product'>
        <div className={styles.productContainer}>
          <div className={styles.productTop}>
            <Button handler={goBack} className={styles.btn}>
              Назад
            </Button>
            <h2 className={styles.productTitle}>
              Здесь представлено подробное описание товара
            </h2>
          </div>
          <div className={styles.productBox}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.title} />
            </div>
            <div className={styles.productAbout}>
              <h3 className={styles.productName}>{product.title}</h3>
              <p className={styles.productDescr}>{product.description}</p>
              <div className={styles.productBuy}>
                <span className={styles.productPrice}>{product.price}$</span>
                {!isLoggedIn ? (
                  <span className={styles.productNotice}>
                    Чтобы добавить товар в корзину залогиньтесь!
                  </span>
                ) : (
                  <>
                    <Button type='button' handler={addToCart}>
                      Добавить в корзину
                    </Button>
                    <input
                      className={styles.producInput}
                      name='prodCount'
                      id='prodCount'
                      type='number'
                      value={prodInputQuantity}
                      onChange={(e) => setProdInputQuantity(e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
