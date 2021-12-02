import React from "react";
import { Route, Routes } from "react-router";
import { UserPage } from "../../pages";

function UserRouts() {
  return (
    <Routes>
      <Route path="*" element={<UserPage />} />
    </Routes>
  );
}

export default UserRouts;
