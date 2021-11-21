import React from "react";
import { Route, Routes } from "react-router";
import ActionBar from "../components/Actions/ActionBar/ActionBar";
import CreateQueez from "../components/Queez";
import Reports from "../components/Reports";
import QuestionRouts from "./Question.routs";

function AdminRouts() {
  return (
    <Routes>
      <Route path="/" element={<ActionBar />} />
      <Route path="Questions/*" element={<QuestionRouts />} />
      <Route path="Queezes" element={<CreateQueez />} />
      <Route path="Reports" element={<Reports />} />
    </Routes>
  );
}

export default AdminRouts;
