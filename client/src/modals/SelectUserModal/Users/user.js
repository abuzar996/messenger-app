import React from "react";
import "./user.styles.css";
import { addFriends } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const User = ({ userId, firstname, lastname }) => {
  const dispatch = useDispatch();
  function onAddClicked(data) {
    dispatch(addFriends({ friendId: data.toString() }));
  }
  return (
    <div className="modal-user-container">
      <div>
        <div>
          <img
            className="user-image"
            src={require("../../../images/profile.jpg")}
            alt={"user"}
          />
        </div>

        <div className="option-label-div">
          <label className="option-label">{`${firstname} ${lastname}`}</label>
        </div>
      </div>

      <div className="option-icons">
        <div
          onClick={() => {
            onAddClicked(userId);
          }}
        >
          <PersonAddIcon className="option-icon-select" />
        </div>
        <div>
          <SendIcon className="option-icon-select" />
        </div>
      </div>
    </div>
  );
};

export default User;
