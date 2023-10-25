import "../../src/styles/globalStyle.scss";
import "../styles/Cart.scss";
import useProductStore from "../Store/ProductStore";
import Star from "../Component/Star/Star";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrFormSubtract, GrFormAdd } from "react-icons/gr";
import { Product } from "../Types/ProductsInterface";
import { NavLink } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";

const Cart = () => {
  // store objects
  const { cartItemsArray, handleRemoveItem, handleAddItem, handleDeleteItem } =
    useProductStore();

  const handleIncreaseQuantity = (item: Product) => {
    handleAddItem(item);
  };

  const handleDecreaseQuantity = (item: Product) => {
    handleRemoveItem(item);
  };

  return (
    <>
      {cartItemsArray.length > 0 ? (
        <section className="cart">
          <div className="shopCart-container">
            <div className="cart__wrapper">
              <div className="cart__wrapper--heading">
                <h1 className="cart__wrapper--shopping-heading">
                  shopping cart
                </h1>
                <p className="cart__wrapper--total-item__count">
                  {cartItemsArray.length}
                  {cartItemsArray.length > 1 ? "items" : "item"}
                </p>
              </div>
              {cartItemsArray.map((data: Product) => (
                <div className="cart__wrapper--product" key={data.id}>
                  <div className="cart__wrapper--product__image-box">
                    <img
                      src={data.image}
                      className="cart__wrapper--product__image"
                      alt={data.altText}
                    />
                  </div>
                  <div className="cart__wrapper--product__text">
                    <h4 className="cart__wrapper--product__title">
                      {data.name}
                    </h4>
                    <p className="cart__wrapper--product__description">
                      {data.description}
                    </p>
                  </div>
                  <div className="cart__wrapper--product__star">
                    <Star
                      stars={data.rating.rate}
                      reviews={data.rating.count}
                    />
                  </div>
                  <div className="cart__wrapper--product__quantity">
                    <button
                      className="cart__wrapper--product__quantity-minus"
                      onClick={() => handleDecreaseQuantity(data)}
                      disabled={data.quantity === 1}
                    >
                      <GrFormSubtract />
                    </button>
                    <h4 className="cart__wrapper--product__quantity--number">
                      {data.quantity}
                    </h4>
                    <button
                      className="cart__wrapper--product__quantity-plus"
                      onClick={() => handleIncreaseQuantity(data)}
                    >
                      <GrFormAdd />
                    </button>
                  </div>
                  <div className="cart__wrapper--product__price">
                    <h3 className="cart__wrapper--product__price-value">
                      ₹{data.price.toFixed(2)}
                    </h3>
                  </div>
                  <div className="cart__wrapper--product__delete-icon">
                    <AiTwotoneDelete onClick={() => handleDeleteItem(data)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__wrapper--button">
              <NavLink to="/order-now">
                <button className="cart__wrapper--button-text">
                  Order Now
                </button>
              </NavLink>
            </div>
          </div>
        </section>
      ) : (
        <section className="no-items">
          <div className="shopCart-container">
            <div className="no-items__wrapper">
              <h1 className="no-items__wrapper--text">No items available</h1>
              <NavLink to="/">
                <button className="no-items__wrapper--button">
                  <BiLeftArrowAlt className="no-items__wrapper--button-icon" />
                  continue to shopping
                </button>
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
