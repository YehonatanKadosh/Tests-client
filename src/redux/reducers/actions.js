import { MenuBook, QuestionAnswer, Report, Topic } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "actions",
  initialState: [
    { name: "Qeezes", rout: "Queezes", icon: <MenuBook /> },
    { name: "Questions", rout: "Questions", icon: <QuestionAnswer /> },
    { name: "Reports", rout: "Reports", icon: <Report /> },
    { name: "Topics", rout: undefined, icon: <Topic /> },
  ],
  reducers: {
    setAction: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { setAction } = slice.actions;

export default slice.reducer;
export const get_actions = (state) => state.actions;
