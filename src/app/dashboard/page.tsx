import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const firstName = session.user?.name?.split(' ')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white font-lora">SkillSync</h1>
              <p className="text-gray-400">Welcome back, {firstName}!</p>
            </div>
            <nav className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                title="Home"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <Link 
                href="/dashboard/skills" 
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                title="Skills"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </Link>
              <Link 
                href="/dashboard/profile" 
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                title="Profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Skills Card */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white font-lora">Your Skills</h2>
            </div>
            <p className="text-gray-400 mb-4">Track and manage your professional skills</p>
            <Link 
              href="/dashboard/skills"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
            >
              Manage Skills
            </Link>
          </div>

          {/* Profile Card */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white font-lora">Profile</h2>
            </div>
            <p className="text-gray-400 mb-4">Update your personal information</p>
            <Link 
              href="/dashboard/profile"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          {/* AI Analysis Card */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white font-lora">AI Analysis</h2>
            </div>
            <p className="text-gray-400 mb-4">Get insights about your skill gaps</p>
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors">
              Analyze Skills
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-2xl font-bold text-yellow-400 mb-2">0</div>
            <div className="text-gray-400">Skills Added</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-2xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-gray-400">Skills to Learn</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-2xl font-bold text-green-400 mb-2">0%</div>
            <div className="text-gray-400">Profile Complete</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-2xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-gray-400">AI Insights</div>
          </div>
        </div>
      </main>
    </div>
  );
}