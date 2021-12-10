import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";

import { QuizRouts, QuestionRouts, ReportRouts } from "..";
import { AdminPage } from "../../pages";
import { getTopics } from "../../redux/api";
import { AppNavBar } from "../../UiElements";

import "./Admin.css";
function AdminRouts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopics);
  }, [dispatch]);

  return (
    <div className="admin_page_container">
      <AppNavBar />
      <Routes>
        <Route path="*" element={<AdminPage />} />
        <Route path="Questions/*" element={<QuestionRouts />} />
        <Route path="Quizes/*" element={<QuizRouts />} />
        <Route path="Reports/*" element={<ReportRouts />} />
      </Routes>
    </div>
  );
}

export default AdminRouts;
