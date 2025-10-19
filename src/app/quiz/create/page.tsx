'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { Home, Search, User, LogOut, FileQuestion, Play, CheckCircle } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function CreateQuizPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('beginner')
  const [numberOfQuestions, setNumberOfQuestions] = useState(5)
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const generateQuiz = async () => {
    if (!topic.trim()) return

    setLoading(true)
    setQuiz([])
    setUserAnswers([])
    setShowResults(false)

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          difficulty,
          numberOfQuestions,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const quizData = await response.json()
      setQuiz(quizData)
    } catch (error) {
      console.error('Error generating quiz:', error)
      alert('Failed to generate quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showResults) return
    
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = answerIndex
    setUserAnswers(newAnswers)
  }

  const calculateScore = () => {
    return quiz.reduce((score, question, index) => {
      return score + (userAnswers[index] === question.correctAnswer ? 1 : 0)
    }, 0)
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

  const score = calculateScore()
  const allQuestionsAnswered = userAnswers.length === quiz.length && userAnswers.every(answer => answer !== undefined)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-green-700/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-lora font-bold gradient-text">
              AI Quiz Generator
            </h1>
            <p className="text-green-200 text-sm md:text-base">
              Generate practice quizzes with AI
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
              variant="outline"
              onClick={() => signOut()}
              className="text-sm md:text-base"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Generator Form */}
          {quiz.length === 0 && (
            <div className="luxury-card p-6 md:p-8 mb-8">
              <h2 className="text-xl font-lora font-semibold text-white mb-6">Generate a Quiz</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-green-200 mb-2">
                    Topic *
                  </label>
                  <input
                    id="topic"
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., React Hooks, Python Basics"
                  />
                </div>

                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-green-200 mb-2">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-green-200 mb-2">
                    Number of Questions
                  </label>
                  <input
                    id="numberOfQuestions"
                    type="number"
                    min="1"
                    max="20"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <Button 
                onClick={generateQuiz} 
                disabled={loading || !topic.trim()}
                size="lg"
              >
                <FileQuestion className="w-5 h-5 mr-2" />
                {loading ? 'Generating Quiz...' : 'Generate Quiz'}
              </Button>
            </div>
          )}

          {/* Generated Quiz */}
          {quiz.length > 0 && (
            <div className="space-y-8">
              {/* Quiz Header */}
              <div className="luxury-card p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-lora font-semibold text-white">
                    Quiz: {topic}
                  </h2>
                  <p className="text-green-200">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level • {quiz.length} Questions
                  </p>
                </div>
                {showResults && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {score}/{quiz.length}
                    </div>
                    <div className="text-green-200 text-sm">Score</div>
                  </div>
                )}
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {quiz.map((question, questionIndex) => (
                  <div key={questionIndex} className="luxury-card p-6">
                    <h3 className="font-semibold text-white mb-4">
                      {questionIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = userAnswers[questionIndex] === optionIndex
                        const isCorrect = optionIndex === question.correctAnswer
                        const showCorrect = showResults && isCorrect
                        const showIncorrect = showResults && isSelected && !isCorrect

                        return (
                          <div
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              showCorrect
                                ? 'bg-green-600/30 border-green-500'
                                : showIncorrect
                                ? 'bg-red-600/30 border-red-500'
                                : isSelected
                                ? 'bg-purple-600/30 border-purple-500'
                                : 'bg-green-800/30 border-green-700/50 hover:border-green-500'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {showCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                              <span className="text-green-100">{option}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Explanation */}
                    {showResults && (
                      <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg">
                        <p className="text-blue-200 text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {!showResults ? (
                  <Button
                    onClick={() => setShowResults(true)}
                    disabled={!allQuestionsAnswered}
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Check Answers
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setQuiz([])
                      setUserAnswers([])
                      setShowResults(false)
                    }}
                    size="lg"
                  >
                    Generate New Quiz
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}