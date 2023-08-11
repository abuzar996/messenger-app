import React, { useEffect, useRef } from "react";
import "./chatHeader.styles.css";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";
import img2 from "../../images/img2.jpg";
//import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { useDimentions } from "../../hooks/useDimentions";
const ChatHeader = ({
  searchValue,
  setSearchValue,
  searchFocus,
  setSearchFocus,
}) => {
  const Ref = useRef();
  const windowSize = useDimentions();
  const navigate = useNavigate();
  const { userById } = useSelector((state) => state.user);

  useEffect(() => {
    if (Ref) {
      localStorage.setItem("chat-header-height", Ref.current.clientHeight);
    }
  }, [windowSize]);

  function onInputChange(e) {
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
  }
  function onBackClick() {
    navigate("/app/home");
  }

  return (
    <div ref={Ref} className="chat-header">
      <div className="chat-name-container">
        <div className="back-item">
          <ArrowBackIcon onClick={onBackClick} />
        </div>
        <div className="chat-name">
          <label>{userById.firstname}</label>
        </div>
      </div>
      <div className="chat-search-container">
        <Search
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
          onChange={onInputChange}
          searchValue={searchValue}
          refresh={refresh}
          key={"1"}
          searchData={"Search converstions"}
        />
      </div>
      <div className="chat-icons-container">
        <img
          src={img2}
          alt="img"
          style={{ width: "20px", height: "30px", borderRadius: "50%" }}
        ></img>
      </div>
    </div>
  );
};

export default ChatHeader;
