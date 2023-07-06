import React, { useRef, useState } from "react";
import "./chatList.styles.css";

import TopNav from "../TopNav";
import ListHeader from "../ListHeader";

import ChatOptionModal from "../../modals/ChatOptionsModal";
import ListData from "./listData";
const data = [
  {
    name: "Abuzar",
  },
  {
    name: "Alex",
  },
  {
    name: "Jhon",
  },
  {
    name: "Alpha",
  },
  {
    name: "Abuzar",
  },
  {
    name: "Alex",
  },
  {
    name: "Jhon",
  },
  {
    name: "Alpha",
  },
  {
    name: "Abuzar",
  },
  {
    name: "Alex",
  },
  {
    name: "Jhon",
  },
  {
    name: "Alpha",
  },
];
const ChatList = () => {
  const refference = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [optionModalOpen, setOptionModalOpen] = useState(false);

  function setValues(xValue, yValue) {
    let cHeight = +localStorage.getItem("height");
    let cWidth = +localStorage.getItem("width");
    if (cHeight && cWidth) {
      localStorage.setItem("xAxis", xValue - cWidth + 18);
      if (cHeight) {
        if (yValue + cHeight - scrollValue > refference.current.clientHeight) {
          localStorage.setItem("yAxis", yValue - cHeight + 18 - scrollValue);
        } else {
          localStorage.setItem("yAxis", yValue - scrollValue);
        }
      }
    }
  }

  function onClick(event, xValue, yValue) {
    if (xValue) {
      console.log(xValue);
      console.log(yValue);
      setValues(xValue, yValue);
    }
  }

  return (
    <div ref={refference} className="chat-list-container">
      {optionModalOpen ? (
        <ChatOptionModal
          topVal={+localStorage.getItem("yAxis")}
          leftVal={+localStorage.getItem("xAxis")}
          modalOpen={setOptionModalOpen}
        />
      ) : null}
      <TopNav />
      <ListHeader />
      <ListData
        setScrollValue={setScrollValue}
        data={data}
        onClick={onClick}
        setOptionModalOpen={setOptionModalOpen}
      />
    </div>
  );
};

export default ChatList;
