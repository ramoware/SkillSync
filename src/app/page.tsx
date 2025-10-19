import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { BookOpen, Users, Rocket, Star, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 text-center flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-purple-900/20 to-green-950/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Animated Logo/Badge */}
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 luxury-card flex items-center justify-center">
            <div className="w-8 h-8 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Rocket className="w-10 h-10 md:w-10 md:h-10 text-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-lora font-bold mb-4 md:mb-6 leading-tight">
            <span style={{color:'white'}}>SkillSync</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Where <span className="text-yellow-400 font-semibold">knowledge meets opportunity</span>. 
            Exchange skills, grow together, and build meaningful connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full w-full sm:w-auto" asChild>
              <Link href="/auth/signup">
                <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Start Your Journey
              </Link>
            </Button>
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full w-full sm:w-auto" asChild>
              <Link href="/skills">
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Explore Skills
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-green-950/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-lora font-bold text-center mb-4 text-white">
            Why Choose SkillSync?
          </h2>
          <p className="text-green-200 text-center text-base sm:text-lg mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Experience the future of <span className="text-yellow-400 font-semibold">skill exchange</span> with our premium platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="luxury-card p-6 md:p-8 text-center group">
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-lora font-semibold mb-3 md:mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-green-200 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-purple-400 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

const features = [
  {
    icon: BookOpen,
    title: "Learn Anything",
    description: "Access thousands of skills from coding to cooking, taught by passionate experts in our community."
  },
  {
    icon: Users,
    title: "Teach & Earn",
    description: "Share your expertise, create structured learning modules, and earn recognition in our ecosystem."
  },
  {
    icon: Star,
    title: "AI-Powered",
    description: "Smart quiz generation, personalized learning paths, and 24/7 AI assistance for your journey."
  }
]