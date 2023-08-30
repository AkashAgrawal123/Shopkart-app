import { BsTelephone } from "react-icons/bs";
import "./contactBanner.scss";
import Select from "react-select";
import "../../styles/globalStyle.scss";

const ContactBanner = () => {

  // function
  const goToProductList = () => {
    window.scrollTo({ top: 850, left: 0, behavior: "smooth" });
  };

  const language = [
    { value: "Eng", label: "English" },
    { value: "Fr", label: "French" },
    { value: "Spn", label: "Spanish" },
    { value: "Gr", label: "German" },
  ];

  const country = [
    { value: "IN", label: "India" },
    { value: "JP", label: "Japan" },
    { value: "NZ", label: "New Zealand" },
    { value: "My", label: "Malaysia" },
  ];

  return (
    <>
      <section className="contact__banner">
        <div className="shopCart-container">
          <div className="contact__banner--wrapper flex justify-between py-2">
            <div className="contact__banner--phone-number items-center">
              <BsTelephone className="contact__banner--icon" />
              <p className="contact__banner--number">+001234567890</p>
            </div>
            <div className="contact__banner--text flex items-center">
              <p className="contact__banner--text-heading">
                Get 50% Off on Selected Items
              </p>
              <button
                className="contact__banner--link-text"
                onClick={goToProductList}
              >
                Shop Now
              </button>
            </div>
            <div className="contact__banner--lang-location flex">
              <div className="contact__banner--language-selector cursor-pointer">
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={language}
                  defaultValue={language[0]}
                  isSearchable={false}
                />
              </div>
              <div className="contact__banner--location-selector cursor-pointer">
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={country}
                  defaultValue={country[0]}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactBanner;
