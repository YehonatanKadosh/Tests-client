import React from "react";
import { Route, Routes } from "react-router";
import { UserPage } from "../pages";
import { AppNavBar } from "../UiElements";
import "./Rout.css";

function UserRouts() {
  return (
    <div className="page_container">
      <AppNavBar />
      <Routes>
        <Route path="*" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default UserRouts;
