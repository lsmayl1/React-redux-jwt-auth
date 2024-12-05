import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Login from "./pages/Login";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
