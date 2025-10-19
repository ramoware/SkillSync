'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { ArrowLeft, BookOpen, Users, Star, Clock, Play } from 'lucide-react'

// Mock data - will be replaced with real API call
const mockSkill = {
  id: '1',
  name: 'React Development',
  description: 'Learn modern React with hooks, context, and best practices for building scalable applications. This comprehensive course covers everything from basic concepts to advanced patterns used in production applications.',
  category: 'Programming',
  level: 'INTERMEDIATE',
  students: 124,
  rating: 4.8,
  instructor: {
    name: 'Sarah Chen',
    bio: 'Senior Frontend Engineer with 8+ years of experience building scalable React applications.',
    students: 1500
  },
  duration: 12,
  modules: [
    { id: '1', title: 'React Fundamentals', description: 'Learn the basics of React components and JSX', duration: 2, completed: true },
    { id: '2', title: 'State Management', description: 'Master useState, useEffect, and custom hooks', duration: 3, completed: true },
    { id: '3', title: 'Advanced Patterns', description: 'Learn context API, higher-order components, and render props', duration: 4, completed: false },
    { id: '4', title: 'Performance Optimization', description: 'Optimize your React applications for better performance', duration: 3, completed: false }
  ]
}

export default function SkillDetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [enrolled, setEnrolled] = useState(false)

  const handleEnroll = async () => {
    // TODO: Implement enrollment logic
    setEnrolled(true)
  }

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
    router.push('/auth/signin')
    return null
  }

  const progress = mockSkill.modules.filter(module => module.completed).length / mockSkill.modules.length * 100

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-green-700/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" asChild className="text-green-200 hover:text-yellow-400">
            <Link href="/skills">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-lora font-bold gradient-text">
              {mockSkill.name}
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              by {mockSkill.instructor.name}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Content */}
            <div className="lg:col-span-2">
              {/* Course Overview */}
              <div className="luxury-card p-6 md:p-8 mb-8">
                <h2 className="text-xl font-lora font-semibold text-white mb-4">About This Skill</h2>
                <p className="text-green-200 mb-6 leading-relaxed">
                  {mockSkill.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{mockSkill.duration}h</div>
                    <div className="text-green-300 text-sm">Total Duration</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{mockSkill.modules.length}</div>
                    <div className="text-green-300 text-sm">Modules</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{mockSkill.students}+</div>
                    <div className="text-green-300 text-sm">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{mockSkill.rating}</div>
                    <div className="text-green-300 text-sm">Rating</div>
                  </div>
                </div>
              </div>

              {/* Learning Modules */}
              <div className="luxury-card p-6 md:p-8">
                <h2 className="text-xl font-lora font-semibold text-white mb-6">Learning Path</h2>
                <div className="space-y-4">
                  {mockSkill.modules.map((module, index) => (
                    <div key={module.id} className={`p-4 rounded-lg border ${
                      module.completed 
                        ? 'bg-green-800/30 border-green-600' 
                        : 'bg-green-900/20 border-green-700/50'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          module.completed 
                            ? 'bg-green-500' 
                            : 'bg-purple-600'
                        }`}>
                          {module.completed ? (
                            <span className="text-white text-sm">✓</span>
                          ) : (
                            <span className="text-white text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{module.title}</h3>
                          <p className="text-green-200 text-sm mt-1">{module.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-green-300">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{module.duration}h</span>
                            </div>
                            {module.completed && (
                              <span className="text-green-400">Completed</span>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild={module.completed}>
                          {module.completed ? (
                            <span>Review</span>
                          ) : (
                            <span>Start</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment & Info */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <div className="luxury-card p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Enroll in this Skill</h3>
                  <p className="text-green-200 text-sm">Start your learning journey today</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-300">Level:</span>
                    <span className={getLevelColor(mockSkill.level)}>{mockSkill.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-300">Duration:</span>
                    <span className="text-white">{mockSkill.duration} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-300">Modules:</span>
                    <span className="text-white">{mockSkill.modules.length} lessons</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-300">Community:</span>
                    <span className="text-white">{mockSkill.students}+ students</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handleEnroll}
                  disabled={enrolled}
                >
                  {enrolled ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Enroll Now
                    </>
                  )}
                </Button>

                {enrolled && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-green-300 mb-2">
                      <span>Your Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-green-700/30 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructor Card */}
              <div className="luxury-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">About the Instructor</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {mockSkill.instructor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{mockSkill.instructor.name}</h4>
                    <p className="text-green-300 text-sm">{mockSkill.instructor.students}+ students</p>
                  </div>
                </div>
                <p className="text-green-200 text-sm leading-relaxed">
                  {mockSkill.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}