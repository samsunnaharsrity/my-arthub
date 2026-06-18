"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const links = [
    { name: "Browse Art", href: "/artworks" },
    { name: "Artists", href: "/artists" },
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

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(248, 244, 255, 0.55);
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #7C3AED, #D946EF);
          transition: width 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: rgba(248, 244, 255, 0.95);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .logo-glow {
          box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4);
          animation: pulse-glow 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
          50% { box-shadow: 0 0 18px 4px rgba(124, 58, 237, 0.35); }
        }

        .navbar-glass {
          background: rgba(10, 10, 15, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .navbar-glass.scrolled {
          background: rgba(10, 10, 15, 0.85);
          border-color: rgba(124, 58, 237, 0.18);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(124, 58, 237, 0.12) inset;
        }

        .btn-login {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(248, 244, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          border-radius: 8px;
          padding: 0.45rem 1.1rem;
          transition: all 0.2s ease;
        }
        .btn-login:hover {
          color: #F8F4FF;
          border-color: rgba(124, 58, 237, 0.5);
          background: rgba(124, 58, 237, 0.08);
        }

        .btn-signup {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #fff;
          background: linear-gradient(135deg, #7C3AED 0%, #D946EF 100%);
          border-radius: 8px;
          padding: 0.45rem 1.25rem;
          border: none;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .btn-signup::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #9333EA 0%, #EC4899 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .btn-signup:hover::before { opacity: 1; }
        .btn-signup:hover { transform: translateY(-1px); }
        .btn-signup span { position: relative; z-index: 1; }

        .btn-logout {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(248, 244, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: transparent;
          border-radius: 8px;
          padding: 0.4rem 0.9rem;
          transition: all 0.2s ease;
        }
        .btn-logout:hover {
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.35);
          background: rgba(239, 68, 68, 0.07);
        }

        .avatar-ring {
          border: 1.5px solid rgba(124, 58, 237, 0.5);
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.25);
        }

        .user-name {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(248, 244, 255, 0.8);
        }

        /* Mobile drawer */
        .mobile-drawer {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease;
        }
        .mobile-drawer.open {
          max-height: 600px;
          opacity: 1;
        }
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.85rem 0;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(248, 244, 255, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: color 0.2s ease;
        }
        .mobile-link:hover,
        .mobile-link.active {
          color: rgba(248, 244, 255, 0.95);
        }
        .mobile-link .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #D946EF);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .mobile-link:hover .dot,
        .mobile-link.active .dot {
          opacity: 1;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), transparent);
          margin: 1rem 0;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`mt-4 flex items-center justify-between rounded-xl navbar-glass px-5 py-3.5 ${scrolled ? "scrolled" : ""}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm logo-glow flex-shrink-0">
                <img src="/logoImg.jpeg" alt="logo image" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white text-base font-bold tracking-tight">ArtHub</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-purple-400/70">Gallery</span>
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

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isPending ? (
                <div className="flex gap-1.5 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              ) : user ? (
                <>
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7C3AED&color=fff`}
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover avatar-ring"
                  />
                  <span className="user-name">{user.name.split(" ")[0]}</span>
                  <button onClick={handleLogout} className="btn-logout">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="btn-login">Log in</button>
                  </Link>
                  <Link href="/register">
                    <button className="btn-signup">
                      <span>Get Started</span>
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
              aria-label="Toggle menu"
            >
              <span className="text-lg transition-transform duration-200">
                {open ? <HiX /> : <HiOutlineMenuAlt3 />}
              </span>
            </button>
          </div>

          {/* Mobile Drawer */}
          <div className={`mobile-drawer md:hidden mt-2 rounded-2xl border border-white/07 bg-[#0A0A0F]/90 backdrop-blur-2xl px-5 pb-5 ${open ? "open" : ""}`}>
            <div className="pt-2">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`mobile-link ${pathname === item.href ? "active" : ""}`}
                >
                  <span className="dot" />
                  {item.name}
                </Link>
              ))}
            </div>

            {!user && !isPending && (
              <>
                <div className="divider" />
                <div className="flex flex-col gap-2.5">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <button className="btn-login w-full">Log in</button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <button className="btn-signup w-full">
                      <span>Get Started</span>
                    </button>
                  </Link>
                </div>
              </>
            )}

            {user && (
              <>
                <div className="divider" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7C3AED&color=fff`}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover avatar-ring"
                    />
                    <span className="user-name">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="btn-logout">
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
