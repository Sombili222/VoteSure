import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "votesure_users";
const SESSION_KEY = "votesure_session";

function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(parsed) ? parsed : []; //
  } catch {
    return [];
  }
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        /* ignore corrupt session */
      }
    }
    setLoading(false);
  }, []);

  function persistSession(sessionUser, remember) {
    const payload = JSON.stringify(sessionUser);
    if (remember) {
      localStorage.setItem(SESSION_KEY, payload);
      sessionStorage.removeItem(SESSION_KEY);
    } else {//here its not looking into local storage, just continues to save this current session ur on
      sessionStorage.setItem(SESSION_KEY, payload);
      localStorage.removeItem(SESSION_KEY);
    }
  }

  async function register({ name, email, password, role }) {
    await delay(900);
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      //means is this user's(u) email a part of what is contained in the readUsers array
      throw new Error("An account with this email already exists.");
    }
    const otp = generateOtp();
    writeUsers([...users, { name, email, password, role, verified: false }]);

    console.info(`[VoteSure mock OTP] Code for ${email}: ${otp}`);
    setPendingVerification({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    return { email, otp };
  }

  async function verifyOtp({ email, code }) {
    await delay(700);
    if (!pendingVerification || pendingVerification.email !== email) {
      throw new Error("No verification in progress for this email.");
    }
    if (Date.now() > pendingVerification.expiresAt) {
      throw new Error("This code has expired. Request a new one.");
    }
    if (code !== pendingVerification.otp) {
      throw new Error("Incorrect code. Please try again.");
    }
    const users = readUsers();
    const updated = users.map((u) => (u.email === email ? { ...u, verified: true } : u));
    writeUsers(updated);
    setPendingVerification(null);

    const verified = updated.find((u) => u.email === email);
    const sessionUser = { name: verified.name, email: verified.email, role: verified.role };
    setUser(sessionUser);
    persistSession(sessionUser, true);
    return sessionUser;
  }

  async function resendOtp(email) {
    await delay(600);
    const otp = generateOtp();
    console.info(`[VoteSure mock OTP] New code for ${email}: ${otp}`);
    setPendingVerification({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    return otp;
  }

  async function login({ email, password, remember }) {
    await delay(900);
    const users = readUsers();
    const found = users.find((u) => u.email === email);
    if (!found || found.password !== password) {
      throw new Error("Incorrect email or password.");
    }
    if (!found.verified) {
      throw new Error("Please verify your email before logging in.");
    }
    const sessionUser = { name: found.name, email: found.email, role: found.role };
    setUser(sessionUser);
    persistSession(sessionUser, remember);
    return sessionUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }

  // ---- Forgot password: step 1 — send a reset code to the email ----
  async function requestPasswordReset(email) {
    await delay(800);

    const users = readUsers();
    const found = users.find((u) => u.email === email);

    if (!found) {
      throw new Error("No account found with this email.");
    }

    const otp = generateOtp();
    console.info(`[VoteSure mock OTP] Password reset code for ${email}: ${otp}`);

    setPendingVerification({
      email: email,
      otp: otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    return otp;
  }

  // ---- Forgot password: step 2 — check the code, then save the new password ----
  async function resetPassword(email, code, newPassword) {
    await delay(800);

    if (!pendingVerification || pendingVerification.email !== email) {
      throw new Error("No reset request found for this email.");
    }
    if (Date.now() > pendingVerification.expiresAt) {
      throw new Error("This code has expired. Request a new one.");
    }
    if (code !== pendingVerification.otp) {
      throw new Error("Incorrect code. Please try again.");
    }

    const users = readUsers();
    const updatedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        updatedUsers.push({ ...users[i], password: newPassword });
      } else {
        updatedUsers.push(users[i]);
      }
    }

    writeUsers(updatedUsers);
    setPendingVerification(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        pendingVerification,
        register,
        login,
        logout,
        verifyOtp,
        resendOtp,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}