'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link may have expired.';
      default:
        return 'An error occurred during authentication.';
    }
  };

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
          <p className="text-gray-300 mb-4">
            {getErrorMessage(error)}
          </p>
          {error && (
            <p className="text-sm text-gray-400 mb-6">
              Error code: <code className="bg-white/10 px-2 py-1 rounded">{error}</code>
            </p>
          )}
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