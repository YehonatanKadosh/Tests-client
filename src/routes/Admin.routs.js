import React from "react";
import { Route, Routes } from "react-router";
import ActionBar from "../components/Actions/ActionBar/ActionBar";
import CreateQueez from "../components/Queez";
import CreateQuestion from "../components/Question";
import Reports from "../components/Reports";

function AdminRouts() {
  return (
    <Routes>
      <Route path="/" element={<ActionBar />} />
      <Route path="Questions" element={<CreateQuestion />} />
      <Route path="Queezes" element={<CreateQueez />} />
      <Route path="Reports" element={<Reports />} />
    </Routes>
  );
}

export default AdminRouts;
