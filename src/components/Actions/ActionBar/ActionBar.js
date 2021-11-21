import React from "react";
import { useSelector } from "react-redux";
import { get_actions } from "../../../redux/reducers/actions";
import ActionButton from "../ActionButton/ActionButton";
import "./ActionBar.css";

function ActionBar() {
  const actions = useSelector(get_actions);

  const getChunks = () => {
    if (actions) {
      const temporary = [];
      for (let i = 0, j = actions.length; i < j; i += 2) {
        temporary.push(actions.slice(i, i + 2));
      }
      return temporary;
    } else return [];
  };

  return (
    <div className="admin_page_actions row">
      {actions.length >= 2 &&
        getChunks().map((actionsChunk, index) => (
          <div className="row" key={index}>
            <ActionButton {...actionsChunk[0]} />
            <ActionButton {...actionsChunk[1]} />
          </div>
        ))}
    </div>
  );
}

export default ActionBar;
