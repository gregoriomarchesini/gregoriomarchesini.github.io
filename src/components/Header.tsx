import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Publications", path: "/publications" },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between py-6">
        <Link to="/" className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors">
          Your Name
        </Link>
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm font-medium tracking-wide uppercase transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
