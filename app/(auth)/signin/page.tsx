"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      login(data.user);

      // Redirect based on role or to home
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col justify-center relative w-full max-w-7xl mx-auto">
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 py-12">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
            ← Return Home
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto mt-20 md:mt-0">
          <div className="mb-12">
            <h1 className="text-4xl font-serif text-stone-900 mb-3">Welcome Back</h1>
            <p className="text-stone-500">Please enter your details to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 flex items-center gap-3 text-red-700 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
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
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-stone-500 group-focus-within:text-amber-600 transition-colors">
                    Password
                  </label>
                </div>
                <input 
                  id="password"
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-amber-600 transition-all text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-stone-900 text-white h-14 rounded-none hover:bg-amber-600 transition-colors flex items-center justify-between px-6 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="font-bold tracking-wide">
                {loading ? "Authenticating..." : "Sign In"}
              </span>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-12 text-sm text-stone-500">
            New to the workshop?{" "}
            <Link href="/signup" className="text-stone-900 font-bold hover:underline decoration-amber-600 underline-offset-4">
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}