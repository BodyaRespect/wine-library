import type { Wine } from './Wine'

export interface CartWine {
  wineId: Wine['id']
}

export interface Cart {
  id: number
  userId: number
  cartItems: CartWine[]
}
