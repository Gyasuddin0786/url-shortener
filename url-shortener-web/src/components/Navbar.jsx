import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    const initialDark = storedMode ? storedMode === "dark" : false;
    setDark(initialDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    if (dark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-slate-950", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-slate-950", "text-white");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white text-slate-900 shadow-sm backdrop-blur transition duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => navigate('/')} className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          URL Shortener
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            title="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
              title="Open profile menu"
            >
              👤
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <button onClick={() => { setMenuOpen(false); navigate('/dashboard'); }} className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                  📊 Dashboard
                </button>
                <button onClick={() => { setMenuOpen(false); navigate('/history'); }} className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                  📜 History
                </button>
                <button onClick={() => { setMenuOpen(false); navigate('/profile'); }} className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                  👤 Profile
                </button>
                <div className="border-t border-slate-200 dark:border-slate-700"></div>
                <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-red-600 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
