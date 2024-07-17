import type { Wine } from '@/types/Wine'

import { useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'

import { CartItem } from '../CartItem'

interface Props {
  wines: Wine[]
  column: number
}

export const ProductList: React.FC<Props> = ({ wines, column }) => {
  const favoriteIds = useAppSelector(state => state.products.favorites.map(item => item.wineId))
  const carts = useAppSelector(state => state.products.cart.cartItems.map(item => item.wineId))
  const navigate = useNavigate()

  return (
    <div className="product__list" style={{ gridTemplateColumns: `repeat(${column}, minmax(314px, 1fr))` }}>
      {wines.map(wine => (
        <div className="product__list-item" key={wine.id}>
          <CartItem
            isCart={carts.includes(wine.id)}
            isFavorite={favoriteIds.includes(wine.id)}
            onClick={() => navigate(`/productdetails/${wine.id}`)}
            wine={wine}
          />
        </div>
      ))}
    </div>
  )
}
