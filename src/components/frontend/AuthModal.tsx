import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginOrRegister,
    setViewMode,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'admin'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [adminEmail, setAdminEmail] = useState('admin@e-seller.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (mode === 'admin') {
      if (!adminEmail.trim()) {
        setAuthError('Please enter administrator email address.');
        return;
      }
      // Log in and route straight to backend
      loginOrRegister(adminEmail.trim(), 'Root Administrator', undefined, '+1 (800) 555-0199', adminPassword);
      setViewMode('backend');
      setIsAuthModalOpen(false);
      return;
    }

    if (!email.trim()) {
      setAuthError('Please enter your email address.');
      return;
    }

    // Check if user is logging in with admin credentials
    const isEnteringAdmin =
      email.trim().toLowerCase().includes('admin') ||
      email.trim().toLowerCase() === 'admin@e-seller.com' ||
      password === 'admin123';

    loginOrRegister(
      email.trim(),
      name.trim() || 'Valued Member',
      referralCode.trim() || undefined,
      phone.trim() || '+1 (555) 349-8201',
      password || 'password123'
    );

    if (isEnteringAdmin) {
      setViewMode('backend');
    } else {
      setViewMode('frontend');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 my-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm">
                E
              </span>
              <h2 className="text-base font-black text-slate-900">
                {mode === 'login'
                  ? 'Sign In to E-seller'
                  : mode === 'register'
                  ? 'Create E-seller Account'
                  : 'Administrator Sign In'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {mode === 'admin'
                ? 'Supervisor authentication to open backend operations desk'
                : 'Access your balances, 20% discount catalog & live store desk'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        {mode !== 'admin' ? (
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setAuthError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setAuthError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Register New
            </button>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 text-xs text-amber-900 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Administrator Access Portal. Successful sign-in opens Backend Desk.</span>
          </div>
        )}

        {authError && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {authError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'admin' ? (
            <>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Administrator Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                    placeholder="admin@e-seller.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Security Passcode</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-black py-3 rounded-xl text-xs transition shadow-md uppercase tracking-wider mt-2 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authenticate & Open Backend Portal</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setAuthError(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  ← Return to Member Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Referral Code</span>
                  <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                </label>
                <input
                  type="text"
                  value={referralCode}
                  onChange={e => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="Enter referral code (if available)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-500 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs transition shadow-md shadow-amber-500/20 uppercase tracking-wider mt-2"
              >
                {mode === 'login' ? 'Sign In to Account' : 'Create Account'}
              </button>

              {/* Discrete Administrator Login Access */}
              <div className="pt-2 text-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMode('admin');
                    setAuthError(null);
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold transition"
                >
                  Administrator Portal Login
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
