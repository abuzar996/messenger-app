import React from "react";
import "./user.styles.css";
import { useDispatch } from "react-redux";
import { openProfileModal } from "../../../redux/slices/appSettingSlice";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
const User = ({ firstname, lastname, userId, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="modal-message-user-container">
      <div>
        <div>
          <img
            className="user-message-image"
            src={require("../../../images/profile.jpg")}
            alt={"user"}
          />
        </div>
        <div
          className="option-message-label-div"
          onClick={() => {
            dispatch(openProfileModal({ userId, firstname, lastname, email }));
          }}
        >
          <label className="option-message-label">
            {`${firstname} ${lastname}`}
          </label>
        </div>
      </div>
      <div className="option-message-icons">
        <div>
          <SendIcon
            className="option-message-icon-select"
            onClick={() => {
              navigate(`/app/messages/${userId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
