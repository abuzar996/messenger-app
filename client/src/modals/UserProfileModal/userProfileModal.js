import React, { useEffect } from "react";
import "./userProfileModal.styles.css";
import { useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";
import PeopleIcon from "@mui/icons-material/People";
import profile from "../../images/profile.jpg";
//import { addFriends } from "../../../redux/slices/userSlice";
import { addFriends } from "../../redux/slices/userSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import { checkIfUserHasFriend } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const UserProfileModal = ({ setModalOpen }) => {
  const { profileData } = useSelector((state) => state.appReducer);
  const { isFriend } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkIfUserHasFriend(profileData.userId));
  }, [dispatch, profileData]);

  return (
    <Overlay modalOpen={setModalOpen}>
      {profileData && (
        <div className="user-profile-modal-container">
          <div className="user-profile-header">
            <div>
              <label>{`${profileData.firstname} ${profileData.lastname}`}</label>
            </div>
            {!isFriend && (
              <div
                onClick={() => {
                  dispatch(
                    addFriends({ friendId: profileData.userId.toString() })
                  );
                  //console.log();
                  //onAddClicked(profileData.userId);
                }}
              >
                <PersonAddIcon className="user-profile-add-icon" />
              </div>
            )}
            {isFriend && (
              <div>
                <PeopleIcon className="user-profile-add-icon" />
              </div>
            )}
          </div>
          <div className="user-profile-image-container">
            <img className="user-profile-image" src={profile} alt={"profile"} />
          </div>
          <div className="user-profile-info">
            <div className="user-profile-info-user-name">
              <div>
                <PersonIcon className="user-profile-add-icon" />
              </div>
              <div>
                <label className="user-profile-label">
                  {profileData.email}
                </label>
              </div>
            </div>
          </div>
          <div className="user-profile-info"></div>
          <div className="user-profile-button-container">
            <div className="user-profile-close-button">
              <button
                className="message-button"
                onClick={() => {
                  navigate(`/app/messages/${profileData.userId}`);
                }}
              >
                Send a message
              </button>
            </div>
            <div className="user-profile-close-button">
              <button
                className="close-button"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default UserProfileModal;
