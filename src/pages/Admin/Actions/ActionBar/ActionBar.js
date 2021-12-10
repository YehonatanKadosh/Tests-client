import { MenuBook, QuestionAnswer, Report, Topic } from "@mui/icons-material";
import React from "react";
import ActionButton from "../ActionButton/ActionButton";
import "./ActionBar.css";

function ActionBar() {
  return (
    <div className="admin_page_actions row">
      <div className="row">
        <ActionButton name="Quizes" rout="Quizes" icon={<MenuBook />} />
        <ActionButton
          name="Questions"
          rout="Questions"
          icon={<QuestionAnswer />}
        />
      </div>
      <div className="row">
        <ActionButton name="Reports" rout="Reports" icon={<Report />} />
        <ActionButton name="Topics" icon={<Topic />} />
      </div>
    </div>
  );
}

export default ActionBar;
