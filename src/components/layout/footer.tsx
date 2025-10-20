import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-950/50 border-t border-green-700/30 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Creator Info */}
          <div className="text-center lg:text-center">
              <h4 className="font-lora font-semibold text-base md:text-lg text-white mb-2 md:mb-3">
                Created with 💜 by
              </h4>
              <p className="text-yellow-400 font-semibold text-lg md:text-xl mb-2">
                Ramdev Chaudhary
              </p>
              <p className="text-green-200 text-xs md:text-sm mb-3 md:mb-4">
                Full Stack Developer & AI Enthusiast
              </p>
              
              <div className="flex justify-center lg:justify-center space-x-3 md:space-x-4">
                <a 
                  href="https://github.com/ramoware" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-yellow-400 transition-colors duration-300 p-2 luxury-card"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/ramdevchaudhary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-yellow-400 transition-colors duration-300 p-2 luxury-card"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a 
                  href="mailto:ramoware@gmail.com" 
                  className="text-green-300 hover:text-yellow-400 transition-colors duration-300 p-2 luxury-card"
                  title="Email"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>
          </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-green-700/30 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-green-400 text-xs md:text-sm">
            © 2025 CoLearn. Built with 💛 Next.js 15, TypeScript, and AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
