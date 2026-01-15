import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const goHomeScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 text-white shadow-xl transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          <div className="font-semibold">Election Awareness Nepal</div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-md hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <nav className="p-3 space-y-1">
          <button type="button" onClick={() => goHomeScroll("top")} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition">
            Home
          </button>
          <button type="button" onClick={() => goHomeScroll("awareness-video")} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition">
            Video
          </button>
          <button type="button" onClick={() => goHomeScroll("about-election")} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition">
            About Elections
          </button>
          <button type="button" onClick={() => goHomeScroll("peoples-opinion")} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition">
            People's Opinion
          </button>

          <Link to="/rank-leaders" onClick={onClose} className="block px-3 py-2 rounded-md hover:bg-white/10 transition">
            Rank Leaders
          </Link>

          <button type="button" onClick={() => goHomeScroll("resources")} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition">
            Resources
          </button>
          <button type="button" onClick={() => goHomeScroll("about-creator")} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition">
            About Me
          </button>
        </nav>
      </aside>
    </>
  );
}
