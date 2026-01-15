import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/authSlice.js";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RankLeadersPage from "./pages/RankLeadersPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rank-leaders" element={<RankLeadersPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
