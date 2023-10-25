import React, { useState } from "react";
import "../styles/OrderNow.scss";
import { Button } from "../Component/Button/Button";
import useProductStore from "../Store/ProductStore";
import { Product } from "../Types/ProductsInterface";
import { BsCheckCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";
import { useSnackbar } from "../Contexts/SnackbarProvider";

enum PaymentOptionField {
  cashOnDelivery = "CashOnDelivery",
  shopcartCard = "ShopcartCard",
  paypal = "paypal",
  creditOrDebitCard = "creditOrDebitCard",
}

const OrderNow: React.FC = () => {
  // store
  const { cartItemsArray, handleClearCart } = useProductStore();

  // Variables
  let total = 0;
  let quantityTotal = 0;

  // hooks
  const [selectedOption, setSelectedOption] =
    useState<PaymentOptionField | null>(null);

  // snackbar
  const snackbar = useSnackbar();

  const [couponCode, setCouponCode] = useState("");
  const [isInvalidCouponCode, setIsInvalidCouponCode] = useState(false);
  const [isCouponCodeApplied, setIsCouponCodeApplied] = useState(false);
  const [isSuccessPopUp, setIsSuccessPopUp] = useState(false);
  const [delivery, setDelivery] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  // Variables
  const couponCodeText = "july100";
  const lowerCaseCouponCode = couponCode.toLowerCase();

  // functions
  const handleOptionChange = (option: PaymentOptionField) => {
    setSelectedOption(option);
  };

  const handleItemPurchased = () => {
    setIsSuccessPopUp(true);
    snackbar.success("Item purchased");
  };
  // coupon code function
  const handleApplyCouponCode = () => {
    if (lowerCaseCouponCode === couponCodeText) {
      setIsCouponCodeApplied(true);
      setIsInvalidCouponCode(false);
      setDiscountPrice(100);
    } else {
      setIsCouponCodeApplied(false);
      setIsInvalidCouponCode(true);
      setDiscountPrice(0);
    }
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case PaymentOptionField.cashOnDelivery:
        return (
          <>
            <div className="order-now__wrapper--right-box__cash-delivery__input">
              <label>Email*</label>
              <input
                className="order-now__wrapper--right-box__input-field-one"
                type="email"
                placeholder="Type here..."
                required
              />
              <label>Enter Amount</label>
              <input
                className="order-now__wrapper--right-box__input-field-one"
                type="text"
                placeholder="Type here..."
                required
              />
            </div>
          </>
        );
      case PaymentOptionField.shopcartCard:
        return (
          <>
            <div className="order-now__wrapper--right-box__shopcart__input">
              <div className="order-now__wrapper--right-box__input-field-one">
                <label>Email*</label>
                <input type="email" placeholder="Type here..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-two">
                <label>Enter Card Holder Name</label>
                <input type="email" placeholder="Type here..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-three">
                <label>Enter Card Number</label>
                <input type="number" placeholder="Card number..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-four">
                <div className="order-now__wrapper--right-box__input-field-four__option">
                  <label>Expiry date</label>
                  <input type="date" />
                </div>
                <div className="order-now__wrapper--right-box__input-field-four__options">
                  <label>Enter cvv</label>
                  <input
                    type="text"
                    placeholder="Enter Cvv"
                    pattern="[0-9]{3}"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      case PaymentOptionField.paypal:
        return (
          <>
            <div className="order-now__wrapper--right-box__paypal__input">
              <div className="order-now__wrapper--right-box__input-field-one">
                <label>Email*</label>
                <input type="email" placeholder="Type here..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-two">
                <label>Enter your name</label>
                <input type="text" placeholder="Enter your name..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-three">
                <label>Enter your userId</label>
                <input type="text" placeholder="Enter user id..." />
              </div>
            </div>
          </>
        );
      case PaymentOptionField.creditOrDebitCard:
        return (
          <>
            <div className="order-now__wrapper--right-box__credit-card__input">
              <div className="order-now__wrapper--right-box__input-field-one">
                <label>Email*</label>
                <input type="email" placeholder="Type here..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-two">
                <label>Enter Card Holder Name</label>
                <input type="text" placeholder="Type here..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-three">
                <label>Enter Card Number</label>
                <input type="number" placeholder="Card number..." />
              </div>
              <div className="order-now__wrapper--right-box__input-field-four">
                <div className="order-now__wrapper--right-box__input-field-four__option">
                  <label>Expiry date</label>
                  <input type="date" />
                </div>
                <div className="order-now__wrapper--right-box__input-field-four__options">
                  <label>Enter cvv</label>
                  <input
                    type="text"
                    placeholder="Enter Cvv"
                    pattern="[0-9]{3}"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  cartItemsArray.map((data: Product) => {
    total += data.price;
    quantityTotal += data.quantity;
  });

  const handleSelectShippingCategory = (shippingCharge: string) => {
    if (shippingCharge === "standard") {
      setDelivery(25);
    } else if (shippingCharge === "speed_post") {
      setDelivery(50);
    } else {
      setDelivery(0);
    }
  };

  return (
    <>
      {cartItemsArray.length > 0 ? (
        <section className="order-now">
          <div className="shopCart-container">
            <div className="order-now__wrapper">
              <div className="order-now__wrapper--form">
                <div className="order-now__wrapper--left-box">
                  <div className="order-now__wrapper--left-box__item-content">
                    <h2 className="order-now__wrapper--left-box__heading">
                      Review Item And Shipping
                    </h2>
                    {cartItemsArray.map((data: Product) => (
                      <div
                        className="order-now__wrapper--left-box__product-detail"
                        key={data.id}
                      >
                        <div className="order-now__wrapper--left-box__product-image">
                          <img
                            src={data.image}
                            className="order-now__wrapper--left-box__product-image__value"
                          />
                        </div>
                        <div className="order-now__wrapper--left-box__product--text">
                          <h2 className="order-now__wrapper--left-box__product--heading">
                            {data.name}
                          </h2>
                          <p className="order-now__wrapper--left-box__product--color">
                            Color: {data.color}
                          </p>
                        </div>
                        <div className="order-now__wrapper--left-box__product--price">
                          <h2 className="order-now__wrapper--left-box__product--price__value">
                            ₹{data.price.toFixed(2)}
                          </h2>
                          <p className="order-now__wrapper--left-box__product--quantity">
                            Quantity: {data.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-now__wrapper--left-box__user-information">
                    <div className="order-now__wrapper--left-box__user-heading">
                      <h2 className="order-now__wrapper--left-box__user-heading__text">
                        Delivery Information
                      </h2>
                      <button className="order-now__wrapper--left-box__user-heading__button">
                        Edit Information
                      </button>
                    </div>
                    <div className="order-now__wrapper--left-box__user-details">
                      <div className="order-now__wrapper--left-box__user-text--heading">
                        <h4>Name:</h4>
                        <h4>Address:</h4>
                        <h4>City:</h4>
                        <h4>Zip Code:</h4>
                        <h4>Mobile:</h4>
                        <h4>Email:</h4>
                      </div>
                      <div className="order-now__wrapper--left-box__user-text--description">
                        <h6>Wade Warren</h6>
                        <h6>4140 Parker Rd. Allentown, New Mexico 31134</h6>
                        <h6>Austin</h6>
                        <h6>85486</h6>
                        <h6>+44 7700960054</h6>
                        <h6>georgia.young@example.com</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-now__wrapper--right-box">
                  <div className="order-now__wrapper--right-box__summary-heading">
                    <h2 className="order-now__wrapper--right-box__order-summary">
                      order summary
                    </h2>
                  </div>
                  <div className="order-now__wrapper--right-box__mode-of-shipping">
                    <h3 className="order-now__wrapper--right-box__shipping-heading">
                      Mode of shipping
                    </h3>
                    <select
                      className="order-now__wrapper--right-box__select"
                      onChange={(e) =>
                        handleSelectShippingCategory(e.target.value)
                      }
                    >
                      <option
                        className="order-now__wrapper--right-box__option"
                        value=""
                      >
                        Normal Delivery
                      </option>
                      <option
                        className="order-now__wrapper--right-box__option"
                        value="standard"
                      >
                        Standard Delivery - ₹25
                      </option>
                      <option
                        className="order-now__wrapper--right-box__option"
                        value="speed_post"
                      >
                        Speed post Delivery - ₹50
                      </option>
                    </select>
                  </div>
                  <div className="order-now__wrapper--right-box__coupon-code--box">
                    <div className="order-now__wrapper--right-box__coupon-code--heading">
                      <h2 className="order-now__wrapper--right-box__coupon-code--heading__text">
                        coupon code
                      </h2>
                    </div>
                    <div className="order-now__wrapper--right-box__coupon-code--field">
                      <input
                        className="order-now__wrapper--right-box__coupon-code-input"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setIsCouponCodeApplied(false);
                          setIsInvalidCouponCode(false);
                        }}
                      />
                      <button
                        className={`order-now__wrapper--right-box__button-code ${
                          isCouponCodeApplied ? "applied" : ""
                        }`}
                        onClick={handleApplyCouponCode}
                        disabled={isCouponCodeApplied}
                      >
                        {isCouponCodeApplied ? "Applied" : "Apply Coupon"}
                      </button>
                    </div>
                  </div>
                  {isInvalidCouponCode && (
                    <p className="coupon-code__error--msg">
                      Invalid coupon code
                    </p>
                  )}
                  <div className="order-now__wrapper--right-box__payment-summary--heading">
                    <h2 className="order-now__wrapper--right-box__payment--heading">
                      Payment Summary
                    </h2>
                    <div className="order-now__wrapper--right-box__payment--description">
                      <div className="order-now__wrapper--right-box__payment--description-text">
                        <p>No. of item:</p>
                        <p>subtotal:</p>
                        <p>Delivery charge:</p>
                        <p>Coupon reedem value:</p>
                        <p>total</p>
                      </div>
                      <div className="order-now__wrapper--right-box__payment--description-text__value">
                        <p>{quantityTotal}</p>
                        <p className="subtotal">₹{total.toFixed(2)}</p>
                        <p className="delivery-charge">₹{delivery}</p>
                        <p className="discount-amount">
                          ₹{discountPrice !== 0 ? `-${discountPrice}` : "0"}
                        </p>
                        <p className="total-amount">
                          ₹{(total + delivery - discountPrice).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div className="order-now__wrapper--right-box__payment-option">
                    <h2 className="order-now__wrapper--right-box__payment-heading">
                      Mode of payment
                    </h2>
                  </div>
                  <div className="order-now__wrapper--right-box__payment-radio--button">
                    <label className="order-now__wrapper--right-box__radio-button-label">
                      <input
                        className="order-now__wrapper--right-box__radio-button-input"
                        type="radio"
                        value={PaymentOptionField.cashOnDelivery}
                        checked={
                          selectedOption === PaymentOptionField.cashOnDelivery
                        }
                        onChange={() =>
                          handleOptionChange(PaymentOptionField.cashOnDelivery)
                        }
                        required
                      />
                      Cash On Delivery
                    </label>
                    <label className="order-now__wrapper--right-box__radio-button-label">
                      <input
                        className="order-now__wrapper--right-box__radio-button-input"
                        type="radio"
                        value={PaymentOptionField.shopcartCard}
                        checked={
                          selectedOption === PaymentOptionField.shopcartCard
                        }
                        onChange={() =>
                          handleOptionChange(PaymentOptionField.shopcartCard)
                        }
                        required
                      />
                      Shopcart Card
                    </label>
                    <label className="order-now__wrapper--right-box__radio-button-label">
                      <input
                        className="order-now__wrapper--right-box__radio-button-input"
                        type="radio"
                        value={PaymentOptionField.paypal}
                        checked={selectedOption === PaymentOptionField.paypal}
                        onChange={() =>
                          handleOptionChange(PaymentOptionField.paypal)
                        }
                        required
                      />
                      Paypal
                    </label>
                    <label className="order-now__wrapper--right-box__radio-button-label">
                      <input
                        className="order-now__wrapper--right-box__radio-button-input"
                        type="radio"
                        value={PaymentOptionField.creditOrDebitCard}
                        checked={
                          selectedOption ===
                          PaymentOptionField.creditOrDebitCard
                        }
                        onChange={() =>
                          handleOptionChange(
                            PaymentOptionField.creditOrDebitCard,
                          )
                        }
                        required
                      />
                      Credit Or Debit Card
                    </label>
                    {renderInputFields()}
                  </div>
                  <div className="order-now__wrapper--right-box__payment-image">
                    <div className="order-now__wrapper--right-box__payment-image__section-one">
                      <img
                        src="/images/amazon.png"
                        className="order-now__wrapper--right-box__payment-image-one"
                      />
                    </div>
                    <div className="order-now__wrapper--right-box__payment-image__section-two">
                      <img
                        src="/images/masterCard.png"
                        className="order-now__wrapper--right-box__payment-image-two"
                      />
                    </div>
                    <div className="order-now__wrapper--right-box__payment-image__section-three">
                      <img
                        src="/images/visa.png"
                        className="order-now__wrapper--right-box__payment-image-three"
                      />
                    </div>
                  </div>
                  <div className="order-now__wrapper--right-box__payment-button">
                    <button
                      className="order-now__wrapper--right-box__pay-now__button"
                      onClick={() => handleItemPurchased()}
                    >
                      pay now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="order-now__no-items">
          <div className="shopCart-container">
            <div className="order-now__goToHomepage">
              <NavLink to="/">
                <Button className="order-now__goToHomepage--button">
                  <FiArrowUpLeft className="order-now__goToHomepage--icon" />
                  go to homepage
                </Button>
              </NavLink>
            </div>
          </div>
        </section>
      )}

      {isSuccessPopUp && (
        <section className="payment-success__popup">
          <div className="payment-success__wrapper">
            <div className="payment-success__check--icon">
              <BsCheckCircle className="payment-success__check--icons" />
            </div>
            <div className="payment-success__heading">
              <h2 className="payment-success__heading--text">
                Your order has been placed.
              </h2>
            </div>
            <div className="payment-success__transaction--id">
              <p>Transaction ID: 1234567890</p>
            </div>
            <div className="payment-success__button">
              <NavLink to="/">
                <Button
                  className="payment-success__continue--button"
                  onClick={() => handleClearCart()}
                >
                  Continue Shopping
                </Button>
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderNow;
