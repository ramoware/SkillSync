'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { LogOut, User, BookOpen, Settings, Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    skillsLearning: 0,
    skillsTeaching: 0,
    progress: 0
  })

  // Use useEffect for redirect to avoid render-time side effects
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Get first name from user's name
  const getFirstName = () => {
    if (!session?.user?.name) return 'there'
    return session.user.name.split(' ')[0]
  }

  // Load user stats (will be replaced with real API calls)
  useEffect(() => {
    // Simulate loading real data
    const loadUserStats = async () => {
      // TODO: Replace with actual API calls
      const userStats = {
        skillsLearning: 0,
        skillsTeaching: 0,
        progress: 0
      }
      setStats(userStats)
    }
    
    if (session) {
      loadUserStats()
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-200">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-200">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-green-700/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-yellow-400 mb-1">
              Dashboard
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              Welcome back, {getFirstName()}!
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Quick Navigation */}
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild className="text-green-200 hover:text-yellow-400">
                <Link href="/">
                  <Home className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-green-200 hover:text-yellow-400">
                <Link href="/skills">
                  <Search className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-green-200 hover:text-yellow-400">
                <Link href="/profile">
                  <User className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => signOut()}
              className="text-sm md:text-base"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Card */}
          <div className="luxury-card p-6 md:p-8 mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-lora font-bold text-white mb-4">
              Ready to Start Your Learning Journey, <span className="text-yellow-400">{getFirstName()}</span>?
            </h2>
            <p className="text-green-200 text-lg mb-6 max-w-2xl mx-auto">
              Your dashboard is where you&apos;ll track your progress, manage your skills, and connect with other learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/skills">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Skills
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/profile">
                  <User className="w-5 h-5 mr-2" />
                  Complete Your Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Real Stats - Will populate when user has data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
            <div className="luxury-card p-6 text-center">
              <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Skills Learning</h3>
              <p className="text-2xl font-bold text-yellow-400">{stats.skillsLearning}</p>
              <p className="text-green-200 text-sm">Enrolled courses</p>
              {stats.skillsLearning === 0 && (
                <Button variant="link" className="!text-yellow-400 mt-2" asChild>
                  <Link href="/skills">Start learning</Link>
                </Button>
              )}
            </div>
            
            <div className="luxury-card p-6 text-center">
              <User className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Skills Teaching</h3>
              <p className="text-2xl font-bold text-purple-400">{stats.skillsTeaching}</p>
              <p className="text-green-200 text-sm">Modules created</p>
              {stats.skillsTeaching === 0 && (
                <Button variant="link" className="!text-purple-400 mt-2" asChild>
                  <Link href="/skills/create">Share your skills</Link>
                </Button>
              )}
            </div>
            
            <div className="luxury-card p-6 text-center">
              <Settings className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-2xl font-bold text-green-400">0</p>
              <p className="text-green-200 text-sm">Connections made</p>
              <Button variant="link" className="!text-green-400 mt-2" asChild>
                <Link href="/community">Explore community</Link>
              </Button>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:mb-12">
            <div className="luxury-card p-6">
              <h3 className="text-xl font-lora font-semibold text-white mb-4">Next Steps</h3>
              <div className="space-y-4">
                {[
                  { 
                    title: 'Complete Your Profile', 
                    description: 'Add your skills and interests to get personalized recommendations',
                    action: '/profile',
                    completed: false
                  },
                  { 
                    title: 'Explore Skills', 
                    description: 'Browse available skills and find what you want to learn',
                    action: '/skills',
                    completed: false
                  },
                  { 
                    title: 'Share Your Expertise', 
                    description: 'Create your first learning module to teach others',
                    action: '/skills/create',
                    completed: false
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-green-800/30 rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-500' : 'bg-purple-600'
                    }`}>
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{step.title}</p>
                      <p className="text-green-200 text-sm mt-1">{step.description}</p>
                      <Button variant="link" className="text-yellow-400 p-0 h-auto text-sm mt-2" asChild>
                        <Link href={step.action}>
                          {step.completed ? 'View' : 'Get Started'} →
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="luxury-card p-6">
              <h3 className="text-xl font-lora font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/skills">
                    <Search className="w-4 h-4 mr-2" />
                    Browse All Skills
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link href="/profile">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link href="/skills/create">
                    <Settings className="w-4 h-4 mr-2" />
                    Create Learning Module
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link href="/community">
                    <User className="w-4 h-4 mr-2" />
                    Find Learning Partners
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Empty State for Activity */}
          <div className="luxury-card p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-lora font-semibold text-white mb-2">Your Learning Journey Awaits</h3>
            <p className="text-green-200 mb-6 max-w-md mx-auto">
              Once you start learning or teaching skills, your recent activity will appear here.
            </p>
            <Button asChild>
              <Link href="/skills">
                Start Your First Skill
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}