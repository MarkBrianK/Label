import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../Assets/Styles/SearchBar.css";

export default function SearchBar({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2 rounded-pill"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleSearchChange}
      />
      <button className="btn btn--bs-tertiary-bg btn-outline-$gray-400">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
