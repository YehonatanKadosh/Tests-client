import React from "react";
import { Route, Routes } from "react-router";
import { CreateQueezPage } from "../../pages";

function QueezRouts() {
  return (
    <Routes>
      <Route path="Create" element={<CreateQueezPage />} />
      <Route path="*" element={<CreateQueezPage />} />
    </Routes>
  );
}

export default QueezRouts;
