import type { User } from './User'

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  loading: boolean
  error: string | null
}
