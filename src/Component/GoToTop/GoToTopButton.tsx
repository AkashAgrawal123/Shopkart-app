import { useEffect, useState } from "react";
import "./GoToTopButton.scss";
import { FaArrowUp } from "react-icons/fa";
import "../../styles/globalStyle.scss";
import React from "react";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToTopBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const listenToScroll = () => {
    const heightToHide = 300;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (windowScroll > heightToHide) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      <section className="goToTop__button">
        {isVisible && (
          <div className="goToTop__button--arrow" onClick={goToTopBtn}>
            <FaArrowUp className="goToTop__button--arrow-icon" />
          </div>
        )}
      </section>
    </>
  );
};

export default GoToTopButton;
