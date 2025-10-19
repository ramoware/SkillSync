export interface User {
  id: string
  email: string
  name: string
  role: 'SEEKER' | 'SKILLED' | 'ADMIN'
  avatar?: string
  bio?: string
}

export interface Session {
  user: User
  expires: string
}