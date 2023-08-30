import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbShoppingCartX } from "react-icons/tb";
import "./Navbar.scss";
import "../../styles/globalStyle.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useRef } from "react";
import CategoryModal from "../../Modal/Components/CategoryModal/CategoryModal";
import useProductStore from "../../Store/ProductStore";
import Search from "../Search/Search";
import AccountModal from "../../Modal/Components/AccountModal/AccountModal";
import React from "react";

const Navbar = () => {
  const [isDownArrow, setIsUpArrow] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // store objects
  const { cartItemsArray } = useProductStore();

  // methods
  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
    setIsUpArrow(!isDownArrow);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setIsUpArrow(false);
  };

  const handleOpenAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
  };

  const handleCloseAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  return (
    <>
      <nav className="navbar__menu flex items-center" ref={navRef}>
        <ul className="navbar__menu--list flex items-center">
          <li>
            <button
              className="navbar__menu--list-category flex items-center"
              onClick={handleOpenCategoryModal}
            >
              <div className="navbar__menu--list-category__item">Category</div>
              {isDownArrow ? (
                <IoIosArrowUp className="navbar__menu--list-button" />
              ) : (
                <IoIosArrowDown className="navbar__menu--list-button" />
              )}
            </button>
            {isCategoryModalOpen && (
              <CategoryModal
                onClose={handleCloseCategoryModal}
                navRef={navRef}
              />
            )}
          </li>
          <li className="navbar__menu--list__item">
            <NavLink className="navbar__menu--list-item" to="/deals">
              Deals
            </NavLink>
          </li>
          <li className="navbar__menu--list__item">
            <NavLink className="navbar__menu--list-item" to="/wishlist">
              Wishlist
            </NavLink>
          </li>
          <li className="navbar__menu--list__item">
            <NavLink className="navbar__menu--list-item" to="/delivery">
              Delivery
            </NavLink>
          </li>
        </ul>
        <div className="navbar__search">
          <Search />
        </div>
      </nav>
      <div className="navbar__menu--items flex gap-8">
        <div>
          <button
            className="navbar__menu--list-item__account flex items-center"
            onClick={handleOpenAccountModal}
          >
            <FiUser />
            <div className="navbar__menu--list-category__item">Account</div>
          </button>
          {isAccountModalOpen && (
            <AccountModal onClose={handleCloseAccountModal} navRef={navRef} />
          )}
        </div>
        {cartItemsArray.length ? (
          <NavLink
            to="/cart"
            className="navbar__menu--list-item__cart flex items-center"
          >
            <TbShoppingCartX />
            <span>Cart</span>
            <p
              className={`navbar__menu--list-item__cart--item__count ${
                cartItemsArray.length > 9 ? "two-digit" : ""
              }`}
            >
              {cartItemsArray.length}
            </p>
          </NavLink>
        ) : (
          <div className="navbar__menu--list-item__cart flex items-center emptyCart">
            <TbShoppingCartX />
            <span>Cart</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
