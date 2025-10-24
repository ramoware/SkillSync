
import { openai } from '@/lib/ai'
import { streamText } from 'ai'

// AI service that uses a generative AI model
const generateChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const { text } = await streamText({
      model: openai('gpt-4-turbo-2024-04-09'),
      prompt: userMessage,
    })

    return text
  } catch (error) {
    console.error('Error generating AI response:', error)
    return "I'm sorry, I'm having trouble connecting to the AI service. Please try again later."
  }
};

const generateQuiz = (topic: string, numberOfQuestions: number = 5): any[] => {
  // Pre-defined quiz templates
  const quizTemplates: { [key: string]: any[] } = {
    'react': [
      {
        question: "What is React primarily used for?",
        options: [
          "Backend development",
          "Building user interfaces",
          "Database management",
          "Mobile app development"
        ],
        correctAnswer: 1,
        explanation: "React is a JavaScript library for building user interfaces, particularly for web applications."
      },
      {
        question: "Which React hook is used for side effects?",
        options: [
          "useState",
          "useEffect",
          "useContext",
          "useReducer"
        ],
        correctAnswer: 1,
        explanation: "useEffect hook is used for side effects like data fetching, subscriptions, or manually changing the DOM."
      },
      {
        question: "What is JSX in React?",
        options: [
          "A JavaScript framework",
          "A syntax extension for JavaScript",
          "A CSS preprocessor",
          "A database query language"
        ],
        correctAnswer: 1,
        explanation: "JSX is a syntax extension that allows you to write HTML-like code in JavaScript."
      }
    ],
    'javascript': [
      {
        question: "What is JavaScript mainly used for?",
        options: [
          "Styling web pages",
          "Adding interactivity to web pages",
          "Server configuration",
          "Database design"
        ],
        correctAnswer: 1,
        explanation: "JavaScript is primarily used to make web pages interactive and dynamic."
      },
      {
        question: "Which keyword is used to declare variables in modern JavaScript?",
        options: [
          "var",
          "let",
          "const",
          "Both let and const"
        ],
        correctAnswer: 3,
        explanation: "Modern JavaScript uses 'let' for variables that can be reassigned and 'const' for constant values."
      }
    ],
    'default': [
      {
        question: `What is the main purpose of ${topic}?`,
        options: [
          "A type of programming language",
          "A methodology or framework",
          "A database system",
          "A design pattern"
        ],
        correctAnswer: 1,
        explanation: `${topic} represents an important concept in its field with various applications.`
      },
      {
        question: `Which tool is commonly associated with ${topic}?`,
        options: [
          "Industry-standard tools",
          "Basic text editors",
          "Hardware devices",
          "Mobile applications"
        ],
        correctAnswer: 0,
        explanation: `Different tools are used with ${topic} depending on the specific context and requirements.`
      }
    ]
  };

  const topicKey = topic.toLowerCase();
  let quiz = quizTemplates[topicKey] || quizTemplates['default'];
  
  // Ensure we have the requested number of questions
  while (quiz.length < numberOfQuestions) {
    quiz.push({
      question: `What is an important aspect of ${topic}?`,
      options: [
        "Fundamental concepts",
        "Advanced techniques",
        "Best practices",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: `Understanding ${topic} requires knowledge of fundamentals, advanced techniques, and best practices.`
    });
  }

  return quiz.slice(0, numberOfQuestions);
};

// Export as simple functions instead of a class
export const aiService = {
  generateChatResponse,
  generateQuiz
};
