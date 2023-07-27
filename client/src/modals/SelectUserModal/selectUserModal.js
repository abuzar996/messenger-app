import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./selectUserModal.styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import Overlay from "../../components/Overlay";
import User from "./Users";
import { getAllUsers } from "../../redux/slices/userSlice";

const SelectUserModal = ({ modalOpen }) => {
  const dispatch = useDispatch();
  const { usersList, listLoading } = useSelector((state) => state.user);
  console.log(listLoading);
  useEffect(() => {
    if (usersList.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, usersList]);
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
                <User {...user} />
              </div>
            ))
          ) : listLoading ? (
            <div className="user-loader-styles-userslist">
              <CircularProgress color="success" />
            </div>
          ) : null}
        </div>
        <div style={{ marginTop: "5px", padding: "10px" }}>
          <button
            className="select-user-close-button"
            onClick={() => modalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default SelectUserModal;
