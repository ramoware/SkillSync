'use client'

import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { Search, Filter, Plus, BookOpen, Users, Star, ArrowRight } from 'lucide-react'
import { Home, User, LogOut } from 'lucide-react'

// Mock data - will be replaced with real API calls
const mockSkills = [
  {
    id: '1',
    name: 'React Development',
    description: 'Learn modern React with hooks, context, and best practices for building scalable applications.',
    category: 'Programming',
    level: 'INTERMEDIATE',
    students: 124,
    rating: 4.8,
    instructor: 'Sarah Chen',
    duration: 12,
    image: '/illustrations/react.svg'
  },
  {
    id: '2',
    name: 'UI/UX Design',
    description: 'Master user interface and experience design principles with Figma and modern design systems.',
    category: 'Design',
    level: 'BEGINNER',
    students: 89,
    rating: 4.6,
    instructor: 'Alex Rodriguez',
    duration: 8,
    image: '/illustrations/design.svg'
  },
  {
    id: '3',
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategy including SEO, social media, and content marketing.',
    category: 'Business',
    level: 'BEGINNER',
    students: 156,
    rating: 4.7,
    instructor: 'Maria Garcia',
    duration: 10,
    image: '/illustrations/marketing.svg'
  },
  {
    id: '4',
    name: 'Python Data Science',
    description: 'Data analysis, visualization, and machine learning with Python and popular libraries.',
    category: 'Data Science',
    level: 'ADVANCED',
    students: 78,
    rating: 4.9,
    instructor: 'Dr. James Wilson',
    duration: 16,
    image: '/illustrations/data-science.svg'
  },
  {
    id: '5',
    name: 'Content Writing',
    description: 'Professional content writing techniques for blogs, websites, and marketing materials.',
    category: 'Writing',
    level: 'BEGINNER',
    students: 67,
    rating: 4.5,
    instructor: 'Emily Thompson',
    duration: 6,
    image: '/illustrations/writing.svg'
  },
  {
    id: '6',
    name: 'Photography',
    description: 'Master your camera and learn composition, lighting, and post-processing techniques.',
    category: 'Creative',
    level: 'INTERMEDIATE',
    students: 92,
    rating: 4.8,
    instructor: 'Michael Brown',
    duration: 8,
    image: '/illustrations/photography.svg'
  }
]

const categories = ['All', 'Programming', 'Design', 'Business', 'Data Science', 'Writing', 'Creative', 'Other']
const levels = ['All', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']

export default function SkillsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Filter skills based on search and filters
  const filteredSkills = mockSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || skill.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER': return 'text-green-400'
      case 'INTERMEDIATE': return 'text-yellow-400'
      case 'ADVANCED': return 'text-orange-400'
      case 'EXPERT': return 'text-red-400'
      default: return 'text-green-200'
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
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-yellow-400">
              Explore Skills
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              Discover and learn from our community of experts
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
                <Link href="/profile">
                  <User className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <Button asChild>
              <Link href="/skills/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Skill
              </Link>
            </Button>

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
                  placeholder="Search skills, categories, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle for Mobile */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mt-4 md:hidden flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-3 py-2 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="flex-1 px-3 py-2 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-green-200">
              Showing {filteredSkills.length} of {mockSkills.length} skills
            </p>
          </div>

          {/* Skills Grid */}
          {filteredSkills.length === 0 ? (
            <div className="luxury-card p-12 text-center">
              <Search className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-lora font-semibold text-white mb-2">No skills found</h3>
              <p className="text-green-200 mb-6">
                Try adjusting your search or filters to find more skills.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map(skill => (
                <div key={skill.id} className="luxury-card p-6 group hover:scale-105 transition-transform duration-300">
                  {/* Skill Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-lora font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-green-800/50 ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span className="text-xs text-green-300 bg-green-800/30 px-2 py-1 rounded-full">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-green-200 text-sm mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-green-300 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{skill.students} learners</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{skill.rating}</span>
                    </div>
                    <div>
                      <span>{skill.duration}h</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="text-xs text-green-400 mb-4">
                    By {skill.instructor}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full group/btn" asChild>
                    <Link href={`/skills/${skill.id}`}>
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="luxury-card p-8 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-lora font-bold text-white mb-4">
              Ready to Share Your Knowledge?
            </h2>
            <p className="text-green-200 text-lg mb-6 max-w-2xl mx-auto">
              Join our community of expert instructors and help others learn valuable skills.
            </p>
            <Button size="lg" asChild>
              <Link href="/skills/create">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Skill
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}