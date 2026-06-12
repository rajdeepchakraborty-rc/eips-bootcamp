'use client';

import { useState } from 'react';
import { authClient, signIn } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, KeyRound } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn.emailOtp({
        email,
        otp,
      });
      if (result.error) {
        setError(result.error.message || 'Invalid OTP');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  return (
    <>
      <div className="relative
            z-10
            w-full
            max-w-md
            overflow-hidden
            rounded-3xl
            border
            border-border/50
            bg-card/70
            backdrop-blur-xl
            shadow-[0_20px_80px_rgba(0,0,0,0.25)]
            p-8">
        {/* Internal Glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-emerald-500/5
            via-transparent
            to-cyan-500/5
            pointer-events-none
          "
        />

        <div className="relative z-10">
        
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-emerald-400">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue your learning journey.
            </p>
          </div>
        
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                
                <div className="relative">
                  <Mail
                    className="
                      absolute
                      left-4
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-muted-foreground
                    "
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-accent border border-border rounded-lg pl-11 py-2 text-foreground focus:outline-none focus:border-emerald-500/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              {/* Progress Indicator */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-center">
                <p className="mt-1 text-sm text-muted-foreground">
                  We have sent a 6-digit verification code to
                </p>

                <p className="mt-2 font-medium text-emerald-400">
                  {email}
                </p>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Enter OTP</label>
                <div className="relative">
                <KeyRound
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full bg-accent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-emerald-500/50 text-center tracking-[0.5em]"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-muted-foreground hover:text-foreground text-sm"
              >
                Use a different email
              </button>
            </form>
          )}

          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-accent flex-1"></div>
            <span className="text-muted-foreground text-xs">OR</span>
            <div className="h-px bg-accent flex-1"></div>
          </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-background hover:bg-accent font-bold py-2.5 rounded-lg transition-all mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>


          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link href="/sign-up" className="text-emerald-400 hover:text-emerald-300">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
