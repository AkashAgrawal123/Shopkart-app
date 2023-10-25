import { useEffect } from "react";
import { Button } from "react-bootstrap";
import persistedUseProductStore from "../Store/ProductStore";
import Star from "../Component/Star/Star";
import "../styles/ProductDetail.scss";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiNotepad } from "react-icons/bi";
import { Product } from "../Types/ProductsInterface";
import lozad from "lozad";
import { NavLink } from "react-router-dom";

// snackbar
import { useSnackbar } from "../Contexts/SnackbarProvider";

const ProductDetail = () => {
  // snackbar context
  const snackbar = useSnackbar();

  // store
  const {
    cart,
    handleAddItem,
    handleRemoveItem,
    handleAddToCart,
    handleBuyNow,
    fetchProducts,
  } = persistedUseProductStore();

  const handleAddItemToCart = (product: any) => {
    handleAddToCart(product);
    snackbar.success("Item Added to your cart");
  };

  const handleItemBuyNow = (product: any) => {
    handleBuyNow(product);
    snackbar.success("Check here in your order page");
  };

  // useEffect
  useEffect(() => {
    const observer = lozad(".lozad", {
      loaded: (el) => {
        el.classList.add("lozad-loaded");
      },
    });
    observer.observe();
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <section className="product__detail">
        {cart.map((data: Product) => (
          <div className="shopCart-container">
            <div className="product__detail--wrapper">
              <div className="product__detail--wrapper__left">
                <div className="product__detail--wrapper__left--main-image">
                  <img
                    className="lozad product__detail--wrapper__left-image"
                    data-src={data.image}
                  />
                </div>
                <div className="product__detail--wrapper__left-subimage">
                  <div className="product__detail--wrapper__left-subimage__image">
                    <img className="lozad" data-src={data.image} />
                  </div>
                  <div className="product__detail--wrapper__left-subimage__image">
                    <img className="lozad" data-src={data.image} />
                  </div>
                  <div className="product__detail--wrapper__left-subimage__image">
                    <img className="lozad" data-src={data.image} />
                  </div>
                  <div className="product__detail--wrapper__left-subimage__image">
                    <img className="lozad" data-src={data.image} />
                  </div>
                </div>
              </div>
              <div className="product__detail--wrapper__right">
                <div className="product__detail--wrapper__right--heading">
                  <h2 className="product__detail--wrapper__right--heading-text">
                    {data.name}
                  </h2>
                </div>
                <div className="product__detail--wrapper__right--description">
                  <p className="product__detail--wrapper__right--description-text">
                    {data.description}
                  </p>
                </div>
                <div className="product__detail--wrapper__right--star">
                  <Star stars={data.rating.rate} reviews={data.rating.count} />
                </div>
                <div className="product__detail--wrapper__right--price">
                  <h2 className="product__detail--wrapper__right--price-emi">
                    ₹{data.price} or {(data.price / 6).toFixed(2)}/month
                  </h2>
                  <p className="product__detail--wrapper__right--emi-text">
                    Suggested payments with 6 months special financing
                  </p>
                </div>
                <div className="product__detail--wrapper__right--item-color">
                  <h3 className="product__detail--wrapper__right--color-text">
                    Choose a Color
                  </h3>
                  <div className="product__detail--wrapper__right--color">
                    <div className="product__detail--wrapper__right--color-one">
                      <div className="product__detail--wrapper__right--subcolor-one"></div>
                      <div className="product__detail--wrapper__right--subcolor-two"></div>
                    </div>
                    <div className="product__detail--wrapper__right--color-two">
                      <div className="product__detail--wrapper__right--subcolor-one"></div>
                      <div className="product__detail--wrapper__right--subcolor-two"></div>
                    </div>
                    <div className="product__detail--wrapper__right--color-three">
                      <div className="product__detail--wrapper__right--subcolor-one"></div>
                      <div className="product__detail--wrapper__right--subcolor-two"></div>
                    </div>
                    <div className="product__detail--wrapper__right--color-four">
                      <div className="product__detail--wrapper__right--subcolor-one"></div>
                      <div className="product__detail--wrapper__right--subcolor-two"></div>
                    </div>
                    <div className="product__detail--wrapper__right--color-five">
                      <div className="product__detail--wrapper__right--subcolor-one"></div>
                      <div className="product__detail--wrapper__right--subcolor-two"></div>
                    </div>
                  </div>
                </div>
                <div className="product__detail--wrapper__right--increment">
                  <div className="product__detail--wrapper__right--increment-button">
                    <button
                      onClick={() => handleRemoveItem(data)}
                      disabled={data.quantity === 1}
                    >
                      -
                    </button>
                    <h5>{data.quantity}</h5>
                    <button onClick={() => handleAddItem(data)}>+</button>
                  </div>
                  <p>
                    Only <span className="left-item">{data.id} items</span>{" "}
                    Left! <br /> Don't miss it
                  </p>
                </div>
                <div className="product__detail--wrapper__right--button">
                  <NavLink to="/order-now">
                    <Button
                      className="product__detail--wrapper__right--button-buynow"
                      onClick={() => handleItemBuyNow(data)}
                    >
                      Buy Now
                    </Button>
                  </NavLink>
                  <Button
                    className="product__detail--wrapper__right--button-aadtocart"
                    onClick={() => handleAddItemToCart(data)}
                  >
                    Add to Cart
                  </Button>
                </div>
                <div className="product__detail--wrapper__right--delivery">
                  <div className="product__detail--wrapper__right--free-delivery">
                    <CiDeliveryTruck />
                    <div>
                      <h3>Free Delivery</h3>
                      <a href="#">
                        Enter your postal code for delivery availability
                      </a>
                    </div>
                  </div>
                  <div className="product__detail--wrapper__right--return-delivery">
                    <BiNotepad />
                    <div>
                      <h3>Return Delivery</h3>
                      <p>
                        Free 30days Delivery Returns. <a href="#">Details</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductDetail;
