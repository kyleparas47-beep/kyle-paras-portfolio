import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Topbar() {
  const { pathname } = useLocation();
  const ids = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(ids, pathname === "/");
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/#home">
          kyle@paras:~$
          <span className="caret" />
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
        <nav className={`nav${open ? " open" : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn primary small nav-cta" to="/#contact">
          Let's talk <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
