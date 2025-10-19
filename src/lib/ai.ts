import { createOpenAI } from '@ai-sdk/openai'

// Create OpenAI instance with error handling
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Fallback function for when AI is not available
export const getFallbackResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm your SkillSync AI assistant. I'm currently in learning mode. How can I help you with your skills journey today?"
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
    return "I can help you explore skills on our platform! Try browsing the Skills page to find React Development, UI/UX Design, Digital Marketing, and many other skills shared by our community."
  }

  if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
    return "You can create practice quizzes using our Quiz Generator feature! It's perfect for testing your knowledge on any topic you're learning."
  }

  if (lowerMessage.includes('module') || lowerMessage.includes('create')) {
    return "To create a learning module, visit the 'Create Skill' page. You can structure your content with multiple modules and set estimated durations for each."
  }

  if (lowerMessage.includes('help')) {
    return "I can help you with:\n• Finding skills to learn\n• Creating teaching modules\n• Platform navigation\n• Learning recommendations\n\nWhat would you like to know?"
  }

  return "I'm here to assist you with SkillSync! You can browse skills, create learning modules, connect with other learners, and generate practice quizzes. How can I help you get started?"
}