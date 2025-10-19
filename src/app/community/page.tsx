'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { Home, Search, User, LogOut, Users, MessageCircle, BookOpen, Star } from 'lucide-react'

// Mock community data
const mockCommunity = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'React Expert',
    skillsOffering: ['React', 'JavaScript', 'TypeScript'],
    skillsLearning: ['UI/UX Design', 'Product Management'],
    students: 1500,
    rating: 4.9,
    bio: 'Senior Frontend Engineer with 8+ years of experience. Passionate about teaching and open source.',
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    role: 'UI/UX Designer',
    skillsOffering: ['Figma', 'UI Design', 'User Research'],
    skillsLearning: ['Frontend Development', '3D Modeling'],
    students: 890,
    rating: 4.8,
    bio: 'Product designer helping others create beautiful and functional interfaces.',
    avatar: '/avatars/alex.jpg'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    role: 'Marketing Specialist',
    skillsOffering: ['Digital Marketing', 'SEO', 'Content Strategy'],
    skillsLearning: ['Data Analysis', 'Python'],
    students: 1200,
    rating: 4.7,
    bio: 'Helping businesses grow through effective digital marketing strategies.',
    avatar: '/avatars/maria.jpg'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    role: 'Data Scientist',
    skillsOffering: ['Python', 'Machine Learning', 'Data Analysis'],
    skillsLearning: ['Public Speaking', 'Creative Writing'],
    students: 780,
    rating: 4.9,
    bio: 'PhD in Computer Science with a passion for making data science accessible to everyone.',
    avatar: '/avatars/james.jpg'
  }
]

export default function CommunityPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('All')
  const [connections, setConnections] = useState<string[]>([])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Get unique skills from community members
  const allSkills = Array.from(new Set(
    mockCommunity.flatMap(user => user.skillsOffering)
  ))

  const filteredCommunity = mockCommunity.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skillsOffering.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    const matchesSkill = selectedSkill === 'All' || 
                        user.skillsOffering.includes(selectedSkill)
    
    return matchesSearch && matchesSkill
  })

  const handleConnect = (userId: string) => {
    if (connections.includes(userId)) {
      setConnections(connections.filter(id => id !== userId))
    } else {
      setConnections([...connections, userId])
    }
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
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-yellow-400 mb-1">
              Community
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              Connect with learners and experts
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
          {/* Search and Filters */}
          <div className="luxury-card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, role, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Skill Filter */}
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="luxury-card p-4 text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockCommunity.length}</div>
              <div className="text-green-200 text-sm">Active Members</div>
            </div>
            <div className="luxury-card p-4 text-center">
              <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{allSkills.length}</div>
              <div className="text-green-200 text-sm">Skills Available</div>
            </div>
            <div className="luxury-card p-4 text-center">
              <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{connections.length}</div>
              <div className="text-green-200 text-sm">Your Connections</div>
            </div>
            <div className="luxury-card p-4 text-center">
              <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-green-200 text-sm">Average Rating</div>
            </div>
          </div>

          {/* Community Members Grid */}
          {filteredCommunity.length === 0 ? (
            <div className="luxury-card p-12 text-center">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-lora font-semibold text-white mb-2">No members found</h3>
              <p className="text-green-200 mb-6">
                Try adjusting your search or filters to find community members.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedSkill('All'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunity.map(user => (
                <div key={user.id} className="luxury-card p-6 group hover:scale-105 transition-transform duration-300">
                  {/* User Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-lora font-semibold text-white group-hover:text-yellow-400 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-green-300 text-sm mb-1">{user.role}</p>
                      <div className="flex items-center gap-2 text-xs text-green-400">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{user.rating}</span>
                        <span>•</span>
                        <Users className="w-3 h-3" />
                        <span>{user.students} students</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-green-200 text-sm mb-4 line-clamp-2">
                    {user.bio}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Teaches:</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffering.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-purple-600/30 text-yellow-400 px-2 py-1 rounded-full border border-purple-500/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {user.skillsOffering.length > 3 && (
                        <span className="text-xs bg-green-800/50 text-green-300 px-2 py-1 rounded-full">
                          +{user.skillsOffering.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Learning */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Learning:</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsLearning.slice(0, 2).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleConnect(user.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {connections.includes(user.id) ? 'Connected' : 'Connect'}
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/profile/${user.id}`}>
                        <User className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="luxury-card p-8 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-lora font-bold text-white mb-4">
              Ready to Share Your Skills?
            </h2>
            <p className="text-green-200 text-lg mb-6 max-w-2xl mx-auto">
              Join our community of expert instructors and connect with learners from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/profile">
                  Complete Your Profile
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/skills/create">
                  Create a Skill
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