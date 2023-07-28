import React, { useEffect } from "react";
import "./selectUserMessageModal.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessageModal } from "../../redux/slices/appSettingSlice";
import User from "./Users";
import Overlay from "../../components/Overlay";
import { getAllFriends } from "../../redux/slices/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
const SelectUserMessageModal = ({ modalOpen }) => {
  const { friends, listLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFriends());
  }, [dispatch]);
  return (
    <Overlay modalOpen={modalOpen}>
      <div className="select-message-user-modal-container">
        <div className="select-message-user-modal-header">
          <div>
            <label>Select To Send message</label>
          </div>
        </div>
        <div className="select-message-user-modal-body">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend.userId}>
                <User {...friend} />
              </div>
            ))
          ) : listLoading ? (
            <div className="user-loader-styles-userslist">
              <CircularProgress color="success" />
            </div>
          ) : (
            <div className="select-message-no-user-record">
              <label className="select-message-no-user-record-label">
                No Users Found!
              </label>
            </div>
          )}
        </div>
        <div style={{ marginTop: "5px", padding: "10px" }}>
          <button
            className="select-message-user-close-button"
            onClick={() => {
              dispatch(closeSendMessageModal());
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default SelectUserMessageModal;
