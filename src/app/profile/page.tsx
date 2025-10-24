'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { Home, Search, User, LogOut, Save, Plus, X } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    skillsOffering: [] as string[],
    skillsLearning: [] as string[],
  })
  const [newSkillOffering, setNewSkillOffering] = useState('')
  const [newSkillLearning, setNewSkillLearning] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Load user profile data
  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        bio: 'Passionate learner and educator. Always looking to grow and share knowledge with others.',
        skillsOffering: ['React Development', 'JavaScript', 'TypeScript'],
        skillsLearning: ['UI/UX Design', 'Digital Marketing', 'Data Science'],
      })
    }
  }, [session])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Saving profile:', profile)
      // TODO: Replace with actual API call
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const addSkillOffering = () => {
    if (newSkillOffering.trim() && !profile.skillsOffering.includes(newSkillOffering.trim())) {
      setProfile({
        ...profile,
        skillsOffering: [...profile.skillsOffering, newSkillOffering.trim()]
      })
      setNewSkillOffering('')
    }
  }

  const removeSkillOffering = (skill: string) => {
    setProfile({
      ...profile,
      skillsOffering: profile.skillsOffering.filter(s => s !== skill)
    })
  }

  const addSkillLearning = () => {
    if (newSkillLearning.trim() && !profile.skillsLearning.includes(newSkillLearning.trim())) {
      setProfile({
        ...profile,
        skillsLearning: [...profile.skillsLearning, newSkillLearning.trim()]
      })
      setNewSkillLearning('')
    }
  }

  const removeSkillLearning = (skill: string) => {
    setProfile({
      ...profile,
      skillsLearning: profile.skillsLearning.filter(s => s !== skill)
    })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-200">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-green-700/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-yellow-400">
              Your Profile
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              Manage your skills and personal information
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
                <Link href="/dashboard">
                  <Search className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-green-200 hover:text-yellow-400">
                <Link href="/skills">
                  <User className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <Button
              variant='ghost' 
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
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSaveProfile} className="space-y-8">
            {/* Basic Information */}
            <div className="luxury-card p-6 md:p-8">
              <h2 className="text-xl font-lora font-semibold text-white mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-green-200 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-green-200 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us about yourself, your interests, and what you&apos;re passionate about..."
                  />
                  <p className="text-green-300 text-sm mt-2">
                    {profile.bio.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Offering */}
            <div className="luxury-card p-6 md:p-8">
              <h2 className="text-xl font-lora font-semibold text-white mb-6">Skills You Offer</h2>
              <p className="text-green-200 mb-4">
                Add skills that you can teach or mentor others in.
              </p>

              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={newSkillOffering}
                  onChange={(e) => setNewSkillOffering(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffering())}
                  className="flex-1 px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a skill you can teach..."
                />
                <Button type="button" onClick={addSkillOffering}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.skillsOffering.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-purple-600/30 text-yellow-400 px-3 py-2 rounded-full border border-purple-500/50">
                    <span className="text-sm">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkillOffering(skill)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {profile.skillsOffering.length === 0 && (
                  <p className="text-green-300 text-sm italic">
                    No skills added yet. Add skills you can teach to help others learn.
                  </p>
                )}
              </div>
            </div>

            {/* Skills Learning */}
            <div className="luxury-card p-6 md:p-8">
              <h2 className="text-xl font-lora font-semibold text-white mb-6">Skills You Want to Learn</h2>
              <p className="text-green-200 mb-4">
                Add skills you&apos;re interested in learning from others.
              </p>

              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={newSkillLearning}
                  onChange={(e) => setNewSkillLearning(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillLearning())}
                  className="flex-1 px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a skill you want to learn..."
                />
                <Button type="button" onClick={addSkillLearning}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.skillsLearning.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-3 py-2 rounded-full border border-yellow-500/50">
                    <span className="text-sm">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkillLearning(skill)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {profile.skillsLearning.length === 0 && (
                  <p className="text-green-300 text-sm italic">
                    No skills added yet. Add skills you want to learn to get personalized recommendations.
                  </p>
                )}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="luxury-card p-6 md:p-8">
              <h2 className="text-xl font-lora font-semibold text-white mb-4">Profile Completion</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-200">Basic Information</span>
                  <span className="text-yellow-400">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-200">Skills Offering</span>
                  <span className={profile.skillsOffering.length > 0 ? "text-yellow-400" : "text-green-300"}>
                    {profile.skillsOffering.length > 0 ? '✓ Complete' : 'Add at least 1 skill'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-200">Skills Learning</span>
                  <span className={profile.skillsLearning.length > 0 ? "text-yellow-400" : "text-green-300"}>
                    {profile.skillsLearning.length > 0 ? '✓ Complete' : 'Add at least 1 skill'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">
                  Cancel
                </Link>
              </Button>
              <Button type="submit" disabled={saving} size="lg">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}