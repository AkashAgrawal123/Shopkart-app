import { useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
import Star from "../Star/Star";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import "../../styles/globalStyle.scss";
import { Button } from "../Button/Button";
import lozad from "lozad";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ProductFilters, Product } from "../../Types/ProductsInterface";
import persistedUseProductStore from "../../Store/ProductStore";
import { NavLink } from "react-router-dom";

// snackbar
import { useSnackbar } from "../../Contexts/SnackbarProvider";

const Products = () => {
  // Hooks
  const [productError, setProductError] = useState("");
  const [productFilter, setProductFilter] = useState<ProductFilters[]>([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedOptionItem, setSelectedOptionItem] = useState("");

  // snackbar context
  const snackbar = useSnackbar();

  // store objects
  const {
    handleSort,
    handleFilter,
    handleProductDetail,
    handleAddToCart,
    handleHeartClick,
  } = persistedUseProductStore();
  const products = persistedUseProductStore((state) => state.products);
  const fetchProducts = persistedUseProductStore((state) => state.fetchProducts);

  const handleHeartIconClick = (id: number, product: any) => {
    handleHeartClick(id, product);
    snackbar.success("Item Added to the wishlist");
  };

  const handleAddItemToCart = (product: any) => {
    handleAddToCart(product);
    snackbar.success("Item Added to your cart");
  };

  // functions
  const handleButtonClick = (id: number) => {
    const updatedFilters = productFilter.map((filter) => ({
      ...filter,
      isActive: filter.id === id,
    }));
    setProductFilter(updatedFilters);

    const selectedFilter = productFilter.find((filter) => filter.id === id);
    if (selectedFilter) {
      handleFilter(selectedFilter.name);
    }
  };

  const handleSortByDropDownOpen = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleDropdownItemClick = (item: string) => {
    handleSort(item);
    setSelectedOptionItem(item);
    setIsDropDownOpen(false);
  };

  // lozad useEffect with skeleton
  // useEffect(() => {
  //   const observer = lozad(".lozad", {
  //     loaded: (el) => {
  //       el.classList.add("lozad-loaded");
  //     },
  //   });

  //   if (productsRef.current && !isLoading) {
  //     observerRef.current = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             observer.triggerLoad(entry.target);
  //           }
  //         });
  //       },
  //       {
  //         root: null,
  //         rootMargin: "0px",
  //         threshold: 0.1,
  //       }
  //     );

  //     const images = productsRef.current.querySelectorAll(".lozad");
  //     images.forEach((image) => {
  //       observerRef.current?.observe(image);
  //     });
  //   }
  // }, [isLoading]);

  // lozad without skeleton
  useEffect(() => {
    const observer = lozad(".lozad", {
      loaded: (el) => {
        el.classList.add("lozad-loaded");
      },
    });
    observer.observe();
  }, [products]);

  useEffect(() => {
    fetchProducts();
    axios
      .get("/products/filtertype")
      .then((productTypeRes) => {
        const filtersWithDefaultActive = productTypeRes.data.map(
          (filter: any, index: number) => ({
            ...filter,
            isActive: index === 0,
          }),
        );
        setProductFilter(filtersWithDefaultActive);
        // setIsLoading(false);
      })
      .catch((error) => {
        setProductError(error.message);
        // setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="product">
        {/* with Skeleton */}
        {/* <div ref={productsRef} className="shopCart-container"> */}
        {/* without skeleton */}
        <div className="shopCart-container">
          <div className="shopcart__heading--container">
            <h3 className="product__heading">Todays Best Deals For You!</h3>
          </div>
          <div className="product__wrapper">
            <div className="product__wrapper--filter-tags">
              <div className="product__wrapper--filters">
                {productFilter.map((productFilters) => {
                  const { id, name, isActive }: ProductFilters = productFilters;
                  return (
                    <button
                      className={`product__wrapper--filters-tag ${
                        isActive ? "active" : ""
                      }`}
                      key={id}
                      onClick={() => handleButtonClick(id)}
                    >
                      <div className="product__wrapper--filters-text">
                        {name}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="product__wrapper--sort-by">
                <button
                  className={`product__wrapper--sort-by__button ${
                    isDropDownOpen ? "activeDropDown" : ""
                  }`}
                  onClick={handleSortByDropDownOpen}
                >
                  {selectedOptionItem === "" ? "Sort By" : selectedOptionItem}
                  {isDropDownOpen ? (
                    <IoIosArrowUp className="product__wrapper--sort-by__arrow" />
                  ) : (
                    <IoIosArrowDown className="product__wrapper--sort-by__arrow" />
                  )}
                </button>
                {isDropDownOpen && (
                  <div className="product__wrapper--dropdown-content">
                    <ul className="product__wrapper--dropdown-list">
                      <li
                        className="product__wrapper--dropdown-item"
                        onClick={() => handleDropdownItemClick("Sort By")}
                      >
                        Sort By
                      </li>
                      <li
                        className="product__wrapper--dropdown-item"
                        onClick={() => handleDropdownItemClick("Price")}
                      >
                        Price
                      </li>
                      <li
                        className="product__wrapper--dropdown-item"
                        onClick={() => handleDropdownItemClick("A - Z")}
                      >
                        A - Z
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {productError !== "" && <h2>{productError}</h2>}
            <div
              className={`product__list ${
                products.length === 0 ? "no-item" : ""
              }`}
            >
              {products.length > 0 ? (
                products.map((product) => {
                  const {
                    id,
                    name,
                    image,
                    description,
                    price,
                    rating,
                    altText,
                    isLiked,
                  }: Product = product;

                  return (
                    <div key={id}>
                      <div
                        className="product__list--item"
                        onClick={() => handleProductDetail(product)}
                      >
                        <div className="product__list--item-image">
                          <div className="product__list--heart">
                            {isLiked ? (
                              <BsSuitHeartFill
                                className="product__list--heart-icon__filled"
                                onClick={() =>
                                  handleHeartIconClick(id, product)
                                }
                              />
                            ) : (
                              <BsSuitHeart
                                className="product__list--heart-icon"
                                onClick={() =>
                                  handleHeartIconClick(id, product)
                                }
                              />
                            )}
                          </div>
                          <NavLink to={`/product-detail/${id}`}>
                            <div className="image-container">
                              {image === "" ? (
                                <div className="placeholder"></div>
                              ) : (
                                <img
                                  className="lozad product__list--item-images"
                                  data-src={image}
                                  alt={altText}
                                  // onLoad={handleImageLoaded}
                                  // onError={handleImageError}
                                />
                              )}
                            </div>
                          </NavLink>
                        </div>
                        <div className="product__list--item-heading">
                          <h3 className="product__list--item-name">{name}</h3>
                          <h3 className="product__list--item-price">
                            ₹{price}
                          </h3>
                        </div>
                        <div className="product__list--item-description">
                          <p className="product__list--item-description__text">
                            {description}
                          </p>
                        </div>
                        <div className="product__list--item-rating">
                          <Star stars={rating.rate} reviews={rating.count} />
                        </div>
                        <div className="product__list--item-button">
                          <Button
                            className="product__list--item-button__addToCart"
                            onClick={() => handleAddItemToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 className="product__list--heading-no-items">
                  Sorry, no items available
                </h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
