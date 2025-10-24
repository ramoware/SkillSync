
import { aiService } from '@/lib/ai-service'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1]?.content || 'Hello'
    
    // Generate response using our local AI service
    const response = await aiService.generateChatResponse(lastMessage)

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
        error: 'An error occurred while processing your request.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
