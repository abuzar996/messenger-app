import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./chatList.styles.css";
import Card from "../../components/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { useDimentions } from "../../hooks/useDimentions";
import { updateRecord } from "../../redux/slices/chatSlice";
const ListData = ({
  onClick,
  setOptionModalOpen,
  setScrollValue,
  searchFocus,
  tunnedChatList,
  loading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useDimentions();
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    let appHeader = +localStorage.getItem("MainHeader-height");
    let ListHeader = +localStorage.getItem("list-header-height");
    let listNav = +localStorage.getItem("top-nav-height");
    let val = appHeader + ListHeader + listNav + 6;

    setContainerHeight(((window.innerHeight - val) / window.innerHeight) * 100);
  }, [windowSize]);
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
    dispatch(updateRecord());
    navigate(`/app/messages/${data.userId}`);
  }
  return (
    <div
      id="list-data-cont-id"
      className="chat-list-inner-container"
      style={{ height: `${containerHeight}vh`, overflow: "scroll" }}
      ref={reference}
    >
      {loading ? (
        <div className="loader-styles-list">
          <CircularProgress color="success" />
        </div>
      ) : tunnedChatList.length > 0 ? (
        tunnedChatList.map((value, index) => (
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
