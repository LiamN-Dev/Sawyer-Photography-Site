"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Lock, Mail, User, Phone, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic connects to database here
    console.log("Submitted:", formData);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 text-white mb-2">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-400">
            {isSignUp
              ? "Sign up to book photography sessions and view your portal"
              : "Enter your credentials to access your client dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              required
              className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              required
              className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition duration-200 shadow-lg mt-2"
          >
            {isSignUp ? "Register Account" : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-400 hover:text-white transition"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}
