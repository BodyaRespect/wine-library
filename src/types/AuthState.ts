import type { User } from './User'

export interface AuthState {
  user: User | null
  accessToken: string | null
  loading: boolean
  error: string | null
}
