import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import Star from "../Component/Star/Star";
import { Button } from "../Component/Button/Button";
import "../styles/Wishlist.scss";
import useProductStore from "../Store/ProductStore";
import { NavLink } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Product } from "../Types/ProductsInterface";

// snackbar
import { useSnackbar } from "../Contexts/SnackbarProvider";

const Wishlist = () => {
  // snackbar context
  const snackbar = useSnackbar();

  // Store functions and data
  const {
    wishlistItemsArray,
    handleAddToCart,
    handleHeartClick,
  } = useProductStore();

  const handleAddItemToCart = (product: any) => {
    handleAddToCart(product);
    snackbar.success("Item Added to your cart");
  };

  return (
    <section className="wishlist">
      <div className="shopCart-container">
        <div className="shopcart__heading--container">
          <h3 className="wishlist__heading">Your favourite items!!</h3>
        </div>
        <div className="wishlist__wrapper">
          {wishlistItemsArray.length > 0 ? (
            <div className="wishlist__list">
              {wishlistItemsArray.map((data: Product) => (
                <div>
                  <div className="wishlist__list--item" key={data.id}>
                    <div className="wishlist__list--item-image">
                      <div className="wishlist__list--heart">
                        {data.isLiked ? (
                          <BsSuitHeartFill
                            className="product__list--heart-icon__filled"
                            onClick={() => handleHeartClick(data.id, data)}
                          />
                        ) : (
                          <BsSuitHeart className="product__list--heart-icon" />
                        )}
                      </div>
                      <NavLink to={`/product-detail/${data.id}`}>
                        <div className="image-container">
                          {data.image === "" ? (
                            <div className="placeholder"></div>
                          ) : (
                            <img
                              className="wishlist__list--item-images"
                              src={data.image}
                              alt={data.altText}
                            />
                          )}
                        </div>
                      </NavLink>
                    </div>
                    <div className="wishlist__list--item-heading">
                      <h3 className="wishlist__list--item-name">{data.name}</h3>
                      <h3 className="wishlist__list--item-price">
                        ₹{data.price}
                      </h3>
                    </div>
                    <div className="wishlist__list--item-description">
                      <p className="wishlist__list--item-description__text">
                        {data.description}
                      </p>
                    </div>
                    <div className="wishlist__list--item-rating">
                      <Star
                        stars={data.rating.rate}
                        reviews={data.rating.count}
                      />
                    </div>
                    <div className="wishlist__list--item-button">
                      <Button
                        className="wishlist__list--item-button__addToCart"
                        onClick={() => handleAddItemToCart(data)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-items__wrapper">
              <h1 className="no-items__wrapper--text">No items available</h1>
              <NavLink to="/">
                <button className="no-items__wrapper--button">
                  <BiLeftArrowAlt className="no-items__wrapper--button-icon" />
                  continue to shopping
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
