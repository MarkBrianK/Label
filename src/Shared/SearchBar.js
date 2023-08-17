import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
      <div className="container">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn--bs-tertiary-bg btn-outline-$gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
  );
}
