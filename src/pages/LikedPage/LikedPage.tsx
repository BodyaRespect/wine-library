import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Wine } from '../../types/Wine'

import { accessToken, addFavoritesToCart } from '../../api/axiosClient'
import { ProductList } from '../../components/ProductList/ProductList'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addAllFavorites } from '../../store/reducers/products'

export const LikedPage = () => {
  const [favoriteWines, setFavoriteWines] = useState<Wine[]>([])
  const [moreWines, setMoreWines] = useState<Wine[]>([])
  const [viewed, setViewed] = useState<Wine[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const favorites = useAppSelector(state => state.products.favorites)
  const wines = useAppSelector(state => state.products.products)
  const recentlyViewed = useAppSelector(state => state.products.recentlyViewed)

  useEffect(() => {
    const favoriteWineIds = favorites.map(fav => fav.wineId)

    console.log({ favoriteWineIds })

    const filteredWines = wines.filter(wine => favoriteWineIds.includes(wine.id))
    const alsoWines = wines.filter(wine => !favoriteWineIds.includes(wine.id)).slice(-4)
    console.log({ filteredWines, alsoWines })

    setFavoriteWines(filteredWines)
    setMoreWines(alsoWines)
    setViewed(recentlyViewed)
  }, [favorites, wines, recentlyViewed])

  const handleOrderFavorites = () => {
    addFavoritesToCart()
      .then(() => {
        dispatch(addAllFavorites())
      })
      .catch((error) => {
        console.error('Error adding favorites to cart:', error)
      })
  }

  return (
    <div className="container">
      <div className="liked">
        {favoriteWines.length > 0 && (
          <>
            <h2 className="liked__title">
              Liked list
            </h2>

            {accessToken() && (
              <button className="liked__button" onClick={handleOrderFavorites}>
                Order the whole list
              </button>
            )}

            <div className="liked__wines">
              <ProductList column={4} nextPage={false} wines={favoriteWines} />
            </div>
          </>
        )}

        <h3 className="liked__also">You might also like</h3>
        <div className="liked__wines">
          <ProductList column={4} nextPage={false} wines={moreWines} />
        </div>
        <button className="liked__button-showmore" onClick={() => navigate('/')}>
          Show
          <br />
          more drinks
          <div className="liked__button-showmore-icon"></div>
        </button>

        {recentlyViewed.length > 0 && (
          <>
            <h3 className="liked__recently">
              Recently viewed
            </h3>

            <div className="liked__wines">
              <ProductList column={4} nextPage={false} wines={viewed} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
