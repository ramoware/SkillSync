// src/app/auth/debug/page.tsx
'use client'

import { useSession, signIn, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function DebugAuth() {
  const { data: session } = useSession()
  const [providers, setProviders] = useState<any>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Auth Debug</h1>
      
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Environment Variables:</h2>
        <p>GOOGLE_CLIENT_ID: {process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing'}</p>
        <p>GOOGLE_CLIENT_SECRET: {process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}</p>
        <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL}</p>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Session:</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Providers:</h2>
        <pre>{JSON.stringify(providers, null, 2)}</pre>
      </div>

      <button 
        onClick={() => signIn('google')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Google Sign In
      </button>
    </div>
  )
}