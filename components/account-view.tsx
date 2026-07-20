"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: string;
}

export function AccountView() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          fetchOrders(currentUser.id);
        }
      } catch (err) {
        // Guest user session check
      } finally {
        setLoading(false);
      }
    }

    checkUser();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          fetchOrders(currentUser.id);
        } else {
          setOrders([]);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  async function fetchOrders(userId: string) {
    if (!supabase) return;
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, status, total")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
    } catch (err) {
      console.error("Fetch orders failed:", err);
    } finally {
      setOrdersLoading(false);
    }
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!supabase) {
      setAuthError("Supabase client is not connected.");
      return;
    }

    try {
      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: userPassword,
        });
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthSuccess("Successfully signed in!");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
          options: {
            data: {
              full_name: userName,
            },
          },
        });
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthSuccess("Account created successfully! Check your email to confirm.");
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "An unexpected error occurred.");
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-clay border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
      {!user ? (
        /* Login / Register Form */
        <div className="mx-auto max-w-md rounded-3xl border border-line bg-cream p-8 sm:p-10 shadow-sm">
          <div className="flex justify-center border-b border-line pb-4 mb-8 text-sm uppercase tracking-widest gap-8">
            <button
              onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccess(""); }}
              className={`pb-2 transition border-b-2 ${
                authMode === "login"
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode("register"); setAuthError(""); setAuthSuccess(""); }}
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

          {authError && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-center text-xs text-red-600 border border-red-200">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="mb-4 rounded-xl bg-green-50 p-3 text-center text-xs text-green-700 border border-green-200">
              {authSuccess}
            </div>
          )}

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
              <p className="text-xs text-muted mt-1">
                Signed in as <span className="font-semibold text-ink">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleSignOut}
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
                  ⚙️ Account Details
                </a>
              </div>
            </div>

            {/* Main Section: Recent Orders */}
            <div className="lg:col-span-9 space-y-6">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-ink mb-4">Recent Orders</h2>
                {ordersLoading ? (
                  <p className="text-xs text-muted">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted space-y-3">
                    <p>No orders placed yet.</p>
                    <a
                      href="/shop"
                      className="inline-block rounded-full bg-ink px-6 py-2.5 text-xs text-paper uppercase tracking-wider hover:bg-clay transition"
                    >
                      Start Shopping
                    </a>
                  </div>
                ) : (
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
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="py-4 px-2 font-mono font-medium text-ink">
                              #{order.id.slice(0, 8)}
                            </td>
                            <td className="py-4 px-2 text-muted">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/20 px-2.5 py-0.5 text-[10px] font-semibold text-moss uppercase">
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-2 font-medium text-ink">{order.total || "$0.00"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountView;
