"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      setSuccess(true);
      setTimeout(() => router.push('/signin'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="flex flex-col justify-center relative w-full max-w-7xl mx-auto">
        
        <div className="absolute top-0 left-0">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
            ← Return Home
          </Link>
        </div>

        <div className="w-full max-w-lg mx-auto">
          {success ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-serif text-stone-900 mb-2">Welcome to the Workshop</h1>
              <p className="text-stone-500">Your account has been created. Redirecting to sign in...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-serif text-stone-900 mb-3">Become a Member</h1>
                <p className="text-stone-500">Create an account to track your orders and account details.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 flex items-center gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                      Full Name
                    </label>
                    <input 
                      id="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-amber-600 transition-all text-lg"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                      Email Address
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-amber-600 transition-all text-lg"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                      Password
                    </label>
                    <input 
                      id="password"
                      type="password" 
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-amber-600 transition-all text-lg"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-stone-900 text-white h-14 rounded-none hover:bg-amber-600 transition-colors flex items-center justify-between px-6 group disabled:opacity-70"
                >
                  <span className="font-bold tracking-wide">
                    {loading ? "Creating Account..." : "Create Account"}
                  </span>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <p className="mt-12 text-sm text-stone-500">
                Already have an account?{" "}
                <Link href="/signin" className="text-stone-900 font-bold hover:underline decoration-amber-600 underline-offset-4">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}