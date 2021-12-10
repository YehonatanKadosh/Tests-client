import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { tryGettingQueez } from "../../redux/api";
import { get_queez } from "../../redux/reducers/queez";
import { get_request_loading } from "../../redux/reducers/request";
import { AppNavBar } from "../../UiElements";
import ShowQueez from "../Queez/Show/ShowQueez";

function User() {
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector(get_request_loading);
  const { _id } = useSelector(get_queez);

  useEffect(() => {
    dispatch(tryGettingQueez(location.pathname.substr(1)));
  }, [dispatch, location.pathname]);

  return (
    <>
      <AppNavBar />
      {!loading ? (
        _id ? (
          <ShowQueez />
        ) : (
          <Typography>Queez not found</Typography>
        )
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default User;
