import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useProductStore from "../../Store/ProductStore";
import "./Search.scss";
import React from "react";

const Search = () => {
  // hooks
  const [searchValue, setSearchValue] = useState("");

  // store
  const { handleOnSubmit, handleOnBlur } = useProductStore();

  // functions
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    handleOnSubmit(searchValue);

    window.scroll({
      top: window.pageYOffset + 850,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="search">
        <form
          action="/search"
          className="search__form"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            className="search__form--input-box"
            placeholder="Search Product"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => handleOnBlur()}
          />
          <BiSearch className="search__form--icon" />
        </form>
      </div>
    </>
  );
};

export default Search;
