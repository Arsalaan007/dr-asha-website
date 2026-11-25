"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

const tel = `tel:${site.phone.replace(/\s/g, "")}`;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false); // header is over a dark section → switch to light theme
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const darkEls = [...document.querySelectorAll<HTMLElement>("[data-nav='dark']")];
    let hiddenNow = false;
    let darkNow = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      // hide when scrolling down past the hero, show again when scrolling up
      const h = y > 480 && y > last + 4 ? true : y < last - 4 ? false : hiddenNow;
      last = y;
      if (h !== hiddenNow) setHidden((hiddenNow = h));
      // which section sits under the header bar? (only re-render when it changes)
      const probe = 36;
      const dark = darkEls.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      if (dark !== darkNow) setOnDark((darkNow = dark));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock page scroll and support Esc while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 250);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  const close = () => setOpen(false);
  const theme = open ? "theme-dark" : onDark ? "theme-light" : "theme-dark";

  return (
    <>
      <header className={`header ${theme} ${hidden && !open ? "is-hidden" : ""} ${open ? "menu-open" : ""}`}>
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label={site.name} onClick={close}>
            <Logo />
            <span>
              <strong>Back Neck &amp; Joints</strong>
              <small>{site.doctor}</small>
            </span>
          </a>

          <nav className="nav" aria-label="Main">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href={tel} className="btn btn-primary nav-cta">
              Call the clinic
            </a>
          </nav>

          <button
            className={`menu-btn ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`menu-pop ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="menu-links" aria-label="Mobile">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              ref={i === 0 ? firstLink : undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu-foot" style={{ "--i": nav.length } as React.CSSProperties}>
          <a href={tel} className="btn btn-primary btn-block" onClick={close}>
            Call the clinic
          </a>
          <p>
            {site.locations.map((l) => l.area.replace(", Mumbai", "")).join(" · ")}
          </p>
        </div>
      </div>
    </>
  );
}
