import { Route, Routes } from "react-router";
import Home from "../pages/Home";

function AppRouter() {
  sessionStorage.setItem("pageNum", 1);
  sessionStorage.setItem("pageNumLang", 1);
  localStorage.setItem("countries", null);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRouter;
