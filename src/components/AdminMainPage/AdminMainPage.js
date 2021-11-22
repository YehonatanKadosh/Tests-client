import React, { useEffect } from "react";
import AdminRouts from "../../routes/Admin.routs";
import "./AdminMainPage.css";
import MainBar from "../MainBar/MainBar";
import { useDispatch } from "react-redux";
import { loadTopics, setTopics } from "../../redux/reducers/topic";
import { loadTags, setTags } from "../../redux/reducers/tag";
import { API_Call } from "../../redux/middlewares/api";

function AdminMainPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      API_Call({
        url: "topic",
        method: "get",
        beforeAll: loadTopics,
        onSuccess: setTopics,
      })
    );
    dispatch(
      API_Call({
        url: "tag",
        method: "get",
        beforeAll: loadTags,
        onSuccess: setTags,
      })
    );
  }, [dispatch]);

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
