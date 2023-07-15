import React, { memo, useEffect, useRef, useState } from "react";
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
  searchFocus,
}) => {
  const [list, setList] = useState([...data]);
  const navigate = useNavigate();
  useDimentions();
  const reference = useRef(null);
  useEffect(() => {
    setList([...data]);
  }, [data]);
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
      {list.length > 0 ? (
        list.map((value, index) => (
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
      ) : (
        <div className="message-div-container">
          <div className="message-div-container-v2">
            <label>
              {searchFocus
                ? "No data on Search found!"
                : "No previous Chats found"}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ListData);
