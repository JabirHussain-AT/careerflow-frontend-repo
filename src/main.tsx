import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify';
import "./index.css";
import { SocketProvider } from "./contexts/socketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ '945667014433-tji5rsqdamn5plvg1r12lsa17um1m116.apps.googleusercontent.com' }>
      <Provider store={store}>
      <SocketProvider>
        <App />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </SocketProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
