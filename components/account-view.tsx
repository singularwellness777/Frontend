"use client";

import { useState } from "react";

export function AccountView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
      {!isLoggedIn ? (
        /* Login / Register Form */
        <div className="mx-auto max-w-md rounded-3xl border border-line bg-cream p-8 sm:p-10 shadow-sm">
          <div className="flex justify-center border-b border-line pb-4 mb-8 text-sm uppercase tracking-widest gap-8">
            <button
              onClick={() => setAuthMode("login")}
              className={`pb-2 transition border-b-2 ${
                authMode === "login"
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`pb-2 transition border-b-2 ${
                authMode === "register"
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Create Account
            </button>
          </div>

          <h1 className="text-center text-2xl font-light tracking-tight text-ink mb-2">
            {authMode === "login" ? "Welcome Back" : "Join Singular Cares"}
          </h1>
          <p className="text-center text-xs text-muted mb-8">
            {authMode === "login"
              ? "Sign in to access your orders, wishlist, and rewards."
              : "Create an account for faster checkout and exclusive offers."}
          </p>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === "register" && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm outline-none transition focus:border-clay"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm outline-none transition focus:border-clay"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm outline-none transition focus:border-clay"
              />
            </div>

            {authMode === "login" && (
              <div className="flex justify-between items-center text-xs text-muted pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-line" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="underline hover:text-ink">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-ink py-3.5 text-xs font-medium uppercase tracking-widest text-paper transition hover:bg-clay mt-4"
            >
              {authMode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      ) : (
        /* Logged In Dashboard */
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-6 gap-4">
            <div>
              <h1 className="text-3xl font-light text-ink">My Account</h1>
              <p className="text-xs text-muted mt-1">Hello, <span className="font-semibold text-ink">{userName || userEmail}</span></p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-xs tracking-wider uppercase text-muted hover:text-ink underline self-start sm:self-auto"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-line bg-cream p-4 space-y-1 text-xs">
                <a href="#" className="block px-4 py-2.5 rounded-xl bg-paper font-semibold text-ink">
                  📦 Order History
                </a>
                <a href="#" className="block px-4 py-2.5 rounded-xl text-muted hover:text-ink hover:bg-paper/50">
                  📍 Addresses
                </a>
                <a href="#" className="block px-4 py-2.5 rounded-xl text-muted hover:text-ink hover:bg-paper/50">
                  ⚙️ Account Details
                </a>
              </div>
            </div>

            {/* Main Section: Recent Orders */}
            <div className="lg:col-span-9 space-y-6">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-ink mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-line text-muted uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-2">Order #</th>
                        <th className="py-3 px-2">Date</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      <tr>
                        <td className="py-4 px-2 font-mono font-medium text-ink">#SC-9042</td>
                        <td className="py-4 px-2 text-muted">July 18, 2026</td>
                        <td className="py-4 px-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/20 px-2.5 py-0.5 text-[10px] font-semibold text-moss">
                            Delivered
                          </span>
                        </td>
                        <td className="py-4 px-2 font-medium text-ink">$89.00</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-mono font-medium text-ink">#SC-8711</td>
                        <td className="py-4 px-2 text-muted">June 24, 2026</td>
                        <td className="py-4 px-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/20 px-2.5 py-0.5 text-[10px] font-semibold text-moss">
                            Delivered
                          </span>
                        </td>
                        <td className="py-4 px-2 font-medium text-ink">$42.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
