import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import SocialButton from "../../components/common/SocialButton";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!form.email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const loggedInUser = await login({ ...form, remember });
      const destination = loggedInUser.role === "admin" ? "/admin" : "/voter";
      navigate(location.state?.from || destination, { replace: true });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to manage your elections.">
      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          id="email" label="Email address" icon={FaEnvelope} type="email"
          placeholder="you@organization.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <Input
          id="password" label="Password" icon={FaLock} type="password"
          placeholder="••••••••" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <Checkbox id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} label="Remember me" />
          <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Forgot password?
          </Link>
        </div>

        {formError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
            {formError}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25">
          {loading ? "Logging in..." : "Log In"}
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <SocialButton icon={FaGoogle} label="Continue with Google" onClick={() => setFormError("Google sign-in isn't connected yet.")} />

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">Sign up</Link>
        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;