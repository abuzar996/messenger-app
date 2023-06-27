import React from "react";

import TopNav from "../TopNav";
import ListHeader from "../ListHeader";
import Card from "../../components/Card";
import "./chatList.styles.css";
const ChatList = () => {
  return (
    <div className="chat-list-container">
      <TopNav />
      <ListHeader />
      <div className="chat-list-inner-container">
        <Card />

        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default ChatList;
