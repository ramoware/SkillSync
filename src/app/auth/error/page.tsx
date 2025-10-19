'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 md:p-6">
        <Button variant="ghost" asChild className="text-green-200 hover:text-yellow-400">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md text-center">
          <div className="luxury-card p-6 md:p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-white mb-4">
              Authentication Error
            </h1>
            
            <p className="text-green-200 mb-6">
              There was an issue with authentication. Please try again.
            </p>

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