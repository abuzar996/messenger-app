import React, { useEffect, useState } from "react";
import "./homeComponent.styles.css";
import HomeHeader from "../homeHeader";
import HomeBody from "../homeBody";
import { useDimentions } from "../../../hooks/useDimentions";
import ChatList from "../../ChatList";
import { useSelector, useDispatch } from "react-redux";
import { storeId } from "../../../redux/slices/userSlice";
//import { setUserNull } from "../../../redux/slices/userSlice";
const HomeComponent = () => {
  const dispatch = useDispatch();
  const { chatsHidden } = useSelector((state) => state.appReducer);
  const [mobileSize, setMobileSize] = useState(false);

  const windowSize = useDimentions();
  useEffect(() => {
    if (windowSize.width <= 600) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, [windowSize, mobileSize]);
  useEffect(() => {
    dispatch(storeId(-1));
  }, [dispatch]);
  return (
    <div className="home-component-layout-container">
      {!mobileSize ? (
        <>
          <HomeHeader />
          <HomeBody />
        </>
      ) : !chatsHidden ? (
        <ChatList />
      ) : (
        <>
          <HomeHeader />
          <HomeBody />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
