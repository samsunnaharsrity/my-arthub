"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "../themeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const links = [
    { name: "Browse Art", href: "/artworks" },
    { name: "Artists", href: "/artist" },
    { name: "Categories", href: "/categories" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/");
  };

  const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

  return (
    <>
      <style>{`
        :root {
          --green: #16352E;
          --green-light: #1f4a40;
          --green-soft: rgba(22, 53, 46, 0.12);
        }

        .nav-link {
          position: relative;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(22, 53, 46, 0.65);
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }

        .dark .nav-link{
          color: rgba(255,255,255,.7);
        }

        .dark .nav-link:hover,
        .dark .nav-link.active{
          color:#fff;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--green);
          transition: width 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--green);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .logo-glow {
          box-shadow: 0 0 0 0 rgba(22, 53, 46, 0.4);
          animation: pulse-green 3s ease-in-out infinite;
        }

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(22, 53, 46, 0); }
          50% { box-shadow: 0 0 18px 4px rgba(22, 53, 46, 0.35); }
        }

        .navbar-glass {
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(22, 53, 46, 0.15);
          backdrop-filter: blur(24px);
          transition: all 0.3s ease;
        }

        .dark .navbar-glass {
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .navbar-glass.scrolled {
          background: var(--green);
          border-color: rgba(255,255,255,0.15);
        }

        .navbar-glass.scrolled .nav-link {
        color: rgba(255, 255, 255, 0.75);
        }

        .navbar-glass.scrolled .nav-link:hover,
        .navbar-glass.scrolled .nav-link.active {
        color: #ffffff;
        }

        .navbar-glass.scrolled .user-name,
        .navbar-glass.scrolled .btn-login,
        .navbar-glass.scrolled .btn-logout {
        color: #ffffff;
        }

        .navbar-glass.scrolled .brand-text,
        .navbar-glass.scrolled .brand-subtext {
        color: white;
        }

        .navbar-glass.scrolled .btn-login {
        border-color: rgba(255,255,255,0.3);
        }

        .navbar-glass.scrolled .avatar-ring {
        border-color: rgba(255,255,255,0.5);
        }

        .btn-login {
          color: var(--green);
          border: 1px solid rgba(22, 53, 46, 0.3);
          background: transparent;
          border-radius: 8px;
          padding: 0.45rem 1.1rem;
          font-size: 0.8rem;
          transition: 0.2s;
        }

        .btn-login:hover {
          background: var(--green);
          color: white;
        }

        .btn-signup {
          background: var(--green);
          color: white;
          border-radius: 8px;
          padding: 0.45rem 1.25rem;
          font-size: 0.8rem;
          transition: 0.2s;
        }

        .btn-signup:hover {
          background: #0f241f;
        }

        .btn-logout {
          color: rgba(22, 53, 46, 0.7);
          border: 1px solid rgba(22, 53, 46, 0.2);
          background: transparent;
          border-radius: 8px;
          padding: 0.4rem 0.9rem;
          transition: 0.2s;
        }

        .dark .btn-logout{
          color:white;
          border:1px solid rgba(255,255,255,.2);
        }

        .btn-logout:hover {
          color: white;
          background: var(--green);
        }

        .avatar-ring {
          border: 2px solid rgba(22, 53, 46, 0.5);
          box-shadow: 0 0 10px rgba(22, 53, 46, 0.25);
        }

        .user-name {
          color: var(--green);
        }

        .dark .user-name{
          color:white;
        }

        .mobile-drawer {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: 0.3s;
        }

        .mobile-drawer.open {
          max-height: 600px;
          opacity: 1;
        }

        .mobile-link {
          color: rgba(22, 53, 46, 0.7);
          padding: 0.85rem 0;
          display: block;
          border-bottom: 1px solid rgba(22, 53, 46, 0.1);
          text-transform: uppercase;
        }

        .dark .mobile-link{
          color:rgba(255,255,255,.7);
          border-bottom:1px solid rgba(255,255,255,.08);
        }

        .dark .mobile-link:hover{
          color:white;
        }

        .mobile-link:hover,
        .mobile-link.active {
          color: var(--green);
        }

        .navbar-glass.scrolled button,
        .navbar-glass.scrolled svg {
        color: white;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(22,53,46,0.3), transparent);
          margin: 1rem 0;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`mt-4 flex items-center justify-between rounded-xl navbar-glass px-5 py-3.5 ${scrolled ? "scrolled" : ""}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#16352E] flex items-center justify-center text-white font-bold logo-glow">
                <img className="rounded-md" src="/logoImg.jpeg" alt="logo image" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="brand-text text-[#16352E] font-bold">ArtHub</span>
                <span className="brand-subtext text-xs brand-text text-[#16352E]/60">Gallery</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle></ThemeToggle>
{isPending ? (
  <span className="text-[#16352E]/60 text-sm">Loading...</span>
) : user ? (
  <>
    {user.image ? (
      <img
        src={user.image}
        alt="user"
        className="h-8 w-8 rounded-full avatar-ring object-cover"
      />
    ) : (
      <div className="h-8 w-8 rounded-full avatar-ring bg-[#16352E] text-white flex items-center justify-center text-xs font-semibold">
        {getInitials(user.name)}
      </div>
    )}

    <span className="user-name">{user.name}</span>

    <button onClick={handleLogout} className="btn-logout cursor-pointer">
      Sign out
    </button>
  </>
) : (
  <>
    <Link href="/login">
      <button className="btn-login cursor-pointer">Log in</button>
    </Link>

    <Link href="/register">
      <button className="btn-signup cursor-pointer">Get Started</button>
    </Link>
  </>
)}
            </div>

            {/* Mobile */}
            <button onClick={() => setOpen(!open)} className="md:hidden text-[#16352E] dark:text-white">
              {open ? <HiX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>

{/* Mobile */}
<div className={`mobile-drawer md:hidden mt-2 px-5 py-4 bg-white dark:bg-slate-900 border dark:border-slate-800 ${open ? "open" : ""}`}>

  {/* Links */}
  {links.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="mobile-link"
      onClick={() => setOpen(false)}
    >
      {item.name}
    </Link>
  ))}

  {/* Divider */}
  <div className="divider" />

  {/* Auth Section */}
{isPending ? (
  <span className="text-[#16352E]/60 text-sm">Loading...</span>
) : user ? (
  <div className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-3">
      {user.image ? (
        <img
          src={user.image}
          className="h-8 w-8 rounded-full avatar-ring object-cover"
          alt="user"
        />
      ) : (
        <div className="h-8 w-8 rounded-full avatar-ring bg-[#16352E] text-white flex items-center justify-center text-xs font-semibold">
          {getInitials(user.name)}
        </div>
      )}

      <span className="text-[#16352E] dark:text-white text-sm font-medium">
        {user.name}
      </span>
    </div>

    <button
      onClick={() => {
        handleLogout();
        setOpen(false);
      }}
      className="btn-logout cursor-pointer dark:border border-white/70"
    >
      Sign out
    </button>
  </div>
) : (
  <div className="flex flex-col gap-2">
    <Link href="/login" onClick={() => setOpen(false)}>
      <button className="btn-login w-full">Log in</button>
    </Link>

    <Link href="/register" onClick={() => setOpen(false)}>
      <button className="btn-signup w-full">Get Started</button>
    </Link>
  </div>
)}
</div>
        </div>
      </header>
    </>
  );
}