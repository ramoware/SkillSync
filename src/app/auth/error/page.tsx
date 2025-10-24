import { Suspense } from 'react';
import { ErrorContent } from './error-content';

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white">Loading error details...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}