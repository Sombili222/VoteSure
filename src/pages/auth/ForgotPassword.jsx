import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import OtpInput from "../../components/common/OtpInput";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function ForgotPassword() {
  const { requestPasswordReset, resetPassword } = useAuth();
  const navigate = useNavigate();

  // "email" = asking for the email, "reset" = entering code + new password
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState("");

  async function handleSendCode(e) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const otp = await requestPasswordReset(email);
      setDevCode(otp);
      setStep("reset");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError("");

    if (code.length !== 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, code, newPassword);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={step === "email" ? "Forgot password" : "Set a new password"}
      subtitle={
        step === "email"
          ? "Enter your email and we'll send you a reset code."
          : `Enter the code sent to ${email}`
      }
    >
      {step === "email" && (
        <form onSubmit={handleSendCode} className="space-y-5">
          <Input
            id="email"
            label="Email address"
            icon={FaEnvelope}
            type="email"
            placeholder="you@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25"
          >
            {loading ? "Sending code..." : "Send Reset Code"}
          </Button>

          <p className="text-center text-sm text-slate-500">
            Remembered it?{" "}
            <Link to="/login" className="font-semibold text-indigo-600">Back to login</Link>
          </p>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-5">

          {devCode && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              Dev mode — no email provider connected. Your code is <strong>{devCode}</strong>
            </p>
          )}

          <OtpInput value={code} onChange={setCode} />

          <Input
            id="newPassword"
            label="New password"
            icon={FaLock}
            type="password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            id="confirmPassword"
            label="Confirm new password"
            icon={FaLock}
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25"
          >
            {loading ? "Saving..." : "Reset Password"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}

export default ForgotPassword;