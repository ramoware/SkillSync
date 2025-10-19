'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'

export default function CreateSkillPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    level: 'BEGINNER',
    duration: '',
    content: ''
  })
  const [modules, setModules] = useState([{ title: '', description: '', duration: '' }])
  const [loading, setLoading] = useState(false)

  const addModule = () => {
    setModules([...modules, { title: '', description: '', duration: '' }])
  }

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  const updateModule = (index: number, field: string, value: string) => {
    const updatedModules = modules.map((module, i) => 
      i === index ? { ...module, [field]: value } : module
    )
    setModules(updatedModules)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // TODO: Replace with actual API call
      console.log('Creating skill:', { ...formData, modules })
      router.push('/skills')
    } catch (error) {
      console.error('Error creating skill:', error)
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-green-700/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-60">
          <Button variant="ghost" asChild className="text-green-200 hover:text-yellow-400">
            <Link href="/skills">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl md:text-3xl font-lora font-bold text-yellow-400">
              Create New Skill
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              Share your expertise with the community
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="luxury-card p-6 md:p-8">
              <h2 className="text-xl font-lora font-semibold text-white mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-200 mb-2">
                    Skill Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., React Development"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-green-200 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Writing">Writing</option>
                    <option value="Creative">Creative</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-green-200 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    id="level"
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-green-200 mb-2">
                    Estimated Duration (hours) *
                  </label>
                  <input
                    id="duration"
                    type="number"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 12"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-green-200 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe what students will learn in this skill..."
                  />
                </div>
              </div>
            </div>

            {/* Learning Modules */}
            <div className="luxury-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-lora font-semibold text-white">Learning Modules</h2>
                <Button type="button" onClick={addModule} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="p-4 bg-green-800/30 rounded-lg border border-green-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">Module {index + 1}</h3>
                      {modules.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeModule(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-200 mb-2">
                          Module Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={module.title}
                          onChange={(e) => updateModule(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-green-900/50 border border-green-600/30 rounded text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., Introduction to React"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-green-200 mb-2">
                          Duration (hours) *
                        </label>
                        <input
                          type="number"
                          required
                          min="0.5"
                          step="0.5"
                          value={module.duration}
                          onChange={(e) => updateModule(index, 'duration', e.target.value)}
                          className="w-full px-3 py-2 bg-green-900/50 border border-green-600/30 rounded text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., 2"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-green-200 mb-2">
                          Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={module.description}
                          onChange={(e) => updateModule(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-green-900/50 border border-green-600/30 rounded text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="What will students learn in this module?"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/skills">
                  Cancel
                </Link>
              </Button>
              <Button type="submit" disabled={loading} size="lg">
                {loading ? 'Creating Skill...' : 'Create Skill'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}