import { Link } from "react-router-dom";
import { FaBan } from "react-icons/fa";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <FaBan className="text-red-400 text-3xl mx-auto" />
        <h1 className="text-xl font-bold text-slate-900 mt-4">You don't have access to this page</h1>
        <p className="text-slate-500 text-sm mt-1.5">This area is restricted to a different account type.</p>
        <Link to="/" className="text-indigo-600 font-medium text-sm mt-4 inline-block">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;