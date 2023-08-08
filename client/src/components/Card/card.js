import React, { useRef, useEffect } from "react";
import "./card.styles.css";
import "../../App.css";
//import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import users from "../../images/user.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDimentions } from "../../hooks/useDimentions";
import { changeMessageInfo } from "../../redux/slices/chatSlice";
const Card = ({
  modalOpen,
  firstname,
  lastname,
  lastMessage,
  onMessageClick,
  data,
}) => {
  const dispatch = useDispatch();
  //const { id } = useParams();
  //console.log(+id);
  const { user } = useSelector((state) => state.user);
  //const [seen, setSeen] = useState(false);
  const windowSize = useDimentions();
  const references = useRef(null);

  // useEffect(() => {
  //   if (!lastMessage) {
  //     console.log("hello");
  //     // dispatch(
  //     //   deleteChatRecord({
  //     //     userId: user.userId,
  //     //     clientId: +id,
  //     //   })
  //     // );
  //   }
  // }, [lastMessage, dispatch, id, user]);
  function onHandleClick(event, data) {
    if (event.target.id === "inner-option") {
      modalOpen(true);
      dispatch(changeMessageInfo(data));
      localStorage.setItem(
        "chat_options_offsety",
        references?.current?.offsetTop
      );
    } else {
      onMessageClick(data);
    }
  }
  useEffect(() => {
    localStorage.setItem(
      "chat_options_offsetx",
      references?.current?.offsetLeft
    );
  }, [windowSize]);

  return (
    <div
      className="card-body"
      onClick={(event) => {
        onHandleClick(event, data);
      }}
    >
      <div className="img-container">
        <img className="image" src={users} alt="user" />
      </div>
      <div className="data-body">
        <div className="data-container align-center padding-left padding-top">
          <div>
            <label className="user-name">{firstname} </label>
            <label className="user-name">{lastname}</label>
          </div>
          <div ref={references} className="padding-right">
            <MoreHorizIcon
              id="inner-option"
              fontSize="small"
              className="option "
              onClick={(event) => onHandleClick(event, data)}
            />
          </div>
        </div>
        <div className="data-container padding-left">
          <label>
            {/* <span className={!seen ? "un-opened-bold" : null}> */}
            {lastMessage
              ? lastMessage.sender === user.firstname
                ? "You sent a message"
                : firstname + " sent you a message"
              : "Start a conversation"}
            {/* </span> */}
          </label>
          {/* {!seen && <FiberManualRecordIcon className="padding-right" />} */}
        </div>
      </div>
    </div>
  );
};

export default Card;
