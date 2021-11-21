import React from "react";
import { Route, Routes } from "react-router";
import AdminMainPage from "../components/AdminMainPage/AdminMainPage";
import CreateQueez from "../components/CreateQueez";
import CreateQuestion from "../components/CreateQuestion";
import Reports from "../components/Reports";

function AdminRouts() {
  return (
    <Routes>
      <Route path="Admin" element={<AdminMainPage />}>
        <Route path="Questions" element={<CreateQuestion />} />
        <Route path="Queezes" element={<CreateQueez />} />
        <Route path="Reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<AdminMainPage />} />
    </Routes>
  );
}

export default AdminRouts;
