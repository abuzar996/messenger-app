import React, { memo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./chatList.styles.css";
import Card from "../../components/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { useDimentions } from "../../hooks/useDimentions";
const ListData = ({
  onClick,
  setOptionModalOpen,
  setScrollValue,
  mobileSize,
  searchFocus,
}) => {
  const { chatlist, loading } = useSelector((state) => state.chats);

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
    // setList(
    //   list.map((item) =>
    //     item.userId === data.userId
    //       ? {
    //           ...item,
    //           lastMessage: {
    //             ...data.lastMessage,
    //             opened: true,
    //           },
    //         }
    //       : item
    //   )
    // );
    navigate(`/app/messages/${data.userId}`);
  }
  return (
    <div
      className="chat-list-inner-container"
      style={
        mobileSize
          ? {
              borderBottomLeftRadius: "0",
            }
          : null
      }
      ref={reference}
    >
      {loading ? (
        <div className="loader-styles-list">
          <CircularProgress color="success" />
        </div>
      ) : chatlist.length > 0 ? (
        chatlist.map((value, index) => (
          <Card
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
