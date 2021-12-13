import { API_Call } from ".";
import {
  loadStudentRecords,
  loadStudents,
  setRecords,
  setStudents,
} from "../reducers/students";

export const getStudents = API_Call({
  url: "student",
  method: "get",
  beforeAll: loadStudents,
  onSuccess: setStudents,
});

export const getStudentRecords = (id) =>
  API_Call({
    url: "student/records",
    method: "get",
    params: { id },
    beforeAll: loadStudentRecords,
    onSuccess: setRecords,
  });
