import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./chatList.styles.css";
import Card from "../../components/Card";
import { useDimentions } from "../../hooks/useDimentions";
const ListData = ({
  data,
  onClick,
  setOptionModalOpen,
  setScrollValue,
  mobileSize,
}) => {
  const [list, setList] = useState(data);
  const navigate = useNavigate();
  useDimentions();
  const reference = useRef(null);

  useEffect(() => {
    const element = reference.current;
    function scrollEvent() {
      setScrollValue(element.scrollTop);
    }
    element.addEventListener("scroll", scrollEvent);
    return () => element.removeEventListener("scroll", scrollEvent);
  });

  function onMessageClick(data) {
    setList(
      list.map((item) =>
        item.userId === data.userId
          ? {
              ...item,
              lastMessage: {
                ...data.lastMessage,
                opened: true,
              },
            }
          : item
      )
    );
    navigate(`/messages/${data.userId}`);
  }
  return (
    <div
      className="chat-list-inner-container"
      style={mobileSize ? { borderBottomLeftRadius: "0" } : null}
      ref={reference}
    >
      {list
        ? list.map((value, index) => (
            <Card
              setList={setList}
              onMessageClick={onMessageClick}
              key={index}
              {...value}
              onClick={onClick}
              data={value}
              modalOpen={setOptionModalOpen}
              index={index}
            />
          ))
        : null}
    </div>
  );
};

export default ListData;
