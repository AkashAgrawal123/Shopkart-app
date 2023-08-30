import { useEffect } from "react";
import "../../styles/globalStyle.scss";
import { CgBriefcase, CgGift } from "react-icons/cg";
import { FiHelpCircle } from "react-icons/fi";
import lozad from 'lozad';
import "./Footer.scss";
import React from "react";

const Footer = () => {
    useEffect(() => {
      const observer = lozad(".lozad", {
        loaded: (el) => {
          el.classList.add("lozad-loaded");
        },
      });
      observer.observe();
    }, []);
  return (
    <>
      <section className="footer">
        <div className="footer__wrapper shopCart-container">
          <div className="footer__wrapper--top">
            <div className="footer__wrapper--column">
              <div className="footer__wrapper--column-one mb-30">
                <img
                  className="lozad footer__wrapper--logo-image"
                  data-src="/appImages/imageLogo.svg"
                />
                <p className="footer__wrapper--paragraph mb-10">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <div className="footer__wrapper--payment-wrap">
                  <h2 className="footer__wrapper--payment-wrap__heading">
                    Accepted Payments
                  </h2>
                  <div className="footer__wrapper--payment-wrap__icons">
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/stripe.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/visa.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/masterCard.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/amazon.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/klarna.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/paypal.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/applePay.png"
                      />
                    </div>
                    <div className="footer__wrapper--payment__single-item-icon">
                      <img
                        className="lozad footer__wrapper--payment__single-item-img"
                        data-src="/images/googlePay.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer__wrapper--column-two">
                <h2 className="footer__wrapper--department-heading">
                  Department
                </h2>
                <ul className="footer__wrapper--list">
                  <li className="footer__wrapper--list-item">Fashion</li>
                  <li className="footer__wrapper--list-item">
                    Education Product
                  </li>
                  <li className="footer__wrapper--list-item">Frozen Food</li>
                  <li className="footer__wrapper--list-item">Beverages</li>
                  <li className="footer__wrapper--list-item">
                    Organic Grocery
                  </li>
                  <li className="footer__wrapper--list-item">
                    Office Supplies
                  </li>
                  <li className="footer__wrapper--list-item">
                    Beauty Products
                  </li>
                  <li className="footer__wrapper--list-item">Books</li>
                  <li className="footer__wrapper--list-item">
                    Electronics & Gadget
                  </li>
                  <li className="footer__wrapper--list-item">
                    Travel Accessories
                  </li>
                  <li className="footer__wrapper--list-item">Fitness</li>
                  <li className="footer__wrapper--list-item">Sneakers</li>
                  <li className="footer__wrapper--list-item">Toys</li>
                  <li className="footer__wrapper--list-item">Furniture</li>
                </ul>
              </div>
              <div className="footer__wrapper--column-three">
                <h2 className="footer__wrapper--department-heading">
                  About Us
                </h2>
                <ul className="footer__wrapper--list">
                  <li className="footer__wrapper--list-item">About shopcart</li>
                  <li className="footer__wrapper--list-item">Careers</li>
                  <li className="footer__wrapper--list-item">News & Blog</li>
                  <li className="footer__wrapper--list-item">Help</li>
                  <li className="footer__wrapper--list-item">Press Center</li>
                  <li className="footer__wrapper--list-item">
                    Shop by location
                  </li>
                  <li className="footer__wrapper--list-item">
                    Shopcart brands
                  </li>
                  <li className="footer__wrapper--list-item">
                    Affiliate & Partners
                  </li>
                  <li className="footer__wrapper--list-item">Ideas & Guides</li>
                </ul>
              </div>
              <div className="footer__wrapper--column-four">
                <h2 className="footer__wrapper--department-heading">
                  Services
                </h2>
                <ul className="footer__wrapper--list">
                  <li className="footer__wrapper--list-item">Gift Card</li>
                  <li className="footer__wrapper--list-item">Mobile App</li>
                  <li className="footer__wrapper--list-item">
                    Shipping & Delivery
                  </li>
                  <li className="footer__wrapper--list-item">Order Pickup</li>
                  <li className="footer__wrapper--list-item">Account Signup</li>
                </ul>
              </div>
              <div className="footer__wrapper--column-five">
                <h2 className="footer__wrapper--department-heading">
                  Department
                </h2>
                <ul className="footer__wrapper--list">
                  <li className="footer__wrapper--list-item">Shopcart Help</li>
                  <li className="footer__wrapper--list-item">Returns</li>
                  <li className="footer__wrapper--list-item">track orders</li>
                  <li className="footer__wrapper--list-item">contact us</li>
                  <li className="footer__wrapper--list-item">feedback</li>
                  <li className="footer__wrapper--list-item">
                    Security & Fraud
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__wrapper--copyright-content">
            <div className="footer__wrapper--copyright__left-menu">
              <div className="footer__wrapper--copyright__left-menu__one">
                <CgBriefcase className="footer__wrapper--copyright__icon" />
                <p className="footer__wrapper--copyright__text">
                  Become Seller
                </p>
              </div>
              <div className="footer__wrapper--copyright__left-menu__two">
                <CgGift className="footer__wrapper--copyright__icon" />
                <p className="footer__wrapper--copyright__text">Gift Cards</p>
              </div>
              <div className="footer__wrapper--copyright__left-menu__three">
                <FiHelpCircle className="footer__wrapper--copyright__icon" />
                <p className="footer__wrapper--copyright__text">Help Canter</p>
              </div>
            </div>
            <div className="footer__wrapper--copyright__middle-menu">
              <a href="#" className="footer__wrapper--copyright__middle-menu__link">
                Terms of Service
              </a>
              <a href="#" className="footer__wrapper--copyright__middle-menu__link">
                Privacy & Policy
              </a>
            </div>
            <div className="footer__wrapper--copyright__right-menu">
              All Right reserved by Musemind | 2022
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
