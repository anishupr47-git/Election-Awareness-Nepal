import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice.js";
import { useUi } from "../ui/UiContext.jsx";

const NavButton = ({ label, onClick }) => (
  <button onClick={onClick} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 transition" type="button">
    {label}
  </button>
);

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function scrollToIdWithRetry(id, tries = 40, delay = 50) {
  let count = 0;
  const timer = setInterval(() => {
    const ok = scrollToId(id);
    count += 1;
    if (ok || count >= tries) clearInterval(timer);
  }, delay);
}

export default function Navbar() {
  const { toggleSidebar, toggleChat } = useUi();
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(auth?.tokens?.access);

  const goScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      scrollToIdWithRetry(id);
      return;
    }
    scrollToIdWithRetry(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="w-10 h-10 rounded-md hover:bg-slate-100 transition flex items-center justify-center" type="button">
            <span className="text-xl leading-none">≡</span>
          </button>
          <Link to="/" className="font-semibold tracking-tight text-slate-900">
            Election Awareness Nepal
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <NavButton label="Home" onClick={() => goScroll("top")} />
          <NavButton label="Video" onClick={() => goScroll("video")} />
          <NavButton label="About Elections" onClick={() => goScroll("about-election")} />
          <NavButton label="People's Opinion" onClick={() => goScroll("peoples-opinion")} />
          <NavButton label="Rank Leaders" onClick={() => navigate("/rank-leaders")} />
          <NavButton label="Resources" onClick={() => goScroll("resources")} />
          <NavButton label="About Me" onClick={() => goScroll("about-creator")} />
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleChat} className="px-3 py-2 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition" type="button">
            ELECTU
          </button>

          {isLoggedIn ? (
            <button onClick={() => dispatch(logout())} className="px-3 py-2 rounded-md text-sm font-medium border border-slate-300 hover:bg-slate-100 transition" type="button">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="px-3 py-2 rounded-md text-sm font-medium border border-slate-300 hover:bg-slate-100 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
