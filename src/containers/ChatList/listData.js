import React, { useEffect, useRef } from "react";
import "./chatList.styles.css";
import Card from "../../components/Card";
const ListData = ({ data, onClick, setOptionModalOpen, setScrollValue }) => {
  const reference = useRef(null);
  useEffect(() => {
    const element = reference.current;
    function scrollEvent(event) {
      setScrollValue(element.scrollTop);
    }
    element.addEventListener("scroll", scrollEvent);
    return () => element.removeEventListener("scroll", scrollEvent);
  });
  return (
    <div className="chat-list-inner-container" ref={reference}>
      {data
        ? data.map((value, index) => (
            <Card
              key={index}
              {...value}
              onClick={onClick}
              modalOpen={setOptionModalOpen}
              index={index}
            />
          ))
        : null}
    </div>
  );
};

export default ListData;
