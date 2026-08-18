import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  X,
  Database,
  CheckCircle2,
  Loader2,
  ExternalLink
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  const {
    loginAdmin,
    adminAuthError,
    studioName,
    setIsDirectAdminRoute,
    setIsCmsOpen,
    setIsAdminMode
  } = useStudio();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setLocalError('Please enter your administrator email address.');
      return;
    }
    if (!password) {
      setLocalError('Please enter your Supabase account password.');
      return;
    }

    if (!isSupabaseConfigured) {
      setLocalError('Supabase is not configured. Please supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to authenticate.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginAdmin(trimmedEmail, password);
      if (result.success) {
        setIsAdminMode(true);
        setIsCmsOpen(true);
        onClose();
      } else {
        setLocalError(result.error || 'Authentication failed. Please verify your credentials in Supabase.');
      }
    } catch (err: any) {
      setLocalError(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToSite = () => {
    setIsDirectAdminRoute(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-4 font-mono text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Top Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

        {/* Close / Return Button */}
        <button
          onClick={handleReturnToSite}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Return to Public Website"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {/* Header & Emblem */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-sm font-bold tracking-[0.25em] text-amber-300 uppercase">
              {studioName}
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              RESTRICTED ATELIER ACCESS
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] text-slate-400 mt-3">
              <Database className="w-3 h-3 text-amber-400" />
              <span>SUPABASE IDENTITY & ACCESS MANAGEMENT</span>
            </div>
          </div>

          {/* Configuration Banner */}
          {!isSupabaseConfigured && (
            <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold">Supabase Config Required:</span> Provide your{' '}
                <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and{' '}
                <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> in{' '}
                <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded">.env.local</code> to activate Supabase IAM.
              </div>
            </div>
          )}

          {/* Error Message */}
          {(localError || adminAuthError) && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5 animate-shake">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold block uppercase tracking-wider mb-0.5">Authentication Error</span>
                {localError || adminAuthError}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>ADMIN EMAIL</span>
                <span className="text-[10px] text-slate-500">SUPABASE AUTH</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@niloaxis.com"
                  autoComplete="email"
                  autoFocus
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-lg text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>PASSWORD</span>
                <span className="text-[10px] text-slate-500">ENCRYPTED</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-lg text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>VERIFYING SUPABASE IAM...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>SIGN IN TO ATELIER CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-3">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              All credentials and sessions are authenticated directly against Supabase Auth. Legacy passwords and local overrides have been removed.
            </p>
            <button
              onClick={handleReturnToSite}
              className="text-[11px] text-slate-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
            >
              ← Return to public portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
