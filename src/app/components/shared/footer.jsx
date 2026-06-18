import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                H
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  HireLoop
                </h2>
                <p className="text-sm text-slate-400">
                  Hiring Made Simple
                </p>
              </div>
            </Link>

            <p className="mt-5 text-slate-400 leading-relaxed">
              Connecting talented professionals with top companies.
              Find jobs, hire candidates, and grow your career with confidence.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Job Seekers
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="hover:text-white">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link href="/companies" className="hover:text-white">
                  Companies
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>

              <li>
                <Link href="/signup" className="hover:text-white">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Employers
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/recruiter/jobs/new" className="hover:text-white">
                  Post a Job
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-white">
                  Recruiter Plans
                </Link>
              </li>

              <li>
                <Link href="/dashboard/recruiter" className="hover:text-white">
                  Recruiter Dashboard
                </Link>
              </li>

              <li>
                <Link href="/companies" className="hover:text-white">
                  Hiring Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;