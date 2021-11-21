import React from "react";
import "./AdminMainPage.css";
import AdminPageButton from "./components/AdminPageButton";
import { MenuBook, QuestionAnswer, Report, Topic } from "@mui/icons-material";
import AdminBar from "./components/AdminBar";

function AdminMainPage() {
  return (
    <>
      <div className="admin_page_container">
        <AdminBar />
        <div className="admin_page_actions row">
          <div className="row">
            <AdminPageButton value="Queezes" icon={<MenuBook />} />
            <AdminPageButton value="Questions" icon={<QuestionAnswer />} />
          </div>
          <div className="row">
            <AdminPageButton value="Topics" icon={<Topic />} />
            <AdminPageButton value="Reports" icon={<Report />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMainPage;
