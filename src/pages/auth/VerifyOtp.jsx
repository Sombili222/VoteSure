import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import OtpInput from "../../components/common/OtpInput";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function VerifyOtp() {
  const { verifyOtp, resendOtp, pendingVerification } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || pendingVerification?.email;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);
  const [devCode, setDevCode] = useState(pendingVerification?.otp || "");

  useEffect(() => {
    if (!email) navigate("/register", { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleVerify(e) {
    e.preventDefault();
    setError("");
    if (code.length !== 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const verifiedUser = await verifyOtp({ email, code });
      const destination = verifiedUser.role === "admin" ? "/admin" : "/voter";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    async function handleResend() {
      if (cooldown > 0) return;
      const otp = await resendOtp(email);
      setDevCode(otp);
      setCooldown(30);
      setCode("");
    }
  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-3xl border border-slate-200/70 shadow-xl p-8 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-50 to-blue-100 flex items-center justify-center mx-auto shadow-inner">
            <FaShieldAlt className="text-indigo-600 text-xl" />
          </div>

          <h1 className="text-2xl font-black text-slate-900 mt-6">
            Verify your email
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-slate-700">{email}</span>
          </p>

          {devCode && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-4">
              Dev mode — no email provider connected. Your code is{" "}
              <strong>{devCode}</strong>
            </p>
          )}

          <form onSubmit={handleVerify} className="mt-8">
            <OtpInput value={code} onChange={setCode} />
            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white mt-6 shadow-md shadow-indigo-500/25"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <p className="text-sm text-slate-500 mt-6">
            Didn't get a code?{" "}
            {cooldown > 0 ? (
              <span className="text-slate-400">Resend in {cooldown}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Resend code
              </button>
            )}
          </p>

          <Link
            to="/login"
            className="block text-sm text-slate-400 mt-4 hover:text-slate-600"
          >
            Back to login
          </Link>
        </motion.div>
      </div>
    );
  }

export default VerifyOtp;
