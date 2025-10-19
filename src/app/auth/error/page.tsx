'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return "There's a problem with the server configuration."
      case 'AccessDenied':
        return "You do not have permission to sign in."
      case 'Verification':
        return "The verification token has expired or has already been used."
      case 'OAuthSignin':
        return "Error in OAuth sign in process."
      case 'OAuthCallback':
        return "Error in OAuth callback process."
      case 'OAuthCreateAccount':
        return "Could not create OAuth provider account."
      case 'EmailCreateAccount':
        return "Could not create email provider account."
      case 'Callback':
        return "Error in the callback handler."
      case 'OAuthAccountNotLinked':
        return "This email is already associated with another account."
      case 'EmailSignin':
        return "Check your email address."
      case 'CredentialsSignin':
        return "Sign in failed. Check the details you provided are correct."
      case 'SessionRequired':
        return "Please sign in to access this page."
      default:
        return "An unexpected error occurred."
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <Button variant="ghost" asChild className="text-green-200 hover:text-yellow-400">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md text-center">
          <div className="luxury-card p-6 md:p-8">
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-white mb-4">
              Authentication Error
            </h1>
            
            <p className="text-green-200 mb-6">
              {getErrorMessage(error)}
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm">
                  Error code: <code className="bg-red-500/20 px-2 py-1 rounded">{error}</code>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/auth/signin">
                  Try Sign In Again
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}