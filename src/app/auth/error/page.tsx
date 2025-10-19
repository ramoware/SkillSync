import { Suspense } from 'react';
import Link from 'next/link';

function ErrorContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 backdrop-blur-lg border border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-lora">Authentication Error</h1>
          <p className="text-gray-300 mb-6">
            An error occurred during authentication. Please try again.
          </p>
          <Link 
            href="/auth/signin"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}