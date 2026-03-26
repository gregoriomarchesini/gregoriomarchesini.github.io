import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Publications", path: "/publications" },
  { label: "Projects", path: "/projects" },
  { label: "Coding", path: "/coding" },
  { label: "CV", path: "/cv" },
  { label: "Teaching", path: "/teaching" },
  { label: "Art Gallery", path: "/art-gallery" },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between py-5">
        <Link to="/" className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors">
          Gregorio Marchesini
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-xs font-medium tracking-wider uppercase transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`font-body text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
