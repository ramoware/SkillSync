// Simple AI service with fallbacks that doesn't rely on external APIs

const generateChatResponse = (userMessage: string): string => {
  // Simple rule-based responses - no external API calls
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your SkillSync assistant. I can help you explore skills, create learning modules, and connect with our community. What would you like to know?";
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('teach')) {
    return "SkillSync lets you both learn and teach skills! You can browse skills like React Development, UI/UX Design, Digital Marketing, and more. You can also create your own learning modules to teach others.";
  }

  if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('practice')) {
    return "We have an AI Quiz Generator feature! You can create practice quizzes on any topic to test your knowledge. Visit the Quiz section to try it out.";
  }

  if (lowerMessage.includes('module') || lowerMessage.includes('create') || lowerMessage.includes('course')) {
    return "To create a learning module, go to the 'Create Skill' page. You can add multiple lessons, set durations, and structure your content to help others learn effectively.";
  }

  if (lowerMessage.includes('profile') || lowerMessage.includes('account')) {
    return "You can manage your profile, add skills you want to teach or learn, and update your personal information in the Profile section.";
  }

  if (lowerMessage.includes('community') || lowerMessage.includes('connect') || lowerMessage.includes('people')) {
    return "Our community feature lets you connect with other learners and experts. You can browse profiles, see what skills people are offering, and make new connections!";
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I can help you with:\n• Finding and browsing skills\n• Creating learning modules\n• Generating practice quizzes\n• Connecting with the community\n• Managing your profile\n\nWhat specific help do you need?";
  }

  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! I'm happy to help. Is there anything else you'd like to know about SkillSync?";
  }

  // Default response for other messages
  return "I'm here to help you get the most out of SkillSync! You can explore skills, create learning content, take quizzes, and connect with our community. What would you like to do today?";
};

const generateQuiz = (topic: string, difficulty: string = 'beginner', numberOfQuestions: number = 5): any[] => {
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