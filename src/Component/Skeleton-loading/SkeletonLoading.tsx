import React from "react";
import "./SkeletonLoading.scss";
import "../../styles/globalStyle.scss";

interface SkeletonLoadingPropsInterface {
  count: number;
}

const SkeletonLoading = (props: SkeletonLoadingPropsInterface) => {
  const { count } = props;

  const skeletonElement = Array.from({ length: count }, (_, index) => (
    <div key={index} className="shopCart-skeleton__loading--content ">
      <div className="shopCart-skeleton__loading--card"></div>
      <div className="shopCart-skeleton__loading--heading-wrapper">
        <div className="shopCart-skeleton__loading--name"></div>
        <div className="shopCart-skeleton__loading--price"></div>
      </div>
      <div className="shopCart-skeleton__loading--description"></div>
      <div className="shopCart-skeleton__loading--rating">
        <div className="shopCart-skeleton__loading--star-rating"></div>
        <div className="shopCart-skeleton__loading--reviews"></div>
      </div>
      <div className="shopCart-skeleton__loading--button"></div>
    </div>
  ));

  return (
    <>
      <div className="shopCart-skeleton__loading shopCart-skeleton__loading--animation">
        <div className="shopCart-skeleton__loading--wrapper">
          {skeletonElement}
        </div>
      </div>
    </>
  );
};

export default SkeletonLoading;
