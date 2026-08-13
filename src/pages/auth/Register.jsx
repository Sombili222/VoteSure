import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import SocialButton from "../../components/common/SocialButton";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const strengthLabels = ["Too weak", "Weak", "Okay", "Good", "Strong"];
const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-400", "bg-emerald-500"];

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("voter");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = passwordStrength(form.password);

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (!agree) next.agree = "You must accept the terms to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(""); //clears the error message
    if (!validate()) return; //checks if all validation parameters are met if not it shows the error msg and user isnt registered.
    setLoading(true);// else the registration begins. creating...
    try {
      await register({...form, role});//this register is from Authcontext, we send this data there for it to verify. await, hold till it is verified
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Set up secure elections in minutes.">
      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          id="name" label="Full name" icon={FaUser} placeholder="Adaeze Okafor"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />

        <Input
          id="email" label="Email address" icon={FaEnvelope} type="email"
          placeholder="you@organization.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <div>
          <Input
            id="password" label="Password" icon={FaLock} type="password"
            placeholder="At least 8 characters" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i < strength ? strengthColors[strength] : "bg-slate-200"}`} />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">{strengthLabels[strength]}</p>
            </div>
          )}
        </div>

          <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">I am registering as</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("voter")}
              className={`rounded-xl border py-3 text-sm font-medium transition-colors ${
                role === "voter"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              Voter
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`rounded-xl border py-3 text-sm font-medium transition-colors ${
                role === "admin"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              Election Organizer
            </button>
          </div>
        </div>

            <div>
    <Checkbox
        id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)}
        label={
        <span>
            I agree to the{" "}
            <Link to="/terms" className="text-indigo-600 font-medium">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-indigo-600 font-medium">Privacy Policy</Link>
        </span>
        }
    />
        <p className="text-xs text-red-500 mt-1.5 min-h-[16px]">
            {errors.agree || ""}
        </p>
    </div>

        {formError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
            {formError}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25">
          {loading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <SocialButton icon={FaGoogle} label="Continue with Google" onClick={() => setFormError("Google sign-in isn't connected yet.")} />

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">Log in</Link>
        </p>

      </form>
    </AuthLayout>
  );
}

export default Register;