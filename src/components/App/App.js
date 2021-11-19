import Login from "../Login/Login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import PasswordRecovery from "../PasswordRecovery/PasswordRecovery";
function App() {
  return (
    <Routes>
      <Route path="Signin" element={<Login />} />
      <Route path="PasswordRecovery" element={<PasswordRecovery />} />
      <Route path="Signup" element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
