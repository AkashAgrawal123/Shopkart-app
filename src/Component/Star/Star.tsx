import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "../../styles/globalStyle.scss";
import "./Star.scss";
import { Rating } from "../../Types/StarInterface";

const Star: React.FC<Rating> = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (_element, index) => {
    const number = index + 0.5;

    return (
      <span key={index}>
        {Number(stars) >= index + 1 ? (
          <FaStar className="icon" />
        ) : Number(stars) >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });
  return (
    <div className="icons">
      <div className="icon-style">
        {ratingStar}
        <p>({reviews})</p>
      </div>
    </div>
  );
};

export default Star;
