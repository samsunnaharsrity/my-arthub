import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#16352E] text-white/80 rounded-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center text-[#16352E] font-bold text-lg">
                <img className="rounded-md" src="/logoImg.jpeg" alt="logo" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  ArtHub
                </h2>
                <p className="text-sm text-white/60">
                  Gallery Platform
                </p>
              </div>
            </Link>

            <p className="mt-5 text-white/60 leading-relaxed">
              Discover, explore and share beautiful artworks from talented artists around the world.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-white/60">
              <li><Link href="/artworks" className="hover:text-white">Browse Art</Link></li>
              <li><Link href="/artists" className="hover:text-white">Artists</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-white/60">
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-white/60">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} ArtHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;