import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center mx-auto shadow-inner">
          <FaShieldAlt className="text-indigo-600 text-xl" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mt-6">Page not found</h1>
        <p className="text-slate-500 text-sm mt-2">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="inline-block mt-6">
          <span className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;