import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./selectUserModal.styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import Overlay from "../../components/Overlay";
import User from "./Users";
import { getAllUsers } from "../../redux/slices/userSlice";

import { closeAddfriendsModal } from "../../redux/slices/appSettingSlice";
const SelectUserModal = ({ modalOpen, handleUserClick }) => {
  const dispatch = useDispatch();
  const { usersList, listLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Overlay modalOpen={modalOpen}>
      <div className="select-user-modal-container">
        <div className="select-user-modal-header">
          <div>
            <label>Quick Add</label>
          </div>
        </div>
        <div className="select-user-modal-body">
          {usersList.length > 0 ? (
            usersList.map((user) => (
              <div key={user.userId}>
                <User {...user} handleUserClick={handleUserClick} />
              </div>
            ))
          ) : listLoading ? (
            <div className="user-loader-styles-userslist">
              <CircularProgress color="success" />
            </div>
          ) : (
            <div className="select-user-no-user-record">
              <label className="select-user-no-user-record-label">
                No Users Found!
              </label>
            </div>
          )}
        </div>
        <div style={{ marginTop: "5px", padding: "10px" }}>
          <button
            className="select-user-close-button"
            onClick={() => dispatch(closeAddfriendsModal())}
          >
            Close
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default SelectUserModal;
