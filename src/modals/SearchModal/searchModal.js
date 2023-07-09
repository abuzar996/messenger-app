import React, { useEffect, useState } from "react";
import "./searchModal.styles.css";

import SearchList from "./searchList";
import { useDimentions } from "../../hooks/useDimentions";

const SearchModal = ({ modalOpen, width, left, height, top }) => {
  const [cWidth, setWidth] = useState(width);
  const [cLeft, setLeft] = useState(left);
  const windowSize = useDimentions();
  useEffect(() => {
    setLeft(cLeft);
    setWidth(cWidth);
    //console.log("lef Changed");
  }, [cLeft, cWidth, windowSize]);
  return (
    <div
      style={{ left: cLeft, width: cWidth, top: height + top + 4 }}
      className="search-modal-area-container"
    >
      <SearchList />
    </div>
  );
};

export default SearchModal;
