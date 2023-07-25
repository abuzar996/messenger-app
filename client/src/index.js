import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Applayout from "./containers/appLayout";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ChatBox from "./containers/ChatBox";
import Home from "./containers/Home/homeComponent";
import AuthUser from "./containers/AuthUser";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Error from "./containers/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/app",
        errorElement: <Error />,
        element: (
          <AuthUser>
            <App />
          </AuthUser>
        ),
        children: [
          {
            path: "messages/:id",
            element: <ChatBox />,
          },
          { path: "home", element: <Home /> },
          { index: true, element: <Navigate to="home" /> },
        ],
      },
      {
        index: true,
        element: <Navigate to="app" />,
      },
      {
        path: "signIn",
        errorElement: <Error />,
        element: <SignIn />,
      },
      {
        path: "signUp",
        errorElement: <Error />,
        element: <SignUp />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
