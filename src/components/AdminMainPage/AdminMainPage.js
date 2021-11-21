import React from "react";
import AdminRouts from "../../routes/Admin.routs";
import "./AdminMainPage.css";
import MainBar from "../MainBar/MainBar";

function AdminMainPage(props) {
  return (
    <>
      <div className="admin_page_container">
        <MainBar />
        <AdminRouts />
      </div>
    </>
  );
}

export default AdminMainPage;
