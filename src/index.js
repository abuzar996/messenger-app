import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ChatBox from "./containers/ChatBox";
import Home from "./containers/Home/homeLayout";
if (window.location.pathname === "/") {
  window.location.replace("./app");
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      exact: true,
      element: <App />,
      // loader: () => {
      //   //return redirect("/home");
      // },
      children: [
        {
          path: "messages/:id",
          // loader: () => {
          //   console.log("loading");
          //   return null;
          // },
          element: <ChatBox />,
        },
        { path: "home", element: <Home /> },
        { index: true, element: <Navigate to="/home" /> },
      ],
    },
  ],
  { basename: "/app" }
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
