import { Link } from "react-router-dom";
import { FaShieldAlt, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "How It Works", "Dashboard"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Blog"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>
              <span className="text-xl font-extrabold text-white">VoteSure</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Secure, transparent digital elections for organizations that
              can't afford to get it wrong.
            </p>
            <div className="flex gap-4 mt-6">
              <FaTwitter className="hover:text-white cursor-pointer transition-colors" />
              <FaLinkedin className="hover:text-white cursor-pointer transition-colors" />
              <FaGithub className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} VoteSure. All rights reserved.</p>
          <p>Built for elections people can trust.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;