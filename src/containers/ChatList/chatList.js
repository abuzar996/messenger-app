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
  const [clientHeight, setClientHeight] = useState(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [xAxis, setXaxis] = useState(null);
  const [yAxis, setYaxis] = useState(null);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  function onClick(event, xValue, yValue) {
    if (xValue) {
      setXaxis(xValue);
      if (clientHeight) {
        if (
          yValue + clientHeight - scrollValue >
          refference.current.clientHeight
        ) {
          setYaxis(yValue - clientHeight + 18 - scrollValue);
          console.log(yAxis);
        } else {
          setYaxis(yValue - scrollValue);
          console.log(yAxis);
        }
      }
    }
  }

  return (
    <div ref={refference} className="chat-list-container">
      {optionModalOpen ? (
        <ChatOptionModal
          setHeight={setClientHeight}
          topVal={yAxis}
          leftVal={xAxis}
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
