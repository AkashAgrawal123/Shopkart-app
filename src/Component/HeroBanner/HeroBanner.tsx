import React from "react";
import "./HeroBanner.scss";
import "../../styles/globalStyle.scss";
// import { Outlet } from "react-router-dom";
// import Products from "../Products/Products";

const Home = () => {
  return (
    <>
      <section className="homepage__hero">
        <div className="shopCart-container">
          <div className="homepage__hero--content">
            <div className="homepage__hero--description">
              <div className="homepage__hero--description-heading">
                <h1 className="homepage__hero--description-title1">
                  shopping and
                </h1>
              </div>
              <div className="homepage__hero--description-heading2 mb-30">
                <h1 className="homepage__hero--description-title2">
                  department store.
                </h1>
              </div>
              <div className="homepage__hero--description-heading">
                <p className="homepage__hero--description-text">
                  Shopping is a bit of a relaxing hobby for me, which is
                  sometimes troubling for the bank balance.
                </p>
              </div>
            </div>
            <div className="homepage__hero--button">
              <a className="homepage__hero--button-text">
                <div className="homepage__hero--button-div">
                  <div className="homepage__hero--button-text__color">
                    Learn More
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="homepage__hero--container-image">
          <div className="homepage__hero--image">
            <img src="/heroBanner/stairs.png" alt="background staircases" />
          </div>
          <div className="homepage__hero--image-one">
            <img src="/heroBanner/bags.png" />
          </div>
          <div className="homepage__hero--image-two">
            <img src="/heroBanner/suitcase.png" />
          </div>
          <div className="homepage__hero--image-three">
            <img src="/heroBanner/controllers.png" />
          </div>
          <div className="homepage__hero--image-four">
            <img src="/heroBanner/snacks.png" />
          </div>
        </div>
        {/* <Outlet /> */}
      </section>
      {/* <Products /> */}
    </>
  );
};

export default Home;
