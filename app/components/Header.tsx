"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // hide when scrolling down past the hero, show again when scrolling up
      setHidden(y > 480 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={site.name}>
          <Logo />
          <span>
            <strong>Back Neck &amp; Joints</strong>
            <small>{site.doctor}</small>
          </span>
        </a>

        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Call the clinic
          </a>
        </nav>

        <button
          className={`menu-btn ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
