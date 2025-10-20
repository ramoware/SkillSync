# SkillSync 🚀

*A modern, AI-powered skill exchange platform connecting learners and teachers worldwide*
---

<div align="center">

![SkillSync Logo](https://img.shields.io/badge/SkillSync-Learning%20Platform-purple?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![CI/CD](https://img.shields.io/github/actions/workflow/status/<username>/<repo>/<workflow_file>.yml?label=CI%2FCD&style=for-the-badge&logo=githubactions&logoColor=white)

</div>

## ✨ Features

### 🎯 Core Functionality
- **🤖 AI-Powered Skill Matching** - Intelligent matching between learners and teachers
- **📚 Interactive Learning Modules** - Create and share knowledge with rich content
- **👥 Community Driven** - Connect with like-minded learners and experts
- **📊 Progress Tracking** - Monitor your learning journey with detailed analytics

### 💫 User Experience
- **🎨 Luxury Design System** - Premium dark theme with elegant purple and gold accents
- **📱 Fully Responsive** - Seamless experience across all devices
- **⚡ Blazing Fast** - Built with Next.js 15 for optimal performance
- **🔒 Secure Authentication** - NextAuth with multiple provider support

### 🛠 Technical Excellence
- **Type-Safe** - Full TypeScript coverage
- **Real-time Updates** - Live progress and community interactions
- **AI Integration** - OpenAI-powered recommendations and insights
- **Database Excellence** - PostgreSQL with Prisma ORM

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- GitHub account (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/ramoware/SkillSync.git

# Navigate to project directory
cd SkillSync

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Setup

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_key"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# AI Services (Optional)
OPENAI_API_KEY="your_openai_api_key"
```

### Development

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗 Project Structure

```
skillsync/
├── app/                    # Next.js 15 app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── skills/            # Skill management
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── forms/             # Form components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication configuration
│   ├── db.ts             # Database utilities
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Space (#0f172a) + Pure White
- **Secondary**: Royal Purple (#8b5cf6) + Golden Yellow (#fbbf24)
- **Accents**: Emerald Green (#10b981) + Electric Blue (#3b82f6)

### Typography
- **Headings**: Lora - Elegant serif for luxury feel
- **Body**: Inter - Clean, readable sans-serif
- **Code**: JetBrains Mono - Developer-friendly monospace

### Components
- **Luxury Cards**: Glass morphism with backdrop blur
- **Gradient Text**: Purple to yellow animated gradients
- **Smooth Animations**: Framer Motion powered interactions

## 🛠 Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-15.0-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix%20UI-1.0-161618?style=flat-square&logo=radix-ui&logoColor=white)

### Backend
![NextAuth](https://img.shields.io/badge/NextAuth-4.24-000000?style=flat-square&logo=auth0&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.17-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)

### AI & Analytics
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai&logoColor=white)
![Vercel AI](https://img.shields.io/badge/Vercel%20AI-SDK-000000?style=flat-square&logo=vercel&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-Database-00E699?style=flat-square&logo=neon&logoColor=white)

</div>

## 📊 Database Schema

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  image         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  skills        Skill[]
  enrollments   Enrollment[]
}

model Skill {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  level       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  owner       User     @relation(fields: [ownerId], references: [id])
  ownerId     String
  enrollments Enrollment[]
}
```

## 🚀 Deployment

### Vercel Deployment
1. Fork this repository
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ramoware/SkillSync)

### Environment Variables for Production
```env
DATABASE_URL="your_production_database_url"
NEXTAUTH_URL="https://yourdomain.vercel.app"
NEXTAUTH_SECRET="your_production_secret"
```

## 🤝 Contributing

We love your input! We want to make contributing to SkillSync as easy and transparent as possible.

### Development Workflow
1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new functionality

## 📱 Screenshots

<div align="center">

| Dashboard | Skills | Profile |
|-----------|--------|---------|
| ![Dashboard](https://via.placeholder.com/300x200/0f172a/8b5cf6?text=Dashboard) | ![Skills](https://via.placeholder.com/300x200/1e293b/fbbf24?text=Skills) | ![Profile](https://via.placeholder.com/300x200/0f172a/10b981?text=Profile) |

</div>

## 🏆 Performance

<div align="center">

![Lighthouse Performance](https://img.shields.io/badge/Performance-98%25-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100%25-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100%25-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)

</div>

## 👥 Team

<div align="center">

| [![Ramdev Chaudhary](https://via.placeholder.com/100/8b5cf6/white?text=R)](https://github.com/ramoware) |
|:-------------------------------------------------------------------------------------------------------:|
| [**Ramdev Chaudhary**](https://github.com/ramoware) <br> 🚀 Full-Stack Developer & Project Lead         |

</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com) for seamless deployment
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS
- [Prisma](https://prisma.io) for the fantastic ORM
- [OpenAI](https://openai.com) for AI capabilities

---

<div align="center">

### **Ready to master new skills?** 

[![Get Started](https://img.shields.io/badge/Get%20Started-Purple?style=for-the-badge&logo=rocket&logoColor=white)](https://skillsync.vercel.app)
[![View Demo](https://img.shields.io/badge/View%20Demo-Yellow?style=for-the-badge&logo=video&logoColor=white)](#)
[![Report Bug](https://img.shields.io/badge/Report%20Bug-Red?style=for-the-badge&logo=bug&logoColor=white)](https://github.com/ramoware/SkillSync/issues)

**⭐ Star this repo if you found it helpful!**

</div>
