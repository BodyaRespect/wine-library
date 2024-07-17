import type { Wine } from '@/types/Wine'

import { accessToken } from '@/api/axiosClient'
import { ProductList } from '@/components/ProductList/ProductList'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setFavorites, setProducts } from '@/store/reducers/products'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const LikedPage = () => {
  const [favoriteWines, setFavoriteWines] = useState<Wine[]>([])
  const [moreWines, setMoreWines] = useState<Wine[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get(`http://api.winelibrary.wuaze.com/wines?size=50`)
      .then(response => dispatch(setProducts(response.data)))
      .catch(error => console.error('Error fetching wine data for catalog:', error))
  }, [])

  useEffect(() => {
    axios.get('http://api.winelibrary.wuaze.com/favorite', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => dispatch(setFavorites(response.data)))
      .catch(error => console.error('Error fetching wine data:', error))
  }, [])

  const favorites = useAppSelector(state => state.products.favorites)
  const wines = useAppSelector(state => state.products.products)

  useEffect(() => {
    const favoriteWineIds = favorites.map(fav => fav.wineId)

    console.log({ favoriteWineIds })

    const filteredWines = wines.filter(wine => favoriteWineIds.includes(wine.id))
    const alsoWines = wines.filter(wine => !favoriteWineIds.includes(wine.id)).slice(-4)
    console.log({ filteredWines, alsoWines })

    setFavoriteWines(filteredWines)
    setMoreWines(alsoWines)
  }, [favorites, wines])

  return (
    <div className="container">
      {!!favoriteWines && (
        <>
          <h2 className="liked__title">
            Liked list
          </h2>

          <button className="liked__button">
            Order the whole list
          </button>

          <div className="liked__wines">
            <ProductList column={4} wines={favoriteWines} />
          </div>
        </>
      )}

      <h3 className="liked__also">You might also like</h3>
      <div className="liked__wines">
        <ProductList column={4} wines={moreWines} />
      </div>
      <button className="liked__button-showmore" onClick={() => navigate('/')}>
        Show
        <br />
        more drinks
        <div className="liked__button-showmore-icon"></div>
      </button>

      <h3 className="liked__recently">Recently viewed</h3>
      <div className="liked__wines">
        {/* <ProductList column={4} wines={wineData} /> */}
      </div>
    </div>
  )
}
