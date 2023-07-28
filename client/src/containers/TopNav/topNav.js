import React, { useEffect, useRef } from "react";
import "./topNav.styles.css";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/header";
import SelectUserMessageModal from "../../modals/SelectUserMessageModal";
import {
  openSendMessageModal,
  closeSendMessageModal,
} from "../../redux/slices/appSettingSlice";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useDimentions } from "../../hooks/useDimentions";

const TopNav = () => {
  const windowSize = useDimentions();
  const topNavRef = useRef();
  const dispatch = useDispatch();
  const { sendMessageModal } = useSelector((state) => state.appReducer);

  function closeModal() {
    dispatch(closeSendMessageModal());
  }

  useEffect(() => {
    localStorage.setItem("top-nav-height", topNavRef.current.clientHeight);
  }, [windowSize]);

  return (
    <div className="top-nav-container" ref={topNavRef}>
      {sendMessageModal ? (
        <SelectUserMessageModal modalOpen={closeModal} />
      ) : null}
      <Header>
        <div className="top-nav-inner-container">
          <div className="title-container">
            <div className="title-item">
              <label>Messaging</label>
            </div>
          </div>
          <div className="icon-container">
            <div
              className={sendMessageModal ? "icon-item-open" : "icon-item"}
              onClick={() => {
                dispatch(openSendMessageModal());
              }}
            >
              <ForwardToInboxIcon />
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default TopNav;
