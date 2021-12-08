import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import { CreateQueezPage, SearchQueezPage } from "../../pages";

function QueezRouts() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="Create"
        element={<CreateQueezPage navigate={() => navigate("/Queezes")} />}
      />
      <Route path="*" element={<SearchQueezPage />} />
    </Routes>
  );
}

export default QueezRouts;
