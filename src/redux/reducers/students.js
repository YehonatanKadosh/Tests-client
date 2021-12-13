import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "students",
  initialState: { items: [], loading: false, records: [] },
  reducers: {
    setStudents: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    loadStudents: (state, action) => {
      state.loading = true;
    },
    setRecords: (state, action) => {
      state.records = action.payload;
      state.loading = false;
    },
    loadStudentRecords: (state, action) => {
      state.loading = true;
    },
    wipeAllStudents: (state, action) => {
      state.items = [];
      state.records = [];
    },
  },
});
export const {
  setStudents,
  setRecords,
  loadStudents,
  loadStudentRecords,
  wipeAllStudents,
} = slice.actions;

export default slice.reducer;
export const get_students = (state) => state.students.items;
export const get_students_records = (state) => state.students.records;
export const get_students_loading = (state) => state.students.loading;
