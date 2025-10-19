import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/providers/SessionProvider'
import { AIAssistant } from '@/components/chat/ai-assistant'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SkillSync - Connect, Learn, Grow',
  description: 'A luxury skill exchange platform where knowledge meets opportunity',
  keywords: ['skills', 'learning', 'education', 'community', 'AI'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white font-sans">
        <SessionProvider>
          <div className="relative min-h-screen">
            {children}
            <AIAssistant />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}