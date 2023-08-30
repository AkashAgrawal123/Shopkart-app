import { useEffect, useState, useRef, RefObject } from "react";
import axios from "axios";
import "./CategoryModal.scss";
import lozad from "lozad";
import { productTypeData } from "../../../Types/ProductsInterface";
import useProductStore from "../../../Store/ProductStore";

interface CategoryModalProps {
  onClose: () => void;
  navRef: RefObject<HTMLDivElement>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onClose, navRef }) => {
  // variables
  const categoryModalRef = useRef<HTMLDivElement>(null);

  // store objects
  const { handleModalFilter } = useProductStore();

  // hooks;
  const [productType, setProductType] = useState([]);
  const [productTypeError, setProductTypeError] = useState("");

  // functions
  const handleClickOutside = (event: MouseEvent) => {
    if (
      categoryModalRef.current &&
      navRef.current &&
      !categoryModalRef.current.contains(event.target as Node) &&
      !navRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleCategoryClick = (category: string) => {
    handleModalFilter(category);

    const filtersTagElements = document.querySelectorAll(
      ".product__wrapper--filters-tag"
    );

    filtersTagElements.forEach((filtersTagElement) => {
      const filtersTextElement = filtersTagElement.querySelector(
        ".product__wrapper--filters-text"
      );

      if (filtersTextElement) {
        const filtersText = filtersTextElement.textContent;

        if (filtersText === category) {
          filtersTagElement.classList.add("active");
        } else {
          filtersTagElement.classList.remove("active");
        }
      }
    });

    window.scroll({
      top: window.pageYOffset + 850,
      behavior: "smooth",
    });
    onClose();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const observer = lozad(".lozad", {
      loaded: (el) => {
        el.classList.add("lozad-loaded");
      },
    });
    observer.observe();
  }, [productType]);

  useEffect(() => {
    axios
      .get("/products/datatype")
      .then((res) => {
        setProductType(res.data);
      })
      .catch((error) => setProductTypeError(error.message));
  }, []);

  return (
    <>
      <div className="category-modal" ref={categoryModalRef}>
        <nav className="category-modal__dropdown">
          <a href="#" className="category-modal__dropdown--heading">
            Popular Categories
          </a>
          {productTypeError != "" && <h2>{productTypeError}</h2>}
          <ul className="category-modal__dropdown--list">
            {productType.map((product) => {
              const {
                id,
                image,
                name,
                noOfItem,
                altText,
              }: productTypeData = product;

              return (
                <li key={id} className="category-modal__dropdown--list-item">
                  <button
                    className="category-modal__dropdown--list-link"
                    onClick={() => handleCategoryClick(name)}
                  >
                    <div className="category-modal--image__container">
                      {image === "" ? (
                        <div className="category-modal__placeholder"></div>
                      ) : (
                        <img
                          data-src={image}
                          className="lozad category-modal__dropdown--list__image"
                          alt={altText}
                        />
                      )}
                    </div>
                    <div className="category-modal__dropdown--list-data">
                      <div className="category-modal__dropdown--list-item__heading">
                        {name}
                      </div>
                      <div className="category-modal__dropdown--list-item__description">
                        {noOfItem} &nbsp;Item&nbsp;Available
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CategoryModal;
