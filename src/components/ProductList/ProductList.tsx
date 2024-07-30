import { useNavigate } from 'react-router-dom'

import type { Wine } from '../../types/Wine'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addRecentlyViewed } from '../../store/reducers/products'
import { CartItem } from '../CartItem'

interface Props {
  wines: Wine[]
  column: number
  nextPage: boolean
}

export const ProductList: React.FC<Props> = ({ wines, column, nextPage = false }) => {
  const favoriteIds = useAppSelector(state => state.products.favorites.map(item => item.wineId))
  const carts = useAppSelector(state => state.products.cart.cartItems.map(item => item.wineId))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleProductClick = (wine: Wine) => {
    dispatch(addRecentlyViewed(wine))

    const productUrl = `/productdetails/${wine.id}`

    if (nextPage) {
      window.open(`/wine-library/#${productUrl}`, '_blank')
    }
    else {
      navigate(productUrl)
    }
  }

  return (
    <div className="product__list" style={{ gridTemplateColumns: `repeat(${column}, minmax(319px, 1fr))` }}>
      {wines.map(wine => (
        <div className="product__list-item" key={wine.id}>
          <CartItem
            isCart={carts.includes(wine.id)}
            isFavorite={favoriteIds.includes(wine.id)}
            onClick={() => handleProductClick(wine)}
            wine={wine}
          />
        </div>
      ))}
    </div>
  )
}
