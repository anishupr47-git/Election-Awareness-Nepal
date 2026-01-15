import { useNavigate } from "react-router-dom";
import AuthModal from "../components/auth/AuthModal.jsx";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-10">
      <AuthModal open={true} onClose={() => navigate("/", { replace: true })} />
    </div>
  );
}
