import type { User } from './User'

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}
