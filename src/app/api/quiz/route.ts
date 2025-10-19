import { aiService } from '@/lib/ai-service'

export async function POST(req: Request) {
  try {
    const { topic, difficulty = 'beginner', numberOfQuestions = 5 } = await req.json()

    // Generate quiz using our local AI service
    const quizData = aiService.generateQuiz(topic, difficulty, numberOfQuestions)

    return new Response(JSON.stringify(quizData), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Quiz API error:', error)
    
    // Return a simple fallback quiz
    const fallbackQuiz = [
      {
        question: "What is SkillSync designed for?",
        options: [
          "Social media networking",
          "Skill exchange and learning",
          "E-commerce shopping",
          "Video streaming"
        ],
        correctAnswer: 1,
        explanation: "SkillSync is a platform for exchanging skills and learning from others in the community."
      },
      {
        question: "How can you share your knowledge on SkillSync?",
        options: [
          "By creating learning modules",
          "By posting on social media",
          "By writing blog posts",
          "By making videos"
        ],
        correctAnswer: 0,
        explanation: "You can create structured learning modules to teach skills to others on SkillSync."
      }
    ]

    return new Response(JSON.stringify(fallbackQuiz), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}