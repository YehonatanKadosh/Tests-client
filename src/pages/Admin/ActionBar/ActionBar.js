import { MenuBook, QuestionAnswer, Report, Topic } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActionButton from "../ActionButton/ActionButton";
import { setHeader, removeHeader } from "../../../redux/reducers/header";
import "./ActionBar.css";

function ActionBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader("Actions Bar"));
    return () => dispatch(removeHeader());
  }, [dispatch]);

  return (
    <div className="admin_page_actions row">
      <div className="row">
        <ActionButton name="Quizzes" icon={<MenuBook />} />
        <ActionButton name="Questions" icon={<QuestionAnswer />} />
      </div>
      <div className="row">
        <ActionButton name="Reports" icon={<Report />} />
        <ActionButton name="Topics" icon={<Topic />} />
      </div>
    </div>
  );
}

export default ActionBar;
