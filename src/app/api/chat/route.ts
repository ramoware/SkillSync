import { aiService } from '@/lib/ai-service'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1]?.content || 'Hello'
    
    // Generate response using our local AI service
    const response = aiService.generateChatResponse(lastMessage)

    return new Response(
      JSON.stringify({
        id: Date.now().toString(),
        choices: [{
          message: {
            role: 'assistant',
            content: response
          }
        }]
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    
    return new Response(
      JSON.stringify({
        id: Date.now().toString(),
        choices: [{
          message: {
            role: 'assistant',
            content: "I'm here to help you with SkillSync! You can browse skills, create learning modules, or connect with our community. How can I assist you today?"
          }
        }]
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}